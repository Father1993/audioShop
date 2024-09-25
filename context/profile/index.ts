import { createDomain } from 'effector'
import axios from 'axios'
import toast from 'react-hot-toast'
import { IUploadUserAvatarFx } from '@/types/profile'
import { handleJWTError } from '@/lib/utils/errors'

export const profile = createDomain()

export const uploadAvatar = profile.createEvent<IUploadUserAvatarFx>()

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

      return data
    } catch (error) {
      toast.error((error as Error).message)
    }
  }
)
