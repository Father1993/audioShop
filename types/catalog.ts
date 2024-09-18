export type SearchParams = { [key: string]: string | string[] | undefined }

export interface IProductsPage {
  searchParams: SearchParams
  pageName: string
}

export interface ICatalogCategoryOptions {
  catalogCategoryOptions?: {
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
