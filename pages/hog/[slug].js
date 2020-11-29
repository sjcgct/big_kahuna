import { RichText } from 'prismic-reactjs'
import React from 'react'
import { getHogWithSlug, getAllHogsForHome, getDisclaimer } from '../../prismic-configuration'
import Layout from '../../components/Layout'
import Deck from '../../components/deck'
import SharePanel from '../../components/sharePanel'
import Head from 'next/head'


export default function Post ({ post, morePosts, disclaimerText }) {
  return (
    <Layout>
      <Head>
        <title>{RichText.asText(post.title) + ' | Humans of GCT'}</title>
        <meta charSet='utf-8' />
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
        <header className='blog-header'>
          <h1 className='blog-post-title'>{RichText.asText(post.title)}</h1>
          <p className='blog-post-author-reveal'>
            <span className='blogpost-author-name'>{'- ' + post.name + '.'}</span>
          </p>
        </header>
        <div className='hog-container'>
          <div className='row hog-featured-img-holder'>
            <img src={post.featured_image.url} className='hog-featured-img' alt={post.featured_image.alt}/>
          </div>
          <div className='mb-3'>
            <p className='text-justify'>{RichText.render(post.story)}</p>
          </div>

          <section className='disclaimer-quote'>
            {RichText.render(disclaimerText)}
          </section>
        </div>

        <div className='post-share-tray'>
          <SharePanel url={`sjcgct.in/hog/+${post._meta.uid}`} caption={RichText.asText(post.title)} />
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
  var slugurl = params.slug
  const fetchedpost = await getHogWithSlug(slugurl)
  const post = fetchedpost[0].node
  const posts = await getAllHogsForHome(' ', 5)
  var morePosts = posts.edges
  morePosts=morePosts.filter((post)=>{
    return post.node._meta.uid !== slugurl;
  })
  if(morePosts.length==5) morePosts.length=4;
  const disclaimer = await getDisclaimer()
  var disclaimerText = disclaimer.edges[0].node.disclaimer_text

  return {
    props: { post, morePosts, disclaimerText }
  }
}
