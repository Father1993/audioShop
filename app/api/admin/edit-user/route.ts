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
    let newImage = null

    if (!isValidId) {
      return NextResponse.json(
        {
          message: 'Wrong user id',
          status: 400,
        },
        corsHeaders
      )
    }

    const user = await db
      .collection('users')
      .findOne({ _id: new ObjectId(reqBody.id) })

    if (!user) {
      return NextResponse.json(
        {
          status: 400,
          message: 'Пользователя не существует',
        },
        corsHeaders
      )
    }

    if (reqBody.image.dataUrl) {
      newImage = {
        ...reqBody.image,
        imgId: idGenerator(),
      }

      await db.collection('images').insertOne(newImage)
      await db.collection('images').deleteOne({ url: user.image.url })
    }

    await db.collection('users').updateOne(
      { _id: new ObjectId(reqBody._id) },
      {
        $set: {
          name: reqBody.name,
          email: reqBody.email,
          role: reqBody.role,
          ...(newImage && {
            image: {
              url: `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}?id=${newImage.imgId}`,
              desc: reqBody.name,
            },
          }),
        },
      }
    )

    const updatedUser = await db
      .collection('users')
      .findOne({ _id: new ObjectId(reqBody._id) })

    return NextResponse.json(
      {
        status: 200,
        updatedUser: { id: updatedUser?._id, ...updatedUser },
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
