import styles from '@/styles/catalog/index.module.scss'
import CategorySelect from './CategorySelect'

const CatalogFilters = () => (
  <div className={styles.catalog__filters}>
    <div className={styles.catalog__filters__top}>
      <div className={styles.catalog__filters__top__left}>
        <CategorySelect />
      </div>
    </div>
  </div>
)

export default CatalogFilters
