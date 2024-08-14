import Link from 'next/link'
import { IProductListItemProps } from '@/types/modules'
import { useLang } from '@/hooks/useLang'
import styles from '@/styles/product-list-item/index.module.scss'
import stylesForAd from '@/styles/ad/index.module.scss'
import ProductSubtitle from '@/components/elements/ProductSubtitle/ProductSubtitle'

const ProductListItem = ({ item, title }: IProductListItemProps) => {
  const { lang, translations } = useLang()

  return (
    <>
      {item.characteristics.collection == 'line' && item.type === 't-shirts' ? (
        <li className={styles.list__item_ad}>
          <Link
            href={`/catalog/${item.category}/${item.id}`}
            className={styles.list__item_ad__inner}
          >
            <span className={`${stylesForAd.ad} ${styles.list__item_ad__ad}`}>
              {translations[lang].common.ad}
            </span>
            <ProductSubtitle
              subtitleClassName={styles.list__item_ad__subtitle}
              subtitleRectClassName={styles.list__item_ad__subtitle__rect}
            />
            <div className={styles.list__item_ad__img}>
              <img src={item.images[0]} alt={item.name} />
            </div>
            <p className={styles.list__item_ad__title}>
              <span>
                {translations[lang].main_page.audio_player} Line
                {
                  translations[lang].main_page[
                    item.images[0].split('/img/').join(''.split('-')[0])
                  ]
                }
              </span>
              <span>{formatPrice(+item.price)}</span>
            </p>
          </Link>
        </li>
      ) : (
        <></>
      )}
    </>
  )
}

export default ProductListItem
