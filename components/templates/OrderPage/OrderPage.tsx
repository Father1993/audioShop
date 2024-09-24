'use client'
import { MutableRefObject, useEffect, useRef, useState } from 'react'
import { useUnit } from 'effector-react'
import { useRouter } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import toast from 'react-hot-toast'
import Breadcrumbs from '@/components/modules/Breadcrumbs/Breadcrumbs'
import OrderInfoBlock from '@/components/modules/OrderInfoBlock/OrderInfoBlock'
import OrderCartItem from '@/components/modules/OrderPage/OrderCartItem'
import OrderDelivery from '@/components/modules/OrderPage/OrderDelivery'
import OrderTitle from '@/components/modules/OrderPage/OrderTitle'
import { $cart, $cartFromLs } from '@/context/cart/state'
import { $mapModal } from '@/context/modals/state'
import { useBreadcrumbs } from '@/hooks/useBreadcrumbs'
import { useGoodsByAuth } from '@/hooks/useGoodsByAuth'
import { useLang } from '@/hooks/useLang'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import MapModal from '@/components/modules/OrderPage/MapModal'
import { basePropsForMotion } from '@/constants/motion'
import OrderPayment from '@/components/modules/OrderPage/OrderPayment'
import OrderDetailsForm from '@/components/modules/OrderPage/OrderDetailsForm'
import {
  $chosenCourierAddressData,
  $chosenPickupAddressData,
  $orderDetailsValues,
  $scrollToRequiredBlock,
} from '@/context/order/state'
import { isUserAuth } from '@/lib/utils/common'
import styles from '@/styles/order/index.module.scss'

const OrderPage = () => {
  const { lang, translations } = useLang()
  const { getDefaultTextGenerator, getTextGenerator } = useBreadcrumbs('order')
  const currentCartByAuth = useGoodsByAuth($cart, $cartFromLs)
  const isMedia1220 = useMediaQuery(1220)
  const mapModal = useUnit($mapModal)
  const shouldScrollToDelivery = useRef(true)
  const [isFirstRender, setIsFirstRender] = useState(true)
  const scrollToRequiredBlock = useUnit($scrollToRequiredBlock)
  const deliveryBlockRef = useRef() as MutableRefObject<HTMLLIElement>
  const detailsBlockRef = useRef() as MutableRefObject<HTMLLIElement>
  const chosenPickupAddressData = useUnit($chosenPickupAddressData)
  const chosenCourierAddressData = useUnit($chosenCourierAddressData)
  const orderDetailsValues = useUnit($orderDetailsValues)
  const router = useRouter()
  const scrollToBlock = (selector: HTMLLIElement) => {
    selector.scrollTo({
      top:
        deliveryBlockRef.current.getBoundingClientRect().top +
        window.scrollY +
        -50,
      behavior: 'smooth',
    })
  }

  useEffect(() => {
    if (shouldScrollToDelivery.current) {
      shouldScrollToDelivery.current = false
      setIsFirstRender(false)
    }

    clearCartByPayment()
  }, [])

  useEffect(() => {
    if (isFirstRender) {
      return
    }

    if (!orderDetailsValues) {
      scrollToBlock(detailsBlockRef.current)
      return
    }
    if (
      !chosenCourierAddressData.address_line1 &&
      !chosenPickupAddressData.address_line1
    ) {
      scrollToBlock(deliveryBlockRef.current)
      toast.error('Нужно указать адрес')
    }
  }, [scrollToRequiredBlock])

  const clearCartByPayment = async () => {
    const paymentId = JSON.parse(localStorage.getItem('paymentId') as string)

    if (isUserAuth() || !paymentId) {
      return
    }

    router.push('/payment-success')
  }

  return (
    <main>
      <Breadcrumbs
        getDefaultTextGenerator={getDefaultTextGenerator}
        getTextGenerator={getTextGenerator}
      />
      <section className={styles.order}>
        <div className='container'>
          <h1 className={styles.order__title}>
            {translations[lang].breadcrumbs.order}
          </h1>
          <div className={styles.order__inner}>
            <div className={styles.order__inner__left}>
              <ul className={`list-reset ${styles.order__list}`}>
                <li className={styles.order__list__item}>
                  <OrderTitle
                    orderNumber='1'
                    text={translations[lang].order.order}
                  />
                  {isMedia1220 ? (
                    <ul className={styles.order__list__item__list}>
                      {currentCartByAuth.map((item, i) => (
                        <OrderCartItem
                          key={item._id || item.clientId}
                          item={item}
                          position={i + 1}
                        />
                      ))}
                    </ul>
                  ) : (
                    <table className={styles.order__list__item__table}>
                      <thead>
                        <tr>
                          <th>{translations[lang].order.name}</th>
                          <th>{translations[lang].order.size}</th>
                          <th>{translations[lang].order.color}</th>
                          <th>{translations[lang].order.count}</th>
                          <th>{translations[lang].order.sum}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentCartByAuth.map((item, i) => (
                          <OrderCartItem
                            key={item._id || item.clientId}
                            item={item}
                            position={i + 1}
                          />
                        ))}
                      </tbody>
                    </table>
                  )}
                </li>
                <li className={styles.order__list__item} ref={deliveryBlockRef}>
                  <OrderDelivery />
                </li>
                <li className={styles.order__list__item}>
                  <OrderTitle
                    orderNumber='3'
                    text={translations[lang].order.payment}
                  />
                  <OrderPayment />
                </li>
                <li className={styles.order__list__item} ref={detailsBlockRef}>
                  <OrderTitle
                    orderNumber='4'
                    text={translations[lang].order.recipient_details}
                  />
                  <div className={styles.order__list__item__details}>
                    <p className={styles.order__list__item__details__title}>
                      {translations[lang].order.enter_details}
                    </p>
                    <OrderDetailsForm />
                  </div>
                </li>
              </ul>
            </div>
            <div className={styles.order__inner__right}>
              <div className={styles.order__inner__right}>
                <OrderInfoBlock isOrderPage />
              </div>
            </div>
          </div>
        </div>
      </section>
      <AnimatePresence>
        {mapModal && (
          <motion.div className={styles.map_modal} {...basePropsForMotion}>
            <MapModal />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}

export default OrderPage
