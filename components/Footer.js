import React from 'react'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { RichText, Elements } from 'prismic-reactjs'
import { ID, NO } from '../foo'
library.add(fab)

export default function Footer () {
  console.log(ID, NO)

  return (
    <footer className='mt-2'>
      <ul className='list-inline social-icon-list'>
        <SocialIcon link='https://www.facebook.com/sjcgct' icon='facebook-square' />
        <SocialIcon link='"https://www.instagram.com/sjcgct/"' icon='instagram-square' />
        <SocialIcon link='https://www.twitter.com/sjcgct' icon='twitter-square' />
        <SocialIcon link='https://www.linkedin.com/company/sjcgct' icon='linkedin' />
        <SocialIcon link='https://www.youtube.com/ApertureBroadcastingChannelGCT' icon='youtube' />
      </ul>
      <p>
        <a className='contact-link' aria-label='email us' href='hi'>YEs</a>
        <br />
        <a className='contact-link' aria-label='Talk to us over phone' href='ok'>No</a>
        <br /><br />
                 Government College of Technology,
        <br />
                 Thadagam Road,
        <br />
                 Coimbatore - 13.
        <br />
        <a className='contact-link' aria-label='Find us on Google Maps' target='blank' href='https://goo.gl/maps/NX5hqshxhPgoLzZD9'>View on
                 map
        </a>
      </p>
      <small>
           © {(new Date().getFullYear())}. Student Journalist Council - GCT
        <br />
        <a aria-label='Github Repo' className='contact-link' href='https://github.com/sjcgct/big_kahuna' target='blank'>Project Big Kahuna</a>
      </small>
    </footer>
  )
}

class SocialIcon extends React.Component {
  render () {
    return (
      <li className='list-inline-item ml-3'>
        <a href={this.props.link} aria-label={'Follow us on ' + this.props.icon}>
          <FontAwesomeIcon icon={['fab', this.props.icon]} size='3x' className='social-icon' />
        </a>
      </li>
    )
  }
}

async function getMail () {
  const footer_email = await RichText.asText(ID)
  return footer_email
}
// export async function getServerSideProps () {
//   const footer = await getFooter()
//   var footerEmail = footer.edges[0].node.email
//   var footerContact = footer.edges[0].node.contact_number
//   console.log(footerEmail.text)

//   return {
//     props: { footerEmail, footerContact }
//   }
// }
