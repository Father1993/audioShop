import { IMenuLinkItemProps } from '@/types/modules'
import Link from 'next/link'

const MenuLinkItem = ({
  item,
  handleRedirectToCatalog,
}: IMenuLinkItemProps) => {
  const onRedirect = () => handleRedirectToCatalog(item.href)

  return (
    <li>
      <Link
        href={item.href}
        className='nav-menu__accordion__item__list__item__link'
        onClick={onRedirect}
      >
        {item.text}
      </Link>
    </li>
  )
}

export default MenuLinkItem
