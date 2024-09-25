import { useUnit } from 'effector-react'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { useUserAvatar } from '@/hooks/useUserAvatar'
import { uploadAvatar, uploadUserAvatarFx } from '@/context/profile'
import { isValidAvatarImage } from '@/lib/utils/common'
import { loginCheckFx } from '@/context/user'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import styles from '@/styles/profile/index.module.scss'
import { $userImage } from '@/context/profile/state'

const ProfileAvatar = () => {
  const { src, alt } = useUserAvatar()
  const uploadSpinner = useUnit(uploadUserAvatarFx.pending)
  const loginCheckSpinner = useUnit(loginCheckFx.pending)
  const userImage = useUnit($userImage)
  const isMedia380 = useMediaQuery(380)
  const avatarSize = isMedia380 ? 280 : 320

  const handleUploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const image = (e.target.files as FileList)[0]
    const auth = JSON.parse(localStorage.getItem('auth') as string)

    if (!isValidAvatarImage(image)) {
      return
    }

    const formData = new FormData()

    formData.append('binaryContent', image, image.name)

    uploadAvatar({ formData, jwt: auth.accessToken })
  }

  return (
    <div className={styles.profile__avatar}>
      {loginCheckSpinner && (
        <FontAwesomeIcon icon={faSpinner} spin color='#fff' size='3x' />
      )}
      {src && !loginCheckSpinner && (
        <>
          <label
            className={`btn-reset ${styles.profile__avatar__edit} ${styles.profile__info__edit}`}
          >
            <input type='file' onChange={handleUploadFile} hidden />
          </label>
          {uploadSpinner ? (
            <FontAwesomeIcon icon={faSpinner} spin color='#fff' size='3x' />
          ) : (
            <Image
              src={userImage || src}
              width={avatarSize}
              height={avatarSize}
              alt={alt}
            />
          )}
        </>
      )}
      {!src &&
        !loginCheckSpinner &&
        (uploadSpinner ? (
          <FontAwesomeIcon icon={faSpinner} spin color='#fff' size='3x' />
        ) : (
          <label className={styles.profile__photo}>
            <input type='file' onChange={handleUploadFile} hidden />
          </label>
        ))}
    </div>
  )
}

export default ProfileAvatar
