'use client'
import { useLang } from '@/hooks/useLang'
import { IProductColorProps } from '@/types/modules'
import styles from '@/styles/product/index.module.scss'

const ProductColor = ({ color, className }: IProductColorProps) => {
  const { lang, translations } = useLang()
  return (
    <span className={`${styles.product__color} ${className || ''}`}>
      <span>{translations[lang].catalog.color}:</span>{' '}
      {(translations[lang].catalog as { [index: string]: string })[color]}
    </span>
  )
}

export default ProductColor
