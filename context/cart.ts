import { createDomain } from 'effector'
import { ICartItem } from '@/types/cart'

const cart = createDomain()

export const loadCartItems = cart.createEvent<{ jwt: string }>()
export const setCartFromLS = cart.createEvent<ICartItem[]>()

export const $cart = cart.createStore<ICartItem[]>([])

export const $cartFromLs = cart
  .createStore<ICartItem[]>([])
  .on(setCartFromLS, (_, cart) => cart)
