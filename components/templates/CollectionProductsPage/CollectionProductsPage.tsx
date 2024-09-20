'use client'
import { useEffect, useState } from 'react'
import { notFound } from 'next/navigation'
import { motion } from 'framer-motion'
import { loadProductsByFilter } from '@/context/goods'
import ProductListItem from '@/components/modules/ProductListItem/ProductListItem'
import { useProductsByCollection } from '@/hooks/useProductsByCollection'
import { basePropsForMotion } from '@/constants/motion'
import { getSearchParamsUrl } from '@/lib/utils/common'
import {
  allowedCollections,
  allowedCollectionsCategories,
} from '@/constants/product'
import skeletonStyles from '@/styles/skeleton/index.module.scss'
import styles from '@/styles/watched-products-page/index.module.scss'

const CollectionProductsPage = () => {
  const [currentCollection, setCurrentCollection] = useState('')
  const { title, products, spinner } =
    useProductsByCollection(currentCollection)

  useEffect(() => {
    const urlParams = getSearchParamsUrl()
    const categoryParam = urlParams.get('category')
    const collectionParam = urlParams.get('collection')

    if (
      categoryParam &&
      collectionParam &&
      allowedCollectionsCategories.includes(categoryParam) &&
      allowedCollections.includes(collectionParam)
    ) {
      setCurrentCollection(collectionParam)
      loadProductsByFilter({
        limit: 12,
        offset: 0,
        category: categoryParam,
        additionalParam: urlParams.toString(),
      })

      return
    }

    notFound()
  }, [])

  return (
    <main>
      <section className={styles.watched_products}>
        <div className='container'>
          <h1 className={`site-title ${styles.watched_products__title}`}>
            {title}
          </h1>
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
            <ul className={`list-reset ${styles.watched_products__list}`}>
              {(products.items || []).map((item) => (
                <ProductListItem key={item._id} item={item} />
              ))}
            </ul>
          )}
        </div>
      </section>
    </main>
  )
}

export default CollectionProductsPage
