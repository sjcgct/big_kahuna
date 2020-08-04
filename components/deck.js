
import React from 'react'
import ReactDOM from 'react-dom'
import DeckCard from './deckcard'
import { RichText } from 'prismic-reactjs'

export default function Deck ({ cards,type }) {
  var deckcards = []
  var cardarray = cards

  var arrayLength = cardarray.length
  for (var j = 0; j < arrayLength; j++) {
    var post = cardarray[j].node
    var smallDescription=''
    if(type=='blog'){
      smallDescription=post.excerpt
    }
    else if(type=='hog'){
      smallDescription=post.name
    }
    
    deckcards[j] = <DeckCard title={RichText.asText(post.title)} imgurl={post.featured_image.url} slugurl={post._meta.uid} smallDescription={smallDescription} type={type}/>
    // deckcards[i]= <DeckCard title="My title " imgurl="https://source.unsplash.com/random/6000*4000"></DeckCard>
  }

  return (
    <div className='row'>
      {deckcards}
    </div>
  )
}

// export default Deck;
