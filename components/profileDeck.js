
import React from 'react'
import ProfileDeckCard from './profileDeckCard'
import { RichText } from 'prismic-reactjs'

var parseDate = function (date) {
  var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
  var year_month_date = date.split('-')
  var month = months[parseInt(year_month_date[1]) - 1]
  return month + ' ' + year_month_date[2] + ',' + year_month_date[0]
}
export default function ProfileDeck ({ cards, type }) {
  var deckcards = []
  var cardarray = cards

  var arrayLength = cardarray.length
  for (var j = 0; j < arrayLength; j++) {
    var post = cardarray[j].node
    var smallDescription = ''
    var image = ''
    var date = ''
    if (type === 'blog') {
      smallDescription = post.excerpt
      image = post.featured_image.thumbnail.url
      date = parseDate(post.date)
    }

    deckcards[j] = <ProfileDeckCard title={RichText.asText(post.title)} about={smallDescription} imgurl={image} id={post._meta.uid} sub_head={date} type={type} />
  }

  return (
    <div className='row profile-body'>
      {deckcards}
    </div>
  )
}
