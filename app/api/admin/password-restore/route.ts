import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import { getDbAndReqBody } from '@/lib/utils/api-routes'
import { corsHeaders } from '@/constants/corsHeaders'
import { sendMail } from '@/services/mailService'

export async function POST(req: Request) {
  try {
    const { reqBody } = await getDbAndReqBody(clientPromise, req)

    await sendMail(
      'Magnitola',
      reqBody.email,
      `Ссылка для сброса пароля: ${process.env.NEXT_PUBLIC_CLIENT_BASE_URL}/password-restore`
    )

    return NextResponse.json({ status: 200 }, corsHeaders)
  } catch (error) {
    throw new Error((error as Error).message)
  }
}

export async function OPTIONS() {
  return new NextResponse(null, { ...corsHeaders, status: 200 })
}
