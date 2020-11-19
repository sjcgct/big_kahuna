import React from 'react'
import { RichText } from 'prismic-reactjs'
import ApertureCard from './aperturecard'

export default function ApertureDeck ({ cards }) {
  var aperturecards = []
  var cardarray = cards

  var arrayLength = cardarray.length
  for (var j = 0; j < arrayLength; j++) {
    var post = cardarray[j].node
    // console.log(RichText.asText(post.title))
    // console.log(post.link)
    aperturecards[j] =
      <ApertureCard
        title={RichText.asText(post.title)}
        url={post.link}
        description={post.description}
      />
  }
  // console.log(aperturecards)

  return (
    <div className='row newsletters'>
      {aperturecards}
    </div>
  )
}
