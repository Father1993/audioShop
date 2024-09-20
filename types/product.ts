export interface IProductPageProps {
  productId: string
  category: string
}

export interface IProductImagesItemProps {
  image: { src: string; alt: string; id: string }
  imgSize: number
}
