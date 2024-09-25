import { Effect } from 'effector'
import { useUnit } from 'effector-react'
import { useEffect, useState } from 'react'
import { editUsername } from '@/context/profile'
import { isUserAuth } from '@/lib/utils/common'

export const useProfileEdit = <T, K>(
  initialValue: string,
  effect: Effect<T, K, Error>
) => {
  const [value, setValue] = useState('')
  const [edit, setEdit] = useState(false)
  const spinner = useUnit(effect.pending)

  const handleEdit = () => setEdit(true)
  const handleCancelEdit = () => {
    setValue(initialValue)
    setEdit(false)
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setValue(e.target.value)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  const handleSaveNewName = () => {
    if (!isUserAuth()) {
      return
    }

    if (value === initialValue) {
      setEdit(false)
      return
    }

    const auth = JSON.parse(localStorage.getItem('auth') as string)

    editUsername({
      jwt: auth.accessToken,
      name: value,
      setEdit,
    })
  }

  return {
    handleSaveNewName,
    handleCancelEdit,
    setEdit,
    handleEdit,
    spinner,
    handleChange,
    edit,
  }
}
