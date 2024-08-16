import { useState } from 'react'
import { useUnit } from 'effector-react'
import { $currentProduct } from '@/context/goods'

export const useCartAction = () => {
  const product = useUnit($currentProduct)
  const [selectedSize, setSelectedSize] = useState('')

  return { product, setSelectedSize, selectedSize }
}
