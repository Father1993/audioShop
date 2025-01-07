import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import { getDbAndReqBody } from '@/lib/utils/api-routes'

export async function GET(req: Request) {
  try {
    const { db } = await getDbAndReqBody(clientPromise, null)
    const imgId = req.url.split('id=')[1]
    const image = await db.collection('images').findOne({ imgId })

    if (!image) {
      return NextResponse.json({ status: 404 })
    }

    const base64Data = image.dataUrl.replace(/^data:image\/\w+;base64,/, '')
    const imageBuffer = Buffer.from(base64Data, 'base64')

    return new NextResponse(imageBuffer, {
      headers: {
        'Content-Type': `image/${image.title.split('.')[1]}`,
      },
    })
  } catch (error) {
    throw new Error((error as Error).message)
  }
}

export const dynamic = 'force-dynamic'
