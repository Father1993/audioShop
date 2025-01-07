import { corsHeaders } from '@/constants/corsHeaders'
import { MongoClient } from 'mongodb'
import { NextResponse } from 'next/server'
import { getDbAndReqBody } from './api-routes'

export const getFilteredCollection = async (
  collection: string,
  clientPromise: Promise<MongoClient>,
  req: Request
) => {
  const { db } = await getDbAndReqBody(clientPromise, null)
  const url = new URL(req.url)
  const rangeParam = url.searchParams.get('range') || JSON.stringify([0, 4])
  const sortParam =
    url.searchParams.get('sort') || JSON.stringify(['name', 'ASC'])
  const range = JSON.parse(rangeParam)
  const sort = JSON.parse(sortParam)

  const goods = await db
    .collection(collection)
    .find()
    .sort({
      [sort[0] === 'id' ? '_id' : sort[0]]: sort[1] === 'ASC' ? 1 : -1,
    })
    .toArray()

  return NextResponse.json(
    {
      count: goods.length,
      items: goods
        .slice(range[0], range[1])
        .map((item) => ({ ...item, id: item._id })),
    },
    corsHeaders
  )
}
