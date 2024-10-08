/* eslint-disable max-len */
'use client'
import { MutableRefObject, useRef, useState } from 'react'
import { useUnit } from 'effector-react'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { IOrderInfoBlockProps } from '@/types/modules'
import { useLang } from '@/hooks/useLang'
import { useGoodsByAuth } from '@/hooks/useGoodsByAuth'
import { useTotalPrice } from '@/hooks/useTotalPrice'
import {
  formatPrice,
  handleOpenAuthPopup,
  isUserAuth,
  showCountMessage,
} from '@/lib/utils/common'
import {
  countWholeCartItemsAmount,
  handleDeleteAllFromCart,
} from '@/lib/utils/cart'
import { $cart, $cartFromLs } from '@/context/cart/state'
import {
  $chosenCourierAddressData,
  $chosenPickupAddressData,
  $courierTab,
  $onlinePaymentTab,
  $orderDetailsValues,
  $pickupTab,
} from '@/context/order/state'
import {
  makePayment,
  makePaymentFx,
  sendOrderNotificationsFx,
} from '@/context/order'
import styles from '@/styles/order-block/index.module.scss'

const OrderInfoBlock = ({
  isCorrectPromotionalCode,
  isOrderPage,
}: IOrderInfoBlockProps) => {
  const { lang, translations } = useLang()
  const currentCartByAuth = useGoodsByAuth($cart, $cartFromLs)
  const [isUserAgree, setIsUserAgree] = useState(false)
  const { animatedPrice } = useTotalPrice()
  const checkboxRef = useRef() as MutableRefObject<HTMLInputElement>
  const priceWithDiscount = isCorrectPromotionalCode
    ? formatPrice(Math.round(animatedPrice - animatedPrice * 0.3))
    : formatPrice(animatedPrice)
  const onlinePaymentTab = useUnit($onlinePaymentTab)
  const pickupTab = useUnit($pickupTab)
  const chosenPickupAddressData = useUnit($chosenPickupAddressData)
  const chosenCourierAddressData = useUnit($chosenCourierAddressData)
  const paymentSpinner = useUnit(makePaymentFx.pending)
  const orderDetailsValues = useUnit($orderDetailsValues)
  const courierTab = useUnit($courierTab)

  const handleTabCheckbox = (e: React.KeyboardEvent<HTMLLabelElement>) => {
    if (e.key == ' ' || e.code == 'Space') {
      e.preventDefault()
      setIsUserAgree(!checkboxRef.current.checked)
      checkboxRef.current.checked = !checkboxRef.current.checked
    }
  }
  const handleAgreementChange = () => setIsUserAgree(!isUserAgree)

  const scrollToBlock = (selector: HTMLLIElement) =>
    window.scrollTo({
      top: selector.getBoundingClientRect().top + window.scrollY + -50,
      behavior: 'smooth',
    })

  const handleMakePayment = async () => {
    if (
      courierTab &&
      (!chosenCourierAddressData.address_line1 ||
        chosenCourierAddressData.address_line1.length < 5)
    ) {
      const orderBlock = document.querySelector('.order-block') as HTMLLIElement
      scrollToBlock(orderBlock)
      toast.error(
        'Пожалуйста, введите корректный адрес доставки! Русскими буквами'
      )
      return
    }

    if (pickupTab && !chosenPickupAddressData.address_line1) {
      const orderBlock = document.querySelector('.order-block') as HTMLLIElement
      scrollToBlock(orderBlock)
      toast.error('Нужно выбрать адрес самовывоза')
      return
    }

    if (
      !chosenCourierAddressData.address_line1 &&
      !chosenPickupAddressData.address_line1
    ) {
      const orderBlock = document.querySelector('.order-block') as HTMLLIElement
      scrollToBlock(orderBlock)
      toast.error('Нужно выбрать адрес!')
      return
    }

    if (!orderDetailsValues.isValid) {
      const detailsBlock = document.querySelector(
        '.details-block'
      ) as HTMLLIElement
      scrollToBlock(detailsBlock)
      return
    }

    // Проверка на пустоту orderDetailsValues
    if (
      !orderDetailsValues.name_label ||
      !orderDetailsValues.surname_label ||
      !orderDetailsValues.phone_label
    ) {
      const detailsBlock = document.querySelector(
        '.details-block'
      ) as HTMLLIElement
      scrollToBlock(detailsBlock)
      toast.error('Пожалуйста, заполните все обязательные поля!')
      return
    }

    if (!isUserAuth()) {
      handleOpenAuthPopup()
      return
    }

    const auth = JSON.parse(localStorage.getItem('auth') as string)
    let description = ''

    if (chosenCourierAddressData.address_line1) {
      // eslint-disable-next-line max-len
      description = `Адрес доставки товара курьером: ${chosenCourierAddressData.address_line1}, ${chosenCourierAddressData.address_line2}`
    }

    if (chosenPickupAddressData.address_line1) {
      // eslint-disable-next-line max-len
      description = `Адрес получения товара: ${chosenPickupAddressData.address_line1}, ${chosenPickupAddressData.address_line2}`
    }

    if (courierTab && chosenCourierAddressData.address_line1) {
      description = `Адрес доставки товара курьером: ${chosenCourierAddressData.address_line1}, г. Хабаровск`
    } else if (pickupTab && chosenPickupAddressData.address_line1) {
      description = `Адрес получения товара: ${chosenPickupAddressData.address_line1}, ${chosenPickupAddressData.address_line2}`
    }

    const orderData = {
      description,
      amount: `${priceWithDiscount.replace(' ', '')}`,
      metadata: {
        ...orderDetailsValues,
        delivery_type: pickupTab ? 'pickup' : 'courier',
        delivery_address: courierTab
          ? chosenCourierAddressData.address_line1
          : chosenPickupAddressData.address_line1,
      },
    }

    if (onlinePaymentTab) {
      // Логика для онлайн-оплаты
      makePayment({
        jwt: auth.accessToken,
        ...orderData,
      })
    } else {
      try {
        // Отправляем уведомления
        await sendOrderNotificationsFx({
          orderData: JSON.stringify(orderData),
          customerEmail: orderDetailsValues.email_label,
          adminEmail: 'enjoyhill@gmail.com',
        })
        toast.success('Заказ успешно оформлен!')
        handleDeleteAllFromCart(auth.accessToken)
        window.location.href = '/order-success'
      } catch (error) {
        toast.error(
          'Произошла ошибка при оформлении заказа. Пожалуйста, попробуйте еще раз.'
        )
      }
    }
  }

  return (
    <div className={styles.order_block}>
      <div className={styles.order_block__inner}>
        <p className={styles.order_block__info}>
          {countWholeCartItemsAmount(currentCartByAuth)}{' '}
          {showCountMessage(
            `${countWholeCartItemsAmount(currentCartByAuth)}`,
            lang
          )}{' '}
          {translations[lang].order.worth}{' '}
          <span className={styles.order_block__info__text}>
            {formatPrice(animatedPrice)} ₽
          </span>
        </p>
        {isOrderPage && <></>}
        <p className={styles.order_block__total}>
          <span>{translations[lang].order.total}</span>
          <span className={styles.order_block__total__price}>
            {priceWithDiscount} ₽
          </span>
        </p>
        {isOrderPage && (
          <>
            <p className={styles.order_block__info}>
              {translations[lang].order.delivery}:{' '}
              <span className={styles.order_block__info__text}>
                {pickupTab
                  ? translations[lang].order.pickup_free
                  : translations[lang].order.courier_delivery}
              </span>
            </p>
            <p className={styles.order_block__info}>
              {translations[lang].order.payment}:{' '}
              <span className={styles.order_block__info__text}>
                {onlinePaymentTab
                  ? translations[lang].order.online_payment
                  : translations[lang].order.upon_receipt}
              </span>
            </p>
          </>
        )}
        {isOrderPage ? (
          <button
            className={`btn-reset ${styles.order_block__btn}`}
            disabled={
              !isUserAgree || !currentCartByAuth.length || paymentSpinner
            }
            onClick={handleMakePayment}
          >
            {paymentSpinner ? (
              <FontAwesomeIcon icon={faSpinner} spin color='#fff' />
            ) : (
              translations[lang].order.make_order
            )}
          </button>
        ) : (
          <Link
            href='/order'
            className={`${styles.order_block__btn} ${
              !isUserAgree || !currentCartByAuth.length ? styles.disabled : ''
            }`}
          >
            {translations[lang].order.make_order}
          </Link>
        )}

        <label className={styles.order_block__agreement}>
          <input
            type='checkbox'
            className={styles.order_block__agreement__input}
            tabIndex={-1}
            ref={checkboxRef}
            onChange={handleAgreementChange}
            checked={isUserAgree}
          />
          <span className={styles.order_block__agreement__mark} />
          <span
            className={styles.order_block__agreement__checkbox}
            tabIndex={0}
            onKeyDown={handleTabCheckbox}
          />
          <span className={styles.order_block__agreement__text}>
            {translations[lang].order.agreement_text}
            <Link
              href='/privacy'
              className={styles.order_block__agreement__link}
            >
              {translations[lang].order.agreement_link}
            </Link>
          </span>
        </label>
      </div>
    </div>
  )
}

export default OrderInfoBlock
