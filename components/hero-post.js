import { RichText } from 'prismic-reactjs'

export default function HeroPost ({
  title,
  coverImage
}) {
  return (
    <section>
      <div className='mb-5 container'>
        <h1>hello</h1>

        <h1>{RichText.asText(title)}</h1>
        <style jsx>{`
        img {
          width: 30%;
          display: none;
          `}
        </style>
      </div>
    </section>
  )
}
