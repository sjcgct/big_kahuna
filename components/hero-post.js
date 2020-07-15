import { RichText } from 'prismic-reactjs'

export default function HeroPost ({
  title,
  coverImage
}) {
  return (
    <section>
      <div className='mb-5'>
        <h1>hello</h1>
        {<img src={coverImage.url} />}
        <h1>{RichText.asText(title)}</h1>
      </div>
    </section>
  )
}
