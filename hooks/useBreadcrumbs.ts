import { useEffect } from 'react'
import { useCrumbText } from './useCrumbText'
import { usePageTitle } from './usePageTitle'
//import { useLang } from './useLang'

export const useBreadcrumbs = (page: string) => {
  //const { lang, translations } = useLang()
  const { crumbText } = useCrumbText(page)
  usePageTitle(page)

  useEffect(() => {
    const lastCrumb = document.querySelector('.last-crumb') as HTMLElement

    if (lastCrumb) {
      lastCrumb.textContent = crumbText
    }
  }, [crumbText])
}
