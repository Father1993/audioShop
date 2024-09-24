import { useUnit } from 'effector-react'
import Breadcrumbs from '@/components/modules/Breadcrumbs/Breadcrumbs'
import { $user } from '@/context/user/state'
import { useBreadcrumbs } from '@/hooks/useBreadcrumbs'
import { usePageTitle } from '@/hooks/usePageTitle'
import ProfileAvatar from '@/components/modules/ProfilePage/ProfileAvatar'

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
      <section>
        <ProfileAvatar />
      </section>
    </main>
  )
}

export default ProfilePage
