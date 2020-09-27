import { RichText, Elements } from 'prismic-reactjs';
import { getBlogsWithSlug, getBlogsWithSameCategory } from '../../prismic-configuration'
import Layout from '../../components/Layout'
import Deck from '../../components/deck'
import ProfileDeckCard from '../../components/profileDeckCard'
import Link from 'next/link'

export default function Post ({ post, postsYouMayLike }) {
  
    var parseDate = function (date) {
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
    var year_month_date = date.split('-')
    var month = months[parseInt(year_month_date[1]) - 1]
    return month + ' ' + year_month_date[2] + ',' + year_month_date[0]
  };

  const propsWithUniqueKey = function(props, key) {
    return Object.assign(props || {}, { key });
  };
   
  // -- HTML Serializer
  // This function will be used to change the way the HTML is loaded
  const htmlSerializer = function(type, element, content, children, key) {
   
    var props = {};
    switch(type) {
   
      // Add a class to paragraph elements
      case Elements.paragraph:
        props = {className: 'blockquote'};
        return React.createElement('h1', propsWithUniqueKey(props, key), children);
   
      // Return null to stick with the default behavior
      default: 
        return null;
    }
  };



  return (
    
    <Layout>
      <section>
        <h1 className='blog-post-title'>{RichText.asText(post.title)}</h1>
        <div className='blog-post-author-reveal align-items-center ml-3'>

          <Link href={`/profile/${post.author._meta.id}`} passHref>
          <a className='profile-thumb-link'> 
          <img className='blogpost-author-thumb' src={post.author.picture.url} />
          <span className='blogpost-author-name'>{post.author.name}</span>
          <span class='text-muted blog-post-date'>{parseDate(post.date)}</span>
          </a>
          </Link>
          
        </div>
          

        <div className='sm-12'>
          <img src={post.featured_image.hero.url} className='card-img featured-img' />
        </div>
        
        <div className='blog-container'>
            <RichText render={post.quote} />
            <RichText render={post.content} />
        </div>
      </section>

      <ProfileDeckCard title={post.author.name} about={post.author.about} imgurl={post.author.picture.url} id={post.author._meta.id} sub_head='Author' />

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

export async function getServerSideProps ({ params, previewData }) {
  // var slugurl =window.location.pathname.split("/").pop()
  var slugurl = params.slug
  const fetchedpost = await getBlogsWithSlug(slugurl)
  const post = fetchedpost[0].node
  const categoryId = post.category._meta.id
  var postsYouMayLike = await getBlogsWithSameCategory(categoryId, 3)
  postsYouMayLike = postsYouMayLike.edges
  return {
    props: { post, postsYouMayLike }
  }
}
