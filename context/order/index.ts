import { createDomain } from 'effector'
import toast from 'react-hot-toast'
import { IGetMagnitolaOfficeByCityFx } from '@/types/order'
import api from '@/api/apiInstance'

export const order = createDomain()
export const setPickupTab = order.createEvent<boolean>()
export const setCourierTab = order.createEvent<boolean>()

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
