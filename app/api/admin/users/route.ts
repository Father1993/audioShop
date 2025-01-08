import clientPromise from '@/lib/mongodb'
import { getFilteredCollection } from '@/lib/utils/admin-routes'

export async function GET(req: Request) {
  try {
    return getFilteredCollection('users', clientPromise, req)
  } catch (error) {
    throw new Error((error as Error).message)
  }
}

export const dynamic = 'force-dynamic'
