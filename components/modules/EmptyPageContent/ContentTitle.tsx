import { useLang } from '@/hooks/useLang'
import styles from '@/styles/empty-content/index.module.scss'

const ContentTitle = () => {
  const { lang, translations } = useLang()

  return (
    <div className={styles.empty_content__title}>
      <span>{translations[lang].common.oh}</span>
      <span>{translations[lang].common.empty_text}</span>
    </div>
  )
}

export default ContentTitle
