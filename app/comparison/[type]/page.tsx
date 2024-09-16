'use client'
import { notFound } from 'next/navigation'
import ComparisonList from '@/components/modules/Comparison/ComparisonList'
import { productTypes } from '@/constants/product'
import { useComparisonItems } from '@/hooks/useComparisonItems'

export default function ComparisonType({
  params,
}: {
  params: { type: string }
}) {
  if (!productTypes.includes(params.type)) {
    notFound()
  }
  const { items } = useComparisonItems(params.type)

  return <ComparisonList items={items} />
}
