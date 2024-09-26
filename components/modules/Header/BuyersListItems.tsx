import Link from 'next/link'
import { useLang } from '@/hooks/useLang'
import { closeMenu } from '@/context/modals'

const BuyersListItems = () => {
  const { lang, translations } = useLang()

  const handleLinkClick = () => {
    closeMenu()
  }
  return (
    <>
      <li className='nav-menu__accordion__item'>
        <Link
          href='/about'
          className='nav-menu__accordion__item__link nav-menu__accordion__item__title'
          onClick={handleLinkClick}
        >
          {translations[lang].main_menu.about}
        </Link>
      </li>
      <li className='nav-menu__accordion__item'>
        <Link
          href='/blog'
          className='nav-menu__accordion__item__link'
          onClick={handleLinkClick}
        >
          {translations[lang].main_menu.blog}
        </Link>
      </li>
      <li className='nav-menu__accordion__item'>
        <Link
          href='/shipping-and-payment'
          className='nav-menu__accordion__item__link'
          onClick={handleLinkClick}
        >
          {translations[lang].main_menu.shipping}
        </Link>
      </li>
      <li className='nav-menu__accordion__item'>
        <Link
          href='/purchase-returns'
          className='nav-menu__accordion__item__link'
          onClick={handleLinkClick}
        >
          {translations[lang].main_menu.returns}
        </Link>
      </li>
    </>
  )
}

export default BuyersListItems
