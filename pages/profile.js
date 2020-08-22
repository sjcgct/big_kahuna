import Head from 'next/head'
import Layout from '../components/Layout'
import ProfilePostCard from '../components/ProfilePage/profilePostCard'

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
        <ProfilePostCard name="Ajay" imgurl="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1159990/pike-place.jpg" about="Hi I am AJ. I used to be a good guy, then I turned into a Devil. Now I suck up the blood of people kek.. Just kidding, i am a miserable human being who doesnt like to exist in this world."></ProfilePostCard> />
        <ProfilePostCard name="Amuthan" imgurl="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1159990/pike-place.jpg" about="Hi man"/>
        <ProfilePostCard name="Nolan" imgurl="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1159990/pike-place.jpg" about="Christopher Edward Nolan CBE is a British-American filmmaker known for making personal, distinctive films within the Hollywood mainstream. His directorial efforts have grossed more than US$4.7 billion in theatres worldwide and garnered a total of 34 Oscar nominations and ten wins."/>
      </div>
    </Layout>
  )
}

export default Profile
