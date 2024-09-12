import { createDomain, sample } from 'effector'
import { addProductToFavoriteFx, getFavoriteItemsFx } from '@/api/favorites'
import { IAddProductToCartFx } from '@/types/cart'
import { IFavoriteItem } from '@/types/favorites'

const favorites = createDomain()

export const addProductToFavorites =
  favorites.createEvent<Omit<IAddProductToCartFx, 'count'>>()
export const loadFavoriteItems = favorites.createEvent<{ jwt: string }>()
export const setFavoritesFromLS = favorites.createEvent<IFavoriteItem[]>()

export const $favorites = favorites
  .createStore<IFavoriteItem[]>([])
  .on(getFavoriteItemsFx.done, (_, { result }) => result)
  .on(addProductToFavoriteFx.done, (cart, { result }) => [
    ...new Map(
      [...cart, result.newCartItem].map((item) => [item.clientId, item])
    ).values(),
  ])

export const $favoritesFormLS = favorites
  .createStore<IFavoriteItem[]>([])
  .on(setFavoritesFromLS, (_, favorites) => favorites)

sample({
  clock: addProductToFavorites,
  source: $favorites,
  fn: (_, data) => data,
  target: addProductToFavoriteFx,
})

sample({
  clock: loadFavoriteItems,
  source: $favorites,
  fn: (_, data) => data,
  target: getFavoriteItemsFx,
})
