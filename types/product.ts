export interface IProductPageProps {
  productId: string
  category: string
}

export interface IProductImagesItemProps {
  image: { url: string; desc: string }
  imgSize: number
}

export interface IProductInfoAccordionProps {
  children: React.ReactNode
  title: string
}
