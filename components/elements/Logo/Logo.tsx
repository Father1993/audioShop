import Link from 'next/link'

const Logo = () => (
  <Link className='logo' href='/'>
    <img
      className='logo__img'
      src='/img/logo.png'
      alt='Magnitola.ru Logo'
      style={{ width: 270 }}
    />
  </Link>
)

export default Logo
