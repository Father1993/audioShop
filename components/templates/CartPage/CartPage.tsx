import { useCartByAuth } from '@/hooks/useCartByAuth'
import { useLang } from '@/hooks/useLang'
import styles from '@/styles/cart-page/index.module.scss'

const CartPage = () => {
  const currentCartByAuth = useCartByAuth()
  const { lang, translations } = useLang()
  return (
    <main>
      <section className={styles.cart}>
        <div className='container'></div>
      </section>
    </main>
  )
}

export default CartPage
