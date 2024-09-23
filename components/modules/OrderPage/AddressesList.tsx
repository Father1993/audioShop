import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import {
  $chosenPickupAddressData,
  $magnitolaDataByCity,
  $shouldLoadMagnitolaData,
} from '@/context/order/state'
import { useLang } from '@/hooks/useLang'
import { useUnit } from 'effector-react'
import { IAddressesListProps, IMagnitolaAddressData } from '@/types/order'
import {
  getMagnitolaOfficesByCityFx,
  setChosenPickupAddressData,
  setShouldLoadMagnitolaData,
} from '@/context/order'
import { useTTMap } from '@/hooks/useTTmap'
import PickupAddressItem from './PickupAddressItem'
import styles from '@/styles/order/index.module.scss'

const AddressesList = ({
  listClassName,
  handleSelectAddressByMarkers,
}: IAddressesListProps) => {
  const { lang, translations } = useLang()
  const magnitolaDataByCity = useUnit($magnitolaDataByCity)
  const chosenPickupAddressData = useUnit($chosenPickupAddressData)
  const shouldLoadMagnitolaData = useUnit($shouldLoadMagnitolaData)
  const loadMagnitolaDataSpinner = useUnit(getMagnitolaOfficesByCityFx.pending)
  const { handleSelectAddress } = useTTMap()

  const handleChosenAddressData = (data: Partial<IMagnitolaAddressData>) => {
    setShouldLoadMagnitolaData(false)
    setChosenPickupAddressData(data)
  }

  return (
    <>
      {shouldLoadMagnitolaData && (
        <>
          {loadMagnitolaDataSpinner && (
            <span
              className={styles.order__list__item__delivery__inner__spinner}
            >
              <FontAwesomeIcon icon={faSpinner} spin color='#fff' size='2x' />
            </span>
          )}
          {!loadMagnitolaDataSpinner && (
            <ul className={`list-reset ${listClassName}`}>
              {magnitolaDataByCity?.length ? (
                magnitolaDataByCity.map((item) => (
                  <PickupAddressItem
                    key={item.place_id}
                    addressItem={item}
                    handleChosenAddressData={handleChosenAddressData}
                    handleSelectAddress={
                      handleSelectAddressByMarkers || handleSelectAddress
                    }
                  />
                ))
              ) : (
                <span>{translations[lang].common.nothing_is_found}</span>
              )}
            </ul>
          )}
        </>
      )}
      {!!chosenPickupAddressData.address_line1 && !shouldLoadMagnitolaData && (
        <div className={styles.order__list__item__delivery__pickup__choose}>
          <span>{chosenPickupAddressData.address_line1}</span>
          <span>
            {chosenPickupAddressData.address_line2},{' '}
            {chosenPickupAddressData.city}
          </span>
        </div>
      )}
    </>
  )
}

export default AddressesList
