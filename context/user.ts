import { IUser } from '@/types/user'
import { createDomain } from 'effector'

const user = createDomain()

export const $user = user.createStore<IUser>({} as IUser)
