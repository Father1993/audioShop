'use client'
import Breadcrumbs from '@/components/modules/Breadcrumbs/Breadcrumbs'
import { useBreadcrumbs } from '@/hooks/useBreadcrumbs'
import { useLang } from '@/hooks/useLang'
import styles from '@/styles/blog/index.module.scss'

const BlogPage = () => {
  const { lang, translations } = useLang()
  const { getDefaultTextGenerator, getTextGenerator } = useBreadcrumbs('blog')

  return (
    <main>
      <Breadcrumbs
        getDefaultTextGenerator={getDefaultTextGenerator}
        getTextGenerator={getTextGenerator}
      />
      <section className={styles.about}>
        <div className='container'>
          <h1>{translations[lang].main_menu.blog}</h1>
          <h2>
            Хотите наслаждаться любимой музыкой в дороге? У нас вы найдете
            идеальную автомобильную магнитолу!
          </h2>
          <p>
            Ищете способ превратить свои поездки в настоящее музыкальное
            путешествие? В интернет-магазине magnitola.ru представлен широкий
            ассортимент современных аудиоплееров и магнитол для авто. У нас вы
            найдете устройства на любой вкус и бюджет: от классических моделей
            до многофункциональных мультимедийных систем с поддержкой последних
            технологий.
          </p>

          <h3>Преимущества наших магнитол:</h3>
          <ul>
            <li>
              Высокое качество звука: Наслаждайтесь кристально чистым звучанием
              ваших любимых треков.
            </li>
            <li>
              Широкие функциональные возможности: Подключение смартфона,
              поддержка различных форматов аудиофайлов, навигация и многое
              другое.
            </li>
            <li>
              Стильный дизайн: Наши магнитолы станут настоящим украшением вашего
              автомобиля.
            </li>
            <li>
              Простота установки: Установка наших устройств не требует
              специальных навыков.
            </li>
          </ul>

          <h4>Почему стоит выбрать magnitola.ru?!?</h4>
          <ul>
            <li>
              Большой выбор: У нас вы найдете магнитолы для любых автомобилей.
            </li>
            <li>
              Гарантия качества: Мы предлагаем только сертифицированную
              продукцию от ведущих производителей.
            </li>
            <li>
              Аттрактивные цены: У нас вы найдете магнитолу по выгодной цене.
            </li>
            <li>
              Быстрая доставка: Мы доставим ваш заказ в кратчайшие сроки в любой
              регион России.
            </li>
          </ul>
        </div>
      </section>
    </main>
  )
}

export default BlogPage
