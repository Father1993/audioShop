'use client'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { useLang } from '@/hooks/useLang'
import { usePageTitle } from '@/hooks/usePageTitle'
import { useBreadcrumbs } from '@/hooks/useBreadcrumbs'
import { useCrumbText } from '@/hooks/useCrumbText'
import Breadcrumbs from '../modules/Breadcrumbs/Breadcrumbs'

const ComparisonLayout = ({ children }: { children: React.ReactNode }) => {
  const [dynamicTitle, setDynamicTitle] = useState('')
  const { crumbText } = useCrumbText('comparison')
  const pathname = usePathname()
  const { getDefaultTextGenerator, getTextGenerator } =
    useBreadcrumbs('comparison')
  const breadcrumbs = document.querySelector('.breadcrumbs') as HTMLUListElement
  const { lang, translations } = useLang()

  usePageTitle('comparison', dynamicTitle)

  useEffect(() => {
    const lastCrumb = document.querySelector('.last-crumb') as HTMLElement

    if (lastCrumb) {
      const productTypePathname = pathname.split('/comparison/')[1]

      if (!productTypePathname) {
        setDynamicTitle('')
        lastCrumb.textContent = crumbText
        return
      }

      const text = (
        translations[lang].comparison as { [index: string]: string }
      )[productTypePathname]
      setDynamicTitle(text)
      lastCrumb.textContent = text
    }
  }, [breadcrumbs, crumbText, lang, pathname, translations])

  return (
    <main>
      <section>
        <Breadcrumbs
          getDefaultTextGenerator={getDefaultTextGenerator}
          getTextGenerator={getTextGenerator}
        />
        <div className='container'>{children}</div>
      </section>
    </main>
  )
}

export default ComparisonLayout
