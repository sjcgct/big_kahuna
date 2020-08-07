import Head from 'next/head'
import HogList from '../components/HogListPage/hogList.js'
import { RichText } from 'prismic-reactjs'
import { getAllHogsForHome } from '../prismic-configuration'
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
<<<<<<< HEAD
  const allHogs = await getAllHogsForHome(previewData, ' ', 12)
=======
  var allHogs = await getAllHogsForHome(previewData, ' ', 10)
  allHogs=allHogs.edges
>>>>>>> b429bea150e2ed8403516fab9644599f6d2d1436
  return {
    props: { preview, allHogs }
  }
}
