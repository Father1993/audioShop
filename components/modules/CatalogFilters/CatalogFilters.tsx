import { ICatalogFiltersProps } from '@/types/catalog'
import CategorySelect from './CategorySelect'
import PriceSelect from './PriceSelect'
import SizesSelect from './SizesSelect'
import ColorsSelect from './ColorsSelect'
import styles from '@/styles/catalog/index.module.scss'

const CatalogFilters = ({
  handleApplyFiltersWithPrice,
  handleApplyFiltersWithSizes,
  handleApplyFiltersWithColors,
}: ICatalogFiltersProps) => (
  <div className={styles.catalog__filters}>
    <div className={styles.catalog__filters__top}>
      <div className={styles.catalog__filters__top__left}>
        <CategorySelect />
        <PriceSelect
          handleApplyFiltersWithPrice={handleApplyFiltersWithPrice}
        />
        <SizesSelect
          handleApplyFiltersWithSizes={handleApplyFiltersWithSizes}
        />
        <ColorsSelect
          handleApplyFiltersWithColors={handleApplyFiltersWithColors}
        />
      </div>
    </div>
  </div>
)

export default CatalogFilters
