/* eslint-disable max-len */
import Image from 'next/image'
import { useCartItemAction } from '@/hooks/useCartItemAction'
import { ICartItem } from '@/types/cart'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { formatPrice } from '@/lib/utils/common'
import ProductCounter from '../ProductListItem/ProductCounter'
import styles from '@/styles/cart-page/index.module.scss'

const CartListItem = ({ item }: { item: ICartItem }) => {
  const {
    count,
    deleteSpinner,
    increasePriceWithAnimation,
    decreasePriceWithAnimation,
    animatedPrice,
    setCount,
    handleDeleteCartItem,
  } = useCartItemAction(item)

  const isMedia530 = useMediaQuery(530)
  const imageSize = isMedia530 ? 132 : 160
  return (
    <>
      <button
        disabled={deleteSpinner}
        onClick={handleDeleteCartItem}
        className={`btn-reset ${styles.cart__list__item__delete}`}
      >
        <span />
      </button>
      <div
        className={`${styles.cart__list__item__img}} ${styles.cart__list__item__block}`}
      >
        <Image
          src={item.image}
          alt={item.name}
          width={imageSize}
          height={imageSize}
        />
      </div>

      <div className={styles.cart__list__item__wrapper}>
        <div
          className={`${styles.cart__list__item__name} ${styles.cart__list__item__block}`}
        >
          {item.name}
        </div>
        <div
          className={`${styles.cart__list__item__size} ${styles.cart__list__item__block}`}
        >
          Размер: {item.size.toUpperCase()}
        </div>
      </div>
      <div className={styles.cart__list__item__inner}>
        <div
          className={`${styles.cart__list__item__initial} ${styles.cart__list__item__inner__block}`}
        >
          <span className={`${styles.cart__list__item__price}`}>
            {formatPrice(+item.price)} ₽
          </span>
          <span className={styles.cart__list__item__initial__text}>
            Цена за 1 шт.
          </span>
        </div>
        <ProductCounter
          className={`cart-list__item__counter ${styles.cart__list__item__counter} ${styles.cart__list__item__inner__block}`}
          count={count}
          setCount={setCount}
          increasePrice={increasePriceWithAnimation}
          decreasePrice={decreasePriceWithAnimation}
          cartItem={item}
          updateCountAsync
        />
        <div
          className={`${styles.cart__list__item__price} ${styles.cart__list__item__inner__block}`}
        >
          {formatPrice(animatedPrice)} ₽
        </div>
      </div>
    </>
  )
}

export default CartListItem
