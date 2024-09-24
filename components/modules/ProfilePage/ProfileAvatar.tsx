import { useUserAvatar } from '@/hooks/useUserAvatar'
import Image from 'next/image'
import styles from '@/styles/profile/index.module.scss'

const ProfileAvatar = () => {
  const { src, alt } = useUserAvatar()

  return (
    <div className={styles.profile__avatar}>
      <Image src={src} width={300} height={300} alt='Profile-avatar' />
    </div>
  )
}

export default ProfileAvatar
