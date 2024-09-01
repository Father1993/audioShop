import { createDomain, sample } from 'effector'
import {
  IAddProductsFromLSToCartFx,
  IAddProductToCartFx,
  ICartItem,
} from '@/types/cart'
import { addProductsFromLSToCartFx, addProductToCartFx } from '@/api/cart'

const cart = createDomain()

export const loadCartItems = cart.createEvent<{ jwt: string }>()
export const setCartFromLS = cart.createEvent<ICartItem[]>()
export const addProductToCart = cart.createEvent<IAddProductToCartFx>()
export const addProductsFromLSToCart =
  cart.createEvent<IAddProductsFromLSToCartFx>()

export const $cart = cart
  .createStore<ICartItem[]>([])
  .on(addProductsFromLSToCartFx.done, (_, { result }) => result.items)

export const $cartFromLs = cart
  .createStore<ICartItem[]>([])
  .on(setCartFromLS, (_, cart) => cart)

sample({
  clock: addProductToCart,
  source: $cart,
  fn: (_, data) => data,
  target: addProductToCartFx,
})

sample({
  clock: addProductsFromLSToCart,
  source: $cart,
  fn: (_, data) => data,
  target: addProductsFromLSToCartFx,
})
