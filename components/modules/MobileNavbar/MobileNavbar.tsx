'use client'
import Link from 'next/link'
import { useLang } from '@/hooks/useLang'

const MobileNavbar = () => {
  const { lang, translations } = useLang()

  return (
    <div className='mobile-navbar'>
      <Link href='/' className='mobile-navbar__btn'>
        {translations[lang].breadcrumbs.main}
      </Link>
      <button className='btn-reset mobile-navbar__btn'>
        {translations[lang].breadcrumbs.catalog}
      </button>
      <Link href='/favorites' className='mobile-navbar__btn'>
        {translations[lang].breadcrumbs.favorites}
      </Link>
      <Link href='/cart' className='mobile-navbar__btn'>
        {translations[lang].breadcrumbs.cart}
      </Link>
      <button className='btn-reset mobile-navbar__btn'>
        {translations[lang].common.more}
      </button>
    </div>
  )
}

export default MobileNavbar
