import BlogPage from '@/components/templates/BlogPage/BlogPage'
import { getAllPosts } from '@/lib/utils/api'

export default async function Blog() {
  const posts = await getAllPosts(['slug', 'title']).then((posts) =>
    posts.map((post) => ({
      ...post,
      slug: post.slug,
      title: post.title,
    }))
  )
  return <BlogPage posts={posts} />
}
