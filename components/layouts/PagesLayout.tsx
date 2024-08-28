'use client'
import { useEffect, useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { useUnit } from 'effector-react'
import { EarthoOneProvider } from '@eartho/one-client-react'
import {
  $showQuickViewModal,
  $showSizeTable,
  closeQuickViewModal,
} from '@/context/modals'
import Layout from './Layout'
import {
  closeSizeTableByCheck,
  handleCloseAuthPopup,
  removeOverflowHiddenFromBody,
} from '@/lib/utils/common'
import { $openAuthPopup } from '@/context/auth'

const PagesLayout = ({ children }: { children: React.ReactNode }) => {
  const showQuickViewModal = useUnit($showQuickViewModal)
  const showSizeTable = useUnit($showSizeTable)
  const openAuthPopup = useUnit($openAuthPopup)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => setIsClient(true), [])

  const handleCloseQuickViewModal = () => {
    removeOverflowHiddenFromBody()
    closeQuickViewModal()
  }

  const handleCloseSizeTable = () => closeSizeTableByCheck(showQuickViewModal)

  return (
    <>
      {isClient ? (
        <EarthoOneProvider
          domain='magnitola'
          clientId={`${process.env.NEXT_PUBLIC_OAUTH_CLIENT_ID}`}
        >
          <html lang='ru'>
            <body>
              <Layout>{children}</Layout>
              <div
                className={`quick-view-modal-overlay ${showQuickViewModal ? 'overlay-active' : ''}`}
                onClick={handleCloseQuickViewModal}
              />
              <div
                className={`size-table-overlay ${
                  showSizeTable ? 'overlay-active' : ''
                }`}
                onClick={handleCloseSizeTable}
              />
              <div
                className={`auth-overlay ${openAuthPopup ? 'overlay-active' : ''}`}
                onClick={handleCloseAuthPopup}
              />
              <Toaster position='top-center' reverseOrder={false} />
            </body>
          </html>
        </EarthoOneProvider>
      ) : (
        <html lang='ru'>
          <body>
            <></>
          </body>
        </html>
      )}
    </>
  )
}

export default PagesLayout
