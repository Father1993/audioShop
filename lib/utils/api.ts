import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

// Изменяем путь к директории с постами
const postsDirectory = path.join(process.cwd(), 'public', 'post')

export async function getAllPosts(fields: string[] = []) {
  const slugs = fs.readdirSync(postsDirectory)
  const posts = slugs.map((slug) =>
    getPostBySlug(slug.replace(/\.md$/, ''), fields)
  )
  const resolvedPosts = await Promise.all(posts)
  // Теперь сортируем разрешенные посты
  resolvedPosts.sort((post1, post2) => (post1.date > post2.date ? -1 : 1))
  return resolvedPosts
}

export async function getPostBySlug(slug: string, fields: string[] = []) {
  const fullPath = path.join(postsDirectory, `${slug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  type Items = {
    [key: string]: string
  }

  const items: Items = {}

  fields.forEach((field) => {
    if (field === 'slug') {
      items[field] = slug
    }
    if (field === 'content') {
      items[field] = content
    }

    if (typeof data[field] !== 'undefined') {
      items[field] = data[field]
    }
  })

  return items
}
