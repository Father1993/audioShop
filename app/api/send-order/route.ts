import { NextResponse } from 'next/server'
import { sendMail } from '@/services/mailService'

export async function POST(req: Request) {
  try {
    const {
      orderData: orderDataString,
      customerEmail,
      adminEmail,
    } = await req.json()

    // Парсим orderData обратно в объект
    const orderData = JSON.parse(orderDataString)

    // Формируем сообщение для клиента
    const customerMessage = `
      Спасибо за ваш заказ!
      
      Детали заказа:
      Описание: ${orderData.description}
      Сумма: ${orderData.amount}
      Адрес доставки: ${orderData.metadata.delivery_address}
      Тип доставки: ${orderData.metadata.delivery_type === 'pickup' ? 'Самовывоз' : 'Курьерская доставка'}
    `

    // Формируем сообщение для администратора
    const adminMessage = `
      Поступил новый заказ!
      
      Детали заказа:
      Описание: ${orderData.description}
      Сумма: ${orderData.amount}
      Адрес доставки: ${orderData.metadata.delivery_address}
      Тип доставки: ${orderData.metadata.delivery_type === 'pickup' ? 'Самовывоз' : 'Курьерская доставка'}
      
      Данные клиента:
      Имя: ${orderData.metadata.name_label}
      Фамилия: ${orderData.metadata.surname_label}
      Email: ${customerEmail}
      Телефон: ${orderData.metadata.phone_label}
    `

    // Отправляем уведомление клиенту
    await sendMail('Magnitola', customerEmail, customerMessage)

    // Отправляем уведомление администратору
    await sendMail('Magnitola', adminEmail, adminMessage)

    return NextResponse.json({
      status: 200,
      message: 'Уведомления отправлены успешно',
    })
  } catch (error) {
    throw new Error((error as Error).message)
  }
}
