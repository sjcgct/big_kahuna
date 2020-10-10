import React from 'react'
import Link from 'next/link'

export default function LoaderDeckCard ({ type }) {
  var profileRound
  if (type === undefined) {
    profileRound = <div className='loading-card-avatar-holder shine' />
    console.log('Type is undefined')
  }
  return (
    <div className='grid-card mb-4 col-md-6 col-lg-4'>
      <div className='loading-image-holder shine' />
      {profileRound}
      <div className='loading-card-content-holder shine mt-2 mb-1' />
      <div className='loading-card-content-holder shine mb-1' />
    </div>
  )
}
