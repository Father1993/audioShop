/* eslint-disable max-len */
import type { Metadata } from 'next'
import PagesLayout from '@/components/layouts/PagesLayout'
import './globalStyles/normalize.css'
import './globalStyles/globals.css'
import './globalStyles/header.css'
import './globalStyles/menu.css'
import './globalStyles/mobile-navbar.css'
import './globalStyles/catalog-menu.css'
import './globalStyles/search-modal.css'
import './globalStyles/cart-popup.css'
import './globalStyles/footer.css'
import './globalStyles/slick-theme.css'
import './globalStyles/slick.css'
import './globalStyles/auth-popup.css'
import './globalStyles/header-profile.css'
import './globalStyles/cookie-popup.css'
import './globalStyles/breadcrumbs.css'

export const metadata: Metadata = {
  title: 'Magnitola.ru | Музыка для твоей машины',
  description:
    'Автомагнитолы и авто-звук по самым низким ценам в городе! Огромный выбор брендов и моделей. Доставка и установка. Звук! Профессиональная установка автозвука в Хабаровске. Доставка. Качество. Гарантия. Премиум. Спешите купить',
  keywords:
    'автомагнитола, автозвук, купить автомагнитолу, установка авто-звука, автозвук в машину, тюнинг автозвука, автоакустика, усилитель для авто, сабвуфер, аксессуары для автозвука, автозвук в Хабаровске, автозвук под ключ, ремонт автомагнитолы, настройка автозвука, гарантия на автозвук, автозвук для начинающих, автозвук своими руками, автозвук для иномарок, автозвук для отечественных автомобилей, бюджетный автозвук, премиальный автозвук, лучшие автомагнитолы, установка автомагнитолы своими руками, автозвук в кредит, автозвук онлайн, автозвук для любого автомобиля, профессиональная установка автозвука, тюнинг автозвука любой сложности, автозвук по доступным ценам, широкий ассортимент автозвука, автозвук с гарантией, автозвук от производителя, автозвук для всех, автозвук для меломанов, автозвук для любителей басов, автозвук для комфортной езды, автозвук для улучшения звучания, автозвук для создания атмосферы, автозвук для любого бюджета, автозвук для любой машины, автозвук для всех случаев жизни',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <PagesLayout>{children}</PagesLayout>
}
