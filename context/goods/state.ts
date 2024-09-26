'use client'
import { Effect } from 'effector'
import { IProduct } from '@/types/common'
import { IProducts } from '@/types/goods'
import {
  setCurrentProduct,
  loadOneProductFx,
  loadProductsByFilterFx,
  goods,
  loadWatchedProductsFx,
  getBestsellerProductsFx,
  getNewProductsFx,
  loadProductBySearchFx,
  resetProductsBySearch,
} from '.'

const goodStoreInstance = (effect: Effect<void, [], Error>) =>
  goods
    .createStore([])
    .on(effect.done, (_, { result }) => result)
    .on(effect.fail, (_, { error }) => {
      console.log(error.message)
    })

export const $newProducts = goodStoreInstance(getNewProductsFx)
export const $bestsellerProducts = goodStoreInstance(getBestsellerProductsFx)

export const $currentProduct = goods
  .createStore<IProduct>({} as IProduct)
  .on(setCurrentProduct, (_, product) => product)
  .on(loadOneProductFx.done, (_, { result }) => result.productItem)

export const $products = goods
  .createStore<IProducts>({} as IProducts)
  .on(loadProductsByFilterFx.done, (_, { result }) => result)

export const $watchedProducts = goods
  .createStore<IProducts>({} as IProducts)
  .on(loadWatchedProductsFx.done, (_, { result }) => result)

export const $productsBySearch = goods
  .createStore<IProducts>({} as IProducts)
  .on(loadProductBySearchFx.done, (_, { result }) => result)
  .on(resetProductsBySearch, () => ({ count: 0, items: [] }))
