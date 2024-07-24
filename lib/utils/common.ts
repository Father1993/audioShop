export const removeOverflowHiddenFromBody = () => {
  const body = document.querySelector('body') as HTMLBodyElement
  body.classList.remove('overflow-hidden')
}

export const addOverflowHiddenToBody = () => {
  const body = document.querySelector('body') as HTMLBodyElement
  body.classList.add('overflow-hidden')
}
