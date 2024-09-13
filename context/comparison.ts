import { createDomain, createEffect, sample } from 'effector'
import toast from 'react-hot-toast'
import {
  IAddProductsFromLSToComparisonFx,
  IAddProductToComparisonFx,
  IComparisonItem,
} from '@/types/comparison'
import { handleJWTError } from '@/lib/utils/errors'
import api from '../api/apiInstance'

export const addProductToComparisonFx = createEffect(
  async ({ jwt, setSpinner, ...payload }: IAddProductToComparisonFx) => {
    try {
      setSpinner(true)
      const { data } = await api.post('/api/comparison/add', payload, {
        headers: { Authorization: `Bearer ${jwt}` },
      })

      if (data?.error) {
        const newData: { newComparisonItem: IComparisonItem } =
          await handleJWTError(data.error.name, {
            repeatRequestMethodName: 'addProductToComparisonFx',
            payload: { ...payload, setSpinner },
          })
        return newData
      }
      console.log(data)

      toast.success('Добавлено в сравнение!')
      return data
    } catch (error) {
      toast.error((error as Error).message)
    } finally {
      setSpinner(false)
    }
  }
)

export const getComparisonItemsFx = createEffect(
  async ({ jwt }: { jwt: string }) => {
    try {
      const { data } = await api.get('/api/comparison/all', {
        headers: { Authorization: `Bearer ${jwt}` },
      })

      if (data?.error) {
        const newData: IComparisonItem[] = await handleJWTError(
          data.error.name,
          {
            repeatRequestMethodName: 'getComparisonItemsFx',
          }
        )
        return newData
      }

      return data
    } catch (error) {
      toast.error((error as Error).message)
    }
  }
)

export const addProductsFromLSToComparisonFx = createEffect(
  async ({ jwt, comparisonItems }: IAddProductsFromLSToComparisonFx) => {
    try {
      const { data } = await api.post(
        '/api/comparison/add-many',
        { items: comparisonItems },
        {
          headers: { Authorization: `Bearer ${jwt}` },
        }
      )

      if (data?.error) {
        const newData: { comparisonItems: IComparisonItem[] } =
          await handleJWTError(data.error.name, {
            repeatRequestMethodName: 'addProductsFromLSToComparisonFx',
            payload: { items: comparisonItems },
          })
        return newData
      }

      loadComparisonItems({ jwt })
      return data
    } catch (error) {
      toast.error((error as Error).message)
    }
  }
)

const comparison = createDomain()

export const loadComparisonItems = comparison.createEvent<{ jwt: string }>()
export const addProductToComparison =
  comparison.createEvent<IAddProductToComparisonFx>()
export const setComparisonFromLS = comparison.createEvent<IComparisonItem[]>()
export const setShouldShowEmptyComparison = comparison.createEvent<boolean>()
export const addProductsFromLSToComparison =
  comparison.createEvent<IAddProductsFromLSToComparisonFx>()

export const $comparison = comparison
  .createStore<IComparisonItem[]>([])
  .on(getComparisonItemsFx.done, (_, { result }) => result)
  .on(addProductToComparisonFx.done, (state, { result }) => [
    ...state,
    result.newComparisonItem,
  ])
  .on(addProductsFromLSToComparisonFx.done, (_, { result }) => result.items)

export const $comparisonFromLs = comparison
  .createStore<IComparisonItem[]>([])
  .on(setComparisonFromLS, (_, comparison) => comparison)

export const $shouldShowEmptyComparison = comparison
  .createStore(false)
  .on(setShouldShowEmptyComparison, (_, value) => value)

sample({
  clock: loadComparisonItems,
  source: $comparison,
  fn: (_, data) => data,
  target: getComparisonItemsFx,
})

sample({
  clock: addProductToComparison,
  source: $comparison,
  fn: (_, data) => data,
  target: addProductToComparisonFx,
})

sample({
  clock: addProductsFromLSToComparison,
  source: $comparison,
  fn: (_, data) => data,
  target: addProductsFromLSToComparisonFx,
})
