import { RichText } from 'prismic-reactjs'
import {getHogWithSlug } from '../../prismic-configuration'
import Layout from '../../components/Layout'
import Deck from '../../components/deck'

export default function Post({post}) {
  return (
    <Layout>
    <section>
    <div className='blog-container'>
    <h1  className='text-center blog-title'>{RichText.asText(post.title)}</h1>
     <div className='sm-12'>
        <img src={post.featured_image.url} className='card-img' />
     </div>
    <div className='mb-5'>
      <a>{post.content}</a>
    </div>
    </div>
    </section>

    </Layout>
  )
}

export async function getServerSideProps({params,previewData}) {
  //var slugurl =window.location.pathname.split("/").pop()
  var slugurl=params.slug;
  const fetchedpost = await getHogWithSlug(previewData,slugurl)
  const post=fetchedpost[0].node;
  return {
    props: {post}
  }
}
