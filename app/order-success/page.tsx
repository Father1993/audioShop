/* eslint-disable indent */
/* eslint-disable prettier/prettier */
'use client'
import styles from '@/styles/payment-success/index.module.scss'

export default function PaymentSuccess() {
  return (
    <main>
      <section className={styles.payment_success}>
        <div className={`container ${styles.payment_success__container}`}>
          <h1 className={styles.payment_success__title}>
            Спасибо! Заказ оформлен!
          </h1>
          <p className={styles.payment_success__text}>
            <strong>
              В ближайшее время с вами свяжется наш сотрудник для уточнения
              деталей доставки и оплаты
            </strong>
          </p>
        </div>
      </section>
    </main>
  )
}
