import Head from 'next/head'
import HeroPost from '../components/IndexPage/hero-post'
import { getAllBlogsForHome,getAllHogsForHome } from '../prismic-configuration'
import Layout from '../components/Layout'
import Deck from '../components/deck'

export default function BlogHome ({ preview, allPosts,allHogs}) {
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

      <br></br>
      <br></br>

      <h2>Humans of GCT</h2>

      {allHogs && (
        <Deck
          cards={allHogs}
          type='hog'
        />
      )}
    </Layout>
  )
}

export async function getServerSideProps ({ preview = false, previewData }) {
  const allPosts = await getAllBlogsForHome(previewData," ",7)
  const allHogs=await getAllHogsForHome(previewData," ",6)
  return {
    props: { preview, allPosts,allHogs}
  }
}
