'use client'
import { IMagnitolaAddressData, IOrderDetailsValues } from '@/types/order'
import {
  getMagnitolaOfficesByCityFx,
  order,
  setCashPaymentTb,
  setChosenCourierAddressData,
  setChosenPickupAddressData,
  setCourierAddressData,
  setCourierTab,
  setMapInstance,
  setOnlinePaymentTb,
  setOrderDetailsValues,
  setPickupTab,
  setScrollToRequiredBlock,
  setShouldLoadMagnitolaData,
  setShouldShowCourierAddressData,
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

export const $shouldShowCourierAddressData = order
  .createStore(false)
  .on(setShouldShowCourierAddressData, (_, value) => value)

export const $courierAddressData = order
  .createStore<IMagnitolaAddressData>({} as IMagnitolaAddressData)
  .on(setCourierAddressData, (_, value) => value)

export const $onlinePaymentTab = order
  .createStore<boolean>(true)
  .on(setOnlinePaymentTb, (_, value) => value)

export const $cashPaymentTab = order
  .createStore<boolean>(false)
  .on(setCashPaymentTb, (_, value) => value)

export const $scrollToRequiredBlock = order
  .createStore<boolean>(false)
  .on(setScrollToRequiredBlock, (_, value) => value)

export const $orderDetailsValues = order
  .createStore<IOrderDetailsValues>({} as IOrderDetailsValues)
  .on(setOrderDetailsValues, (_, value) => value)
