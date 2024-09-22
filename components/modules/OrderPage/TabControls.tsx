import { ITabControlProps } from '@/types/order'
import styles from '@/styles/order/index.module.scss'

const TabControls = ({
  handleTab1,
  handleTab2,
  tab1Active,
  tab2Active,
  tab1Text,
  tab2Text,
}: ITabControlProps) => (
  <div className={`${styles.order__list__item__nav}`}>
    <button
      className={`btn-reset ${styles.order__list__item__nav__item} ${tab1Active ? styles.active : ''}`}
      onClick={handleTab1}
    >
      {tab1Text}
    </button>
    <button
      className={`btn-reset ${styles.order__list__item__nav__item} ${tab2Active ? styles.active : ''}`}
      onClick={handleTab2}
    >
      {tab2Text}
    </button>
  </div>
)

export default TabControls
