import React from 'react'
import Link from 'next/link'

export default function ProfilePostCard ({ title, about, imgurl, id, sub_head }) {
  var redirect = {
    pathname: '/profile/[slug]',
    state: { slug: id }
  }
  return (
    <div className='profile-post-card-container mx-auto'>
      <div className='profile-post-card'>
        <Link as={`/profile/${id}`} href={redirect}>
          <a className='card-link'>
            <article className='profile-blog-card'>
              <img className='profile-post-image' src={imgurl} />
              <div className='profile-article-details'>
                <h4 className='profile-post-category'>{sub_head}</h4>
                <h3 className='profile-post-title'>{title}</h3>
                <p className='profile-post-description'>{about}</p>
              </div>
            </article>
          </a>
        </Link>
      </div>
      <br />
    </div>
  )
}
