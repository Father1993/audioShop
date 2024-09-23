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
  bbox: IAddressBBox
  lat: number
  lon: number
}

export interface ITabControlProps {
  handleTab1: VoidFunction
  handleTab2: VoidFunction
  tab1Active: boolean
  tab2Active: boolean
  tab1Text: string
  tab2Text: string
}

export interface IAddressPosition {
  lat: number
  lon: number
}
export interface IAddressBBox {
  lon1: number
  lat1: number
  lon2: number
  lat2: number
}

export interface IPickupAddressItemsProps {
  addressItem: IMagnitolaAddressData
  handleSelectAddress: (arg0: IAddressBBox, arg1: IAddressPosition) => void
  handleChosenAddressData: (arg0: Partial<IMagnitolaAddressData>) => void
}

export interface IAddressesListProps {
  listClassName: string
  handleSelectAddressByMarkers?: (
    arg0: IAddressBBox,
    agr1: IAddressPosition,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    arg2?: any
  ) => void
}