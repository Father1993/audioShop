import { useLang } from '@/hooks/useLang'
import Link from 'next/link'

const ContactsListItems = () => {
  const { lang, translations } = useLang()

  return (
    <>
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
          className='nav-menu__accordion__item__link'
        >
          {translations[lang].main_menu.tg}
        </Link>
      </li>
      <li className='nav-menu__accordion__item'>
        <Link
          href='https://farpost.ru'
          className='nav-menu__accordion__item__link'
        >
          {translations[lang].main_menu.farpost}
        </Link>
      </li>
    </>
  )
}

export default ContactsListItems
