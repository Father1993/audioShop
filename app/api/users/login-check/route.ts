import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import {
  findUserByEmail,
  getAuthRouteData,
  parseJwt,
} from '@/lib/utils/api-routes'

export async function GET(req: Request) {
  try {
    const { db, validatedTokenResult, token } = await getAuthRouteData(
      clientPromise,
      req,
      false
    )
    if (validatedTokenResult.status !== 200) {
      return NextResponse.json(validatedTokenResult)
    }

    const user = await findUserByEmail(db, parseJwt(token as string).email)
    return NextResponse.json({ status: 200, message: 'token is valid', user })
  } catch (error) {
    throw new Error((error as Error).message)
  }
}
