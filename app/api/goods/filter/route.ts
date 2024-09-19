import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import { getDbAndReqBody } from '@/lib/utils/api-routes'

export async function GET(req: Request) {
  try {
    const { db } = await getDbAndReqBody(clientPromise, null)
    const url = new URL(req.url)
    const limit = url.searchParams.get('limit') || 12
    const offset = url.searchParams.get('offset') || 0
    const isCatalogParam = url.searchParams.get('catalog')
    const typeParam = url.searchParams.get('type')
    const categoryParam = url.searchParams.get('category')
    const filter = {
      ...(typeParam && { type: typeParam }),
    }

    if (isCatalogParam) {
      const getFilteredCollection = async (collection: string) => {
        const goods = await db.collection(collection).find(filter).toArray()

        return goods
      }

      const [audio, subwoofers, speakers, accessories] =
        await Promise.allSettled([
          getFilteredCollection('audio'),
          getFilteredCollection('subwoofers'),
          getFilteredCollection('speakers'),
          getFilteredCollection('accessories'),
        ])

      if (
        audio.status !== 'fulfilled' ||
        subwoofers.status !== 'fulfilled' ||
        speakers.status !== 'fulfilled' ||
        accessories.status !== 'fulfilled'
      ) {
        return NextResponse.json({
          count: 0,
          items: [],
        })
      }

      const allGoods = [
        ...audio.value,
        ...subwoofers.value,
        ...speakers.value,
        ...accessories.value,
      ]

      return NextResponse.json({
        count: allGoods.length,
        items: allGoods.slice(+offset, +limit),
      })
    }

    const currentGoods = await db
      .collection(categoryParam as string)
      .find(filter)
      .toArray()

    return NextResponse.json({
      count: currentGoods.length,
      items: currentGoods.slice(+offset, +limit),
    })
  } catch (error) {
    throw new Error((error as Error).message)
  }
}
