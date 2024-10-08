import axios from 'axios'
import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import { getAuthRouteData } from '@/lib/utils/api-routes'

export async function POST(req: Request) {
  const yKassaId = process.env.NEXT_PUBLIC_YKASSA_ID as string
  const yKassaApiKey = process.env.NEXT_PUBLIC_YKASSA_API_KEY as string
  const redirectURl = 'https://magitola.netlify.app/payment-success'

  try {
    const { validatedTokenResult, reqBody } = await getAuthRouteData(
      clientPromise,
      req
    )

    if (validatedTokenResult.status !== 200) {
      return NextResponse.json(validatedTokenResult)
    }

    const { data } = await axios({
      method: 'post',
      url: 'https://api.yookassa.ru/v3/payments',
      headers: {
        'Content-Type': 'application/json',
        'Idempotence-Key': Date.now(),
      },
      auth: {
        username: yKassaId,
        password: yKassaApiKey,
      },
      data: {
        amount: {
          value: reqBody.amount,
          currency: 'RUB',
        },
        confirmation: {
          type: 'redirect',
          return_url: redirectURl,
        },
        capture: true,
        description: reqBody.description,
        metadata: reqBody.metadata,
      },
    })

    return NextResponse.json({ result: data })
  } catch (error) {
    throw new Error((error as Error).message)
  }
}
