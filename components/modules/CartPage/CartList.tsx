import { AnimatePresence, motion } from 'framer-motion'
import { basePropsForMotion } from '@/constants/motion'
import { useGoodsByAuth } from '@/hooks/useGoodsByAuth'
import CartListItem from './CartListItem'
import styles from '@/styles/cart-page/index.module.scss'
import { $cart, $cartFromLs } from '@/context/cart'

const CartList = () => {
  const currentCartByAuth = useGoodsByAuth($cart, $cartFromLs)
  return (
    <>
      <AnimatePresence>
        {currentCartByAuth.map((item) => (
          <motion.ul
            key={item._id || item.clientId}
            {...basePropsForMotion}
            className={styles.cart__list__item}
          >
            <CartListItem item={item} />
          </motion.ul>
        ))}
      </AnimatePresence>
    </>
  )
}

export default CartList
