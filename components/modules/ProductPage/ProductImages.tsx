import Slider from 'react-slick'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import ProductImagesItem from './ProductImagesItem'
import styles from '@/styles/product/index.module.scss'

const ProductImages = ({
  images,
}: {
  images: {
    src: string
    alt: string
    id: string
  }[]
}) => {
  const isMedia1420 = useMediaQuery(1420)
  const isMedia1040 = useMediaQuery(1040)
  const isMedia520 = useMediaQuery(520)
  const isMedia420 = useMediaQuery(420)
  const imgSize = isMedia1040 ? 230 : isMedia1420 ? 280 : 480
  const slideImgSize = isMedia420 ? 280 : 432

  const settings = {
    dots: false,
    infinite: true,
    slidesToScroll: 1,
    variableWidth: true,
    speed: 500,
    autoplay: true,
    arrows: false,
  }

  return (
    <>
      {!isMedia520 && (
        <ul className={`list-reset ${styles.product__top__images}`}>
          {images.map((img) => (
            <ProductImagesItem key={img.id} image={img} imgSize={imgSize} />
          ))}
        </ul>
      )}
      {isMedia520 && (
        <Slider {...settings} className={styles.product__top__images__slider}>
          {images.map((img) => (
            <ProductImagesItem
              key={img.id}
              image={img}
              imgSize={slideImgSize}
            />
          ))}
        </Slider>
      )}
    </>
  )
}

export default ProductImages
