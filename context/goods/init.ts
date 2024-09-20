import { sample } from 'effector'
import {
  loadOneProduct,
  loadOneProductFx,
  loadProductsByFilter,
  loadProductsByFilterFx,
  loadWatchedProducts,
  loadWatchedProductsFx,
} from '.'
import { $currentProduct, $products, $watchedProducts } from './state'

sample({
  clock: loadOneProduct,
  source: $currentProduct,
  fn: (_, data) => data,
  target: loadOneProductFx,
})

sample({
  clock: loadProductsByFilter,
  source: $products,
  fn: (_, data) => data,
  target: loadProductsByFilterFx,
})

sample({
  clock: loadWatchedProducts,
  source: $watchedProducts,
  fn: (_, data) => data,
  target: loadWatchedProductsFx,
})
