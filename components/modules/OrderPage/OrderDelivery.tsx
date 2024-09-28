/* eslint-disable max-len */
/* eslint-disable indent */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useEffect, useState } from 'react'
import { useUnit } from 'effector-react'
import { motion } from 'framer-motion'
import '@tomtom-international/web-sdk-plugin-searchbox/dist/SearchBox.css'
import '@tomtom-international/web-sdk-maps/dist/maps.css'
import { $courierTab, $pickupTab } from '@/context/order/state'
import { useLang } from '@/hooks/useLang'
import OrderTitle from './OrderTitle'
import TabControls from './TabControls'
import {
  setChosenCourierAddressData,
  setChosenPickupAddressData,
  setCourierTab,
  setPickupTab,
} from '@/context/order'
import { basePropsForMotion } from '@/constants/motion'
import AddressesList from './AddressesList'
import { DEFAULT_PICKUP_ADDRESS } from '@/constants/addresses'
import styles from '@/styles/order/index.module.scss'

const OrderDelivery = () => {
  const { lang, translations } = useLang()
  const pickupTab = useUnit($pickupTab)
  const courierTab = useUnit($courierTab)
  const [courierAddress, setCourierAddress] = useState('')

  useEffect(() => {
    setChosenPickupAddressData(DEFAULT_PICKUP_ADDRESS)
  }, [])

  const handlePickupTab = () => {
    if (pickupTab) return
    setPickupTab(true)
    setCourierTab(false)
  }

  const handleCourierTab = () => {
    if (courierTab) return
    setPickupTab(false)
    setCourierTab(true)
  }

  const validateAddress = (address: string) => {
    const addressRegex = /^[а-яА-Я0-9\s,./-]+$/
    if (!addressRegex.test(address)) {
      return false
    }
    if (address.length < 5) {
      return false
    }
    return true
  }

  const handleCourierAddressChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newAddress = e.target.value
    setCourierAddress(newAddress)
    if (validateAddress(newAddress)) {
      setChosenCourierAddressData({
        address_line1: newAddress,
        city: 'Хабаровск',
      })
    } else {
      setChosenCourierAddressData({})
    }
  }
  return (
    <>
      <OrderTitle orderNumber='2' text={translations[lang].order.delivery} />
      <div className={styles.order__list__item__delivery}>
        <TabControls
          handleTab1={handlePickupTab}
          handleTab2={handleCourierTab}
          tab1Active={pickupTab}
          tab2Active={courierTab}
          tab1Text={translations[lang].order.pickup_free}
          tab2Text={translations[lang].order.courier_delivery}
        />
        {pickupTab && (
          <motion.div
            className={styles.order__list__item__delivery__pickup}
            {...basePropsForMotion}
          >
            <div className={styles.order__list__item__delivery__inner}>
              <AddressesList
                listClassName={styles.order__list__item__delivery__list}
              />
            </div>
            <div className={styles.order__list__item__delivery__map}>
              <iframe
                src='https://yandex.ru/map-widget/v1/?um=constructor%3A2800beec5eaff4e61f5833bcb508b38f2a9675fef1866a1c6d468a55c71703f3&amp;source=constructor'
                width='100%'
                height='100%'
                frameBorder='0'
              />
            </div>
          </motion.div>
        )}
        {courierTab && (
          <motion.div {...basePropsForMotion}>
            <div className={styles.order__list__item__delivery__courier}>
              <p>{translations[lang].order.courier_delivery_note}</p>
              <input
                type='text'
                value={courierAddress}
                onChange={handleCourierAddressChange}
                placeholder={translations[lang].order.enter_address}
                className={styles.order__list__item__delivery__courier__input}
              />
            </div>
          </motion.div>
        )}
      </div>
    </>
  )
}

export default OrderDelivery
