import { RichText } from 'prismic-reactjs'
import { getBlogsWithSlug,getAllBlogsForHome } from '../../prismic-configuration'
import Layout from '../../components/Layout'
import Deck from '../../components/deck'

export default function Post({fetchedpost,postsYouMayLike}) {
  var post=fetchedpost[0].node;
  return (
    <Layout>
     <h1  className='mb-3 text-center'>{RichText.asText(post.title)}</h1>
     <div className='sm-12 mb-3'>
        <img src={post.featured_image.url} className='card-img' />
     </div>
    <section>
    <div className='blog-container'>
    <div className='mb-5'>
    
    
      <RichText render={post.content} />
    </div>
    </div>
    </section>

    <h2>Posts You May Like</h2>
      {postsYouMayLike && (
        <Deck
          cards={postsYouMayLike}
        />
      )}

    </Layout>
  )
}

export async function getServerSideProps({params,previewData,}) {
  //var slugurl =window.location.pathname.split("/").pop()
  var slugurl=params.slug;
  const fetchedpost = await getBlogsWithSlug(previewData,slugurl)
  const postsYouMayLike=await getAllBlogsForHome(previewData," ",3)
  return {
    props: {fetchedpost,postsYouMayLike}
  }
}
