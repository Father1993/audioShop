import clientPromise from '@/lib/mongodb'
import { getDataFormDBByCollection } from '@/lib/utils/api-routes'

export async function GET(req: Request) {
  try {
    return getDataFormDBByCollection(clientPromise, req, 'comparison')
  } catch (error) {
    throw new Error((error as Error).message)
  }
}
