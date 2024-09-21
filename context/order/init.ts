import { sample } from 'effector'
import { getMagnitolaOfficeByCity, getMagnitolaOfficesByCityFx } from '.'

sample({
  clock: getMagnitolaOfficeByCity,
  source: {},
  fn: (_, data) => data,
  target: getMagnitolaOfficesByCityFx,
})
