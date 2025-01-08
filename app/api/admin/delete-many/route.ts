import { ObjectId } from 'mongodb'
import { NextResponse } from 'next/server'
import { corsHeaders } from '@/constants/corsHeaders'
import clientPromise from '@/lib/mongodb'
import { getDbAndReqBody } from '@/lib/utils/api-routes'

export async function DELETE(req: Request) {
  try {
    const { db } = await getDbAndReqBody(clientPromise, null)
    const url = new URL(req.url)
    const ids = url.searchParams.get('ids')
    const collection = url.searchParams.get('category')

    if (!ids || !collection) {
      return NextResponse.json(
        {
          status: 400,
          message: 'Bad request',
        },
        corsHeaders
      )
    }

    const parsedIds = JSON.parse(ids) as string[]

    await db.collection(collection).deleteMany({
      _id: {
        $in: parsedIds.map((id) => new ObjectId(id)),
      },
    })

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

export async function OPTIONS() {
  return new NextResponse(null, { ...corsHeaders, status: 200 })
}
