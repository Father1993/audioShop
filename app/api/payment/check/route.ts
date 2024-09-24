import axios from 'axios'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const yKassaId = process.env.NEXT_PUBLIC_YKASSA_ID as string
  const yKassaApiKey = process.env.NEXT_PUBLIC_YKASSA_API_KEY as string

  try {
    const reqBody = await req.json()

    const { data } = await axios({
      method: 'get',
      url: `https://api.yookassa.ru/v3/payments/${reqBody.paymentId}`,
      auth: {
        username: yKassaId,
        password: yKassaApiKey,
      },
    })

    return NextResponse.json({ result: data })
  } catch (error) {
    throw new Error((error as Error).message)
  }
}
