/* eslint-disable indent */
import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import { getDbAndReqBody } from '@/lib/utils/api-routes'
import { generateArticleCode, idGenerator } from '@/lib/utils/common'
import { corsHeaders } from '@/constants/corsHeaders'

export async function POST(req: Request) {
  try {
    const { db, reqBody } = await getDbAndReqBody(clientPromise, req)
    let images = null

    if (reqBody.images.every((img: { dataUrl: string }) => img.dataUrl)) {
      images = reqBody.images.map(
        (img: { dataUrl: string; title: string }) => ({
          ...img,
          imgId: idGenerator(),
        })
      )

      await db.collection('images').insertMany(images)
    }

    const newProduct = {
      ...reqBody,
      images: images
        ? images.map((img: { imgId: string }) => ({
            url: `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}?id=${img.imgId}`,
            desc: reqBody.name,
          }))
        : reqBody.images,
      vendorCode: generateArticleCode(reqBody.type),
    }

    const { insertedId } = await db
      .collection(reqBody.category)
      .insertOne(newProduct)

    return NextResponse.json(
      {
        status: 201,
        newItem: { id: insertedId, ...newProduct },
      },
      corsHeaders
    )
  } catch (error) {
    throw new Error((error as Error).message)
  }
}

export async function OPTIONS() {
  return new NextResponse(null, { ...corsHeaders, status: 200 })
}
