import { Db, MongoClient } from 'mongodb'
import { shuffle } from './common'

export const getDbAndReqBody = async (
  clientPromise: Promise<MongoClient>,
  req: Request | null
) => {
  const db = (await clientPromise).db(process.env.NEXT_PUBLIC_DB_NAME)

  if (req) {
    const reqBody = await req.json()
    return { db, reqBody }
  }

  return { db }
}

export const getNewAndBestsellerGoods = async (db: Db, fieldName: string) => {
  const audio = await db.collection('audio').find().toArray()
  const subwoofers = await db.collection('subwoofers').find().toArray()

  return shuffle([
    ...audio
      .filter(
        (item) =>
          item[fieldName] && Object.values(item.sizes).some((value) => value)
      )
      .slice(0, 2),
    ...subwoofers
      .filter(
        (item) =>
          item[fieldName] && Object.values(item.sizes).some((value) => value)
      )
      .slice(0, 2),
  ])
}
