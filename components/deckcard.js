import React from 'react'
// export default function DeckCard ({ title, imgurl }) {
//   return (
//     <div className='card mb-4 col-md-4 border-0'>
//       <div className='card-body '>
//         <h5 className='card-title'>{title}</h5>
//         <p className='card-text'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni eaque tenetur suscipit repellat, sapiente cumque quis aspernatur fugit voluptatum nihil, distinctio earum? Animi consectetur tempora ut nostrum explicabo a ad!</p>
//       </div>
//       <div className='card-footer'>
//         <small className='text-danger'>Read</small>
//       </div>
//       <img className='card-img-top' src={imgurl} alt='Card image cap' />
//     </div>
//   )
// }
const DeckCard = () => {
  return (
    <div className='post-card big post-7 post type-post status-publish format-standard has-post-thumbail hentry category-architecture tag-cities tag-design tag-guides'>
      <div className='big-latest-back'>
        <div class='row big-latest-row'>
          <div className='col-md-7 col-md-push-5 col-md-offset-0 col-lg-8 col-lg-push-4'>
            <img src='https://source.unsplash.com/random/600x400' />

          </div>
        </div>
      </div>
    </div>
  )
}

export default DeckCard
