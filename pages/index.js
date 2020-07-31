import Head from 'next/head'
import HeroPost from '../components/IndexPage/hero-post'
import { getAllPostsForHome } from '../prismic-configuration'
import Layout from '../components/Layout'
import Deck from '../components/deck'

export default function BlogHome ({ preview, allPosts }) {
  const heroPost = allPosts[0].node
  const morePosts = allPosts.slice(1)

  return (
    <Layout>
      <Head>
        <title>Student Journalist Gouncil - GCT</title>
      </Head>
      {heroPost && (
        <HeroPost
          title={heroPost.title}
          coverImage={heroPost.featured_image}
          slugurl={heroPost._meta.uid}
        />
      )}

      {morePosts && (
        <Deck
          cards={morePosts}
        />
      )}
      <p>Hi ba</p>
    </Layout>
  )
}

export async function getServerSideProps ({ preview = false, previewData }) {
  const allPosts = await getAllPostsForHome(previewData)
  return {
    props: { preview, allPosts }
  }
}
