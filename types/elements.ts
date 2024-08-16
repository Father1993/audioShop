export interface IProductSubtitleProps {
  subtitleClassName?: string
  subtitleRectClassName?: string
}

export interface IProductItemActionsBtnProps {
  text: string
  iconClass: string
  callback?: VoidFunction
  withTooltip?: boolean
  marginBottom?: number
}

export interface IProductAvailableProps {
  vendorCode: string
  inStock: number
}
