import Head from 'next/head'
import Layout from '../components/Layout'
import ProfilePostCard from '../components/profileDeckCard'

const Profile = () => {
  return (
    <Layout>

      <div className='profile-header'>

        <div class='profile'>
          <div class='profile-image'>
            <img src='https://source.unsplash.com/random/200x200' alt='' />
          </div>
          <div class='profile-user-settings'>
            <h1 class='profile-user-name'>ajboi</h1>
          </div>
          <div class='profile-bio'>
            <p> Ajai was the Chief Editor for the year 2019-20. He is a Mechanical Engineer who is more into writing and does a little code.
              He writes occasionally on <a href='https://medium.com/@ajboi'>Medium</a>.
            </p>
          </div>
        </div>

      </div>
      <hr />
      <div className='profile-body'>
        <ProfilePostCard name="Man" about="Simple man" imgurl='https://source.unsplash.com/random/200x200' id="id"/>
        <ProfilePostCard name="Man" about="Simple man" imgurl='https://source.unsplash.com/random/200x200' id="id"/>
        <ProfilePostCard name="Man" about="Simple man" imgurl='https://source.unsplash.com/random/200x200' id="id"/>
      </div>
    </Layout>
  )
}

export default Profile