/* eslint-disable prettier/prettier */
import Image from 'next/image'
import { motion } from 'framer-motion'
import { IComparisonItem } from '@/types/comparison'
import { basePropsForMotion } from '@/constants/motion'
import AddToCartIcon from '@/components/elements/AddToCartIcon/AddToCartIcon'
import { isUserAuth } from '@/lib/utils/common'
import { productsWithoutSizes } from '@/constants/product'
import { addCartItemToLS } from '@/lib/utils/cart'
import { IProduct } from '@/types/common'
import { useMemo, useState } from 'react'
import { $cart, $cartFromLs, addProductToCart } from '@/context/cart'
import { loadOneProduct } from '@/context/goods'
import { useGoodsByAuth } from '@/hooks/useGoodsByAuth'
import styles from '@/styles/comparison/index.module.scss'
import DeleteItemBtn from '@/components/elements/DeleteItemBtn/DeleteItemBtn'

const ComparisonItem = ({ item }: { item: IComparisonItem }) => {
  const currentCartByAuth = useGoodsByAuth($cart, $cartFromLs)
  const [addToCartSpinner, setAddToCartSpinner] = useState(false)
  const [loadProductSpinner, setLoadProductSpinner] = useState(false)

  const isProductInCart = useMemo(
    () =>
      productsWithoutSizes.includes(item.characteristics.type)
        ? currentCartByAuth.find(
            (cartItem) => cartItem.productId === item.productId
          )
        : currentCartByAuth.find(
            (cartItem) =>
              cartItem.productId === item.productId &&
              Object.entries(item.sizes)
                .filter(([, value]) => value)
                .map(([key]) => key)
                .includes(cartItem.size)
          ),
    [currentCartByAuth, item.characteristics.type, item.productId, item.sizes]
  )

  const addToCart = () => {
    if (productsWithoutSizes.includes(item.characteristics.type)) {
      const product = {
        ...item,
        _id: item.productId,
        images: [item.image],
      } as unknown as IProduct

      if (!isUserAuth()) {
        addCartItemToLS(product, '', 1)
        return
      }

      const auth = JSON.parse(localStorage.getItem('auth') as string)
      const clientId = addCartItemToLS(product, '', 1, false)

      addProductToCart({
        jwt: auth.accessToken,
        setSpinner: setAddToCartSpinner,
        productId: item.productId,
        category: item.category,
        count: 1,
        size: '',
        clientId,
      })
      return
    }

    loadOneProduct({
      productId: item.productId,
      category: item.category,
      withShowingSizeTable: true,
      setSpinner: setLoadProductSpinner,
    })
  }

  return (
    <motion.li
      className={styles.comparison__list__item}
      {...basePropsForMotion}
    >
      <DeleteItemBtn
        btnDisabled={false}
        callback={() => ''}
        className={styles.comparison__list__item__delete}
      />
      <AddToCartIcon
        isProductInCart={false}
        addToCartSpinner={false}
        callback={() => ''}
        className={styles.comparison__list__item__cart}
        addedClassName={styles.comparison__list__item__cart_added}
      />
      <div className={styles.comparison__list__item__img}>
        <Image src={item.image} alt={item.name} width={160} height={160} />
      </div>
      <ul className={`list-reset ${styles.comparison__list__item__inner_list}`}>
        {Object.entries(item.characteristics).map(([key, value], i) => {
          let valueFromArray = null
          let valueByBool = null

          if (Array.isArray(value)) {
            valueFromArray = value.join(', ')
          }

          if (typeof value == 'boolean') {
            if (value) {
              valueByBool = 'Есть'
            } else {
              valueByBool = 'Нет'
            }
          }

          return (
            <li
              key={i}
              className={styles.comparison__list__item__inner_list__item}
            >
              <span>{key}</span>
              <span>{valueByBool || valueFromArray || value}</span>
            </li>
          )
        })}
      </ul>
    </motion.li>
  )
}

export default ComparisonItem
