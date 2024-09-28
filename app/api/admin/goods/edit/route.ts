import { ObjectId } from 'mongodb'
import { NextResponse } from 'next/server'
import { corsHeaders } from '@/constants/corsHeaders'
import clientPromise from '@/lib/mongodb'
import { getDbAndReqBody } from '@/lib/utils/api-routes'

export async function OPTIONS() {
  try {
    return NextResponse.json({}, { ...corsHeaders })
  } catch (error) {
    console.error('Ошибка при обработке OPTIONS запроса:', error)
    return NextResponse.json(
      { message: 'Внутренняя ошибка сервера', status: 500 },
      { ...corsHeaders, status: 500 }
    )
  }
}

export async function PUT(req: Request) {
  try {
    const { db } = await getDbAndReqBody(clientPromise, null)
    const { id, category, ...updateData } = await req.json()

    const isValidId = ObjectId.isValid(id as string)
    if (!isValidId) {
      return NextResponse.json(
        { message: 'Неверный ID продукта', status: 400 },
        { ...corsHeaders, status: 400 }
      )
    }

    // Проверка наличия коллекции
    const collections = await db.listCollections({ name: category }).toArray()
    if (collections.length === 0) {
      return NextResponse.json(
        { message: 'Указанная категория не существует', status: 400 },
        { ...corsHeaders, status: 400 }
      )
    }

    const result = await db
      .collection(category as string)
      .updateOne({ _id: new ObjectId(id as string) }, { $set: updateData })

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { message: 'Продукт не найден', status: 404 },
        { ...corsHeaders, status: 404 }
      )
    }

    if (result.modifiedCount === 0) {
      return NextResponse.json(
        { message: 'Изменения не были внесены', status: 200 },
        { ...corsHeaders, status: 200 }
      )
    }

    return NextResponse.json(
      { message: 'Продукт успешно обновлен', status: 200 },
      { ...corsHeaders, status: 200 }
    )
  } catch (error) {
    console.error('Ошибка при обновлении продукта:', error)
    return NextResponse.json(
      { message: 'Внутренняя ошибка сервера', status: 500 },
      { ...corsHeaders, status: 500 }
    )
  }
}

export const dynamic = 'force-dynamic'
