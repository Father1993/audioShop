import { createDomain, sample } from 'effector'
import { loginCheckFx } from '@/api/auth'
import { IUser } from '@/types/user'

const user = createDomain()

export const loginCheck = user.createEvent<{ jwt: string }>()

export const $user = user
  .createStore<IUser>({} as IUser)
  .on(loginCheckFx.done, (_, { result }) => result)

sample({
  clock: loginCheckFx,
  source: $user,
  fn: (_, { jwt }) => ({
    jwt,
  }),
  target: loginCheckFx,
})
