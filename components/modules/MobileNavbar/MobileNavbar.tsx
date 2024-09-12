'use client'
import Link from 'next/link'
import { useGoodsByAuth } from '@/hooks/useGoodsByAuth'
import {
  closeCatalogMenu,
  closeMenu,
  openCatalogMenu,
  openMenu,
} from '@/context/modals'
import { useLang } from '@/hooks/useLang'
import { addOverflowHiddenToBody } from '@/lib/utils/common'
import CatalogMenu from '../Header/CatalogMenu'
import { $cart, $cartFromLs } from '@/context/cart'
import { $favorites, $favoritesFormLS } from '@/context/favorites'

const MobileNavbar = () => {
  const { lang, translations } = useLang()
  const currenCartByAuth = useGoodsByAuth($cart, $cartFromLs)
  const currentFavoriteByAuth = useGoodsByAuth($favorites, $favoritesFormLS)

  const handleOpenMenu = () => {
    addOverflowHiddenToBody()
    openMenu()
    closeCatalogMenu()
  }

  const handleOpenCatalogMenu = () => {
    addOverflowHiddenToBody('0')
    openCatalogMenu()
    closeMenu()
  }

  return (
    <>
      <CatalogMenu />
      <div className='mobile-navbar'>
        <Link href='/' className='mobile-navbar__btn'>
          {translations[lang].breadcrumbs.main}
        </Link>
        <button
          className='btn-reset mobile-navbar__btn'
          onClick={handleOpenCatalogMenu}
        >
          {translations[lang].breadcrumbs.catalog}
        </button>
        <Link href='/favorites' className='mobile-navbar__btn'>
          {!!currentFavoriteByAuth.length && (
            <span className='not-empty not-empty-mobile-favorite' />
          )}
          {translations[lang].breadcrumbs.favorites}
        </Link>
        <Link href='/cart' className='mobile-navbar__btn'>
          {!!currenCartByAuth.length && (
            <span className='not-empty not-empty-mobile' />
          )}
          {translations[lang].breadcrumbs.cart}
        </Link>
        <button
          className='btn-reset mobile-navbar__btn'
          onClick={handleOpenMenu}
        >
          {translations[lang].common.more}
        </button>
      </div>
    </>
  )
}

export default MobileNavbar
