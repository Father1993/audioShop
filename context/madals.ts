import { createDomain } from 'effector'

const modals = createDomain()

export const openMenu = modals.createEvent()
export const closeMenu = modals.createEvent()

export const $menuIsOpen = modals
  .createStore(false)
  .on(openMenu, () => true)
  .on(closeMenu, () => false)
