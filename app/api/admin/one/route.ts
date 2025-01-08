import { ObjectId } from 'mongodb'
import { NextResponse } from 'next/server'
import { corsHeaders } from '@/constants/corsHeaders'
import clientPromise from '@/lib/mongodb'
import { getDbAndReqBody } from '@/lib/utils/api-routes'

export async function GET(req: Request) {
  try {
    const { db } = await getDbAndReqBody(clientPromise, null)
    const url = new URL(req.url)
    const id = url.searchParams.get('id')
    const category = url.searchParams.get('category')
    const isValidId = ObjectId.isValid(id as string)
    const isUser = category === 'users'

    if (!isValidId) {
      return NextResponse.json(
        {
          message: 'Wrong product id',
          status: 400,
        },
        corsHeaders
      )
    }

    const item = await db
      .collection(category as string)
      .findOne({ _id: new ObjectId(id as string) })

    if (isUser) {
      delete item?.password
    }

    return NextResponse.json({ ...item, id: item?._id }, corsHeaders)
  } catch (error) {
    throw new Error((error as Error).message)
  }
}

export const dynamic = 'force-dynamic'
