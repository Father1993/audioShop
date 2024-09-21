'use client'
import { createDomain, createEffect } from 'effector'
import { handleJWTError } from '@/lib/utils/errors'
import { setIsAuth } from '../auth'
import api from '@/api/apiInstance'

export const user = createDomain()

export const loginCheck = user.createEvent<{ jwt: string }>()

export const loginCheckFx = createEffect(async ({ jwt }: { jwt: string }) => {
  try {
    const { data } = await api.get('/api/users/login-check', {
      headers: { Authorization: `Bearer ${jwt}` },
    })

    if (data?.error) {
      handleJWTError(data.error.name, {
        repeatRequestMethodName: 'loginCheckFx',
      })
      return
    }

    setIsAuth(true)
    return data.user
  } catch (error) {
    throw new Error((error as Error).message)
  }
})
