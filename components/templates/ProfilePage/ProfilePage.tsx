'use client'
import { useUnit } from 'effector-react'
import { $user } from '@/context/user/state'
import { usePageTitle } from '@/hooks/usePageTitle'
import ProfileAvatar from '@/components/modules/ProfilePage/ProfileAvatar'
import { useBreadcrumbs } from '@/hooks/useBreadcrumbs'
import Breadcrumbs from '@/components/modules/Breadcrumbs/Breadcrumbs'
import styles from '@/styles/profile/index.module.scss'
import ProfileName from '@/components/modules/ProfilePage/ProfileName'

const ProfilePage = () => {
  const user = useUnit($user)
  const { getDefaultTextGenerator, getTextGenerator } =
    useBreadcrumbs('profile')
  usePageTitle('profile', user.name)

  return (
    <main>
      <Breadcrumbs
        getDefaultTextGenerator={getDefaultTextGenerator}
        getTextGenerator={getTextGenerator}
      />
      <section className={styles.profile}>
        <div className={`container ${styles.profile__container}`}>
          <div className={styles.profile__inner}>
            <ProfileAvatar />
            <ProfileName />
          </div>
        </div>
      </section>
    </main>
  )
}

export default ProfilePage
