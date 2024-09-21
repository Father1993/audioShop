'use client'
import { ISelectedSizes } from '@/types/common'
import { setSizeTableSizes, sizeTable } from '.'

export const $sizeTableSizes = sizeTable
  .createStore({} as ISelectedSizes)
  .on(setSizeTableSizes, (_, sizes) => sizes)
