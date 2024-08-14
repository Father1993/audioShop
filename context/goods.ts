'use client'
import { Effect, createDomain, sample } from 'effector'
import { Gate, createGate } from 'effector-react'
import { getBestsellerProductsFx, getNewProductsFx } from '@/api/main-page'

const goods = createDomain()

export const MainPageGate = createGate()

const goodStoreInstance = (effect: Effect<void, [], Error>) =>
  goods
    .createStore([])
    .on(effect.done, (_, { result }) => result)
    .on(effect.fail, (_, { error }) => {
      console.log(error.message)
    })

const goodsSampleInstance = (
  effect: Effect<void, [], Error>,
  gate: Gate<unknown>
) =>
  sample({
    clock: gate.open,
    target: effect,
  })

export const $newProducts = goodStoreInstance(getNewProductsFx)
export const $bestsellerProducts = goodStoreInstance(getBestsellerProductsFx)

goodsSampleInstance(getNewProductsFx, MainPageGate)
goodsSampleInstance(getBestsellerProductsFx, MainPageGate)
