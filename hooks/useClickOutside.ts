import { MutableRefObject, useRef, useState, useEffect } from 'react'

export const useClickUOutside = () => {
  const ref = useRef() as MutableRefObject<HTMLDivElement>
  const [open, setOpen] = useState(false)

  const toggle = () => setOpen(!open)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!ref.current.contains(e.target as HTMLDivElement)) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [ref])

  return { open, setOpen, toggle, ref }
}