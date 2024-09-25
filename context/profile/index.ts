import { createDomain } from 'effector'
import axios from 'axios'
import toast from 'react-hot-toast'
import { IEditUsernameFx, IUploadUserAvatarFx } from '@/types/profile'
import { handleJWTError } from '@/lib/utils/errors'
import api from '@/api/apiInstance'
import { updateUserImage, updateUsername } from '../user'

export const profile = createDomain()

export const uploadAvatar = profile.createEvent<IUploadUserAvatarFx>()
export const editUsername = profile.createEvent<IEditUsernameFx>()

export const uploadUserAvatarFx = profile.createEffect(
  async ({ jwt, formData }: IUploadUserAvatarFx) => {
    try {
      const { data } = await axios({
        method: 'post',
        data: formData,
        url: '/api/users/avatar',
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${jwt}`,
        },
      })

      if (data?.error) {
        const result: { image: string } = await handleJWTError(
          data.error.name,
          {
            repeatRequestMethodName: 'uploadUserAvatarFx',
            payload: { formData },
          }
        )
        return result
      }

      updateUserImage(data.image)

      return data
    } catch (error) {
      toast.error((error as Error).message)
    }
  }
)

export const editUsernameFx = profile.createEffect(
  async ({ jwt, setEdit, name }: IEditUsernameFx) => {
    try {
      const { data } = await api.patch(
        '/api/users/edit/name',
        { name },
        {
          headers: { Authorization: `Bearer ${jwt}` },
        }
      )

      if (data?.error) {
        const result: { image: string } = await handleJWTError(
          data.error.name,
          {
            repeatRequestMethodName: 'editUsernameFx',
            payload: { setEdit, name },
          }
        )
        return result
      }

      toast.success('Имя сохранено')
      setEdit(false)
      localStorage.setItem('auth', JSON.stringify(data.tokens))
      updateUsername(name)

      return data
    } catch (error) {
      toast.error((error as Error).message)
    }
  }
)
