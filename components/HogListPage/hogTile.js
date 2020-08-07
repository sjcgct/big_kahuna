import React from 'react'
import Link from 'next/link'

export default function HogTile ({ title, imgurl, slugurl, name }) {
  var redirect = {
    pathname: `/${'hog'}/[slug]`,
    state: { slug: slugurl }
  }

  return (
    <div className='col-md-4'>
      <div className='poster mb-5'>
        <h4>
          <Link as={`/${'hog'}/${slugurl}`} href={redirect}>
            <a className='text-center'>{title}</a>
          </Link>
        </h4>
        <img src={imgurl} className='img-fluid hog-tile-img' />
      </div>
    </div>
  )
}
