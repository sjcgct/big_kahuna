import Head from 'next/head'

export default function BlogHome ({ preview, allPosts }) {
  return (
    <>
      <Head>
        <title>Student Journalist Council</title>
      </Head>
      Hi i am aj
    </>
  )
}

export async function getServerSideProps ({ preview = false, previewData }) {
  const allPosts = await getAllPostsForHome(previewData)
  return {
    props: { preview, allPosts }
  }
}
