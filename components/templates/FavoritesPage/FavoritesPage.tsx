/* eslint-disable react/jsx-indent */
/* eslint-disable prettier/prettier */
'use client'
import { useUnit } from 'effector-react'
import { motion } from 'framer-motion'
import HeadingWithCount from '@/components/elements/HeadingWithCount/HeadingWithCount'
import Breadcrumbs from '@/components/modules/Breadcrumbs/Breadcrumbs'
import EmptyPageContent from '@/components/modules/EmptyPageContent/EmptyPageContent'
import { useBreadcrumbs } from '@/hooks/useBreadcrumbs'
import { useGoodsByAuth } from '@/hooks/useGoodsByAuth'
import { useLang } from '@/hooks/useLang'
import { basePropsForMotion } from '@/constants/motion'
import FavoritesList from '@/components/modules/FavoritesPage/FavoritesList'
import { isUserAuth } from '@/lib/utils/common'
import { loginCheckFx } from '@/context/user'
import cartSkeletonStyles from '@/styles/cart-skeleton/index.module.scss'
import {
  $favorites,
  $favoritesFormLS,
  $shouldShowEmptyFavorites,
} from '@/context/favorites/state'
import { getFavoriteItemsFx } from '@/context/favorites'
import styles from '@/styles/favorites/index.module.scss'

const FavoritesPage = () => {
  const { lang, translations } = useLang()
  const { getDefaultTextGenerator, getTextGenerator } =
    useBreadcrumbs('favorites')
  const currentFavoriteByAuth = useGoodsByAuth($favorites, $favoritesFormLS)
  const shouldShowEmptyFavorites = useUnit($shouldShowEmptyFavorites)
  const favoritesSpinner = useUnit(getFavoriteItemsFx.pending)
  const loginCheckSpinner = useUnit(loginCheckFx.pending)

  return (
    <main>
      <Breadcrumbs
        getDefaultTextGenerator={getDefaultTextGenerator}
        getTextGenerator={getTextGenerator}
      />
      {!shouldShowEmptyFavorites ? (
        <section className={styles.favorites}>
          <div className={`container ${styles.favorites__container}`}>
            <HeadingWithCount
              count={currentFavoriteByAuth.length}
              title={translations[lang].breadcrumbs.favorites}
              spinner={favoritesSpinner}
            />
            {(isUserAuth()
              ? favoritesSpinner || loginCheckSpinner
              : favoritesSpinner) && (
              <motion.ul
                {...basePropsForMotion}
                className={cartSkeletonStyles.skeleton}
              >
                {Array.from(
                  new Array(3).map((_, i) => (
                    <li className={cartSkeletonStyles.skeleton__item} key={i}>
                      <div
                        className={cartSkeletonStyles.skeleton__item__light}
                      />
                    </li>
                  ))
                )}
              </motion.ul>
            )}
            {!favoritesSpinner && (
              <motion.ul
                {...basePropsForMotion}
                className={`list-reset ${styles.favorites__list}`}
              >
                <FavoritesList />
              </motion.ul>
            )}
          </div>
        </section>
      ) : (
        <section>
          <div className='container'>
            <EmptyPageContent
              subtitle={translations[lang].common.favorites_empty}
              description={translations[lang].common.favorites_empty_advice}
              btnText={translations[lang].common.go_catalog}
              bgClassName={styles.empty_bg}
            />
          </div>
        </section>
      )}
    </main>
  )
}

export default FavoritesPage
