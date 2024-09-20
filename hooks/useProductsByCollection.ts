/* eslint-disable indent */
import { useUnit } from 'effector-react'
import { $products } from '@/context/goods/state'
import { useLang } from './useLang'
import { capitalizeFirsLetter } from '@/lib/utils/common'
import { loadProductsByFilterFx } from '@/context/goods'

export const useProductsByCollection = (collection: string) => {
  const products = useUnit($products)
  const { lang, translations } = useLang()
  const spinner = useUnit(loadProductsByFilterFx.pending)
  const langText = translations[lang].product.collection_goods
  const capitalizedCollection = capitalizeFirsLetter(collection)
  const title =
    lang === 'ru'
      ? `${langText} «${capitalizedCollection}»`
      : [
          langText.slice(0, 17),
          ` «${capitalizedCollection}»`,
          langText.slice(17),
        ].join('')

  return { title, capitalizedCollection, products, spinner }
}
