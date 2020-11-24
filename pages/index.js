import Head from 'next/head'
import React from 'react'
import { getAllBlogsForHome, getAllHogsForHome } from '../prismic-configuration'
import Layout from '../components/Layout'
import ReactPlayer from 'react-player'
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
        <div className='heading'>
          <h2>Blog</h2>
        </div>

        {morePosts && (
          <Deck
            cards={morePosts}
            type='blog'
          />
        )}
      </div>

      <section className='home-hog-section'>
        <div className='heading'>
          <h2>Humans of GCT</h2>
        </div>
        {allHogs && (
          <Deck
            cards={allHogs}
            type='hog'
          />
        )}
      </section>

      <section className='home-abc-section'>
        <div className='heading'>
          <h2>ABC Channel</h2>
        </div>

        <div className='row'>
          <div className='col-12 col-md-9 col-lg-9 col-xl-9'>
            <div className='iframe-container'>
              {/* <iframe width='100%' height='auto' src='https://www.youtube.com/embed/7sDY4m8KNLc' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen /> */}
              <ReactPlayer controls url='https://www.youtube.com/embed/7sDY4m8KNLc' />
            </div>
          </div>
          <ul className='my-auto video-thumb d-none d-md-block col-md-3 col-lg-3 col-xl-3'>
            <li className=''>
              <img className='img-fluid my-1' src='https://img.youtube.com/vi/7sDY4m8KNLc/maxresdefault.jpg' alt='hi' />
            </li>
            <li className=''>
              <img className='img-fluid my-1' src='https://img.youtube.com/vi/XVxvYrjdwLA/maxresdefault.jpg' alt='hi' />
            </li>
            <li className=''>
              <img className='img-fluid my-1' src='https://img.youtube.com/vi/XVxvYrjdwLA/maxresdefault.jpg' alt='hi' />
            </li>
          </ul>
        </div>

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
