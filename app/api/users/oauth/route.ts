import clientPromise from '@/lib/mongodb'
import { NextResponse } from 'next/server'
import {
  createUserAndGenerateTokens,
  findUserByEmail,
  generateTokens,
  getDbAndReqBody,
} from '@/lib/utils/api-routes'

export async function POST(req: Request) {
  const { db, reqBody } = await getDbAndReqBody(clientPromise, req)
  const user = await findUserByEmail(db, reqBody.email)

  if (!user) {
    const tokens = await createUserAndGenerateTokens(db, reqBody)

    return NextResponse.json(tokens)
  }

  const tokens = generateTokens(user.name, reqBody.email)

  return NextResponse.json(tokens)
}
