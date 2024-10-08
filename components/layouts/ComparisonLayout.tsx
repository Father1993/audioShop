'use client'
import { useUnit } from 'effector-react'
import { usePathname } from 'next/navigation'
import { useLang } from '@/hooks/useLang'
import { useBreadcrumbs } from '@/hooks/useBreadcrumbs'
import Breadcrumbs from '../modules/Breadcrumbs/Breadcrumbs'
import HeadingWithCount from '../elements/HeadingWithCount/HeadingWithCount'
import { useGoodsByAuth } from '@/hooks/useGoodsByAuth'

import { useComparisonLinks } from '@/hooks/useComparisonLinks'
import EmptyPageContent from '../modules/EmptyPageContent/EmptyPageContent'
import { loginCheckFx } from '@/context/user'
import Skeleton from '../elements/Skeleton/Skeleton'
import { isUserAuth } from '@/lib/utils/common'
import ComparisonLinksList from '../modules/Comparison/ComparisonLinksList'
import {
  $comparison,
  $comparisonFromLs,
  $shouldShowEmptyComparison,
} from '@/context/comparison/state'
import skeletonListsStyles from '@/styles/comparison-list-skeleton/index.module.scss'
import skeletonLinksStyles from '@/styles/comparison-links-skeleton/index.module.scss'
import styles from '@/styles/comparison/index.module.scss'
import comparisonSkeleton from '@/styles/comparison-skeleton/index.module.scss'

const ComparisonLayout = ({ children }: { children: React.ReactNode }) => {
  const { lang, translations } = useLang()
  const pathname = usePathname()
  const { getDefaultTextGenerator, getTextGenerator } =
    useBreadcrumbs('comparison')
  const currentComparisonByAuth = useGoodsByAuth($comparison, $comparisonFromLs)
  const { availableProductLinks, linksSpinner } = useComparisonLinks()
  const shouldShowEmptyComparison = useUnit($shouldShowEmptyComparison)
  const loginCheckSpinner = useUnit(loginCheckFx.pending)
  const mainSpinner = isUserAuth()
    ? linksSpinner || loginCheckSpinner
    : linksSpinner

  return (
    <main>
      {!shouldShowEmptyComparison ? (
        <section className={styles.comparison}>
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
              (mainSpinner ? (
                <Skeleton styles={skeletonLinksStyles} />
              ) : (
                <ComparisonLinksList
                  links={availableProductLinks}
                  className={styles.comparison_links}
                />
              ))}
            <div>
              {mainSpinner ? (
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
      ) : (
        <section>
          <div className='container'>
            <EmptyPageContent
              subtitle={translations[lang].common.comparison_empty}
              description={translations[lang].common.cart_empty_advice}
              btnText={translations[lang].common.go_catalog}
              bgClassName={styles.empty_bg}
            />
          </div>
        </section>
      )}
    </main>
  )
}

export default ComparisonLayout
