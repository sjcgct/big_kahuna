import Head from 'next/head'
import HeroPost from '../components/hero-post'
import { getAllPostsForHome } from '../prismic-configuration'
import Layout from '../components/Layout'
import Deck from '../components/deck'


export default function BlogHome ({ preview, allPosts }) {
  const heroPost = allPosts[0].node
  const morePosts = allPosts.slice(1)

  return (
    <Layout>
      <Head>
        <title>Student Journalist Council - GCT</title>
      </Head>
      {heroPost && (
        <HeroPost
          title={heroPost.title}
          coverImage={heroPost.coverimage}
          slug={heroPost._meta.uid}
        />
      )}

      {morePosts && (
        <Deck
          cards={morePosts}
        />
      )}
    </Layout>
  )
}

export async function getServerSideProps ({ preview = false, previewData }) {
  const allPosts = await getAllPostsForHome(previewData)
  return {
    props: { preview, allPosts }
  }
}
