import Head from 'next/head'
import React from 'react'
import { getAllBlogsForHome, getAllHogsForHome } from '../prismic-configuration'
import Layout from '../components/Layout'
import Deck from '../components/deck'

export default function BlogHome ({ preview, allBlogs, allHogs }) {
  const morePosts = allBlogs
  return (
    <Layout>
      <Head>
        <title>Student Journalist Gouncil - GCT | Student Media Body of GCT, Coimbatore</title>
        <meta charset='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1, shrink-to-fit=no' />
        <meta
          name='Keywords'
          content='Government College of Technology, GCT, Coimbatore, SJC, Student Journalist Council, Student Journalist Council - GCT, SJCGCT, Aperture, Humans of GCT, ABC Channel, GCT News, GCT Updates'
        />
        <meta
          name='Description'
          content='Student media body of Government College of Technology, Coimbatore. We are the face of Journalism and Photography inside the campus. We cover news happening inside the campus. We also publish the official student newsletter of the campus, Aperture.'
        />
      </Head>

      <div className='home-blog-section'>
        <h2>Blog</h2>
        {morePosts && (
          <Deck
            cards={morePosts}
            type='blogs'
          />
        )}
      </div>

      <section className='home-hog-section'>
        <h2>Humans of GCT</h2>

        {allHogs && (
          <Deck
            cards={allHogs}
            type='hog'
          />
        )}
      </section>
    </Layout>
  )
}

export async function getStaticProps ({ preview = false, previewData }) {
  const blogs = await getAllBlogsForHome(' ', 8)
  const hogs = await getAllHogsForHome(' ', 8)
  var allBlogs = blogs.edges
  var allHogs = hogs.edges
  return {
    props: { preview, allBlogs, allHogs },
    revalidate: 1
  }
}
