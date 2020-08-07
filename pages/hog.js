import Head from 'next/head'
import HogList from '../components/HogListPage/hogList.js'
import { RichText } from 'prismic-reactjs'
import { getHogWithSlug, getAllHogsForHome } from '../prismic-configuration'
import Layout from '../components/Layout'

const hogPage = ({ preview, allHogs }) => {
  return (
    <Layout>
      <Head>
        <title>Student Council - GCT</title>
      </Head>
      <div className='HoGPosts row'>
        <HogList cards={allHogs} />
      </div>
    </Layout>
  )
}

export default hogPage

export async function getServerSideProps ({ preview = false, previewData }) {
  const allHogs = await getAllHogsForHome(previewData, ' ', 12)
  return {
    props: { preview, allHogs }
  }
}
