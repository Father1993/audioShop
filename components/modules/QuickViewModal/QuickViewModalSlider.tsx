/* eslint-disable @next/next/no-img-element */
import Slider from 'react-slick'
import QuickViewModalSliderArrow from '@/components/elements/QuickViewModalSliderArrow/QuickViewModalSliderArrow'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import styles from '@/styles/quick-view-modal/index.module.scss'
import { IProduct } from '@/types/common'

const QuickViewModalSlider = ({ images }: { images: IProduct['images'] }) => {
  const isMedia1070 = useMediaQuery(1070)
  const isMedia890 = useMediaQuery(890)

  const settings = {
    dots: true,
    infinite: true,
    slidesToScroll: 1,
    variableWidth: true,
    speed: 500,
    dotsClass: `list-reset ${styles.modal__left__slider__slide__dots} quick-modal-dots`,
    nextArrow: <QuickViewModalSliderArrow directionClassName={styles.next} />,
    prevArrow: <QuickViewModalSliderArrow directionClassName={styles.prev} />,
    appendDots: (dots: React.ReactNode) => <ul>{dots}</ul>,
    customPaging: () => (
      <button
        className={`btn-reset ${styles.modal__left__slider__slide__dot}`}
      />
    ),
  }

  return (
    <Slider {...settings} className={styles.modal__left__slider}>
      {images.map((item, idx) => (
        <div
          key={idx}
          style={{ width: isMedia890 ? 270 : isMedia1070 ? 350 : 480 }}
          className={styles.modal__left__slider__slide}
        >
          <img src={item.url} alt={item.desc} />
        </div>
      ))}
    </Slider>
  )
}

export default QuickViewModalSlider
