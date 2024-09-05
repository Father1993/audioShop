import { useState } from 'react'
import { useUnit } from 'effector-react'
import { $currentProduct } from '@/context/goods'
import { useCartByAuth } from './useCartByAuth'
import { isItemInList, isUserAuth } from '@/lib/utils/common'
import {
  addCartItemToLS,
  addItemToCart,
  addProductToCartBySizeTable,
} from '@/lib/utils/cart'
import { updateCartItemCount } from '@/context/cart'

export const useCartAction = (isSizeTable = false) => {
  const product = useUnit($currentProduct)
  const [selectedSize, setSelectedSize] = useState('')
  const currentCartByAuth = useCartByAuth()
  const currentCartItems = currentCartByAuth.filter(
    (item) => item.productId === product._id
  )
  const cartItemBySize = currentCartItems.find(
    (item) => item.size === selectedSize
  )
  const existingItem = currentCartByAuth.find(
    (item) => item.productId === product._id && item.size === selectedSize
  )
  const isProductInCart = isItemInList(currentCartByAuth, product._id)
  const [addToCartSpinner, setAddToCartSpinner] = useState(false)
  const [updateCountSpinner, setUpdateCountSpinner] = useState(false)

  const handleAddToCart = (countFromCounter?: number) => {
    if (existingItem) {
      if (!isUserAuth()) {
        addCartItemToLS(product, selectedSize, countFromCounter || 1)
        return
      }

      const auth = JSON.parse(localStorage.getItem('auth') as string)
      const updateCountWithSize = !!countFromCounter
        ? +existingItem.count !== countFromCounter
          ? countFromCounter
          : +existingItem.count + 1
        : +existingItem.count + 1

      updateCartItemCount({
        jwt: auth.accessToken,
        id: existingItem._id as string,
        setSpinner: setUpdateCountSpinner,
        count: selectedSize.length
          ? updateCountWithSize
          : +existingItem.count + 1,
      })

      addCartItemToLS(product, selectedSize, count)
      return
    }

    if (isSizeTable) {
      addItemToCart(
        product,
        setAddToCartSpinner,
        countFromCounter || 1,
        selectedSize
      )
      return
    }

    addProductToCartBySizeTable(
      product,
      setAddToCartSpinner,
      countFromCounter || 1,
      selectedSize
    )
  }

  return {
    product,
    setSelectedSize,
    selectedSize,
    addToCartSpinner,
    currentCartItems,
    cartItemBySize,
    handleAddToCart,
    isProductInCart,
    currentCartByAuth,
    setAddToCartSpinner,
    updateCountSpinner,
  }
}
