'use client'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { useLang } from '@/hooks/useLang'
import { usePageTitle } from '@/hooks/usePageTitle'
import { useBreadcrumbs } from '@/hooks/useBreadcrumbs'
import { useCrumbText } from '@/hooks/useCrumbText'
import Breadcrumbs from '../modules/Breadcrumbs/Breadcrumbs'
import HeadingWithCount from '../elements/HeadingWithCount/HeadingWithCount'
import { useGoodsByAuth } from '@/hooks/useGoodsByAuth'
import { $comparison, $comparisonFromLs } from '@/context/comparison'
import { useComparisonLinks } from '@/hooks/useComparisonLinks'
import skeletonLinksStyles from '@/styles/comparison-links-skeleton/index.module.scss'
import ComparisonLinksList from '../modules/Comparison/ComparisonLinksList'
import Skeleton from '../elements/Skeleton/Skeleton'
import styles from '@/styles/comparison/index.module.scss'
import skeletonListsStyles from '@/styles/comparison-list-skeleton/index.module.scss'
import comparisonSkeleton from '@/styles/comparison-skeleton/index.module.scss'

const ComparisonLayout = ({ children }: { children: React.ReactNode }) => {
  const [dynamicTitle, setDynamicTitle] = useState('')
  const { crumbText } = useCrumbText('comparison')
  const pathname = usePathname()
  const { getDefaultTextGenerator, getTextGenerator } =
    useBreadcrumbs('comparison')
  const breadcrumbs = document.querySelector('.breadcrumbs') as HTMLUListElement
  const { lang, translations } = useLang()
  const currentComparisonByAuth = useGoodsByAuth($comparison, $comparisonFromLs)
  const { availableProductLinks, linksSpinner } = useComparisonLinks()

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
        <div className='container'>
          <HeadingWithCount
            count={currentComparisonByAuth.length}
            title={translations[lang].comparison.main_heading}
            spinner={false}
          />
          {!(pathname === '/comparison') &&
            (linksSpinner ? (
              <Skeleton styles={skeletonLinksStyles} />
            ) : (
              <ComparisonLinksList
                links={availableProductLinks}
                className={styles.comparison__list}
              />
            ))}
          <div className='container'>
            {linksSpinner ? (
              pathname === '/comparison' ? (
                <Skeleton styles={comparisonSkeleton} />
              ) : (
                <Skeleton styles={skeletonListsStyles} />
              )
            ) : (
              children
            )}
          </div>
        </div>
      </section>
    </main>
  )
}

export default ComparisonLayout
