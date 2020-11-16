
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
    var imagealt = ''
    var date = ''
    var avatar = ''
    var avataralt = ''
    var category = ''
    var profileId = ''
    if (type === 'blogs') {
      image = post.featured_image.thumbnail.url
      imagealt = post.featured_image.thumbnail.alt
      date = post.date
      avatar = post.author.picture.url
      avataralt = post.author.picture.alt
      category = post.category.name
      profileId = post.author._meta.id
    } else if (type === 'hog') {
      image = post.featured_image.homethumb.url
      imagealt = post.featured_image.thumbnail.alt
      date = post.date
    }

    deckcards[j] = <DeckCard
      title={RichText.asText(post.title)}
      imgurl={image}
      imgalt={imagealt}
      slugurl={post._meta.uid}
      profileImgUrl={avatar}
      profilealt={avataralt}
      profileUrl={profileId}
      postDate={date}
      postCategory={category}
      type={type}
    />
  }

  return (
    <div className='row'>
      {deckcards}
    </div>
  )
}
