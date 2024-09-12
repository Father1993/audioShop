import { useState } from 'react'
import { IProduct } from '@/types/common'
import toast from 'react-hot-toast'
import { useGoodsByAuth } from './useGoodsByAuth'
import {
  $favorites,
  $favoritesFormLS,
  addProductToFavorites,
  setIsAddToFavorites,
} from '@/context/favorites'
import { productWithoutSizes } from '@/constants/products'
import { handleShowSizeTable, isUserAuth } from '@/lib/utils/common'
import { addToFavoriteItemsToLS } from '@/lib/utils/favorites'

export const useFavoritesAction = (product: IProduct) => {
  const [addToFavoritesSpinner, setAddToFavoritesSpinner] = useState(false)

  const currentFavoritesByAuth = useGoodsByAuth($favorites, $favoritesFormLS)
  const existingItem = currentFavoritesByAuth.find(
    (item) => item.productId === product._id
  )

  const handleAddProductToFavorites = () => {
    if (productWithoutSizes.includes(product.type)) {
      if (existingItem) {
        toast.success('Добавлено в избранное!')
        return
      }

      if (!isUserAuth()) {
        addToFavoriteItemsToLS(product, '')
        return
      }

      const auth = JSON.parse(localStorage.getItem('auth') as string)
      const clientId = addToFavoriteItemsToLS(product, '', false)

      addProductToFavorites({
        jwt: auth.accessToken,
        productId: product._id,
        setSpinner: setAddToFavoritesSpinner,
        size: '',
        category: product.category,
        clientId,
      })
      return
    }

    setIsAddToFavorites(true)
    handleShowSizeTable(product)
  }

  return {
    handleAddProductToFavorites,
    addToFavoritesSpinner,
    setAddToFavoritesSpinner,
    isProductInFavorites: existingItem,
  }
}
