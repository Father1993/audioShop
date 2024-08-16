import { IProductCounterProps } from '@/types/goods'

const ProductCounter = ({ className, count }: IProductCounterProps) => {
  return (
    <div className={className}>
      <button className='btn-reset' />
      <span>{count}</span>
      <button className='btn-reset' />
    </div>
  )
}

export default ProductCounter
