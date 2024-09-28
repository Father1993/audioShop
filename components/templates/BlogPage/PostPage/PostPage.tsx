'use client'
import React from 'react'
import { PostPageProps } from '@/types/post'
import { useLang } from '@/hooks/useLang'
import styles from '@/styles/blog/index.module.scss'

const PostPage: React.FC<PostPageProps> = ({ post }) => {
  const { lang, translations } = useLang()

  const handleRedirectToBlog = () => {
    window.location.href = '/blog'
  }

  return (
    <main className={styles.postPage}>
      <article className={`container ${styles.post}`}>
        <div className='container'>
          <header className={styles.postHeader}>
            <h1 className={styles.postTitle}>{post.title}</h1>
            {post.date && <time className={styles.postDate}>{post.date}</time>}
          </header>
          <div
            className={styles.postContent}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </article>
      <section className={`container ${styles.btn_wrapper}`}>
        <button className={styles.backButton} onClick={handleRedirectToBlog}>
          {translations[lang].common.back_to_blog}
        </button>
      </section>
    </main>
  )
}

export default PostPage
