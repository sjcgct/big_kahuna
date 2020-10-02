import { RichText } from 'prismic-reactjs'
import React from 'react'
import { getHogWithSlug, getAllHogsForHome } from '../../prismic-configuration'
import Layout from '../../components/Layout'
import Deck from '../../components/deck'

export default function Post ({ post, morePosts }) {
  return (
    <Layout>
      <section>
        <h1 className='blog-post-title text-center'>{RichText.asText(post.title)}</h1>
        <div className='hog-container'>
          <div className='row'>
            <img src={post.featured_image.url} className='hog-featured-img mx-auto' />
          </div>
          <div className='mb-5'>
            <p className='text-justify'>{RichText.render(post.story)}</p>
            <span className='human'>
              {'- ' + post.name + '.'}
            </span>
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
  const posts = await getAllHogsForHome(' ', 3)
  var morePosts = posts.edges
  return {
    props: { post, morePosts }
  }
}
