import Head from 'next/head'
import HeroPost from '../components/IndexPage/hero-post'
import { getAllBlogsForHome, getAllHogsForHome } from '../prismic-configuration'
import Layout from '../components/Layout'
import Deck from '../components/deck'

export default function BlogHome ({ preview, allBlogs, allHogs }) {
  const heroPost = allBlogs[0].node
  const morePosts = allBlogs.slice(1)
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

      <br />
      <br />

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
  const blogs = await getAllBlogsForHome(previewData, ' ', 7)
  const hogs = await getAllHogsForHome(previewData, ' ', 6)
  var allBlogs=blogs.edges
  var allHogs=hogs.edges
  return {
    props: { preview, allBlogs, allHogs }
  }
}
