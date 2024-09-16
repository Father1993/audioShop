import { notFound } from 'next/navigation'
import { productCategories } from '@/constants/product'

export default function Category({ params }: { params: { category: string } }) {
  if (!productCategories.includes(params.category)) {
    notFound()
  }
  return <h1>{params.category}</h1>
}
