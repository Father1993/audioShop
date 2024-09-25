'use client'
import { IUser, IUserGeolocation } from '@/types/user'
import {
  user,
  loginCheckFx,
  setUserGeolocation,
  updateUsername,
  updateUserImage,
} from '.'

export const $user = user
  .createStore<IUser>({} as IUser)
  .on(loginCheckFx.done, (_, { result }) => result)
  .on(updateUsername, (state, name) => ({ ...state, name }))
  .on(updateUserImage, (state, image) => ({ ...state, image }))

export const $userGeolocation = user
  .createStore<IUserGeolocation>({} as IUserGeolocation)
  .on(setUserGeolocation, (_, data) => data)
