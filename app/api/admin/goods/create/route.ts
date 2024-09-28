import { NextResponse } from 'next/server'
import { corsHeaders } from '@/constants/corsHeaders'
import clientPromise from '@/lib/mongodb'

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

export async function POST(req: Request) {
  try {
    const client = await clientPromise
    const db = client.db() // Получаем объект базы данных
    const productData = await req.json()

    // Проверяем наличие всех необходимых полей
    if (!productData.category || !productData.name) {
      return NextResponse.json(
        { message: 'Отсутствуют обязательные поля', status: 400 },
        { ...corsHeaders, status: 400 }
      )
    }

    // Проверка наличия коллекции
    const collections = await db.collections()
    const collectionExists = collections.some(
      (col) => col.collectionName === productData.category
    )
    if (!collectionExists) {
      return NextResponse.json(
        { message: 'Указанная категория не существует', status: 400 },
        { ...corsHeaders, status: 400 }
      )
    }

    const result = await db
      .collection(productData.category)
      .insertOne(productData)

    if (result.acknowledged) {
      return NextResponse.json(
        {
          message: 'Продукт успешно создан',
          id: result.insertedId,
          status: 201,
        },
        { ...corsHeaders, status: 201 }
      )
    } else {
      return NextResponse.json(
        { message: 'Не удалось создать продукт', status: 500 },
        { ...corsHeaders, status: 500 }
      )
    }
  } catch (error) {
    console.error('Ошибка при создании продукта:', error)
    return NextResponse.json(
      { message: 'Внутренняя ошибка сервера', status: 500 },
      { ...corsHeaders, status: 500 }
    )
  }
}

export const dynamic = 'force-dynamic'
