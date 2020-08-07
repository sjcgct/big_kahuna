import React from 'react'
import { RichText } from 'prismic-reactjs'
import HogTile from './hogTile'
import { getAllHogsForHome } from '../../prismic-configuration'

<<<<<<< HEAD
const HogList = ({ cards }) => {
=======
const HogList = ({cards}) => {
>>>>>>> b429bea150e2ed8403516fab9644599f6d2d1436
  var hogphotos = []
  for (var i = 0; i < cards.length; i++) {
    var post = cards[i].node
    var image = post.featured_image.thumbnail.url
    hogphotos[i] = <HogTile title={RichText.asText(post.title)} imgurl={image} slugurl={post._meta.uid} name={post.name} />
  }
  return (
    <>
      <div className='row'>
        {hogphotos}
      </div>
    </>
  )
}

export default HogList
