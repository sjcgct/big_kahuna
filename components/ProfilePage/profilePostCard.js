
const ProfilePostCard = () => {
  return (
    <div className='profile-post-card-container mx-auto'>
      <div className='profile-post-card'>
        <a className='card-link' href='#'>
          <article className='profile-blog-card'>
            <img className='profile-post-image' src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/1159990/pike-place.jpg' />
            <div className='profile-article-details'>
              <h4 className='profile-post-category'>category</h4>
              <h3 className='profile-post-title'>name</h3>
              <p className='profile-post-description'>Hi I am AJ. I used to be a good guy, then I turned into a Devil. Now I suck up the blood of people kek.. Just kidding, i am a miserable human being who doesnt like to exist in this world.</p>
              <p className='profile-post-author'>By author</p>
            </div>
          </article>
        </a>
      </div>
      <br />
    </div>
  )
}

export default ProfilePostCard
