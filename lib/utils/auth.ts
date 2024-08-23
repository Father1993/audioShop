import toast from 'react-hot-toast'
import { handleCloseAuthPopup } from './common'
import { setIsAuth } from '@/context/auth'

export const onAuthSuccess = <T>(message: string, data: T) => {
  localStorage.setItem('auth', JSON.stringify(data))
  toast.success(message)
  handleCloseAuthPopup()
  setIsAuth(true)
}
