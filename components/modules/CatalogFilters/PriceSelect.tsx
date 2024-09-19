import { AnimatePresence, motion } from 'framer-motion'
import { useClickOutside } from '@/hooks/useClickOutside'
import { useLang } from '@/hooks/useLang'
import { usePriceFilter } from '@/hooks/usePriceFilter'
import SelectBtn from './SelectBtn'
import { basePropsForMotion } from '@/constants/motion'
import styles from '@/styles/catalog/index.module.scss'

const PriceSelect = ({
  handleApplyFiltersWithPrice,
}: {
  handleApplyFiltersWithPrice: (arg0: string, arg1: string) => void
}) => {
  const {
    setPriceFrom,
    setPriceTo,
    priceFrom,
    priceTo,
    setPriceInfo,
    priceInfo,
    priceFromInfo,
    priceToInfo,
    handleChangePriceFrom,
    handleChangePriceTo,
  } = usePriceFilter()
  const { lang, translations } = useLang()
  const { open, toggle, ref, setOpen } = useClickOutside()

  const handleSelectPrice = () => {
    const validPriceFrom = +priceFrom > 10000 ? '5000' : priceFrom
    const validPriceTo = +priceTo > 10000 ? '10000' : priceTo

    setPriceFrom(validPriceFrom)
    setPriceTo(validPriceTo)
    setPriceInfo(
      `${priceFromInfo(validPriceFrom)} ${priceToInfo(validPriceTo)}`
    )

    setOpen(false)
    handleApplyFiltersWithPrice(validPriceFrom, validPriceTo)
  }

  return (
    <div className={styles.catalog__filters__select} ref={ref}>
      <SelectBtn
        open={open}
        toggle={toggle}
        defaultText={translations[lang].catalog.price}
        dynamicText={priceInfo}
      />
      <AnimatePresence>
        {open && (
          <motion.ul
            className={`list-reset ${styles.catalog__filters__list}`}
            {...basePropsForMotion}
          >
            <li
              className={`${styles.catalog__filters__list__item} ${styles.catalog__filters__list__item__price}`}
            >
              <div className={styles.catalog__filters__list__item__inputs}>
                <label>
                  <span>{translations[lang].catalog.from}</span>
                  <input
                    type='text'
                    placeholder='130 ₽'
                    value={priceFrom}
                    onChange={handleChangePriceFrom}
                  />
                </label>
                <label>
                  <span>{translations[lang].catalog.to}</span>
                  <input
                    type='text'
                    placeholder='6 500 ₽'
                    value={priceTo}
                    onChange={handleChangePriceTo}
                  />
                </label>
              </div>
              <button
                className={`btn-reset ${styles.catalog__filters__list__item__done}`}
                disabled={!priceFrom || !priceTo}
                onClick={handleSelectPrice}
              >
                {translations[lang].catalog.done}
              </button>
            </li>
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}

export default PriceSelect
