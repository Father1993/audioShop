export interface PostPageProps {
  post: {
    slug: string
    title: string
    content: string
    date: string
  }
}

export interface PostProps {
  params: { slug: string }
}
