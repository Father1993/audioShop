/* eslint-disable indent */
import { useEffect } from 'react'
import { useUnit } from 'effector-react'
import { motion } from 'framer-motion'
import { loadProductsByFilter, loadProductsByFilterFx } from '@/context/goods'
import { allowedCollectionsCategories } from '@/constants/product'
import AllLink from '@/components/elements/AllLink/AllLink'
import { basePropsForMotion } from '@/constants/motion'
import { useLang } from '@/hooks/useLang'
import { capitalizeFirsLetter } from '@/lib/utils/common'
import ProductListItem from '../ProductListItem/ProductListItem'
import { $products } from '@/context/goods/state'
import skeletonStyles from '@/styles/skeleton/index.module.scss'
import styles from '@/styles/product/index.module.scss'

const ProductsByCollection = ({ collection }: { collection: string }) => {
  const { lang, translations } = useLang()
  const products = useUnit($products)
  const langText = translations[lang].product.collection_goods
  const capitalizedCollection = capitalizeFirsLetter(collection)
  const spinner = useUnit(loadProductsByFilterFx.pending)
  const title =
    lang === 'ru'
      ? `${langText} «${capitalizedCollection}»`
      : [
          langText.slice(0, 17),
          ` «${capitalizedCollection}»`,
          langText.slice(17),
        ].join('')

  useEffect(() => {
    loadProductsByFilter({
      limit: 4,
      offset: 0,
      category:
        allowedCollectionsCategories[
          Math.floor(Math.random() * allowedCollectionsCategories.length)
        ],
      additionalParam: `collection=${collection}`,
    })
  }, [])

  console.log(products)

  if (!products.items?.length) {
    return null
  }

  return (
    <div className={styles.product__collection}>
      <span className={styles.product__collection__bg}>
        {capitalizedCollection}
      </span>
      <h2 className={styles.product__collection__title}>{title}</h2>
      <div className={styles.product__collection__inner}>
        <AllLink link={`/collection-products`} />
        {spinner && (
          <motion.ul
            className={skeletonStyles.skeleton}
            {...basePropsForMotion}
          >
            {Array.from(new Array(4)).map((_, i) => (
              <li key={i} className={skeletonStyles.skeleton__item}>
                <div className={skeletonStyles.skeleton__item__light} />
              </li>
            ))}
          </motion.ul>
        )}
        {!spinner && (
          <motion.ul
            className={`list-reset ${styles.product__collection__list}`}
            {...basePropsForMotion}
          >
            {(products.items || []).map((item) => (
              <ProductListItem key={item._id} item={item} title={title} />
            ))}
          </motion.ul>
        )}
      </div>
    </div>
  )
}

export default ProductsByCollection
