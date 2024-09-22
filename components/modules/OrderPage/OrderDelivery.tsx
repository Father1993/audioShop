import { MutableRefObject, useEffect, useRef, useState } from 'react'
import { useUnit } from 'effector-react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import '@tomtom-international/web-sdk-plugin-searchbox/dist/SearchBox.css'
import '@tomtom-international/web-sdk-maps/dist/maps.css'
import { $courierTab, $pickupTab } from '@/context/order/state'
import { useLang } from '@/hooks/useLang'
import OrderTitle from './OrderTitle'
import TabControls from './TabControls'
import { setCourierTab, setMapInstance, setPickupTab } from '@/context/order'
import { basePropsForMotion } from '@/constants/motion'
import { getGeolocationFx, setUserGeolocation } from '@/context/user'
import { $userGeolocation } from '@/context/user/state'
import AddressesList from './AddressesList'
import styles from '@/styles/order/index.module.scss'
import { addScriptToHead } from '@/lib/utils/common'

const OrderDelivery = () => {
  const { lang, translations } = useLang()
  const pickupTab = useUnit($pickupTab)
  const courierTab = useUnit($courierTab)
  const [shouldLoadMap, setShouldLoadMap] = useState(false)
  const userGeolocation = useUnit($userGeolocation)
  const mapRef = useRef() as MutableRefObject<HTMLDivElement>
  const labelRef = useRef() as MutableRefObject<HTMLLabelElement>

  const handlePickupTab = () => {
    if (pickupTab) {
      return
    }

    setPickupTab(true)
    setCourierTab(false)
    handleLoadMap()
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

  useEffect(() => {
    if (shouldLoadMap) {
      addScriptToHead(
        'https://api.tomtom.com/maps-sdk-for-web/cdn/6.x/6.1.2-public-preview.15/services/services-web.min.js'
      )
      addScriptToHead(
        'https://api.tomtom.com/maps-sdk-for-web/cdn/plugins/SearchBox/3.1.3-public-preview.0/SearchBox-web.js'
      )
      handleLoadMap()
    }
  }, [shouldLoadMap])

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

  const handleLoadMap = async (
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    initialSearchValue = '',
    initialPosition = {
      lat: 48.4261481667904,
      lng: 135.10673314670237,
    },
    withMarker = false
  ) => {
    const ttMaps = await import(`@tomtom-international/web-sdk-maps`)

    const map = ttMaps.map({
      key: process.env.NEXT_PUBLIC_TOMTOM_API_KEY as string,
      container: mapRef.current,
      center: initialPosition,
      zoom: 14,
    })

    setMapInstance(map)

    const options = {
      searchOptions: {
        key: process.env.NEXT_PUBLIC_TOMTOM_API_KEY,
        language: 'ru-RU',
        limit: 5,
      },
      autocompleteOptions: {
        key: process.env.NEXT_PUBLIC_TOMTOM_API_KEY,
        language: 'ru-RU',
      },
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    const ttSearchBox = new tt.plugins.SearchBox(tt.services, options)

    const searchBoxHTML = ttSearchBox.getSearchBoxHTML()
    searchBoxHTML.classList.add('delivery-search-input')
    labelRef.current.append(searchBoxHTML)

    if (userGeolocation?.features && !withMarker) {
      map
        .setCenter([
          userGeolocation?.features[0].properties.lon,
          userGeolocation?.features[0].properties.lat,
        ])
        .zoomTo(11)
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
              <label
                className={styles.order__list__item__delivery__label}
                ref={labelRef}
              >
                <span>{translations[lang].order.search_title}</span>
              </label>
              <AddressesList
                listClassName={styles.order__list__item__delivery__list}
              />
            </div>
            <div
              className={styles.order__list__item__delivery__map}
              ref={mapRef}
            />
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
