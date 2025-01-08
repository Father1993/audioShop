import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import {
  findUserByEmail,
  getAuthRouteData,
  parseJwt,
} from '@/lib/utils/api-routes'
import { IUser } from '@/types/user'
import { corsHeaders } from '@/constants/corsHeaders'

export async function GET(req: Request) {
  try {
    const { db, validatedTokenResult, token } = await getAuthRouteData(
      clientPromise,
      req,
      false
    )
    if (validatedTokenResult.status !== 200) {
      return NextResponse.json(validatedTokenResult, corsHeaders)
    }

    const user = (await findUserByEmail(
      db,
      parseJwt(token as string).email
    )) as unknown as IUser
    return NextResponse.json(
      {
        status: 200,
        message: 'token is valid',
        user: {
          email: user.email,
          name: user.name,
          _id: user?._id,
          image: user?.image,
        },
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
