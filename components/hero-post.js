import { RichText } from 'prismic-reactjs'

export default function HeroPost ({
  title,
  coverImage
}) {
  return (
    <section>
      <div className='mb-5'>
        <h1>hello</h1>

        <h1>{RichText.asText(title)}</h1>
        <div className='sm-12'>
          <img src='https://source.unsplash.com/random/6000x4000' className='card-img' />
        </div>
      </div>
    </section>
  )
}
