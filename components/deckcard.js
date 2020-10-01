import React from 'react'
import Link from 'next/link'
import { RichText } from 'prismic-reactjs'

export default function DeckCard ({ title, imgurl, slugurl, profileUrl, postDate, postCategory, type }) {
  var redirect = {
    pathname: `/${type}/[slug]`,
    state: { slug: slugurl }
  }

  var parseDate = function (date) {
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
    var year_month_date = date.split('-')
    var month = months[parseInt(year_month_date[1]) - 1]
    return month + ' ' + year_month_date[2] + ',' + year_month_date[0]
  }
  if (type === 'blog') {
    return (
      <>
        <div className=' grid-card mb-4 col-md-6 col-lg-4'>
          <div className='grid-card-image-holder'>
            <Link as={`/${type}/${slugurl}`} href={redirect}>
              <a><img className='grid-card-image' src={imgurl} /></a>
            </Link>
          </div>
          <div className='grid-card-author-holder'>
            <div className='grid-card-avatar-holder'>
              <Link href='/'>
                <a><img className='grid-card-avatar-image' src={profileUrl} /></a>
              </Link>
            </div>
            <div className='grid-card-category-holder'>
              <Link href='/'>
                <a><span className='grid-card-category'>{postCategory}</span></a>
              </Link>
            </div>
          </div>
          <div className='grid-card-content-holder'>

            <h3 className='grid-card-title'>
              <Link href={`/${type}/${slugurl}`} passHref>
                <a>{title}</a>
              </Link>
            </h3>
            <span className='grid-card-date'>
              {parseDate(postDate)}
            </span>

          </div>
        </div>
      </>
    )
  } else if (type === 'hog') {
    return (
      <>
        <div className=' grid-card mb-4 col-md-6 col-lg-4'>
          <div className='grid-card-image-holder'>
            <Link as={`/${type}/${slugurl}`} href={redirect}>
              <a><img className='grid-card-image' src={imgurl} /></a>
            </Link>
          </div>
          <div className='grid-card-content-holder'>
            <h3 className='grid-card-title'>
              <Link as={`/${type}/${slugurl}`} href={redirect}>
                <a>{title}</a>
              </Link>
            </h3>
            <span className='grid-card-date'>
              {parseDate(postDate)}
            </span>
          </div>
        </div>
      </>
    )
  }
}

//  <div className='card mb-4 col-md-4 border-0'>
// <div className='card-body '>
// <Link as={`/${type}/${slugurl}`} href={redirect}>
//   <a className='card-title'>{title}</a>
// </Link>
// <p className='card-text'>{smallDescription}</p>
// </div>
// <div className='card-footer' />
// <img className='card-img-top' src={imgurl} alt='Card image cap'/>
// </div>
