export interface ICartItem {
  _id: string
  clientId: string
  userId: string
  productId: string
  image: string
  name: string
  size: string
  count: string | number
  price: string
  totalPrice: string
  inStock: string
  color: string
  category: string
}

export interface IAddProductToCartFx {
  productId: string
  category: string
  size: string
  count: number
  jwt: string
  clientId: string
  setSpinner: (arg0: boolean) => void
}
