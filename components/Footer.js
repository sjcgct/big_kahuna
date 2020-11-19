import React from 'react'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
library.add(fab)

export default function Footer () {
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
        <a className='contact-link' aria-label='email us' href='mailto:sjcgct@gmail.com'>sjcgct@gmail.com</a>
        <br />
        <a className='contact-link' aria-label='Talk to us over phone' href='tel:918667312273'>+91 86673 12273</a>
        <br /><br />
                 Government College of Technology,
        <br />
                 Thadagam Road,
        <br />
                 Coimbatore - 13.
        <br />
        <a className='contact-link' aria-label='Find us on Google Maps' target='blank' href='https://goo.gl/maps/h6gGpcoZDw92'>View on
                 map
        </a>
      </p>
      <small>
                © Twenty20. Student Journalist Council - GCT
        <br />
                Project Big Hanukkah Build Alpha
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
