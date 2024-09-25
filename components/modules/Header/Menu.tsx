/* eslint-disable @next/next/no-img-element */
import { useState } from 'react'
import { useUnit } from 'effector-react'
import { AnimatePresence, motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { AllowedLangs } from '@/constants/lang'
import Logo from '@/components/elements/Logo/Logo'
import { setLang } from '@/context/lang'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { useLang } from '@/hooks/useLang'
import { removeOverflowHiddenFromBody } from '@/lib/utils/common'
import Accordion from '../Accordion/Accordion'
import MenuLinkItem from './MenuLinkItem'
import BuyersListItems from './BuyersListItems'
import ContactsListItems from './ContactsListItems'
import { $menuIsOpen } from '@/context/modals/state'
import { closeMenu } from '@/context/modals'

const Menu = () => {
  const [activeListId, setActiveListId] = useState(0)
  const menuIsOpen = useUnit($menuIsOpen)
  const { lang, translations } = useLang()
  const pathname = usePathname()
  const isMedia800 = useMediaQuery(800)
  const isMedia640 = useMediaQuery(640)

  const handleSwitchLang = (lang: string) => {
    setLang(lang as AllowedLangs)
    localStorage.setItem('lang', JSON.stringify(lang))
  }

  const handleSwitchLangToRu = () => handleSwitchLang('ru')
  const handleSwitchLangToEn = () => handleSwitchLang('en')

  const handleShowCatalogList = () => setActiveListId(1)
  const handleShowBuyersList = () => setActiveListId(2)
  const handleShowContactsList = () => setActiveListId(3)

  const handleCloseMenu = () => {
    removeOverflowHiddenFromBody()
    closeMenu()
    setActiveListId(0)
  }

  const handleRedirectToCatalog = (path: string) => {
    if (pathname.includes('/catalog')) {
      window.history.pushState({ path }, '', path)
      window.location.reload()
    }
    handleCloseMenu()
  }

  const audioLinks = [
    {
      id: 1,
      text: translations[lang].comparison['audio_player'] + ` 1-din (50мм)`,
      href: '/catalog/audio?offset=0&type=1din',
    },
    {
      id: 2,
      text: translations[lang].comparison['audio_player'] + ` 2-din (178мм)`,
      href: '/catalog/audio?offset=0&type=2din',
    },
  ]

  const subwoofersLinks = [
    {
      id: 1,
      text: translations[lang].main_menu.active,
      href: '/catalog/subwoofers?offset=0&type=active',
    },
    {
      id: 2,
      text: translations[lang].main_menu.passive,
      href: '/catalog/subwoofers?offset=0&type=passive',
    },
  ]

  const speakersLinks = [
    {
      id: 1,
      text: translations[lang].main_menu.component,
      href: '/catalog/speakers?offset=0&type=component',
    },
    {
      id: 2,
      text: translations[lang].main_menu.coaxial,
      href: '/catalog/speakers?offset=0&type=coaxial',
    },
    {
      id: 3,
      text: translations[lang].main_menu.fullRange,
      href: '/catalog/speakers?offset=0&type=fullRange',
    },
  ]

  const accessoriesLinks = [
    {
      id: 1,
      text: translations[lang].comparison.videoRecorder,
      href: '/catalog/accessories?offset=0&type=video-recorder',
    },
    {
      id: 2,
      text: translations[lang].main_menu.charger,
      href: '/catalog/accessories?offset=0&type=charger',
    },
    {
      id: 3,
      text: translations[lang].main_menu.fastening,
      href: '/catalog/accessories?offset=0&type=fastening',
    },
  ]

  return (
    <nav className={`nav-menu ${menuIsOpen ? 'open' : 'close'}`}>
      <div className='container nav-menu__container'>
        <div
          className={`nav-menu__logo ${menuIsOpen ? 'open' : ''}`}
          onClick={handleCloseMenu}
        >
          <Logo />
        </div>
        <img
          className={`nav-menu__bg ${menuIsOpen ? 'open' : ''}`}
          src={`/img/menu-bg${isMedia800 ? '-small' : ''}.png`}
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
          {!isMedia800 && (
            <li className={`nav-menu__list__item`}>
              <button
                className={`btn-reset nav-menu__list__item__btn`}
                onMouseEnter={handleShowCatalogList}
              >
                {translations[lang].main_menu.catalog}
              </button>
              <AnimatePresence>
                {activeListId === 1 && (
                  <motion.ul
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className='list-reset nav-menu__accordion'
                  >
                    <li className='nav-menu__accordion__item'>
                      <Accordion
                        title={translations[lang].main_menu.audio}
                        titleClass='btn-reset nav-menu__accordion__item__title'
                      >
                        <ul className='list-reset nav-menu__accordion__item__list'>
                          {audioLinks.map((item) => (
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
                        title={translations[lang].main_menu.subwoofers}
                        titleClass='btn-reset nav-menu__accordion__item__title'
                      >
                        <ul className='list-reset nav-menu__accordion__item__list'>
                          {subwoofersLinks.map((item) => (
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
                        title={translations[lang].main_menu.speakers}
                        titleClass='btn-reset nav-menu__accordion__item__title'
                      >
                        <ul className='list-reset nav-menu__accordion__item__list'>
                          {speakersLinks.map((item) => (
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
                  </motion.ul>
                )}
              </AnimatePresence>
            </li>
          )}
          <li className={`nav-menu__list__item`}>
            {!isMedia640 && (
              <button
                className={`btn-reset nav-menu__list__item__btn`}
                onMouseEnter={handleShowBuyersList}
              >
                {translations[lang].main_menu.buyers}
              </button>
            )}
            {!isMedia640 && (
              <AnimatePresence>
                {activeListId === 2 && (
                  <motion.ul
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className='list-reset nav-menu__accordion'
                  >
                    <BuyersListItems />
                  </motion.ul>
                )}
              </AnimatePresence>
            )}

            {isMedia640 && (
              <Accordion
                title={translations[lang].main_menu.buyers}
                titleClass='btn-reset nav-menu__list__item__btn'
              >
                <ul className='list-reset nav-menu__accordion__item__list'>
                  <BuyersListItems />
                </ul>
              </Accordion>
            )}
          </li>
          <li className={`nav-menu__list__item`}>
            {!isMedia640 && (
              <button
                className={`btn-reset nav-menu__list__item__btn`}
                onMouseEnter={handleShowContactsList}
              >
                {translations[lang].main_menu.contacts}
              </button>
            )}
            {!isMedia640 && (
              <AnimatePresence>
                {activeListId === 3 && (
                  <motion.ul
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className='list-reset nav-menu__accordion'
                  >
                    <ContactsListItems />
                  </motion.ul>
                )}
              </AnimatePresence>
            )}

            {isMedia640 && (
              <Accordion
                title={translations[lang].main_menu.contacts}
                titleClass='btn-reset nav-menu__list__item__btn'
              >
                <ul className='list-reset nav-menu__accordion__item__list'>
                  <ContactsListItems />
                </ul>
              </Accordion>
            )}
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Menu
