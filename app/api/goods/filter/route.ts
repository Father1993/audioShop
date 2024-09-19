import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import { getDbAndReqBody } from '@/lib/utils/api-routes'
import { checkPriceParam, getCheckedArrayParam } from '@/lib/utils/common'

export async function GET(req: Request) {
  try {
    const { db } = await getDbAndReqBody(clientPromise, null)
    const url = new URL(req.url)
    const limit = url.searchParams.get('limit') || 12
    const offset = url.searchParams.get('offset') || 0
    const isCatalogParam = url.searchParams.get('catalog')
    const typeParam = url.searchParams.get('type')
    const categoryParam = url.searchParams.get('category')
    const priceFromParam = url.searchParams.get('priceFrom')
    const priceToParam = url.searchParams.get('priceTo')
    const sizesParam = url.searchParams.get('sizes')
    const colorsParam = url.searchParams.get('colors')
    const isFullPriceRange =
      priceFromParam &&
      priceToParam &&
      checkPriceParam(+priceFromParam) &&
      checkPriceParam(+priceToParam)
    const sizesArr = getCheckedArrayParam(sizesParam as string)
    const colorsArr = getCheckedArrayParam(colorsParam as string)
    const filter = {
      ...(typeParam && { type: typeParam }),
      ...(isFullPriceRange && {
        price: { $gt: +priceFromParam, $lt: +priceToParam },
      }),
      ...(sizesArr && {
        $or: (sizesArr as string[]).map((sizes) => ({
          ['sizes']: sizes.toLowerCase(),
        })),
      }),
      ...(colorsArr && {
        $or: (colorsArr as string[]).map((color) => ({
          ['characteristics.color']: color.toLowerCase(),
        })),
      }),
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
