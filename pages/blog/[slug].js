import { RichText } from 'prismic-reactjs'
import { getPostWithSlug } from '../../prismic-configuration'
import Layout from '../../components/Layout'

export default function Post({slugurl,fetchedpost}) {
  var post=fetchedpost[0].node;
  return (
    <Layout>
    <section>
    <div className='blog-container'>
    <div className='mb-5'>
      <h1>{RichText.asText(post.title)}</h1>
      <div className='sm-12'>
        <img src={post.featured_image.url} className='card-img' />
      </div>
      <RichText render={post.content} />
    </div>
    </div>
    </section>
    </Layout>
  )
}

export async function getServerSideProps({params,previewData,}) {
  //var slugurl =window.location.pathname.split("/").pop()
  var slugurl=params.slug;
  const fetchedpost = await getPostWithSlug(previewData,slugurl)
  return {
    props: { slugurl,fetchedpost}
  }
}
