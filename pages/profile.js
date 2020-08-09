import Head from 'next/head'
import Layout from '../components/Layout'
import ProfilePostCard from '../components/ProfilePage/profilePostCard'

const Profile = () => {
  return (
    <Layout>

      <div className='profile-header'>

        <div className='row'>

          {/* the follwing block of code is for people accessing the site from viewport sizes of medium and above (tablets and further)   */}
          <div className='col-md-2 my-auto d-none d-md-block'>
            <img className='img-fluid rounded-circle' src='https://source.unsplash.com/random/200x200' />
          </div>
          <div className='col-md-10 d-none d-md-block  my-auto'>
            <h2 className='bold'>Ajai Kannan K</h2>
            <p>afdjk jfhak fsjk fsjka ghj rwed r ygue uqe. rewhjde ewiu qewrgqwef qewgqw wefgqwe.
                wiueqkiuor, adsiwriew p8wajq89q4r. Aewihw. ruihwqe wur wer3 sdkher wrhf ruwe fhr34.
            </p>
          </div>
        </div>

        {/* the following block of code is for those accessing the site in smaller viewports (smartphones and feature phones) */}
        <div className='position-relative'>
          <div className='d-block d-md-none'>
            <img className='mx-auto d-block d-md-none img-thumbnail mb-2' src='https://source.unsplash.com/random/200x200' />
          </div>
          <div className=' justify-content-center d-block d-md-none'>
            <h2 className='bold text-center'>Ajai Kannan K</h2>
            <p className='text-justify'>afdjk jfhak fsjk fsjka ghj rwed r ygue uqe. rewhjde ewiu qewrgqwef qewgqw wefgqwe.
                wiueqkiuor, adsiwriew p8wajq89q4r. Aewihw. ruihwqe wur wer3 sdkher wrhf ruwe fhr34.
            </p>
          </div>
        </div>

      </div>

      <div className='profile-body'>
        <ProfilePostCard />
        <ProfilePostCard />
        <ProfilePostCard />
      </div>
    </Layout>
  )
}

export default Profile
