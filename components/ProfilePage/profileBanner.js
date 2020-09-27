
export default function ProfileBanner ({ name, about, imgurl }) {
  return (

    <div>
      <div className='profile-header'>
        <div className='profile'>
          <div className='profile-image'>
            <img src={imgurl} alt='' />
          </div>
          <div className='profile-user-settings'>
            <h1 className='profile-user-name'>{name}</h1>
          </div>
          <div className='profile-bio'>
            <p> {about} </p>
          </div>
        </div>

      </div>
      <hr />
    </div>

  )
}
