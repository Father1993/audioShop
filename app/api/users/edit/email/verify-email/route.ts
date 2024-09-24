import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import { getAuthRouteData, parseJwt } from '@/lib/utils/api-routes'
import { sendMail } from '@/services/mailService'

export async function POST(req: Request) {
  try {
    const { db, validatedTokenResult, reqBody, token } = await getAuthRouteData(
      clientPromise,
      req
    )

    if (validatedTokenResult.status !== 200) {
      return NextResponse.json(validatedTokenResult)
    }

    if (!reqBody.email) {
      return NextResponse.json({
        message: 'Email field is required',
        status: 400,
      })
    }

    const user = await db.collection('users').findOne({ email: reqBody.email })

    if (user) {
      return NextResponse.json({
        error: { message: 'Пользователь с таким email уже существует' },
      })
    }

    await sendMail(
      'Magnitola',
      reqBody.email,
      `Ваш код подтверждения для изменения почты: 123456`
    )

    const { insertedId } = await db.collection('codes').insertOne({
      code: 123456,
      oldEmail: parseJwt(token as string).email,
      newEmail: reqBody.email,
    })

    return NextResponse.json({ status: 200, codeId: insertedId })
  } catch (error) {
    throw new Error((error as Error).message)
  }
}
