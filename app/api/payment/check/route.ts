import axios from 'axios'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  // TODO need use .env ID and ApiKey and redirectURL
  // const yKassaId = process.env.NEXT_PUBLIC_YKASSA_ID
  // const yKassaApiKey = process.env.NEXT_PUBLIC_YKASSA_API_KEY
  const yKassaId = '463038'
  const yKassaApiKey = 'test_qZsyT2MRjif4NNVDkjfBCe43MQO4Mcca-BwPMEitqSo'

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
