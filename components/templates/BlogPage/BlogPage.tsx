'use client'
import Breadcrumbs from '@/components/modules/Breadcrumbs/Breadcrumbs'
import { useBreadcrumbs } from '@/hooks/useBreadcrumbs'
import Link from 'next/link'
import styles from '@/styles/blog/index.module.scss'

interface Post {
  slug: string
  title: string
}

interface BlogPageProps {
  posts: Post[]
}

const BlogPage: React.FC<BlogPageProps> = ({ posts }) => {
  const { getDefaultTextGenerator, getTextGenerator } = useBreadcrumbs('blog')

  return (
    <main className={styles.blogPage}>
      <Breadcrumbs
        getDefaultTextGenerator={getDefaultTextGenerator}
        getTextGenerator={getTextGenerator}
      />
      <section className={styles.blogSection}>
        <div className='container'>
          <h1 className={styles.blogTitle}>Блог</h1>
          <ul className={styles.postList}>
            {posts.map((post) => (
              <li key={post.slug} className={styles.postItem}>
                <Link href={`/blog/${post.slug}`} className={styles.postLink}>
                  {post.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  )
}

export default BlogPage
