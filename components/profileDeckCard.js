import React from 'react'
import Link from 'next/link'

export default function ProfileDeckCard ({ title, about, imgurl, imgalt, id, sub_head, type }) {
  return (
    <div className='profile-post-card-container mx-auto'>
      <div className='profile-post-card'>
        <Link href={`/${type}/${id}`}>
          <a className='card-link' aria-label={title}>
            <article className='profile-blog-card'>
              <img className='profile-post-image' src={imgurl} alt={imgalt} />
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
