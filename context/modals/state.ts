'use client'
import {
  modals,
  openMenu,
  closeMenu,
  openCatalogMenu,
  closeCatalogMenu,
  openSearchModal,
  closeSearchModal,
  showQuickViewModal,
  closeQuickViewModal,
  closeSizeTable,
  showSizeTable,
  openShareModal,
  closeShareModal,
  openMapModal,
  closeMapModal,
} from '.'

export const $menuIsOpen = modals
  .createStore(false)
  .on(openMenu, () => true)
  .on(closeMenu, () => false)

export const $catalogMenuIsOpen = modals
  .createStore(false)
  .on(openCatalogMenu, () => true)
  .on(closeCatalogMenu, () => false)

export const $searchModals = modals
  .createStore(false)
  .on(openSearchModal, () => true)
  .on(closeSearchModal, () => false)

export const $showQuickViewModal = modals
  .createStore(false)
  .on(showQuickViewModal, () => true)
  .on(closeQuickViewModal, () => false)

export const $showSizeTable = modals
  .createStore(false)
  .on(closeSizeTable, () => true)
  .on(showSizeTable, () => false)

export const $shareModal = modals
  .createStore(false)
  .on(openShareModal, () => true)
  .on(closeShareModal, () => false)

export const $mapModal = modals
  .createStore(false)
  .on(openMapModal, () => true)
  .on(closeMapModal, () => false)
