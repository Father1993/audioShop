import { useUnit } from 'effector-react'
import { $courierTab, $pickupTab } from '@/context/order/state'
import { useLang } from '@/hooks/useLang'
import OrderTitle from './OrderTitle'
import styles from '@/styles/order/index.module.scss'

const OrderDelivery = () => {
  const { lang, translations } = useLang()
  const pickUpTab = useUnit($pickupTab)
  const courierTab = useUnit($courierTab)

  return (
    <>
      <OrderTitle orderNumber='2' text={translations[lang].order.delivery} />
      <div className={styles.order__list__item__delivery}>lol</div>
    </>
  )
}

export default OrderDelivery
