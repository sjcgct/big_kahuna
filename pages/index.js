import Head from 'next/head'
import HeroPost from './hero-post'
import {getAllPostsForHome} from '../prismic-configuration'

export default function BlogHome({preview,allPosts}) {
  const heroPost = allPosts[0].node
  const morePosts = allPosts.slice(1)
  
  return (
    <>
        <Head>
          <title>Student Journalist Council</title>
        </Head>
          {heroPost && (
            <HeroPost
              title={heroPost.title}
              coverImage={heroPost.coverimage}
            />
          )}
            
    </>
  )
}


export async function getServerSideProps({ preview = false, previewData }) {
  const allPosts = await getAllPostsForHome(previewData)
  return {
    props: { preview, allPosts },
  }
  
}