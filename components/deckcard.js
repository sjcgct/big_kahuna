import React from 'react'
import Link from 'next/link'

export default function DeckCard ({ title, imgurl, imgalt, slugurl, profileUrl, profileImgUrl, profilealt, postDate, postCategory, type }) {
  var redirect = {
    pathname: `/${type}/[slug]`,
    state: { slug: slugurl }
  }

  var category_map = {
    Celluloid: 'celluloid',
    SciTech: 'scitech',
    AlumSpace: 'alumspace',
    'Open Page': 'openpage',
    'Tete-a-Tete with Interns': 'tete-a-tete'
  }

  var redirect_blog = {
    pathname: `/${type}/${category_map[postCategory]}/[slug]`,
    state: { slug: slugurl }
  }

  var parseDate = function (date) {
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
    var year_month_date = date.split('-')
    var month = months[parseInt(year_month_date[1]) - 1]
    return month + ' ' + year_month_date[2] + ',' + year_month_date[0]
  }

  if (type === 'blogs') {
    return (
      <div className='mb-4 col-md-6 col-lg-3'>
        <div className='grid-card'>
          <div className='grid-card-image-holder'>
            <Link as={`/${type}/${category_map[postCategory]}/${slugurl}`} href={redirect_blog}>
              <a aria-label={title}><img className='grid-card-image' src={imgurl} alt={imgalt} /></a>
            </Link>
          </div>
          <div className='grid-card-author-holder'>
            <div className='grid-card-avatar-holder'>
              <Link href={`/profile/${profileUrl}`} passHref>
                <a aria-label={profilealt}><img className='grid-card-avatar-image' src={profileImgUrl} alt={profilealt} /></a>
              </Link>
            </div>
            <div className='grid-card-category-holder'>
              <a aria-label={postCategory} href={'/blogs/' + category_map[postCategory]}>
                <span className='grid-card-category'>{postCategory}</span>
              </a>
            </div>
          </div>
          <div className='grid-card-content-holder'>
            <h3 className='grid-card-title'>
              <Link href={`/${type}/${category_map[postCategory]}/${slugurl}`} passHref>
                <a aria-label={title}>{title}</a>
              </Link>
            </h3>
            <span className='grid-card-date'>
              {parseDate(postDate)}
            </span>
          </div>
        </div>
      </div>
    )
  } else if (type === 'hog') {
    return (
      <div className='mb-4 col-md-6 col-lg-3'>
        <div className='grid-card'>
          <div className='grid-card-image-holder'>
            <Link as={`/${type}/${slugurl}`} href={redirect}>
              <a aria-label={imgalt}><img className='grid-card-image' src={imgurl} alt={imgalt} /></a>
            </Link>
          </div>
          <div className='grid-card-content-holder'>
            <h3 className='grid-card-title'>
              <Link as={`/${type}/${slugurl}`} href={redirect}>
                <a aria-label={title}>{title}</a>
              </Link>
            </h3>
            <span className='grid-card-date'>
              {parseDate(postDate)}
            </span>
          </div>
        </div>
      </div>
    )
  }
}
