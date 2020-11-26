import React from 'react'
import { RichText, Elements } from 'prismic-reactjs'
import { getBlogsWithSlug, getBlogsWithSameCategory, getDisclaimer } from '../../prismic-configuration'
import Layout from '../../components/Layout'
import Deck from '../../components/deck'
import ProfileDeckCard from '../../components/profileDeckCard'
import Link from 'next/link'
import SharePanel from '../../components/sharePanel'
import Head from 'next/head'

export default function Post ({ post, postsYouMayLike, disclaimerText }) {
  var parseDate = function (date) {
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
    var year_month_date = date.split('-')
    var month = months[parseInt(year_month_date[1]) - 1]
    return month + ' ' + year_month_date[2] + ',' + year_month_date[0]
  }

  var htmlcontent
  if (post.body == null) {
    htmlcontent = RichText.render(post.content)
  } else {
    htmlcontent = post.body.map(slice => {
      if (slice.type === 'quote') {
        return <blockquote className='text-justify mx-auto'> {RichText.render(slice.primary.quote)} </blockquote>
      }
      if (slice.type === 'paragraph') {
        return RichText.render(slice.primary.paragraph)
      }
      if (slice.type === 'image') {
        return <>
          <img src={slice.primary.image.url} alt={slice.primary.image.alt} />
          <p className='image-description'>{RichText.render(slice.primary.imageDescription)}</p>
        </>
      }
    })
  }
  return (
    <Layout>
      <Head>
        <title>{RichText.asText(post.title) + ' | Student Journalist Council - GCT'}</title>
        <meta charset='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1, shrink-to-fit=no' />
        <meta
          name='Keywords'
          content={RichText.asText(post.title) + ' ' + post.author.name + ' Government College of Technology, GCT, Coimbatore, SJC, Student Journalist Council, Student Journalist Council-GCT, SJCGCT, Aperture, Humans of GCT, ABC Channel, GCT News, GCT Updates'}
        />
        <meta
          name='Description'
          content={RichText.asText(post.title) + ', an article written by ' + post.author.name + ', published by Student Journalist Council - GCT.'}
        />
      </Head>
      <section>
        <header className='blog-header'>
          <h1 className='blog-post-title'>{RichText.asText(post.title)}</h1>
          <p className='blog-post-author-reveal'>
            <Link href={`/profile/${post.author._meta.id}`} passHref>
              <a className='profile-thumb-link' aria-label={post.author.name}>
                <span className='blogpost-author-name'>{post.author.name}</span>
              </a>
            </Link>
            <span className='blog-post-date'>{parseDate(post.date)}</span>
          </p>
        </header>

        <div className='sm-12 featured-img-holder'>
          <img src={post.featured_image.hero.url} className='card-img featured-img' width='1200' height='600' alt = {post.featured_image.hero.alt}/>
        </div>

        <div className='blog-container'>
          {htmlcontent}

          <section className='disclaimer-quote'>
            {RichText.render(disclaimerText)}
          </section>
        </div>

        <div className='post-share-tray'>
          <SharePanel url={'sjcgct.in/blog/' + post._meta.uid} caption={RichText.asText(post.title)} />
        </div>
      </section>

      <section>
        <h2 className='text-center'>About the Author</h2>
        <ProfileDeckCard title={post.author.name} about={post.author.about} imgurl={post.author.picture.url} imgalt={post.author.picture.alt} id={post.author._meta.id} sub_head='Author' type='profile'/>
      </section>

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
  var slugurl = params.slug
  const fetchedpost = await getBlogsWithSlug(slugurl)
  const post = fetchedpost[0].node
  const categoryId = post.category._meta.id
  var postsYouMayLike = await getBlogsWithSameCategory(categoryId, 4)
  postsYouMayLike = postsYouMayLike.edges
  const disclaimer = await getDisclaimer()
  var disclaimerText = disclaimer.edges[0].node.disclaimer_text
  return {
    props: { post, postsYouMayLike, disclaimerText }
  }
}
