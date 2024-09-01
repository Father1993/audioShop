import { ICartItem } from './cart'

export interface ILoadOneProductFx {
  productId: string
  category: string
}

export interface IProductSizesItemProps {
  currentSize: [string, boolean]
  selectedSize: string
  setSelectedSize: (arg0: string) => void
  currentCartItems: []
}

export interface IProductCounterProps {
  className: string
  count: number
}

export interface IAddToCartBtnProps {
  handleAddToCart: VoidFunction
  addToCartSpinner: boolean
  text: string
  btnDisabled?: boolean
  minWidth?: number
  className?: string
}

export interface IProductCountBySizeProps {
  products: ICartItem[]
  size: string
  withCartIcon?: boolean
}
