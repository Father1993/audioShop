import { useUnit } from 'effector-react'
import { useLang } from '@/hooks/useLang'
import MainPageSection from './MainPageSection'
import { $newProducts } from '@/context/goods/state'
import { getNewProductsFx } from '@/context/goods'

const NewGoods = () => {
  const goods = useUnit($newProducts)
  const spinner = useUnit(getNewProductsFx.pending)
  const { lang, translations } = useLang()

  return (
    <MainPageSection
      title={translations[lang].main_page.new_title}
      goods={goods}
      spinner={spinner}
    />
  )
}

export default NewGoods
