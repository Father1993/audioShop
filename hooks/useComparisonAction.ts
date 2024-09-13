import { useState } from 'react'
import toast from 'react-hot-toast'
import { IProduct } from '@/types/common'
import { useGoodsByAuth } from './useGoodsByAuth'
import {
  $comparison,
  $comparisonFromLs,
  addProductToComparison,
} from '@/context/comparison'
import { isUserAuth } from '@/lib/utils/common'
import { addComparisonItemToLS } from '@/lib/utils/comparison'

export const useComparisonAction = (product: IProduct) => {
  const [addToComparisonSpinner, setAddToComparisonSpinner] = useState(false)
  const currentComparisonByAuth = useGoodsByAuth($comparison, $comparisonFromLs)
  const isProductInComparison = currentComparisonByAuth.some(
    (item) => item.productId === product._id
  )

  const handleAddToComparison = () => {
    if (!isUserAuth()) {
      addComparisonItemToLS(product)
      return
    }

    if (isProductInComparison) {
      toast.success('Добавлено в сравнение!')
      return
    }

    const auth = JSON.parse(localStorage.getItem('auth') as string)
    const clientId = addComparisonItemToLS(product, false)

    addProductToComparison({
      jwt: auth.accessToken,
      productId: product._id,
      setSpinner: setAddToComparisonSpinner,
      category: product.category,
      clientId,
    })
  }

  return {
    handleAddToComparison,
    addToComparisonSpinner,
    isProductInComparison,
  }
}
