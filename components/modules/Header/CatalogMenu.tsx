'use client'
import { useState } from 'react'
import { useUnit } from 'effector-react'
import Link from 'next/link'
import { useLang } from '@/hooks/useLang'
import { AnimatePresence, motion } from 'framer-motion'
import { useMenuAnimation } from '@/hooks/useMenuAnimation'
import { removeOverflowHiddenFromBody } from '@/lib/utils/common'
import Header from './Header'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import CatalogMenuButton from './CatalogMenuButton'
import CatalogMenuList from './CatalogMenuList'
import Accordion from '../Accordion/Accordion'
import { closeCatalogMenu } from '@/context/modals'
import { $catalogMenuIsOpen } from '@/context/modals/state'

const CatalogMenu = () => {
  const catalogMenuIsOpen = useUnit($catalogMenuIsOpen)
  const [activeListId, setActiveListId] = useState(0)
  const { lang, translations } = useLang()
  const { itemVariants, sideVariants, popupZIndex } = useMenuAnimation(
    2,
    catalogMenuIsOpen
  )

  const isMedia450 = useMediaQuery(450)

  const handleCloseMenu = () => {
    removeOverflowHiddenFromBody()
    closeCatalogMenu()
    setActiveListId(0)
  }

  const isActiveList = (id: number) => activeListId === id

  const items = [
    {
      name: translations[lang].main_menu.audio,
      id: 1,
      items: [
        {
          title:
            translations[lang].comparison['audio_player'] + ` 1-din (50мм)`,
          href: '/catalog/audio?offset=0&type=1din',
          handleCloseMenu,
        },
        {
          title:
            translations[lang].comparison['audio_player'] + ` 2-din (178мм)`,
          href: '/catalog/audio?offset=0&type=2din',
          handleCloseMenu,
        },
      ],
      handler: () => setActiveListId(1),
    },
    {
      name: translations[lang].main_menu.subwoofers,
      id: 2,
      items: [
        {
          title: translations[lang].main_menu.active,
          href: '/catalog/subwoofers?offset=0&type=active',
          handleCloseMenu,
        },
        {
          title: translations[lang].main_menu.passive,
          href: '/catalog/subwoofers?offset=0&type=passive',
          handleCloseMenu,
        },
      ],
      handler: () => setActiveListId(2),
    },
    {
      name: translations[lang].main_menu.speakers,
      id: 3,
      items: [
        {
          title: translations[lang].main_menu.component,
          href: '/catalog/speakers?offset=0&type=component',
          handleCloseMenu,
        },
        {
          title: translations[lang].main_menu.coaxial,
          href: '/catalog/speakers?offset=0&type=coaxial',
          handleCloseMenu,
        },
        {
          title: translations[lang].main_menu.fullRange,
          href: '/catalog/speakers?offset=0&type=fullRange',
          handleCloseMenu,
        },
      ],
      handler: () => setActiveListId(3),
    },
    {
      name: translations[lang].main_menu.accessories,
      id: 4,
      items: [
        {
          title: translations[lang].comparison.videoRecorder,
          href: '/catalog/accessories?offset=0&type=video-recorder',
          handleCloseMenu,
        },
        {
          title: translations[lang].main_menu.charger,
          href: '/catalog/accessories?offset=0&type=charger',
          handleCloseMenu,
        },
        {
          title: translations[lang].main_menu.fastening,
          href: '/catalog/accessories?offset=0&type=fastening',
          handleCloseMenu,
        },
      ],
      handler: () => setActiveListId(4),
    },
  ]

  return (
    <div className='catalog-menu' style={{ zIndex: popupZIndex }}>
      <AnimatePresence>
        {catalogMenuIsOpen && (
          <motion.aside
            initial={{ width: 0 }}
            animate={{
              width: '100%',
            }}
            exit={{
              width: 0,
              transition: { delay: 0.7, duration: 0.3 },
            }}
            className='catalog-menu__aside'
          >
            <div className='catalog-menu__header'>
              <Header />
            </div>
            <motion.div
              className='catalog-menu__inner'
              initial='closed'
              animate='open'
              exit='closed'
              variants={sideVariants}
            >
              <motion.button
                className='btn-reset catalog-menu__close'
                variants={itemVariants}
                onClick={handleCloseMenu}
              />
              <motion.h2
                variants={itemVariants}
                className='catalog-menu__title'
              >
                {translations[lang].main_menu.catalog}
              </motion.h2>
              <ul className='list-reset catalog-menu__list'>
                {items.map(({ id, name, items, handler }) => {
                  const buttonProps = (isActive: boolean) => ({
                    handler: handler as VoidFunction,
                    name,
                    isActive,
                  })

                  const isCurrentList = (
                    showList: boolean,
                    currentId: number
                  ) => showList && id === currentId

                  return (
                    <motion.li
                      key={id}
                      variants={itemVariants}
                      className='catalog-menu__list__item'
                    >
                      {!isMedia450 && (
                        <>
                          {id === 1 && (
                            <CatalogMenuButton
                              {...buttonProps(isActiveList(1))}
                            />
                          )}
                          {id === 2 && (
                            <CatalogMenuButton
                              {...buttonProps(isActiveList(2))}
                            />
                          )}
                          {id === 3 && (
                            <CatalogMenuButton
                              {...buttonProps(isActiveList(3))}
                            />
                          )}
                          {id === 4 && (
                            <CatalogMenuButton
                              {...buttonProps(isActiveList(4))}
                            />
                          )}
                        </>
                      )}
                      {!isMedia450 && (
                        <AnimatePresence>
                          {isCurrentList(isActiveList(1), 1) && (
                            <CatalogMenuList items={items} />
                          )}
                          {isCurrentList(isActiveList(2), 2) && (
                            <CatalogMenuList items={items} />
                          )}
                          {isCurrentList(isActiveList(3), 3) && (
                            <CatalogMenuList items={items} />
                          )}
                          {isCurrentList(isActiveList(4), 4) && (
                            <CatalogMenuList items={items} />
                          )}
                        </AnimatePresence>
                      )}
                      {isMedia450 && (
                        <Accordion
                          title={name}
                          titleClass='btn-reset nav-menu__accordion__item__title'
                        >
                          <ul className='list-reset catalog__accordion__list'>
                            {items.map((item, i) => (
                              <li
                                key={i}
                                className='catalog__accordion__list__item'
                              >
                                <Link
                                  href={item.href}
                                  className='nav-menu__accordion__item__list__item__link'
                                  onClick={item.handleCloseMenu}
                                >
                                  {item.title}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </Accordion>
                      )}
                    </motion.li>
                  )
                })}
              </ul>
            </motion.div>
          </motion.aside>
        )}
      </AnimatePresence>
    </div>
  )
}
export default CatalogMenu
