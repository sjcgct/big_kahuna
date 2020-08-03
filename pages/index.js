import Head from 'next/head'
import HeroPost from '../components/IndexPage/hero-post'
import { getAllBlogsForHome } from '../prismic-configuration'
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
          type='blog'
        />
      )}


      <h2>Blog</h2>
      {morePosts && (
        <Deck
          cards={morePosts}
          type='blog'
        />
      )}
    </Layout>
  )
}

export async function getServerSideProps ({ preview = false, previewData }) {
  const allPosts = await getAllBlogsForHome(previewData," ",7)
  return {
    props: { preview, allPosts }
  }
}
