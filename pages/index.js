import Head from 'next/head'
import HeroPost from '../components/hero-post'
import { getAllPostsForHome } from '../prismic-configuration'

import BlogGrid from '../components/recent-blog-grid'
import RecentBlogs from '../components/recent-blog-homepage'

export default function BlogHome ({ preview, allPosts }) {
  const heroPost = allPosts[0].node
  const morePosts = allPosts.slice(1)

  return (
    <>
      <Head>
        <title>Student Journalist Council - GCT</title>
      </Head>
      {heroPost && (
        <HeroPost
          title={heroPost.title}
          coverImage={heroPost.coverimage}
        />
      )}
      <RecentBlogs>
        <BlogGrid />
        <BlogGrid />
        <BlogGrid />
      </RecentBlogs>

    </>
  )
}

export async function getServerSideProps ({ preview = false, previewData }) {
  const allPosts = await getAllPostsForHome(previewData)
  return {
    props: { preview, allPosts }
  }
}
