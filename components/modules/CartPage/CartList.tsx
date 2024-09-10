import { AnimatePresence, motion } from 'framer-motion'
import { basePropsForMotion } from '@/constants/motion'
import { useCartByAuth } from '@/hooks/useCartByAuth'
import CartListItem from './CartListItem'
import styles from '@/styles/cart-page/index.module.scss'

const CartList = () => {
  const currentCartByAuth = useCartByAuth()
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
