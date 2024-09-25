import { useUnit } from 'effector-react'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { $user } from '@/context/user/state'
import { useProfileEdit } from '@/hooks/useProfileEdit'
import { editUsernameFx } from '@/context/profile'
import { basePropsForMotion } from '@/constants/motion'
import { nameValidationRules } from '@/lib/utils/auth'
import NameErrorMessage from '@/components/elements/NameErrorMessage/NameErrorMessage'
import { IInputs } from '@/types/authPopup'
import ProfileInfoActions from './ProfileInfoActions'
import ProfileInfoBlock from './ProfileInfoBlock'
import { loginCheckFx } from '@/context/user'
import styles from '@/styles/profile/index.module.scss'

const ProfileName = () => {
  const user = useUnit($user)
  const loginCheckSpinner = useUnit(loginCheckFx.pending)
  const {
    handleCancelEdit,
    handleChange,
    edit,
    spinner,
    handleSaveNewName,
    handleEdit,
  } = useProfileEdit(user.name, editUsernameFx)
  const {
    register,
    formState: { errors, isValid },
    trigger,
    setValue,
  } = useForm<IInputs & { [index: string]: string }>()

  const nameRegister = register(
    'name',
    nameValidationRules('Недопустимое значение!', 'Введите имя')
  )

  const handleNameInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    nameRegister.onChange({
      target: {
        name: nameRegister.name,
        value: e.target.value.trim(),
      },
    })

    trigger(nameRegister.name)
    handleChange(e)
  }

  const allowEdit = () => {
    handleEdit()
    setValue('name', user.name)
    trigger(nameRegister.name)
  }

  return (
    <div className={styles.profile__info}>
      {loginCheckSpinner && (
        <FontAwesomeIcon icon={faSpinner} spin color='#fff' />
      )}
      {edit && !loginCheckSpinner && (
        <motion.div
          className={styles.profile__info__inner}
          {...basePropsForMotion}
        >
          <NameErrorMessage
            errors={errors}
            className={styles.profile__info__warn}
            fieldName={nameRegister.name}
          />
          <input
            className={styles.profile__info__input}
            type='text'
            name={nameRegister.name}
            ref={nameRegister.ref}
            onChange={handleNameInputChange}
          />
          <ProfileInfoActions
            spinner={spinner}
            disabled={spinner || !isValid}
            handleCancelEdit={handleCancelEdit}
            handleSaveInfo={handleSaveNewName}
          />
        </motion.div>
      )}
      {!edit && !loginCheckSpinner && (
        <ProfileInfoBlock text={user.name} allowEdit={allowEdit} />
      )}
    </div>
  )
}

export default ProfileName
