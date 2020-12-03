import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { RichText } from 'prismic-reactjs'
import ApolloClient from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { PrismicLink } from 'apollo-link-prismic'
import gql from 'graphql-tag'
import React, { useState, useEffect } from 'react'
library.add(fab)

const apolloClient = new ApolloClient({
  link: PrismicLink({
    uri: 'https://sjcgctrepo.prismic.io/graphql',
    accessToken: process.env.PRISMIC_TOKEN
  }),
  cache: new InMemoryCache()
})

function getFooter () {
  const query = gql`
          {
              allFooters {
                edges {
                  node {
                    contact_number
                    email
                  }
                }
              }
          }
          `
  return query
}

export default function Footer () {
  const [email, setEmail] = useState([])
  const [phone, setPhoneNo] = useState([])

  useEffect(() => {
    apolloClient.query({
      query: getFooter()
    }).then(response => {
      var email = response.data.allFooters.edges[0].node.email
      var contact = response.data.allFooters.edges[0].node.contact_number
      setEmail(email[0].text)
      setPhoneNo(contact[0].text)
    }).catch(error => {
    })
  }, [])

  return (
    <footer className='mt-2'>
      <ul className='list-inline social-icon-list'>
        <SocialIcon link='https://www.facebook.com/sjcgct' icon='facebook-square' />
        <SocialIcon link='"https://www.instagram.com/sjcgct/"' icon='instagram-square' />
        <SocialIcon link='https://www.twitter.com/sjcgct' icon='twitter-square' />
        <SocialIcon link='https://www.linkedin.com/company/sjcgct' icon='linkedin' />
      </ul>
      <p>
        {/* <a className='contact-link' aria-label='email us' rel='noopener noreferrer' target='_blank' href={`mailto:${email}`}>{email}</a>
        <br /> */}
        <a className='contact-link' aria-label='Talk to us over phone' rel='noopener noreferrer' target='_blank' href={`tel:${phone}`}>{phone}</a>
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
        <a href={this.props.link} rel='noopener noreferrer' aria-label={'Follow us on ' + this.props.icon}>
          <FontAwesomeIcon icon={['fab', this.props.icon]} size='3x' className='social-icon' />
        </a>
      </li>
    )
  }
}
