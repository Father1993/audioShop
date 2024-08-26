import { createEffect } from 'effector'
import toast from 'react-hot-toast'
import api from './apiInstance'
import { onAuthSuccess } from '@/lib/utils/auth'
import { ISignUpFx } from '@/types/authPopup'
import { setIsAuth } from '@/context/auth'

export const oauthFx = createEffect(
  async ({ name, password, email }: ISignUpFx) => {
    try {
      const { data } = await api.post('/api/users/oauth', {
        name,
        password,
        email,
      })

      await api.post('api/users/email', {
        password,
        email,
      })

      onAuthSuccess('Авторизация выполнена!', data)
      return data.user
    } catch (error) {
      toast.error((error as Error).message)
    }
  }
)

export const singUpFx = createEffect(
  async ({ name, password, email, isOAuth }: ISignUpFx) => {
    if (isOAuth) {
      await oauthFx({
        email,
        password,
        name,
      })
      return
    }
    const { data } = await api.post('/api/users/signup', {
      name,
      password,
      email,
    })

    if (data.warningMessage) {
      toast.error(data.warningMessage)
      return
    }

    onAuthSuccess('Регистрация прошла успешно!', data)
    return data
  }
)

export const singInFx = createEffect(
  async ({ email, password, isOAuth }: ISignUpFx) => {
    if (isOAuth) {
      await oauthFx({
        email,
        password,
      })
      return
    }
    const { data } = await api.post('/api/users/login', { email, password })

    if (data.warningMessage) {
      toast.error(data.warningMessage)
      return
    }

    onAuthSuccess('Вход выполнен!', data)

    return data
  }
)

export const loginCheckFx = createEffect(async ({ jwt }: { jwt: string }) => {
  try {
    const { data } = await api.get('/api/users/login-check', {
      headers: { Authorization: `Bearer ${jwt}` },
    })
    setIsAuth(true)
  } catch (error) {
    throw new Error((error as Error).message)
  }
})
