import { useMemo, useState } from 'react'
import { useUnit } from 'effector-react'
import { useGoodsByAuth } from './useGoodsByAuth'
import { isUserAuth } from '@/lib/utils/common'
import {
  addCartItemToLS,
  addItemToCart,
  addProductToCartBySizeTable,
} from '@/lib/utils/cart'
import { $currentProduct } from '@/context/goods/state'
import { updateCartItemCount } from '@/context/cart'
import { $cart, $cartFromLs } from '@/context/cart/state'

export const useCartAction = (isSizeTable = false) => {
  const product = useUnit($currentProduct)
  const [selectedSize, setSelectedSize] = useState('')
  const currentCartByAuth = useGoodsByAuth($cart, $cartFromLs)
  const currentCartItems = currentCartByAuth.filter(
    (item) => item.productId === product._id
  )
  const cartItemBySize = currentCartItems.find(
    (item) => item.size === selectedSize
  )
  const existingItem = currentCartByAuth.find(
    (item) => item.productId === product._id && item.size === selectedSize
  )
  const [addToCartSpinner, setAddToCartSpinner] = useState(false)
  const [updateCountSpinner, setUpdateCountSpinner] = useState(false)
  const [count, setCount] = useState(+(existingItem?.count as string) || 1)

  const handleAddToCart = (countFromCounter?: number) => {
    if (!product.sizes || Object.keys(product.sizes).length === 0) {
      // Товар без размеров, добавляем напрямую
      addItemToCart(product, setAddToCartSpinner, countFromCounter || 1)
      return
    }
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

      addCartItemToLS(product, selectedSize, countFromCounter || 1)
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

  const allCurrentCartItemCount = useMemo(
    () => currentCartItems.reduce((a, { count }) => a + +count, 0),
    [currentCartItems]
  )

  return {
    product,
    setSelectedSize,
    selectedSize,
    addToCartSpinner,
    currentCartItems,
    cartItemBySize,
    handleAddToCart,
    count,
    setCount,
    existingItem,
    currentCartByAuth,
    setAddToCartSpinner,
    updateCountSpinner,
    allCurrentCartItemCount,
  }
}
