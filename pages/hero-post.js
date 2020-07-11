import { RichText } from 'prismic-reactjs'



export default function HeroPost({
  title,
  coverImage
}) {
  return (
    <section>
      <div className="mb-8 md:mb-16">

        <img src={coverImage.url}></img>
        <h1>{RichText.asText(title)}</h1>
      </div>
    </section>
  )
}
