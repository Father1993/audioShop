import CatalogLayout from '@/components/layouts/CatalogLayout'

/* eslint-disable max-len */
export const metadata = {
  title: 'Magnitola.ru | Каталог',
  description:
    'Сравните лучшие аудиотехники для автомобилей в нашем интернет-магазине. Мы предлагаем широкий выбор автомагнитол, динамиков, сабвуферов и аксессуаров, чтобы вы могли выбрать идеальное решение для вашего автомобиля. Узнайте о характеристиках, ценах и отзывах, чтобы сделать осознанный выбор. Доставка по всей стране! Установка автозвука в Хабаровске',
  keywords:
    'сравнение аудиотехники, автомагнитолы, динамики для автомобилей, сабвуферы, аксессуары для аудиосистем, интернет-магазин аудиотехники, лучшие аудиосистемы, характеристики аудиотехники, отзывы о аудиотехнике, установка аудиосистем, доставка аудиотехники, аудиотехника для автомобилей',
}

export default function ComparisonRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <CatalogLayout>{children}</CatalogLayout>
}