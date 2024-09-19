import { AnimatePresence } from 'framer-motion'
import { useCategoryFilter } from '@/hooks/useCategoryFilter'
import { useClickUOutside } from '@/hooks/useClickOutside'
import { useLang } from '@/hooks/useLang'
import CatalogFilterList from './CatalogFilterList'
import styles from '@/styles/catalog/index.module.scss'

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
      <button
        className={`btn-reset ${styles.catalog__filters__btn} ${styles.bg_category} ${open ? styles.is_open : ''}`}
        onClick={toggle}
      >
        {option ? (
          <span className={styles.catalog__filters__btn__inner}>
            <span className={styles.catalog__filters__btn__text}>
              {translations[lang].catalog.categories}
            </span>
            <span className={styles.catalog__filters__btn__info}>{option}</span>
          </span>
        ) : (
          translations[lang].catalog.categories
        )}
      </button>
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
