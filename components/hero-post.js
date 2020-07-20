import { RichText } from 'prismic-reactjs'

export default function HeroPost ({
  title,
  coverImage,
  slug
}) {
  return (
    <section>
      <div className='mb-5'>
        <h1>{RichText.asText(title)}</h1>
        <div className='sm-12'>
          <img src={coverImage.url} className='card-img' />
        </div>
      </div>
    </section>
  )
}
