import { useEffect, useState } from 'react'
import { useUnit } from 'effector-react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { $courierTab, $pickupTab } from '@/context/order/state'
import { useLang } from '@/hooks/useLang'
import OrderTitle from './OrderTitle'
import TabControls from './TabControls'
import { setCourierTab, setPickupTab } from '@/context/order'
import { basePropsForMotion } from '@/constants/motion'
import { getGeolocationFx, setUserGeolocation } from '@/context/user'
import styles from '@/styles/order/index.module.scss'

const OrderDelivery = () => {
  const { lang, translations } = useLang()
  const pickupTab = useUnit($pickupTab)
  const courierTab = useUnit($courierTab)
  const [shouldLoadMap, setShouldLoadMap] = useState(false)

  const handlePickupTab = () => {
    if (pickupTab) {
      return
    }
    setPickupTab(true)
    setCourierTab(false)
  }

  const handleCourierTab = () => {
    if (courierTab) {
      return
    }
    setPickupTab(false)
    setCourierTab(true)
  }

  useEffect(() => {
    getUserGeolocation()
  }, [])

  const getUserGeolocation = () => {
    const success = async (pos: GeolocationPosition) => {
      const { latitude, longitude } = pos.coords

      const result = await getGeolocationFx({ lat: latitude, lon: longitude })

      if (!result) {
        return
      }

      setUserGeolocation(result.data)
      setShouldLoadMap(true)
    }

    const error = async (error: GeolocationPositionError) => {
      setShouldLoadMap(true)
      toast.error(`${error.code} ${error.message}`)
    }
    navigator.geolocation.getCurrentPosition(success, error)
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
            <h3>tab 1</h3>
          </motion.div>
        )}
        {courierTab && (
          <motion.div {...basePropsForMotion}>
            <h3>Tab 2</h3>
          </motion.div>
        )}
      </div>
    </>
  )
}

export default OrderDelivery
