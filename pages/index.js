import Head from 'next/head'
import React from 'react'
import { getAllBlogsForHome, getAllHogsForHome, getAllVideosForHome } from '../prismic-configuration'
import Layout from '../components/Layout'
import ReactPlayer from 'react-player/youtube'
import Deck from '../components/deck'

export default function BlogHome ({ preview, allBlogs, allHogs, allAbcs }) {
  const morePosts = allBlogs

  var videoArray = allAbcs
  var mainVideo = allAbcs[0].node
  var mainVideoLink = `https://www.youtube.com/embed/${mainVideo.unique_id}`

  var subVideos = []
  for (var j = 1; j < 4; j++) {
    var subVideo = videoArray[j].node
    var subVideoImageLink = `https://img.youtube.com/vi/${subVideo.unique_id}/maxresdefault.jpg`
    var subVideoLink = `https://www.youtube.com/watch?v=${subVideo.unique_id}`
    subVideos[j] =
      <li>
        <a href={subVideoLink} rel='noopener noreferrer' target='_blank' aria-label={subVideo.title}>
          <img className='img-fluid my-1' src={subVideoImageLink} alt={subVideo.video_title} loading='lazy' />
        </a>
      </li>
  }

  return (
    <Layout menu='home'>
      <Head>
        <title>Student Journalist Gouncil - GCT | Student Media Body</title>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1, shrink-to-fit=no' />
        <meta
          name='Keywords'
          content='Government College of Technology, GCT, Coimbatore, Student Media Body, SJC, Student Journalist Council, Student Journalist Council - GCT, SJCGCT, Aperture, Humans of GCT, ABC Channel, GCT News, GCT Updates'
        />
        <meta
          name='Description'
          content='
          Student Journalist Council-GCT is the Student Media Body of Government College of Technology, Coimbatore. It covers and reports the
           various events and activities happening inside the campus.  It also steers "Humans of GCT", a storytelling project and publishes the student newsletter "Aperture".
          '
        />
        <meta name='robots' content='index, follow' />
        <link rel='canonical' href='https://www.sjcgct.in/' />
      </Head>

      <section className='home-blog-section'>
        <div className='heading'>
          <h2>Blog</h2>
        </div>
        {morePosts && (
          <Deck
            cards={morePosts}
            type='blog'
          />
        )}
      </section>

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
          <div className='col-sm-12 col-md-9'>
            <div className='player-wrapper'>
              {
                mainVideo && (
                  <ReactPlayer className='react-player' url={mainVideoLink} width='100%' height='100%' />
                )
              }
            </div>
          </div>
          <ul className='my-auto video-thumb d-none d-md-block col-md-3 col-lg-3 col-xl-3'>
            {subVideos}
          </ul>
        </div>
      </section>

    </Layout>
  )
}

export async function getStaticProps ({ preview = false, previewData }) {
  const blogs = await getAllBlogsForHome(' ', 8)
  const hogs = await getAllHogsForHome(' ', 8)
  const abcs = await getAllVideosForHome()
  var allBlogs = blogs.edges
  var allAbcs = abcs.edges
  var allHogs = hogs.edges
  return {
    props: { preview, allBlogs, allHogs, allAbcs },
    revalidate: 1
  }
}
