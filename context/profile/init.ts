import { sample } from 'effector'
import { uploadAvatar, uploadUserAvatarFx } from '.'

sample({
  clock: uploadAvatar,
  source: {},
  fn: (_, data) => data,
  target: uploadUserAvatarFx,
})
