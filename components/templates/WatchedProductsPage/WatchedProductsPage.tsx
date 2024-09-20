'use client'
import ProductListItem from '@/components/modules/ProductListItem/ProductListItem'
import { useLang } from '@/hooks/useLang'
import { useWatchedProducts } from '@/hooks/useWatchedProducts'
import styles from '@/styles/watched-products-page/index.module.scss'

const WatchedProductsPage = () => {
  const { watchedProducts } = useWatchedProducts()
  const { lang, translations } = useLang()

  return (
    <main>
      <section className={styles.watched_products}>
        <div className='container'>
          <h1 className={`site-title ${styles.watched_products__title}`}>
            {translations[lang].product.watched}
          </h1>
          <ul className={`list-reset ${styles.watched_products__list}`}>
            {(watchedProducts.items || []).map((item) => (
              <ProductListItem key={item._id} item={item} />
            ))}
          </ul>
        </div>
      </section>
    </main>
  )
}

export default WatchedProductsPage
