/* eslint-disable indent */
import Link from 'next/link'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { IProductListItemProps } from '@/types/modules'
import { useLang } from '@/hooks/useLang'
import {
  addOverflowHiddenToBody,
  formatPrice,
  isItemInList,
} from '@/lib/utils/common'
import ProductSubtitle from '@/components/elements/ProductSubtitle/ProductSubtitle'
import ProductLabel from './ProductLabel'
import ProductItemActionBtn from '@/components/elements/ProductItemActionBtn/ProductItemActionBtn'
import ProductAvailable from '@/components/elements/ProductAvailable/ProductAvailable'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { showQuickViewModal } from '@/context/modals'
import { setCurrentProduct } from '@/context/goods'
import { productsWithoutSizes } from '@/constants/product'
import { useCartAction } from '@/hooks/useCartAction'
import { addProductToCartBySizeTable } from '@/lib/utils/cart'
import { setIsAddToFavorites } from '@/context/favorites'
import { useFavoritesAction } from '@/hooks/useFavoritesActions'
import styles from '@/styles/product-list-item/index.module.scss'
import stylesForAd from '@/styles/ad/index.module.scss'
import { useComparisonAction } from '@/hooks/useComparisonAction'

const ProductListItem = ({ item, title }: IProductListItemProps) => {
  const isMedia800 = useMediaQuery(800)
  const { lang, translations } = useLang()
  const isTitleForNew = title === translations[lang].main_page.new_title
  const { addToCartSpinner, setAddToCartSpinner, currentCartByAuth } =
    useCartAction()
  const isProductInCart = isItemInList(currentCartByAuth, item._id)
  const {
    addToFavoritesSpinner,
    isProductInFavorites,
    handleAddProductToFavorites,
  } = useFavoritesAction(item)

  const {
    handleAddToComparison,
    isProductInComparison,
    addToComparisonSpinner,
  } = useComparisonAction(item)

  const handleShowQuickViewModal = () => {
    addOverflowHiddenToBody()
    showQuickViewModal()
    setCurrentProduct(item)
  }

  const addToCart = () => {
    setIsAddToFavorites(false)
    addProductToCartBySizeTable(item, setAddToCartSpinner, 1)
  }

  return (
    <>
      {item.characteristics.collection == 'premium' &&
      item.type === 'speakers' ? (
        <li className={styles.list__item_ad}>
          <Link
            href={`/catalog/${item.category}/${item._id}`}
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
              <Image src={item.images[0]} alt={item.name} fill />
            </div>
            <p className={styles.list__item_ad__title}>
              <span>
                {translations[lang].main_page.audio_player} Premium{' '}
                {
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  //@ts-ignore
                  translations[lang].main_page[
                    item.images[0].split('/img/').join('').split('-')[0]
                  ]
                }
              </span>
              <span>{formatPrice(+item.price)}</span>
            </p>
          </Link>
        </li>
      ) : (
        <li className={styles.list__item}>
          {title ? (
            <span
              className={`${styles.list__item__label} ${
                isTitleForNew
                  ? styles.list__item__new
                  : styles.list__item__bestseller
              }`}
            >
              {isTitleForNew
                ? translations[lang].main_page.is_new
                : translations[lang].main_page.is_bestseller}
            </span>
          ) : !item.isNew && !item.isBestseller ? (
            ''
          ) : (
            <ProductLabel isBestseller={item.isBestseller} isNew={item.isNew} />
          )}
          <div className={styles.list__item__actions}>
            <ProductItemActionBtn
              spinner={addToFavoritesSpinner}
              text={translations[lang].product.add_to_favorites}
              iconClass={`${
                addToFavoritesSpinner
                  ? 'actions__btn_spinner'
                  : isProductInFavorites
                    ? 'actions__btn_favorite_checked'
                    : 'actions__btn_favorite'
              }`}
              callback={handleAddProductToFavorites}
            />

            <ProductItemActionBtn
              spinner={addToComparisonSpinner}
              text={translations[lang].product.add_to_comparison}
              iconClass={`${
                addToComparisonSpinner
                  ? 'actions__btn_spinner'
                  : isProductInComparison
                    ? 'actions__btn_comparison_checked'
                    : 'actions__btn_comparison'
              }`}
              callback={handleAddToComparison}
            />

            {!isMedia800 && (
              <ProductItemActionBtn
                text={translations[lang].product.quick_view}
                iconClass='actions__btn_quick_view'
                callback={handleShowQuickViewModal}
              />
            )}
          </div>
          <Link
            href={`/catalog/${item.category}/${item._id}`}
            className={styles.list__item__img}
          >
            <Image src={item.images[0]} alt={item.name} fill />
          </Link>
          <div className={styles.list__item__inner}>
            <h3 className={styles.list__item__title}>
              <Link href={`/catalog/${item.category}/${item._id}`}>
                {item.name}
              </Link>
            </h3>
            <ProductAvailable
              vendorCode={item.vendorCode}
              inStock={+item.inStock}
            />
            <span className={styles.list__item__price}>
              {formatPrice(+item.price)}
            </span>
          </div>
          {productsWithoutSizes.includes(item.type) ? (
            <button
              onClick={addToCart}
              className={`btn-reset ${styles.list__item__cart} ${
                isProductInCart ? styles.list__item__cart_added : ''
              }`}
              disabled={addToCartSpinner}
              style={addToCartSpinner ? { minWidth: 125, height: 48 } : {}}
            >
              {addToCartSpinner ? (
                <FontAwesomeIcon icon={faSpinner} spin color='#fff' />
              ) : isProductInCart ? (
                translations[lang].product.in_cart
              ) : (
                translations[lang].product.to_cart
              )}
            </button>
          ) : (
            <button
              className={`btn-reset ${styles.list__item__cart}`}
              onClick={addToCart}
            >
              {translations[lang].product.to_cart}
            </button>
          )}
        </li>
      )}
    </>
  )
}

export default ProductListItem
