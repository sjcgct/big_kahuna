import { RichText } from 'prismic-reactjs'
import React from 'react'
import { getHogWithSlug, getAllHogsForHome } from '../../prismic-configuration'
import Layout from '../../components/Layout'
import Deck from '../../components/deck'
import SharePanel from '../../components/sharePanel'
import Head from 'next/head'

export default function Post ({ post, morePosts }) {
  return (
    <Layout>
      <Head>
        <title>{RichText.asText(post.title) + ' | Humans of GCT'}</title>
        <meta charset='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1, shrink-to-fit=no' />
        <meta
          name='Keywords'
          content={RichText.asText(post.title) + ' ' + post.name + ' Government College of Technology, GCT, Coimbatore, Humans of GCT, SJC, Student Journalist Council, Student Journalist Council-GCT, SJCGCT, Aperture, Humans of GCT, ABC Channel, GCT News, GCT Updates'}
        />
        <meta
          name='Description'
          content={RichText.asText(post.title) + ', a story published in Humans of GCT by Student Journalist Council - GCT.'}
        />
      </Head>
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
