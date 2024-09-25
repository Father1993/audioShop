import { useUnit } from 'effector-react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { basePropsForMotion } from '@/constants/motion'
import {
  editUserEmailFx,
  editUsernameFx,
  verifyEmailFx,
} from '@/context/profile'
import { loginCheckFx } from '@/context/user'
import { useProfileEdit } from '@/hooks/useProfileEdit'
import { emailValidationRules } from '@/lib/utils/auth'
import { IInputs } from '@/types/authPopup'
import ProfileInfoActions from './ProfileInfoActions'
import ProfileInfoBlock from './ProfileInfoBlock'
import { $user } from '@/context/user/state'
import CodeInputBlock from './CodeInputBlock/CodeInputBlock'
import styles from '@/styles/profile/index.module.scss'

const ProfileEmail = () => {
  const user = useUnit($user)
  const loginCheckSpinner = useUnit(loginCheckFx.pending)
  const verifyEmailSpinner = useUnit(verifyEmailFx.pending)
  const editEmailSpinner = useUnit(editUserEmailFx.pending)
  const {
    handleCancelEdit,
    handleChange,
    edit,
    spinner,
    handleEdit,
    handleVerifyEmail,
    showCodeInput,
    handleCompleteEmailVerification,
  } = useProfileEdit(user.name, editUsernameFx)
  const {
    register,
    formState: { errors, isValid },
    trigger,
    setValue,
  } = useForm<IInputs & { [index: string]: string }>()

  const emailRegister = register(
    'email',
    emailValidationRules('Неправильный Email!', 'Введите email!')
  )

  const handleEmailInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    emailRegister.onChange({
      target: {
        name: emailRegister.name,
        value: e.target.value.trim(),
      },
    })

    trigger(emailRegister.name)
    handleChange(e)
  }

  const allowEdit = () => {
    handleEdit()
    setValue(emailRegister.name, user.email)
    trigger(emailRegister.name)
  }

  return (
    <div className={styles.profile__info}>
      {loginCheckSpinner && (
        <FontAwesomeIcon icon={faSpinner} spin color='#fff' />
      )}
      {edit && !loginCheckSpinner && !showCodeInput && !verifyEmailSpinner && (
        <motion.div
          className={styles.profile__info__inner}
          {...basePropsForMotion}
        >
          {errors.email && (
            <span className={styles.profile__info__warn}>
              {errors.email?.message}
            </span>
          )}
          <input
            className={styles.profile__info__input}
            type='text'
            name={emailRegister.name}
            ref={emailRegister.ref}
            onChange={handleEmailInputChange}
          />
          <ProfileInfoActions
            spinner={spinner}
            disabled={spinner || !isValid}
            handleCancelEdit={handleCancelEdit}
            handleSaveInfo={handleVerifyEmail}
          />
        </motion.div>
      )}
      {!edit && !loginCheckSpinner && !showCodeInput && (
        <ProfileInfoBlock text={user.email} allowEdit={allowEdit} />
      )}
      {showCodeInput && !verifyEmailSpinner && !editEmailSpinner && (
        <motion.div
          className={styles.profile__info__main}
          {...basePropsForMotion}
        >
          <CodeInputBlock onComplete={handleCompleteEmailVerification} />
        </motion.div>
      )}
      {verifyEmailSpinner && (
        <FontAwesomeIcon icon={faSpinner} spin color='#fff' />
      )}
      {editEmailSpinner && (
        <motion.div
          className={styles.profile__info__main}
          {...basePropsForMotion}
        >
          <FontAwesomeIcon icon={faSpinner} spin />
        </motion.div>
      )}
    </div>
  )
}

export default ProfileEmail
