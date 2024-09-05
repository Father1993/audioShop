/* eslint-disable indent */
import toast from 'react-hot-toast'
import { ICartItem } from '@/types/cart'
import { IProduct } from '@/types/common'
import { handleShowSizeTable, idGenerator, isUserAuth } from './common'
import { addProductToCart, setCartFromLS } from '@/context/cart'
import { productWithoutSizes } from '@/constants/products'

export const addItemToCart = (
  product: IProduct,
  setSpinner: (arg0: boolean) => void,
  count: number,
  selectedSize = ''
) => {
  if (!isUserAuth()) {
    addCartItemToLS(product, selectedSize, count)
    return
  }

  const auth = JSON.parse(localStorage.getItem('auth') as string)

  const clientId = addCartItemToLS(product, selectedSize, count, false)
  addProductToCart({
    jwt: auth.accessToken,
    setSpinner,
    productId: product._id,
    category: product.category,
    count,
    size: selectedSize,
    clientId,
  })
}

export const addCartItemToLS = (
  product: IProduct,
  selectedSize: string,
  count: number,
  withToast = true
) => {
  let cartFromLS: ICartItem[] = JSON.parse(
    localStorage.getItem('cart') as string
  )
  const clientId = idGenerator()

  if (!cartFromLS) {
    cartFromLS = []
  }

  const existingItem = cartFromLS.find(
    (item) => item.productId === product._id && item.size === selectedSize
  )

  if (existingItem) {
    const updateCountWithSize =
      existingItem.count !== count ? count : +existingItem.count + 1

    const updatedCart = cartFromLS.map((item) =>
      item.productId === existingItem.productId && item.size === selectedSize
        ? {
            ...existingItem,
            count: selectedSize.length
              ? updateCountWithSize
              : +existingItem.count + 1,
          }
        : item
    )

    localStorage.setItem('cart', JSON.stringify(updatedCart))
    setCartFromLS(updatedCart)
    toast.success('Добавлено в корзину')
    return existingItem.clientId
  }

  const cart = [
    ...cartFromLS,
    {
      clientId,
      productId: product._id,
      size: selectedSize,
      count,
      image: product.images[0],
      name: product.name,
      price: product.price,
      inStock: product.inStock,
      category: product.category,
      color: product.characteristics.color,
    },
  ]
  localStorage.setItem('cart', JSON.stringify(cart))
  setCartFromLS(cart as ICartItem[])
  withToast && toast.success('Добавлено в корзину')

  return clientId
}

export const addProductToCartBySizeTable = (
  product: IProduct,
  setSpinner: (arg0: boolean) => void,
  count: number,
  selectedSize = ''
) => {
  if (productWithoutSizes.includes(product.type)) {
    addItemToCart(product, setSpinner, count)
    return
  }

  if (selectedSize) {
    addItemToCart(product, setSpinner, count, selectedSize)
    return
  }

  handleShowSizeTable(product)
}

export const updateCartItemCountInLS = (cartItemId: string, count: number) => {
  let cart: ICartItem[] = JSON.parse(localStorage.getItem('cart') as string)

  if (!cart) {
    cart = []
  }

  const updateCart = cart.map((item) =>
    item.clientId === cartItemId ? { ...item, count } : item
  )

  localStorage.setItem('cart', JSON.stringify(updateCart))
  setCartFromLS(updateCart as ICartItem[])
}
