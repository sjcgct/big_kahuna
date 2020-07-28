import { RichText } from 'prismic-reactjs'
import Link from 'next/link'

export default function HeroPost ({
  title,
  coverImage,
  slugurl
}) {
  var redirect = {
    pathname: '/blog/[slug]',
    state: { slug: slugurl }
  }

  return (
    <section>
      <div className='mb-5'>
        <h1>{RichText.asText(title)}</h1>
        <Link as={`/blog/${slugurl}`} href={redirect}>
          <small className='text-danger stretched-link'>Read</small>
        </Link>
        <div className='sm-12'>
          <img src={coverImage.url} className='card-img' />
        </div>
      </div>
    </section>
  )
}
