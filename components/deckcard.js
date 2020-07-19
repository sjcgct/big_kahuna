import React from 'react'
export default function DeckCard ({ title, imgurl }) {
  return (
    <div className='card mb-4 col-md-4 border-0'>
      <div className='card-body '>
        <h5 className='card-title'>{title}</h5>
        <p className='card-text'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni eaque tenetur suscipit repellat, sapiente cumque quis aspernatur fugit voluptatum nihil, distinctio earum? Animi consectetur tempora ut nostrum explicabo a ad!</p>
      </div>
      <div className='card-footer'>
        <small className='text-danger'>Read</small>
      </div>
      <img className='card-img-top' src={imgurl} alt='Card image cap' />
    </div>
  )
}
