import Link from 'next/link'
import Image from 'next/image'
import { useCartItemAction } from '@/hooks/useCartItemAction'
import { ICartItem } from '@/types/cart'
import ProductCounter from '../../ProductListItem/ProductCounter'
import { formatPrice } from '@/lib/utils/common'
import DeleteItemBtn from '@/components/elements/DeleteItemBtn/DeleteItemBtn'

const CartPopupItem = ({ item }: { item: ICartItem }) => {
  const {
    deleteSpinner,
    increasePriceWithAnimation,
    decreasePriceWithAnimation,
    count,
    setCount,
    animatedPrice,
    handleDeleteCartItem,
  } = useCartItemAction(item)
  return (
    <>
      <DeleteItemBtn
        btnDisabled={deleteSpinner}
        callback={handleDeleteCartItem}
      />
      <div className='cart-list__item__img'>
        <Image src={item.image} alt={item.name} width={96} height={96} />
      </div>
      <div className='cart-list__item__inner'>
        <Link
          href={`/catalog/${item.category}/${item.productId}`}
          className='cart-list__item__title'
        >
          <span>
            {item.name.replace('.', '')}
            {item.size ? ', ' : ''}
          </span>
          <span>{item.size.toLocaleLowerCase()}</span>
        </Link>
        <div className='cart-list__item__bottom'>
          <ProductCounter
            className='cart-list__item__counter'
            count={count}
            setCount={setCount}
            increasePrice={increasePriceWithAnimation}
            decreasePrice={decreasePriceWithAnimation}
            cartItem={item}
            updateCountAsync
          />
          <span className='cart-list__item__price'>
            {formatPrice(animatedPrice)}
          </span>
        </div>
      </div>
    </>
  )
}

export default CartPopupItem
