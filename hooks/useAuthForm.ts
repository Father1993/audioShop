import { useUnit } from 'effector-react'
import { Event, Store } from 'effector'
import { useForm } from 'react-hook-form'
import { IInputs, ISignUpFx } from '@/types/authPopup'

export const useAuthForm = (
  initialSpinner: Store<boolean>,
  isSideActive: boolean,
  event: Event<ISignUpFx>
) => {
  const spinner = useUnit(initialSpinner)
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IInputs>()
  return {
    spinner,
    register,
    errors,
    handleSubmit,
  }
}
