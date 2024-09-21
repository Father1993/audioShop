'use client'
import {
  ICatalogCategoryOptions,
  ISizeOption,
  IColorOption,
} from '@/types/catalog'
import {
  catalog,
  setCatalogCategoryOptions,
  setSizesOptions,
  updateColorsOptionByCode,
  setColorsOptions,
  updateSizesOptionBySize,
  setSizes,
  setColors,
  setFiltersPopup,
} from '.'

export const $catalogCategoryOptions = catalog
  .createStore<ICatalogCategoryOptions>({})
  .on(setCatalogCategoryOptions, (_, options) => ({ ...options }))

export const $sizesOptions = catalog
  .createStore<ISizeOption[]>([
    { id: 1, size: '178x50mm', checked: false },
    { id: 2, size: '178x100mm', checked: false },
    { id: 3, size: '10 inches', checked: false },
    { id: 4, size: '12 inches', checked: false },
    { id: 5, size: '15 inches', checked: false },
    { id: 6, size: '10 см (4″)', checked: false },
    { id: 7, size: '13 см (5,25″)', checked: false },
    { id: 8, size: '16,5 см (6,5″)', checked: false },
    { id: 9, size: '20 см (8″)', checked: false },
    { id: 10, size: 'Овальные 6x9″', checked: false },
  ])
  .on(setSizesOptions, (_, options) => options)
  .on(updateColorsOptionByCode, (state, size) =>
    state.map((item) =>
      item.size === size ? { ...item, checked: true } : item
    )
  )

export const $colorsOptions = catalog
  .createStore<IColorOption[]>([
    { id: 1, colorCode: 'purpure', checked: false, colorText: '' },
    { id: 2, colorCode: 'yellow', checked: false, colorText: '' },
    { id: 3, colorCode: 'orange', checked: false, colorText: '' },
    { id: 4, colorCode: 'black', checked: false, colorText: '' },
    { id: 5, colorCode: 'white', checked: false, colorText: '' },
  ])
  .on(setColorsOptions, (_, options) => options)
  .on(updateSizesOptionBySize, (state, color) =>
    state.map((item) =>
      item.colorCode === color ? { ...item, checked: true } : item
    )
  )

export const $sizes = catalog
  .createStore<string[]>([])
  .on(setSizes, (_, sizes) => sizes)

export const $colors = catalog
  .createStore<string[]>([])
  .on(setColors, (_, colors) => colors)

export const $filtersPopup = catalog
  .createStore(false)
  .on(setFiltersPopup, (_, value) => value)
