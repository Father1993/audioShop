import Link from 'next/link'
import { useCartAction } from '@/hooks/useCartAction'
import { useProductImages } from '@/hooks/useProductImages'
import { useLang } from '@/hooks/useLang'
import { closeQuickViewModal } from '@/context/modals'
import { formatPrice, removeOverflowHiddenFromBody } from '@/lib/utils/common'
import QuickViewModalSlider from './QuickViewModalSlider'
import ProductAvailable from '@/components/elements/ProductAvailable/ProductAvailable'
import ProductCounter from '../ProductListItem/ProductCounter'
import AddToCartBtn from '../ProductListItem/AddToCartBtn'
import ProductItemActionBtn from '@/components/elements/ProductItemActionBtn/ProductItemActionBtn'
import { ICartItem } from '@/types/cart'
import { useComparisonAction } from '@/hooks/useComparisonAction'
import { useFavoritesAction } from '@/hooks/useFavoritesActions'
import { setIsAddToFavorites } from '@/context/favorites'
import stylesForProduct from '@/styles/product-list-item/index.module.scss'
import styles from '@/styles/quick-view-modal/index.module.scss'

const QuickViewModal = () => {
  const { lang, translations } = useLang()
  const {
    product,
    handleAddToCart,
    updateCountSpinner,
    addToCartSpinner,
    allCurrentCartItemCount,
    setCount,
    existingItem,
    count,
  } = useCartAction()
  const images = useProductImages(product)
  const {
    handleAddToComparison,
    isProductInComparison,
    addToComparisonSpinner,
  } = useComparisonAction(product)

  const {
    handleAddProductToFavorites,
    addToFavoritesSpinner,
    isProductInFavorites,
  } = useFavoritesAction(product)

  const handleCloseModal = () => {
    removeOverflowHiddenFromBody()
    closeQuickViewModal()
  }

  const addToCart = () => {
    setIsAddToFavorites(false)
    handleAddToCart(count)
  }

  return (
    <div className={styles.modal}>
      <button
        className={`btn-reset ${styles.modal__close}`}
        onClick={handleCloseModal}
      />
      <div className={styles.modal__actions}>
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
          withTooltip={false}
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
          withTooltip={false}
          callback={handleAddToComparison}
        />
      </div>
      <div className={styles.modal__left}>
        <QuickViewModalSlider images={images} />
      </div>
      <div className={styles.modal__right}>
        <h3 className={styles.modal__right__title}>{product.name}</h3>
        <div className={styles.modal__right__price}>
          {formatPrice(+product.price)} ₽
        </div>
        <div className={styles.modal__right__info}>
          <ProductAvailable
            vendorCode={product.vendorCode}
            inStock={+product.inStock}
          />
          {product.companyName && (
            <span className={stylesForProduct.product__count_title}>
              {translations[lang].product.brand}: {String(product.companyName)}
            </span>
          )}
          {product.model && (
            <span className={stylesForProduct.product__count_title}>
              {translations[lang].product.model}: {String(product.model)}
            </span>
          )}
          {product.characteristics.installationType && (
            <span className={stylesForProduct.product__size_title}>
              {translations[lang].product.for}:{' '}
              {String(product.characteristics.installationType)}
            </span>
          )}
          {product.characteristics.features && (
            <span className={stylesForProduct.product__count_title}>
              {translations[lang].product.options}:{' '}
              {String(product.characteristics.features)}
            </span>
          )}
          {product.type && (
            <span className={stylesForProduct.product__count_title}>
              {translations[lang].product.type}: {String(product.type)}
            </span>
          )}
          {product.characteristics.power && product.characteristics.power && (
            <div>
              <span className={stylesForProduct.product__count_title}>
                {translations[lang].product.impedances}:{' '}
                {String(product.characteristics.impedances)}
              </span>
              <span className={stylesForProduct.product__count_title}>
                {translations[lang].product.power}:{' '}
                {String(product.characteristics.power)}
              </span>
            </div>
          )}
          {product.productSizes && (
            <div className={styles.modal__right__info__size}>
              <div className={styles.modal__right__info__size__inner}>
                <span className={stylesForProduct.product__size_title}>
                  {translations[lang].catalog.size}:{' '}
                  {String(product.productSizes)}
                </span>
              </div>
            </div>
          )}
          <div className={styles.modal__right__bottom}>
            <span className={stylesForProduct.product__count_title}>
              {translations[lang].product.count}
            </span>
            <div className={styles.modal__right__bottom__inner}>
              <ProductCounter
                className={`counter ${styles.modal__right__bottom__counter}`}
                count={count}
                totalCount={+product.inStock}
                initialCount={+(existingItem as ICartItem)}
                setCount={setCount}
                cartItem={existingItem as ICartItem}
                updateCountAsync={false}
              />

              <AddToCartBtn
                className={styles.modal__right__bottom__add}
                text={translations[lang].product.to_cart}
                handleAddToCart={addToCart}
                addToCartSpinner={addToCartSpinner || updateCountSpinner}
                btnDisabled={
                  addToCartSpinner ||
                  updateCountSpinner ||
                  allCurrentCartItemCount === +product.inStock
                }
              />
            </div>
          </div>
        </div>
        <div className={styles.modal__right__more}>
          <Link
            href={`/catalog/${product.category}/${product._id}`}
            className={styles.modal__right__more__link}
            onClick={handleCloseModal}
          >
            {translations[lang].product.more}
          </Link>
        </div>
      </div>
    </div>
  )
}

export default QuickViewModal
