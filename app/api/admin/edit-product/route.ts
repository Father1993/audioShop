import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import { getDbAndReqBody } from '@/lib/utils/api-routes'
import { idGenerator } from '@/lib/utils/common'
import { corsHeaders } from '@/constants/corsHeaders'
import { ObjectId } from 'mongodb'

export async function POST(req: Request) {
  try {
    const { db, reqBody } = await getDbAndReqBody(clientPromise, req)
    const isValidId = ObjectId.isValid(reqBody.id as string)
    let newImages = []
    const oldImages = reqBody.oldImages

    if (!isValidId) {
      return NextResponse.json(
        {
          message: 'Wrong product id',
          status: 400,
        },
        corsHeaders
      )
    }

    const product = await db
      .collection(reqBody.category)
      .findOne({ _id: new ObjectId(reqBody.id) })

    if (!product) {
      return NextResponse.json(
        {
          status: 400,
          message: 'Пользователя не существует',
        },
        corsHeaders
      )
    }

    if (reqBody.newImages.length) {
      newImages = reqBody.newImages.map(
        (img: { dataUrl: string; title: string }) => ({
          ...img,
          imgId: idGenerator(),
        })
      )

      await db.collection('images').insertMany(newImages)
    }

    if (oldImages.length) {
      const oldImagesUrls = oldImages.map((img: { url: string }) => img.url)

      const deletedImages = product.images.filter(
        (img: { url: string }) => !oldImagesUrls.includes(img.url)
      )

      if (deletedImages.length) {
        await db.collection('images').deleteMany({
          url: {
            $in: deletedImages.map((img: { url: string }) => img.url),
          },
        })
      }
    }

    delete reqBody.newImages
    delete reqBody.oldImages
    delete reqBody._id

    await db.collection(reqBody.category).updateOne(
      { _id: new ObjectId(reqBody.id) },
      {
        $set: {
          ...reqBody,
          images: [
            ...oldImages,
            ...newImages.map((img: { imgId: string }) => ({
              url: `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}?id=${img.imgId}`,
              desc: reqBody.name,
            })),
          ],
        },
      }
    )

    const updatedItem = await db
      .collection(reqBody.category)
      .findOne({ _id: new ObjectId(reqBody.id) })

    return NextResponse.json(
      {
        status: 200,
        updatedItem,
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
