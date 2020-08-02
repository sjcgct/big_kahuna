import React from 'react'
import Link from 'next/link'

export default function DeckCard ({ title, imgurl, slugurl,smallDescription }) {
  var redirect = {
    pathname: '/blog/[slug]',
    state: { slug: slugurl }
  }

  return (
    <div className='card mb-4 col-md-4 border-0'>
      <div className='card-body '>
      <Link as={`/blog/${slugurl}`} href={redirect}>
        <a className="card-title">{title}</a>
        </Link>
        <p className='card-text'>{smallDescription}</p>
      </div>
      <div className='card-footer'>
        
      </div>
      <img className='card-img-top' src={imgurl} alt='Card image cap' />
    </div>
  )
}
