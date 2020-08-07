import React from 'react'
import Link from 'next/link'

export default function DeckCard ({ title, imgurl, slugurl, smallDescription, type }) {
  var redirect = {
    pathname: `/${type}/[slug]`,
    state: { slug: slugurl }
  }

  return (
    <div className='card mb-4 col-md-4 border-0'>
      <div className='card-body '>
        <Link as={`/${type}/${slugurl}`} href={redirect}>
          <a className='card-title'>{title}</a>
        </Link>
        <p className='card-text'>{smallDescription}</p>
      </div>
      <div className='card-footer' />
      <img className='card-img-top' src={imgurl} alt='Card image cap' />
    </div>
  )
}
