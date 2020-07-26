import React from 'react'
import Link from 'next/link'

export default function DeckCard ({ title, imgurl, slugurl }) {
  var redirect = {
    pathname: '/blog/[slug]',
    state: { slug: slugurl }
  }

  return (
    <div className='card mb-4 col-md-4 border-0'>
      <div className='card-body '>
        <h5 className='card-title'>{title}</h5>
        <p className='card-text'>Small version of the post</p>
      </div>
      <div className='card-footer'>
        <Link as={`/blog/${slugurl}`} href={redirect}>
          <small className='text-danger stretched-link'>Read</small>
        </Link>
        {/* <a href={slugurl} className="stretched-link"></a>
                <small className="text-danger" >Read</small> */}
      </div>
      <img className='card-img-top' src={imgurl} alt='Card image cap' />
    </div>
  )
}
