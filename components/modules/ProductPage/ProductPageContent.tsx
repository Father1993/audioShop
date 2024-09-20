import { useUnit } from 'effector-react'
import ProductImages from './ProductImages'
import { useLang } from '@/hooks/useLang'
import { $currentProduct } from '@/context/goods'
import { useProductImages } from '@/hooks/useProductImages'
import styles from '@/styles/product/index.module.scss'

const ProductPageContent = () => {
  const { lang, translations } = useLang()
  const product = useUnit($currentProduct)
  const images = useProductImages(product)

  return (
    <div className={styles.product__top}>
      <ProductImages images={images} />
    </div>
  )
}

export default ProductPageContent
