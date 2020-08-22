import { RichText } from 'prismic-reactjs'
import { getBlogsWithSlug,getBlogsWithSameCategory } from '../../prismic-configuration'
import Layout from '../../components/Layout'
import Deck from '../../components/deck'
import ProfilePostCard from '../../components/ProfilePage/profilePostCard'

export default function Post({post,postsYouMayLike}) {
  return (
    <Layout>
    <section>
    <div className='blog-container'>
    <h1  className='text-center blog-title'>{RichText.asText(post.title)}</h1>
     <div className='sm-12'>
        <img src={post.featured_image.url} className='card-img' />
     </div>
    <div className='mb-5'>
      <RichText render={post.content} />
    </div>
    </div>
    </section>
    
    <ProfilePostCard name={post.author.name} about={post.author.about} imgurl={post.author.picture.url}></ProfilePostCard>/>

    <h2>Posts You May Like</h2>
      {postsYouMayLike && (
        <Deck
          cards={postsYouMayLike}
          type='blog'
        />
      )}

    </Layout>
  )
}

export async function getServerSideProps({params,previewData}) {
  //var slugurl =window.location.pathname.split("/").pop()
  var slugurl=params.slug;
  const fetchedpost = await getBlogsWithSlug(slugurl)
  const post=fetchedpost[0].node;
  const categoryId=post.category._meta.id;
  var postsYouMayLike=await getBlogsWithSameCategory(categoryId,3)
  postsYouMayLike=postsYouMayLike.edges
  return {
    props: {post,postsYouMayLike,}
  }
}
