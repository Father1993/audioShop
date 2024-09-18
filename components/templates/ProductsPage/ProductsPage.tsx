/* eslint-disable indent */
'use client'
import ReactPaginate from 'react-paginate'
import { motion } from 'framer-motion'
import { useProductFilters } from '@/hooks/useProductFilters'
import { IProductsPage } from '@/types/catalog'
import { basePropsForMotion } from '@/constants/motion'
import { useLang } from '@/hooks/useLang'
import ProductListItem from '@/components/modules/ProductListItem/ProductListItem'
import HeadingWithCount from '@/components/elements/HeadingWithCount/HeadingWithCount'
import styles from '@/styles/catalog/index.module.scss'
import skeletonStyles from '@/styles/skeleton/index.module.scss'
import { useEffect } from 'react'
import {
  $catalogCategoryOptions,
  setCatalogCategoryOptions,
} from '@/context/catalog'
import { useUnit } from 'effector-react'

const ProductsPage = ({ searchParams, pageName }: IProductsPage) => {
  const { products, productsSpinner, paginationProps, handlePageChange } =
    useProductFilters(searchParams, pageName, pageName === 'catalog')
  const { lang, translations } = useLang()
  const catalogCategoryOptions = useUnit($catalogCategoryOptions)

  console.log(catalogCategoryOptions)

  useEffect(() => {
    switch (pageName) {
      case 'catalog':
        setCatalogCategoryOptions({
          catalogCategoryOptions: [
            {
              id: 2,
              title: translations[lang].main_menu.audio,
              href: 'catalog/audio',
            },
            {
              id: 3,
              title: translations[lang].main_menu.subwoofers,
              href: 'catalog/subwoofers',
            },
            {
              id: 4,
              title: translations[lang].main_menu.speakers,
              href: 'catalog/speakers',
            },
            {
              id: 5,
              title: translations[lang].main_menu.accessories,
              href: 'catalog/accessories',
            },
          ],
        })
        break
      case 'subwoofers':
        setCatalogCategoryOptions({
          subwooferCategoryOptions: [
            {
              id: 1,
              title: translations[lang].main_menu.active,
              filterHandler: () => '',
            },
            {
              id: 2,
              title: translations[lang].main_menu.passive,
              filterHandler: () => '',
            },
          ],
        })
        break
      default:
        break
    }
  }, [])

  return (
    <>
      <HeadingWithCount
        count={products.count}
        title={
          (translations[lang].breadcrumbs as { [index: string]: string })[
            pageName
          ]
        }
        spinner={productsSpinner}
      />
      {productsSpinner && (
        <motion.ul
          {...basePropsForMotion}
          className={skeletonStyles.skeleton}
          style={{ marginBottom: 60 }}
        >
          {Array.from(new Array(12)).map((_, i) => (
            <li key={i} className={skeletonStyles.skeleton__item}>
              <div className={skeletonStyles.skeleton__item__light} />
            </li>
          ))}
        </motion.ul>
      )}
      {!productsSpinner && (
        <motion.ul
          {...basePropsForMotion}
          className={`list-reset ${styles.catalog__list}`}
        >
          {(products.items || []).map((item) => (
            <ProductListItem key={item._id} item={item} />
          ))}
        </motion.ul>
      )}
      {!products.items?.length && !productsSpinner && (
        <div className={styles.catalog__list__empty}>
          {translations[lang].common.nothing_is_found}
        </div>
      )}
      <div className={styles.catalog__bottom}>
        <ReactPaginate
          {...paginationProps}
          nextLabel={<span>{translations[lang].catalog.next_page}</span>}
          previousLabel={
            <span>{translations[lang].catalog.previous_page}</span>
          }
          onPageChange={handlePageChange}
        />
      </div>
    </>
  )
}

export default ProductsPage
