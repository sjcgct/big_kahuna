import Head from 'next/head'
import Deck from '../components/deck'
import { getAllBlogsForHome } from '../prismic-configuration'
import Layout from '../components/Layout'

var cursor=''
var isNextPageExists=false

const blogPage = ({ preview, allBlogs }) => {
  return (
    <Layout>
      <Head>
        <title>Student Council - GCT</title>
      </Head>
      <h1>
          Blogs
      </h1>
        <Deck cards={allBlogs} type='blog'/>
    </Layout>
  )
}

export default blogPage

export async function getServerSideProps ({ preview = false, previewData }) {
  var allBlogs = await getAllBlogsForHome(previewData, cursor, 12)
  allBlogs=allBlogs.edges
  return {
    props: { preview, allBlogs }
  }
}
