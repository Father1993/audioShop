export type SearchParams = { [key: string]: string | string[] | undefined }

export interface IProductsPage {
  searchParams: SearchParams
  pageName: string
}

export interface ICatalogCategoryOptions {
  rootCategoryOptions?: {
    id: number
    title: string
    href: string
  }[]
  audioCategoryOptions?: ICategoryOptions[]
  subwooferCategoryOptions?: ICategoryOptions[]
  speakerCategoryOptions?: ICategoryOptions[]
  accessoriesCategoryOptions?: ICategoryOptions[]
}

export interface ICategoryOptions {
  id: number
  title: string
  filterHandler: VoidFunction
}

export interface ICategoryFilterListProps {
  handleSelectAllCategories: VoidFunction
  currentOptions: ICategoryOptions[]
  option: string
  setOption: (arg0: string) => void
  allCategoriesTitle: string
  catalogCategoryOptions: ICatalogCategoryOptions
  mobileClassName?: string
}

export interface ISelectItemProps {
  item: ICategoryOptions
  isActive: boolean
  setOption: (arg0: string) => void
  mobileClassName?: string
}
