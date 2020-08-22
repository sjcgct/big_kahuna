import React from 'react'

export default function ProfilePostCard ({name,about,imgurl}) {
  return (
    <div className='profile-post-card-container mx-auto'>
      <div className='profile-post-card'>
        <a className='card-link' href='#'>
          <article className='profile-blog-card'>
            <img className='profile-post-image' src={imgurl} />
            <div className='profile-article-details'>
              <h4 className='profile-post-category'>Author</h4>
              <h3 className='profile-post-title'>{name}</h3>
               <p className='profile-post-description'>{about}</p>
            </div>
          </article>
        </a>
      </div>
      <br />
    </div>
  )
}
