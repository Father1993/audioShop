import { IAddToCartBtnProps } from '@/types/goods'

const AddToCartBtn = ({ text, className }: IAddToCartBtnProps) => (
  <button className={`btn-reset ${className}`}>{text}</button>
)

export default AddToCartBtn
