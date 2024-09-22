'use client'
import { IMagnitolaAddressData } from '@/types/order'
import {
  getMagnitolaOfficesByCityFx,
  order,
  setChosenCourierAddressData,
  setChosenPickupAddressData,
  setCourierTab,
  setMapInstance,
  setPickupTab,
  setShouldLoadMagnitolaData,
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

export const $mapInstance = order
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  .createStore<any>({})
  .on(setMapInstance, (_, map) => map)

export const $shouldLoadMagnitolaData = order
  .createStore(false)
  .on(setShouldLoadMagnitolaData, (_, value) => value)

export const $chosenPickupAddressData = order
  .createStore<Partial<IMagnitolaAddressData>>({})
  .on(setChosenPickupAddressData, (_, value) => value)

export const $chosenCourierAddressData = order
  .createStore<Partial<IMagnitolaAddressData>>({})
  .on(setChosenCourierAddressData, (_, value) => value)
