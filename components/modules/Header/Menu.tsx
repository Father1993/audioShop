import Logo from '@/components/elements/Logo/Logo'
import { AllowedLangs } from '@/constants/lang'
import { setLang } from '@/context/lang'
import { $menuIsOpen, closeMenu } from '@/context/madals'
import { useLang } from '@/hooks/useLang'
import { removeOverflowHiddenFromBody } from '@/lib/utils/common'
import { useUnit } from 'effector-react'
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import Accordion from '../Accordion/Accordion'
import { usePathname } from 'next/navigation'
import MenuLinkItem from './MenuLinkItem'
import Link from 'next/link'

const Menu = () => {
  const [showCatalogList, setShowCatalogList] = useState(false)
  const [showBuyersList, setShowBuyersList] = useState(false)
  const [showContactsList, setShowContactsList] = useState(false)
  const menuIsOpen = useUnit($menuIsOpen)
  const { lang, translations } = useLang()
  const pathname = usePathname()

  const handleSwitchLang = (lang: string) => {
    setLang(lang as AllowedLangs)
    localStorage.setItem('lang', JSON.stringify(lang))
  }

  const handleSwitchLangToRu = () => handleSwitchLang('ru')
  const handleSwitchLangToEn = () => handleSwitchLang('en')

  const handleShowCatalogList = () => {
    setShowCatalogList(true)
    setShowBuyersList(false)
    setShowContactsList(false)
  }

  const handleShowBuyersList = () => {
    setShowCatalogList(false)
    setShowBuyersList(true)
    setShowContactsList(false)
  }

  const handleShowContactsList = () => {
    setShowCatalogList(false)
    setShowBuyersList(false)
    setShowContactsList(true)
  }

  const handleCloseMenu = () => {
    removeOverflowHiddenFromBody()
    closeMenu()
  }

  const handleRedirectToCatalog = (path: string) => {
    if (pathname.includes('/catalog')) {
      window.history.pushState({ path }, '', path)
      window.location.reload()
    }
    handleCloseMenu()
  }

  const clothLinks = [
    {
      id: 1,
      text: translations[lang].comparison['t-shirts'],
      href: '/catalog/cloth?offset=0&type=t-shirts',
    },
    {
      id: 2,
      text: translations[lang].comparison['long-sleeves'],
      href: '/catalog/cloth?offset=0&type=long-sleeves',
    },
    {
      id: 3,
      text: translations[lang].comparison.hoodie,
      href: '/catalog/cloth?offset=0&type=hoodie',
    },
    {
      id: 4,
      text: translations[lang].comparison.outerwear,
      href: '/catalog/cloth?offset=0&type=outerwear',
    },
  ]

  const accessoriesLinks = [
    {
      id: 1,
      text: translations[lang].comparison.bags,
      href: '/catalog/accessories?offset=0&type=bags',
    },
    {
      id: 2,
      text: translations[lang].comparison.headdress,
      href: '/catalog/accessories?offset=0&type=headdress',
    },
    {
      id: 3,
      text: translations[lang].comparison.umbrella,
      href: '/catalog/accessories?offset=0&type=umbrella',
    },
  ]

  const souvenirsLinks = [
    {
      id: 1,
      text: translations[lang].comparison['business-souvenirs'],
      href: '/catalog/souvenirs?offset=0&type=business-souvenirs',
    },
    {
      id: 2,
      text: translations[lang].comparison['promotional-souvenirs'],
      href: '/catalog/souvenirs?offset=0&type=promotional-souvenirs',
    },
  ]

  const officeLinks = [
    {
      id: 1,
      text: translations[lang].comparison.notebook,
      href: '/catalog/office?offset=0&type=notebook',
    },
    {
      id: 2,
      text: translations[lang].comparison.pen,
      href: '/catalog/office?offset=0&type=pen',
    },
  ]

  return (
    <nav className={`nav-menu ${menuIsOpen ? 'open' : 'close'}`}>
      <div className='container nav-menu__container'>
        <div className={`nav-menu__logo ${menuIsOpen ? 'open' : ''}`}>
          <Logo />
        </div>
        <img
          className={`nav-menu__bg ${menuIsOpen ? 'open' : ''}`}
          src='/img/menu-bg.png'
          alt='menu background'
        />
        <button
          className={`btn-reset nav-menu__close ${menuIsOpen ? 'open' : ''}`}
          onClick={handleCloseMenu}
        />
        <div className={`nav-menu__lang ${menuIsOpen ? 'open' : ''}`}>
          <button
            className={`btn-reset nav-menu__lang__btn ${lang === 'ru' ? 'lang-active' : ''}`}
            onClick={handleSwitchLangToRu}
          >
            RU
          </button>
          <button
            className={`btn-reset nav-menu__lang__btn ${lang === 'en' ? 'lang-active' : ''}`}
            onClick={handleSwitchLangToEn}
          >
            EN
          </button>
        </div>

        <ul className={`list-reset nav-menu__list ${menuIsOpen ? 'open' : ''}`}>
          <li className={`nav-menu__list__item`}>
            <button
              className={`btn-reset nav-menu__list__item__btn`}
              onMouseEnter={handleShowCatalogList}
            >
              {translations[lang].main_menu.catalog}
            </button>
            <AnimatePresence>
              {showCatalogList && (
                <motion.ul
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className='list-rest nav-menu__accordion'
                >
                  <li className='nav-menu__accordion__item'>
                    <Accordion
                      title={translations[lang].main_menu.cloth}
                      titleClass='btn-reset nav-menu__accordion__item__title'
                    >
                      <ul className='list-reset nav-menu__accordion__item__list'>
                        {clothLinks.map((item) => (
                          <MenuLinkItem
                            key={item.id}
                            item={item}
                            handleRedirectToCatalog={handleRedirectToCatalog}
                          />
                        ))}
                      </ul>
                    </Accordion>
                  </li>
                  <li className='nav-menu__accordion__item'>
                    <Accordion
                      title={translations[lang].main_menu.accessories}
                      titleClass='btn-reset nav-menu__accordion__item__title'
                    >
                      <ul className='list-reset nav-menu__accordion__item__list'>
                        {accessoriesLinks.map((item) => (
                          <MenuLinkItem
                            key={item.id}
                            item={item}
                            handleRedirectToCatalog={handleRedirectToCatalog}
                          />
                        ))}
                      </ul>
                    </Accordion>
                  </li>
                  <li className='nav-menu__accordion__item'>
                    <Accordion
                      title={translations[lang].main_menu.souvenirs}
                      titleClass='btn-reset nav-menu__accordion__item__title'
                    >
                      <ul className='list-reset nav-menu__accordion__item__list'>
                        {souvenirsLinks.map((item) => (
                          <MenuLinkItem
                            key={item.id}
                            item={item}
                            handleRedirectToCatalog={handleRedirectToCatalog}
                          />
                        ))}
                      </ul>
                    </Accordion>
                  </li>
                  <li className='nav-menu__accordion__item'>
                    <Accordion
                      title={translations[lang].main_menu.office}
                      titleClass='btn-reset nav-menu__accordion__item__title'
                    >
                      <ul className='list-reset nav-menu__accordion__item__list'>
                        {officeLinks.map((item) => (
                          <MenuLinkItem
                            key={item.id}
                            item={item}
                            handleRedirectToCatalog={handleRedirectToCatalog}
                          />
                        ))}
                      </ul>
                    </Accordion>
                  </li>
                </motion.ul>
              )}
            </AnimatePresence>
          </li>
          <li className={`nav-menu__list__item`}>
            <button
              className={`btn-reset nav-menu__list__item__btn`}
              onMouseEnter={handleShowBuyersList}
            >
              {translations[lang].main_menu.buyers}
            </button>
            <AnimatePresence>
              {showBuyersList && (
                <motion.ul
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className='list-rest nav-menu__accordion'
                >
                  <li className='nav-menu__accordion__item'>
                    <Link
                      href='/about'
                      className='nav-menu__accordion__item__link nav-menu__accordion__item__title'
                    >
                      {translations[lang].main_menu.about}
                    </Link>
                  </li>
                  <li className='nav-menu__accordion__item'>
                    <Link
                      href='/blog'
                      className='nav-menu__accordion__item__link'
                    >
                      {translations[lang].main_menu.blog}
                    </Link>
                  </li>
                  <li className='nav-menu__accordion__item'>
                    <Link
                      href='/shipping-and-payment'
                      className='nav-menu__accordion__item__link'
                    >
                      {translations[lang].main_menu.shipping}
                    </Link>
                  </li>
                  <li className='nav-menu__accordion__item'>
                    <Link
                      href='/purchase-returns'
                      className='nav-menu__accordion__item__link'
                    >
                      {translations[lang].main_menu.returns}
                    </Link>
                  </li>
                </motion.ul>
              )}
            </AnimatePresence>
          </li>
          <li className={`nav-menu__list__item`}>
            <button
              className={`btn-reset nav-menu__list__item__btn`}
              onMouseEnter={handleShowContactsList}
            >
              {translations[lang].main_menu.contacts}
            </button>
            <AnimatePresence>
              {showContactsList && (
                <motion.ul
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className='list-rest nav-menu__accordion'
                >
                  <li className='nav-menu__accordion__item'>
                    <a
                      href='tel:+79141500852'
                      className='nav-menu__accordion__item__link nav-menu__accordion__item__title'
                    >
                      +7 (914) 150 08 52
                    </a>
                  </li>
                  <li className='nav-menu__accordion__item'>
                    <a
                      href='mailto:example@mail.ru'
                      className='nav-menu__accordion__item__link'
                    >
                      example@mail.ru
                    </a>
                  </li>
                  <li className='nav-menu__accordion__item'>
                    <Link
                      href='https://t.me/RomanR69V'
                      className='nav-menu__accordion_item__link'
                    >
                      {translations[lang].main_menu.tg}
                    </Link>
                  </li>
                  <li className='nav-menu__accordion__item'>
                    <Link
                      href='https://farpost.ru'
                      className='nav-menu__accordion_item__link'
                    >
                      {translations[lang].main_menu.farpost}
                    </Link>
                  </li>
                </motion.ul>
              )}
            </AnimatePresence>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Menu
