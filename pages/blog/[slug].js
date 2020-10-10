import React from 'react'
import { RichText, Elements } from 'prismic-reactjs'
import { getBlogsWithSlug, getBlogsWithSameCategory } from '../../prismic-configuration'
import Layout from '../../components/Layout'
import Deck from '../../components/deck'
import ProfileDeckCard from '../../components/profileDeckCard'
import Link from 'next/link'
import webShare from 'react-web-share-api';
import dynamic from 'next/dynamic';
import ShareButton from '../../components/ShareButton'


export default function Post ({ post, postsYouMayLike }) {

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
        return <img src={slice.primary.image.url} />
      }
    })
  }

  

  return (
    <Layout>
      <section>
        <h1 className='blog-post-title'>{RichText.asText(post.title)}</h1>
        <div className='blog-post-author-reveal align-items-center ml-3'>
        <ShareButton config={{
          params: {
            title: RichText.asText(post.title),
            text: RichText.asText(post.title),
            url: 'http://localhost:3000/blog/ideologies-of-toxic-masculinity-in-cinema',
          }
        }}
        />

          <Link href={`/profile/${post.author._meta.id}`} passHref>
            <a className='profile-thumb-link'>
              <img className='blogpost-author-thumb' src={post.author.picture.url} />
              <span className='blogpost-author-name'>{post.author.name}</span>
              <span className='text-muted blog-post-date'>{parseDate(post.date)}</span>
            </a>
          </Link>

        </div>

        <div className='sm-12'>
          <img src={post.featured_image.hero.url} className='card-img featured-img' />
        </div>

        <div className='blog-container'>
          {htmlcontent}
        </div>
      </section>
      <section>
        <h2 className='text-center'>About the Author</h2>
        <ProfileDeckCard title={post.author.name} about={post.author.about} imgurl={post.author.picture.url} id={post.author._meta.id} sub_head='Author' />
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
