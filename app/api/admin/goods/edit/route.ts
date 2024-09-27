import { ObjectId } from 'mongodb'
import { NextResponse } from 'next/server'
import { corsHeaders } from '@/constants/corsHeaders'
import clientPromise from '@/lib/mongodb'
import { getDbAndReqBody } from '@/lib/utils/api-routes'

export async function PUT(req: Request) {
  try {
    const { db } = await getDbAndReqBody(clientPromise, null)
    const { id, category, ...updateData } = await req.json()

    const isValidId = ObjectId.isValid(id as string)
    if (!isValidId) {
      return NextResponse.json(
        {
          message: 'Wrong product id',
          status: 404,
        },
        corsHeaders
      )
    }

    const result = await db
      .collection(category as string)
      .updateOne({ _id: new ObjectId(id as string) }, { $set: updateData })

    if (result.modifiedCount === 0) {
      return NextResponse.json(
        {
          message: 'No product found or no changes made',
          status: 404,
        },
        corsHeaders
      )
    }

    return NextResponse.json(
      {
        status: 204,
      },
      corsHeaders
    )
  } catch (error) {
    throw new Error((error as Error).message)
  }
}

export const dynamic = 'force-dynamic'
