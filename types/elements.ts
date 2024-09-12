import { CustomArrowProps } from 'react-slick'

export interface IProductSubtitleProps {
  subtitleClassName?: string
  subtitleRectClassName?: string
}

export interface IProductItemActionsBtnProps {
  text: string
  iconClass: string
  spinner?: boolean
  callback?: VoidFunction
  withTooltip?: boolean
  marginBottom?: number
}

export interface IProductAvailableProps {
  vendorCode: string
  inStock: number
}

export interface IQuickViewModalSliderArrowProps extends CustomArrowProps {
  directionClassName: string
}

export interface IHeadingWithCountProps {
  count: number
  title: string
  spinner?: boolean
}
