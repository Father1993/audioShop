'use client'
import { createDomain } from 'effector'
import toast from 'react-hot-toast'
import {
  IGetMagnitolaOfficeByCityFx,
  IMagnitolaAddressData,
} from '@/types/order'
import api from '@/api/apiInstance'

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
