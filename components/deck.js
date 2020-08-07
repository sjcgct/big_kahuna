
import React from 'react'
import ReactDOM from 'react-dom'
import DeckCard from './deckcard'
import { RichText } from 'prismic-reactjs'

export default function Deck ({ cards, type }) {
  var deckcards = []
  var cardarray = cards

  var arrayLength = cardarray.length
  for (var j = 0; j < arrayLength; j++) {
    var post = cardarray[j].node
    var smallDescription = ''
    var image = ''
    if (type === 'blog') {
      smallDescription = post.excerpt
      image = post.featured_image.thumbnail.url
    } else if (type === 'hog') {
      smallDescription = post.name
      image = post.featured_image.homethumb.url
    }

    deckcards[j] = <DeckCard title={RichText.asText(post.title)} imgurl={image} slugurl={post._meta.uid} smallDescription={smallDescription} type={type} />
  }

  return (
    <div className='row'>
      {deckcards}
    </div>
  )
}

// export default Deck;
