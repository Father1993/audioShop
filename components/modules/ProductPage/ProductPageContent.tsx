/* eslint-disable indent */
import { useUnit } from 'effector-react'
import { useEffect } from 'react'
import ProductImages from './ProductImages'
import { useLang } from '@/hooks/useLang'
import {
  addOverflowHiddenToBody,
  capitalizeFirsLetter,
  formatPrice,
  getWatchedProductFromLS,
} from '@/lib/utils/common'
import ProductItemActionBtn from '@/components/elements/ProductItemActionBtn/ProductItemActionBtn'
import { useFavoritesAction } from '@/hooks/useFavoritesActions'
import ProductAvailable from '@/components/elements/ProductAvailable/ProductAvailable'
import { useCartAction } from '@/hooks/useCartAction'
import ProductCounter from '../ProductListItem/ProductCounter'
import { ICartItem } from '@/types/cart'
import AddToCartBtn from '../ProductListItem/AddToCartBtn'
import { setIsAddToFavorites } from '@/context/favorites'
import ProductInfoAccordion from './ProductInfoAccordion'
import ProductsByCollection from './ProductsByCollection'
import { $currentProduct } from '@/context/goods/state'
import WatchedProducts from '../WatchedProducts/WatchedProducts'
import { useWatchedProducts } from '@/hooks/useWatchedProducts'
import { openShareModal } from '@/context/modals'
import styles from '@/styles/product/index.module.scss'

const ProductPageContent = () => {
  const { lang, translations } = useLang()
  const product = useUnit($currentProduct)
  const {
    handleAddProductToFavorites,
    addToFavoritesSpinner,
    isProductInFavorites,
  } = useFavoritesAction(product)

  const {
    handleAddToCart,
    updateCountSpinner,
    addToCartSpinner,
    allCurrentCartItemCount,
    setCount,
    existingItem,
    count,
  } = useCartAction()

  const handleProductShare = () => {
    addOverflowHiddenToBody()
    openShareModal()
  }

  const addToCart = () => {
    setIsAddToFavorites(false)
    handleAddToCart(count)
  }

  const { watchedProducts } = useWatchedProducts(product._id)

  useEffect(() => {
    const watchedProducts = getWatchedProductFromLS()

    const isInWatched = watchedProducts.find((item) => item._id === product._id)

    if (isInWatched) {
      return
    }

    localStorage.setItem(
      'watched',
      JSON.stringify([
        ...watchedProducts,
        { category: product.category, _id: product._id },
      ])
    )
  }, [product._id, product.category])

  console.log(product.sizes)

  return (
    <>
      <div className={styles.product__top}>
        <ProductImages />
        <div className={styles.product__top__right}>
          {(product.isBestseller || product.isNew) && (
            <div className={styles.product__top__label}>
              {product.isNew && (
                <span className={styles.product__top__label__new}>
                  {translations[lang].main_page.is_new}
                </span>
              )}
              {product.isBestseller && (
                <span className={styles.product__top__label__bestseller}>
                  {translations[lang].main_page.is_bestseller}
                </span>
              )}
            </div>
          )}
          <h1 className={styles.product__top__title}>{product.name}</h1>
          <div className={styles.product__top__price}>
            <h3 className={styles.product__top__price__title}>
              {formatPrice(product.price)} ₽
            </h3>
            <div className={styles.product__top__price__inner}>
              <div className={styles.product__top__price__favorite}>
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
              </div>
              <button
                className={`btn-reset ${styles.product__top__price__share}`}
                onClick={handleProductShare}
              />
            </div>
          </div>
          <div className={styles.product__top__available}>
            <ProductAvailable
              vendorCode={product.vendorCode}
              inStock={+product.inStock}
            />
          </div>
          {!!product.characteristics.collection && (
            <span className={styles.product__top__collection}>
              <span>{translations[lang].catalog.collection}:</span>{' '}
              {capitalizeFirsLetter(product.characteristics.collection)}
            </span>
          )}
          {product.companyName && product.model && (
            <li className={`list-reset ${styles.product__char}`}>
              {String(product.companyName)} {String(product.model)}
            </li>
          )}

          {product.productSizes && (
            <li className={`list-reset ${styles.product__char}`}>
              {translations[lang].catalog.size}: {String(product.productSizes)}
            </li>
          )}

          {product.characteristics.power && (
            <li className={`list-reset ${styles.product__power}`}>
              {String(product.characteristics.power)}
            </li>
          )}

          <div className={styles.product__top__bottom}>
            <span className={styles.product__top__count}>
              {translations[lang].product.count}
            </span>
            <div className={styles.product__top__inner}>
              <ProductCounter
                className={`counter ${styles.product__top__counter}`}
                count={count}
                totalCount={+product.inStock}
                initialCount={+(existingItem as ICartItem)}
                setCount={setCount}
                cartItem={existingItem as ICartItem}
                updateCountAsync={false}
              />
              <AddToCartBtn
                className={styles.product__top__add}
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
          <div className={styles.product__top__description}>
            <ProductInfoAccordion
              title={translations[lang].product.description}
            >
              <p className={styles.product__top__description__text}>
                {product.description}
              </p>
            </ProductInfoAccordion>
            <ProductInfoAccordion
              title={translations[lang].product.characteristics}
            >
              <ul
                className={`list-reset ${styles.product__top__description__characteristics}`}
              >
                {product.companyName && (
                  <li className={styles.product__top__description__text}>
                    {translations[lang].product.brand}:{' '}
                    {String(product.companyName)}
                  </li>
                )}
                {product.model && (
                  <li className={styles.product__top__description__text}>
                    {translations[lang].product.model}: {String(product.model)}
                  </li>
                )}
                {product.characteristics.installationType && (
                  <li className={styles.product__top__description__text}>
                    {translations[lang].product.for}:{' '}
                    {String(product.characteristics.installationType)}
                  </li>
                )}
                {product.characteristics.features && (
                  <li className={styles.product__top__description__text}>
                    {translations[lang].product.options}:{' '}
                    {String(product.characteristics.features)}
                  </li>
                )}
                {product.type && (
                  <li className={styles.product__top__description__text}>
                    {translations[lang].product.type}: {String(product.type)}
                  </li>
                )}
                {product.characteristics.power &&
                  product.characteristics.power && (
                    <div>
                      <li className={styles.product__top__description__text}>
                        {translations[lang].product.impedances}:{' '}
                        {String(product.characteristics.impedances)}
                      </li>
                      <li className={styles.product__top__description__text}>
                        {translations[lang].product.power}:{' '}
                        {String(product.characteristics.power)}
                      </li>
                    </div>
                  )}
                {product.productSizes && (
                  <div className={styles.modal__right__info__size}>
                    <div className={styles.modal__right__info__size__inner}>
                      <span className={styles.product__top__description__text}>
                        {translations[lang].catalog.size}:{' '}
                        {String(product.productSizes)}
                      </span>
                    </div>
                  </div>
                )}
              </ul>
            </ProductInfoAccordion>
          </div>
        </div>
      </div>
      {!!product.characteristics.collection && (
        <ProductsByCollection collection={product.characteristics.collection} />
      )}
      {!!watchedProducts.items?.length && (
        <WatchedProducts watchedProducts={watchedProducts} />
      )}
    </>
  )
}

export default ProductPageContent
