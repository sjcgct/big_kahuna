import { RichText } from 'prismic-reactjs'
import React from 'react'
import { getHogWithSlug, getAllHogsForHome } from '../../prismic-configuration'
import Layout from '../../components/Layout'
import Deck from '../../components/deck'
import SharePanel from '../../components/sharePanel'

export default function Post ({ post, morePosts }) {
  return (
    <Layout>
      <section>
        <h4 className='page-name'>Humans of GCT</h4>
        <h1 className='blog-post-title text-center'>{RichText.asText(post.title)}</h1>        
        <div className='hog-container'>
          <div className='row hog-featured-img-holder'>
            <img src={post.featured_image.url} className='hog-featured-img mb-5' alt={post.featured_image.alt}/>
          </div>
          <div className='mb-3'>
            <p className='text-justify'>{RichText.render(post.story)}</p>
            <span className='human'>
              {'- ' + post.name + '.'}
            </span>
          </div>
          <div className='post-share-tray'>
            <SharePanel url={post.featured_image.url} caption={RichText.asText(post.title)} />
          </div>
        </div>
      </section>

      <h2>More Posts</h2>
      {morePosts && (
        <Deck
          cards={morePosts}
          type='hog'
        />
      )}

    </Layout>
  )
}

export async function getServerSideProps ({ params, previewData }) {
  // var slugurl =window.location.pathname.split("/").pop()
  var slugurl = params.slug
  const fetchedpost = await getHogWithSlug(slugurl)
  const post = fetchedpost[0].node
  const posts = await getAllHogsForHome(' ', 4)
  var morePosts = posts.edges
  return {
    props: { post, morePosts }
  }
}
