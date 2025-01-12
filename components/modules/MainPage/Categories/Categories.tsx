'use client'
import Link from 'next/link'
import Image from 'next/image'
import AllLink from '@/components/elements/AllLink/AllLink'
import useImagePreloader from '@/hooks/useImagePreloader'
import { useLang } from '@/hooks/useLang'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import img1 from '@/public/img/audio-categories.webp'
import img1_mobile from '@/public/img/categories-img-1.webp'
import img2 from '@/public/img/categories-img-2.webp'
import img3 from '@/public/img/categories-img-3.webp'
import img4 from '@/public/img/categories-img-2-short.webp'
import img5 from '@/public/img/adapters.webp'
import styles from '@/styles/main-page/index.module.scss'
import MainSlider from '../MainSlider'

const Categories = () => {
  const { lang, translations } = useLang()
  const isMedia490 = useMediaQuery(490)
  const { handleLoadingImageComplete, imgSpinner } = useImagePreloader()
  const imgSpinnerClass = imgSpinner ? styles.img_loading : ''

  const images = [
    { src: img1, id: 1, title: translations[lang].main_page.category_audio },
    {
      src: img2,
      id: 2,
      title: translations[lang].main_page.category_accessories,
    },
    {
      src: img3,
      id: 3,
      title: translations[lang].main_page.category_speakers,
    },
    { src: img4, id: 4, title: translations[lang].main_page.category_audio },
    {
      src: img5,
      id: 5,
      title: translations[lang].main_page.adapters,
    },
  ]

  return (
    <section className={styles.categories}>
      <div className={`container ${styles.categories__container}`}>
        <h2 className={`site-title ${styles.categories__title}`}>
          {translations[lang].main_page.category_title}
        </h2>
        <div className={styles.categories__inner}>
          <AllLink />
          {!isMedia490 && (
            <>
              {/* Левая большая карточка */}
              <div className={styles.categories__left_col}>
                <Link
                  href='/catalog/audio'
                  className={`${styles.categories__main_card} ${styles.categories__img} ${imgSpinnerClass}`}
                >
                  {isMedia490 ? (
                    <Image
                      src={img1_mobile}
                      alt='Плееры и магнитолы'
                      className='transition-opacity opacity-0 duration'
                      onLoad={handleLoadingImageComplete}
                    />
                  ) : (
                    <Image
                      src={img1}
                      alt='Плееры и магнитолы'
                      className='transition-opacity opacity-0 duration'
                      onLoad={handleLoadingImageComplete}
                    />
                  )}

                  <span>{translations[lang].main_page.category_audio}</span>
                </Link>
              </div>

              {/* Правая колонка с сеткой */}
              <div className={styles.categories__right_col}>
                <Link
                  href='/catalog/subwoofers'
                  className={`${styles.categories__card} ${styles.categories__img} ${imgSpinnerClass}`}
                >
                  <Image
                    src={img2}
                    alt='Сабуферы'
                    className='transition-opacity opacity-0 duration'
                    onLoad={handleLoadingImageComplete}
                  />
                  <span>
                    {translations[lang].main_page.category_subwoofers}
                  </span>
                </Link>
                <Link
                  href='/catalog/accessories'
                  className={`${styles.categories__card} ${styles.categories__img} ${imgSpinnerClass}`}
                >
                  <Image
                    src={img3}
                    alt='Аксессуары'
                    className='transition-opacity opacity-0 duration'
                    onLoad={handleLoadingImageComplete}
                  />
                  <span>
                    {translations[lang].main_page.category_accessories}
                  </span>
                </Link>
                <Link
                  href='/catalog/speakers'
                  className={`${styles.categories__card} ${styles.categories__img} ${imgSpinnerClass}`}
                >
                  <Image
                    src={img4}
                    alt='Динамики'
                    className='transition-opacity opacity-0 duration'
                    onLoad={handleLoadingImageComplete}
                  />
                  <span>{translations[lang].main_page.category_speakers}</span>
                </Link>
                <Link
                  href='/catalog/accessories?offset=0&type=adapters'
                  className={`${styles.categories__card} ${styles.categories__img} ${imgSpinnerClass}`}
                >
                  <Image
                    src={img5}
                    alt='Переходники и адаптеры'
                    className='transition-opacity opacity-0 duration'
                    onLoad={handleLoadingImageComplete}
                  />
                  <span>{translations[lang].main_page.adapters}</span>
                </Link>
              </div>
            </>
          )}
          {isMedia490 && <MainSlider images={images} />}
        </div>
      </div>
    </section>
  )
}

export default Categories
