'use client'
import { createDomain, createEffect } from 'effector'
import toast from 'react-hot-toast'
import {
  IGetMagnitolaOfficeByCityFx,
  IMagnitolaAddressData,
  IMakePaymentFx,
  IOrderCourierData,
  IOrderDetailsValues,
  IPaymentNotifyFx,
} from '@/types/order'
import api from '@/api/apiInstance'
import { handleJWTError } from '@/lib/utils/errors'

export const order = createDomain()
export const setPickupTab = order.createEvent<boolean>()
export const setCourierTab = order.createEvent<boolean>()
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const setMapInstance = order.createEvent<any>()
export const setShouldLoadMagnitolaData = order.createEvent<boolean>()
export const setChosenPickupAddressData =
  order.createEvent<Partial<IMagnitolaAddressData>>()
export const setShouldShowCourierAddressData = order.createEvent<boolean>()
export const setChosenCourierAddressData =
  order.createEvent<Partial<IMagnitolaAddressData>>()
export const setCourierAddressData = order.createEvent<IMagnitolaAddressData>()
export const setOnlinePaymentTb = order.createEvent<boolean>()
export const setCashPaymentTb = order.createEvent<boolean>()
export const makePayment = order.createEvent<IMakePaymentFx>()
export const setOrderDetailsValues = order.createEvent<IOrderDetailsValues>()

export const getMagnitolaOfficeByCity =
  order.createEvent<IGetMagnitolaOfficeByCityFx>()

export const getMagnitolaOfficesByCityFx = order.createEffect(
  async ({ city, lang }: IGetMagnitolaOfficeByCityFx) => {
    try {
      const apiKey = process.env.NEXT_PUBLIC_GEOAPIFY_API_KEY
      const baseUrl = `https://api.geoapify.com/v1/geocode/search?format=json&apiKey=${apiKey}`
      const { data } = await api.get(`${baseUrl}&text=${city}&lant=${lang}`)
      const magnitolaData = await api.get(
        `${baseUrl}&text=магнитола&filter=place:${data.results[0].place_id}`
      )

      return magnitolaData.data.results
    } catch (error) {
      toast.error((error as Error).message)
    }
  }
)

export const makePaymentFx = order.createEffect(
  async ({ amount, description, jwt, metadata }: IMakePaymentFx) => {
    try {
      const { data } = await api.post(
        '/api/payment',
        { amount, description, metadata },
        {
          headers: { Authorization: `Bearer ${jwt}` },
        }
      )

      if (data?.error) {
        handleJWTError(data.error.name, {
          repeatRequestMethodName: 'makePaymentFx',
          payload: { amount, description },
        })
      }

      localStorage.setItem('paymentId', JSON.stringify(data.result.id))
      window.location.href = data.result.confirmation.confirmation_url
    } catch (error) {
      toast.error((error as Error).message)
    }
  }
)

export const checkPaymentFx = order.createEffect(
  async ({ paymentId }: { paymentId: string }) => {
    try {
      const { data } = await api.post(`/api/payment/check`, { paymentId })

      return data
    } catch (error) {
      toast.error((error as Error).message)
    }
  }
)

export const paymentNotifyFx = order.createEffect(
  async ({ message, email }: IPaymentNotifyFx) => {
    try {
      const { data } = await api.post(`/api/payment/notify`, { message, email })

      return data
    } catch (error) {
      toast.error((error as Error).message)
    }
  }
)

export const sendOrderNotificationsFx = createEffect(
  async ({ orderData, customerEmail, adminEmail }: IOrderCourierData) => {
    const { data } = await api.post('/api/send-order', {
      orderData,
      customerEmail,
      adminEmail,
    })
    return data
  }
)
