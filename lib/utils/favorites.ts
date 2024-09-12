import toast from 'react-hot-toast'
import { IProduct } from '@/types/common'
import { IFavoriteItem } from '@/types/favorites'
import { idGenerator } from './common'
import { setFavoritesFromLS } from '@/context/favorites'

export const addToFavoriteItemsToLS = (
  product: IProduct,
  selectedSize?: string,
  withToast = true
) => {
  let favoritesFormLS: IFavoriteItem[] = JSON.parse(
    localStorage.getItem('favorites') as string
  )

  const clientId = idGenerator()

  if (!favoritesFormLS) {
    favoritesFormLS = []
  }

  const existingItem = favoritesFormLS.find(
    (item) =>
      item.productId === product._id &&
      (!selectedSize || item.size === selectedSize)
  )

  if (existingItem) {
    toast.success('Добавлено в избранное!')
    return existingItem.clientId
  }

  const favorites = [
    ...favoritesFormLS,
    {
      clientId,
      productId: product._id,
      size: selectedSize || '',
      image: product.images[0],
      name: product.name,
      price: product.price,
      inStock: product.inStock,
      category: product.category,
      type: product.type,
    },
  ]

  localStorage.setItem('favorites', JSON.stringify(favorites))
  setFavoritesFromLS(favorites as IFavoriteItem[])
  withToast && toast.success('Добавлено в избранное')

  return clientId
}
