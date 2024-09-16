import ComparisonLayout from '@/components/layouts/ComparisonLayout'

/* eslint-disable max-len */
export const metadata = {
  title: 'Сравнение товаров - Аудиотехника для автомобилей',
  description:
    'Широкий выбор автомагнитол, динамиков, сабвуферов и аксессуаров для вашего автомобиля. Качественная аудиотехника от ведущих производителей. Удобный поиск, сравнение характеристик и цен. Доставка по всей России, установка в Хабаровске.',
  keywords:
    'аудиотехника, автомагнитолы, динамики для автомобилей, сабвуферы, аксессуары для аудиосистем, интернет-магазин аудиотехники, лучшие аудиосистемы, характеристики аудиотехники, отзывы о аудиотехнике, установка аудиосистем, доставка аудиотехники, аудиотехника для автомобилей',
}

export default function ComparisonRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <ComparisonLayout>{children}</ComparisonLayout>
}
