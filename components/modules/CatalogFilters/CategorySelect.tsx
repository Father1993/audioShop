import { AnimatePresence } from 'framer-motion'
import { useCategoryFilter } from '@/hooks/useCategoryFilter'
import { useClickUOutside } from '@/hooks/useClickOutside'
import { useLang } from '@/hooks/useLang'
import CatalogFilterList from './CatalogFilterList'
import styles from '@/styles/catalog/index.module.scss'
import SelectBtn from './SelectBtn'

const CategorySelect = () => {
  const { translations, lang } = useLang()
  const { open, toggle, ref } = useClickUOutside()
  const {
    option,
    handleSelectAllCategories,
    currentOptions,
    setOption,
    allCategoriesTitle,
    catalogCategoryOptions,
  } = useCategoryFilter()
  return (
    <div ref={ref} className={styles.catalog__filters__select}>
      <SelectBtn
        open={open}
        toggle={toggle}
        bgClassName={styles.bg_category}
        defaultText={translations[lang].catalog.categories}
        dynamicText={option}
      />
      <AnimatePresence>
        {open && (
          <CatalogFilterList
            handleSelectAllCategories={handleSelectAllCategories}
            currentOptions={currentOptions}
            option={option}
            setOption={setOption}
            allCategoriesTitle={allCategoriesTitle}
            catalogCategoryOptions={catalogCategoryOptions}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

export default CategorySelect
