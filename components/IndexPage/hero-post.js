import { RichText } from 'prismic-reactjs'
import Link from 'next/link'

export default function HeroPost ({
  title,
  coverImage,
  slugurl,
  type
}) {
  var t=type
  var redirect = {
    pathname: `/${type}/[slug]`,
    state: { slug: slugurl }
  }

  return (
    <section>
      <div className='mb-5'>
        <Link as={`/${type}/${slugurl}`} href={redirect}>
        <a className="card-title">{RichText.asText(title)}</a>
        </Link>
        <div className='sm-12'>
          <img src={coverImage.url} className='card-img' />
        </div>
      </div>
    </section>
  )
}
