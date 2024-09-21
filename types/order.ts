import { ICartItem } from './cart'

export interface IOrderTitleProps {
  orderNumber: string
  text: string
}

export interface IOrderCartItemProps {
  item: ICartItem
  position: number
}

export interface IGetMagnitolaOfficeByCityFx {
  city: string
  lang: string
}

export interface IMagnitolaAddressData {
  address_line1: string
  address_line2: string
  city: string
  place_id: string
  bbox: {
    lon1: number
    lat1: number
    lon2: number
    lat2: number
  }
  lat: number
  lon: number
}
