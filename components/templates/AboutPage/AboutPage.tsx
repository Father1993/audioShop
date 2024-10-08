'use client'
import Breadcrumbs from '@/components/modules/Breadcrumbs/Breadcrumbs'
import { useBreadcrumbs } from '@/hooks/useBreadcrumbs'
import { useLang } from '@/hooks/useLang'
import styles from '@/styles/about/index.module.scss'

const AboutPage = () => {
  const { lang, translations } = useLang()
  const { getDefaultTextGenerator, getTextGenerator } = useBreadcrumbs('about')

  return (
    <main>
      <Breadcrumbs
        getDefaultTextGenerator={getDefaultTextGenerator}
        getTextGenerator={getTextGenerator}
      />
      <section className={styles.about}>
        <div className='container'>
          <h1>{translations[lang].main_menu.about}</h1>
          <h2>
            Добро пожаловать в <strong>Magnitola.ru</strong> — ваш надежный
            интернет-магазин автомобильной аудиотехники! Мы предлагаем широкий
            ассортимент высококачественных автомагнитол, динамиков, сабвуферов и
            аксессуаров, чтобы вы могли наслаждаться любимой музыкой в вашем
            автомобиле.
          </h2>
          <h3>
            Наша миссия — предоставить вам лучшие решения для аудиосистем в
            автомобилях. Мы стремимся к тому, чтобы каждый наш клиент нашел
            идеальный продукт, соответствующий его потребностям и стилю жизни.
            Мы понимаем, что качественный звук — это не просто удовольствие, а
            важная часть вашего опыта вождения.
          </h3>
          <ul>
            <li>
              Широкий ассортимент:
              <p>
                - Мы предлагаем только проверенные и качественные товары от
                ведущих производителей. У нас вы найдете все, что нужно для
                создания идеальной аудиосистемы
              </p>
            </li>
            <li>
              Конкурентные цены:
              <p>
                - Мы стремимся предложить лучшие цены на рынке, чтобы каждый мог
                позволить себе качественную аудиотехнику
              </p>
            </li>
            <li>
              Профессиональная поддержка:
              <p>
                - Наша команда экспертов всегда готова помочь вам с выбором и
                ответить на все ваши вопросы. Мы ценим каждого клиента и готовы
                предложить индивидуальный подход
              </p>
            </li>
            <li>
              Удобный сервис:
              <p>
                - Мы обеспечиваем быструю доставку и простое оформление заказа,
                чтобы вы могли наслаждаться покупками без лишних хлопот
              </p>
            </li>
          </ul>

          <h4>Почему выбирают нас?</h4>
          <p>
            Мы — команда увлеченных профессионалов, которые любят свою работу и
            стремятся к совершенству. Каждый из нас имеет богатый опыт в области
            аудиотехники и готов поделиться своими знаниями с вами. Мы постоянно
            следим за новыми тенденциями и технологиями, чтобы предложить вам
            только самое лучшее.
          </p>
          <h5>
            <strong>Magnitola.ru</strong> — ваш надежный партнер в мире
            автомобильной аудиотехники!
          </h5>
          <h6>
            Мы гордимся тем, что наши клиенты остаются довольны нашими услугами.
            Мы регулярно получаем положительные отзывы о нашей продукции и
            обслуживании. Ваше мнение важно для нас, и мы всегда готовы
            выслушать ваши предложения и замечания. Мы стремимся к постоянному
            улучшению и готовы адаптироваться к вашим потребностям.
          </h6>
        </div>
      </section>
    </main>
  )
}

export default AboutPage
