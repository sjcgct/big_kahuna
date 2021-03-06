/* eslint-disable no-inner-declarations */
import Head from 'next/head'
import React, { useState, useEffect } from 'react'
import { getAllBlogsForHome, getAllHogsForHome, getAllVideosForHome } from '../prismic-configuration'
import Layout from '../components/Layout'
import Deck from '../components/deck'

export default function BlogHome ({ preview, allBlogs, allHogs, allAbcs }) {
  const morePosts = allBlogs

  var videoArray = allAbcs
  var mainVideo = allAbcs[0].node
  var mainVideoLink = `https://www.youtube.com/embed/${mainVideo.unique_id}`
  var mainVideoImageLink = `https://img.youtube.com/vi/${mainVideo.unique_id}/hqdefault.jpg`

  var subVideos = []
  for (var j = 1; j < 4; j++) {
    var subVideo = videoArray[j].node
    const size = useWindowSize()
    if (size.width > 767) {
      var subVideoImageLink = `https://img.youtube.com/vi/${subVideo.unique_id}/maxresdefault.jpg`
    } else {
      var subVideoImageLink = ''
    }
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
        <title>Student Journalist Council - GCT | Student Media Body</title>
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
                  <iframe className='react-player'

  src={mainVideoImageLink}
  srcDoc={`<style>*{padding:0;margin:0;overflow:hidden}html,body{height:100%}img,span{position:absolute;width:100%;top:0;bottom:0;margin:auto}span{height:1.5em;text-align:center;font:48px/1.5 sans-serif;color:white;text-shadow:0 0 0.5em black}</style><a href=${mainVideoLink}><img src=${mainVideoImageLink} alt='Aperture Broadcasting Channel Featured Video'><span>▶</span></a>`}
  frameBorder="0"
  width="100%"
  height="100%"
  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
  allowFullScreen
  title="The Dark Knight Rises: What Went Wrong? – Wisecrack Edition"
></iframe>
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

// Hook
function useWindowSize () {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  var [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined
  })

  useEffect(() => {
    if (typeof window !== 'undefined') {
      function handleResize () {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight
        })
      }

      // Add event listener
      window.addEventListener('resize', handleResize)

      // Call handler right away so state gets updated with initial window size
      handleResize()

      // Remove event listener on cleanup
      return () => window.removeEventListener('resize', handleResize)
    }
  }, []) // Empty array ensures that effect is only run on mount
  return windowSize
}
