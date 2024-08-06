import clientPromise from '@/lib/mongodb'
import { getDbAndReqBody } from '@/lib/utils/api-routes'
import { shuffle } from '@/lib/utils/common'
import { Db } from 'mongodb'

export async function GET() {
  const { db } = await getDbAndReqBody(clientPromise, null)
}
