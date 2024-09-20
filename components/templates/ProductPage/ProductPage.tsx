'use client'
import { useEffect } from 'react'
import { useUnit } from 'effector-react'
import { notFound } from 'next/navigation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { loadOneProduct, loadOneProductFx } from '@/context/goods'
import { IProductPageProps } from '@/types/product'
import { usePageTitle } from '@/hooks/usePageTitle'
import { useBreadcrumbs } from '@/hooks/useBreadcrumbs'
import { useLang } from '@/hooks/useLang'
import ProductPageContent from '@/components/modules/ProductPage/ProductPageContent'
import { $currentProduct } from '@/context/goods/state'
import styles from '@/styles/product/index.module.scss'

const ProductPage = ({ category, productId }: IProductPageProps) => {
  const { lang, translations } = useLang()
  const product = useUnit($currentProduct)
  const productSpinner = useUnit(loadOneProductFx.pending)
  const { breadcrumbs } = useBreadcrumbs(category)
  usePageTitle(category, product.name)

  useEffect(() => {
    if (breadcrumbs) {
      const lastCrumb =
        breadcrumbs.children[breadcrumbs.children.length - 1].children[0]

      breadcrumbs.children[
        breadcrumbs.children.length - 2
      ].children[0].textContent = (
        translations[lang].breadcrumbs as { [index: string]: string }
      )[category]

      lastCrumb.textContent = productSpinner
        ? translations[lang].common.loading
        : product.name
    }
  }, [breadcrumbs, category, lang, product.name, productSpinner, translations])

  useEffect(() => {
    loadOneProduct({
      productId,
      category,
    })
  }, [])

  if (product?.errorMessage) {
    notFound()
  }

  return (
    <div className={styles.product}>
      {productSpinner ? (
        <div className={styles.product__preloader}>
          <FontAwesomeIcon icon={faSpinner} spin size='8x' />
        </div>
      ) : (
        product.name && <ProductPageContent />
      )}
    </div>
  )
}

export default ProductPage
