import bcrypt from 'bcryptjs'
import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import { getDbAndReqBody } from '@/lib/utils/api-routes'
import { idGenerator } from '@/lib/utils/common'
import { corsHeaders } from '@/constants/corsHeaders'

export async function POST(req: Request) {
  try {
    const { db, reqBody } = await getDbAndReqBody(clientPromise, req)
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(reqBody.password, salt)
    let image = null

    const user = await db.collection('users').findOne({ email: reqBody.email })

    if (user) {
      return NextResponse.json(
        {
          status: 400,
          message: 'Пользователь с твким email уже существует',
        },
        corsHeaders
      )
    }

    if (reqBody.image) {
      image = {
        ...reqBody.image,
        imgId: idGenerator(),
      }

      await db.collection('images').insertOne(image)
    }

    const newUser = {
      ...reqBody,
      image: {
        url: image
          ? `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}?id=${image.imgId}`
          : '',
        desc: image ? reqBody.name : '',
      },
      password: hash,
    }

    const { insertedId } = await db.collection('users').insertOne(newUser)

    return NextResponse.json(
      {
        status: 201,
        newUser: { id: insertedId, ...newUser },
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
