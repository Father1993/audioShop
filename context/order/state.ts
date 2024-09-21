import { IMagnitolaAddressData } from '@/types/order'
import {
  getMagnitolaOfficesByCityFx,
  order,
  setCourierTab,
  setPickupTab,
} from '.'

export const $magnitolaDataByCity = order
  .createStore<IMagnitolaAddressData[]>([])
  .on(getMagnitolaOfficesByCityFx.done, (_, { result }) => result)

export const $pickupTab = order
  .createStore<boolean>(true)
  .on(setPickupTab, (_, value) => value)

export const $courierTab = order
  .createStore<boolean>(false)
  .on(setCourierTab, (_, value) => value)
