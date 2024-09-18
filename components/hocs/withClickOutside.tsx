'use client'
import { ForwardRefExoticComponent, RefAttributes } from 'react'
import { IWrappedComponentProps } from '@/types/hocs'
import { useClickUOutside } from '@/hooks/useClickOutside'
//import { useClickOutside } from '@/hooks/useClickOutside'

export function withClickOutside(
  WrappedComponent: ForwardRefExoticComponent<
    IWrappedComponentProps & RefAttributes<HTMLDivElement>
  >
) {
  const Component = () => {
    const { open, setOpen, ref } = useClickUOutside()

    return <WrappedComponent open={open} setOpen={setOpen} ref={ref} />
  }

  return Component
}
