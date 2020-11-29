import React from 'react'
import { RichText } from 'prismic-reactjs'
import ApertureCard from './aperturecard'

export default function ApertureDeck ({ cards }) {
  var aperturecards = []
  var cardarray = cards

  var arrayLength = cardarray.length
  for (var j = 0; j < arrayLength; j++) {
    var post = cardarray[j].node
    aperturecards[j] =
      <ApertureCard
        title={RichText.asText(post.title)}
        url={post.link}
        description={post.description}
      />
  }

  return (
    <div className='row newsletters'>
      {aperturecards}
    </div>
  )
}
