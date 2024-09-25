import { sample } from 'effector'
import {
  editUsername,
  editUsernameFx,
  uploadAvatar,
  uploadUserAvatarFx,
} from '.'

sample({
  clock: uploadAvatar,
  source: {},
  fn: (_, data) => data,
  target: uploadUserAvatarFx,
})

sample({
  clock: editUsername,
  source: {},
  fn: (_, data) => data,
  target: editUsernameFx,
})
