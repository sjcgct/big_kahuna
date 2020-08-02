import { RichText } from 'prismic-reactjs'
import { getBlogsWithSlug,getBlogsWithSameCategory } from '../../prismic-configuration'
import Layout from '../../components/Layout'
import Deck from '../../components/deck'

export default function Post({post,postsYouMayLike}) {
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

    <h2>Posts You May Like</h2>
      {postsYouMayLike && (
        <Deck
          cards={postsYouMayLike}
        />
      )}

    </Layout>
  )
}

export async function getServerSideProps({params,previewData}) {
  //var slugurl =window.location.pathname.split("/").pop()
  var slugurl=params.slug;
  const fetchedpost = await getBlogsWithSlug(previewData,slugurl)
  const post=fetchedpost[0].node;
  const categoryId=post.category._meta.id;
  const postsYouMayLike=await getBlogsWithSameCategory(previewData,categoryId,3)
  return {
    props: {post,postsYouMayLike,}
  }
}
