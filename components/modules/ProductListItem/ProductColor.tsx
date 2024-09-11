'use client'
import { useLang } from '@/hooks/useLang'
import styles from '@/styles/product/index.module.scss'

const ProductColor = ({ color }: { color: string }) => {
  const { lang, translations } = useLang()
  return (
    <span className={styles.product__color}>
      {translations[lang].catalog.color}:{' '}
      {(translations[lang].catalog as { [key: string]: string })[color] ||
        color}
    </span>
  )
}

export default ProductColor
