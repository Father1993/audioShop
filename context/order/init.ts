import { sample } from 'effector'
import {
  getMagnitolaOfficeByCity,
  getMagnitolaOfficesByCityFx,
  makePayment,
  makePaymentFx,
} from '.'

sample({
  clock: getMagnitolaOfficeByCity,
  source: {},
  fn: (_, data) => data,
  target: getMagnitolaOfficesByCityFx,
})

sample({
  clock: makePayment,
  source: {},
  fn: (_, data) => data,
  target: makePaymentFx,
})
