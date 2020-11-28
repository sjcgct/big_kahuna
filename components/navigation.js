import { Nav, Navbar } from 'react-bootstrap'
import React, { Component } from 'react'
import Link from 'next/link'

class NavBar extends Component {
  render () {
    var redirect = {
      pathname: '/blogs/[slug]',
      state: { slug: 'recent' }
    }
    return (
      <div className='container'>
        <Navbar className='navbar' expand='lg'>
          <Navbar.Brand href='/'>
            <a href='/' aria-label='logo'>
              <img src='/search.svg' style={{ width: 50, marginTop: -7, marginLeft: -5 }} />
            </a>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls='basic-navbar-nav' />

          <Navbar.Collapse id='basic-navbar-nav'>

            <Nav className='mr-auto'>

              <Link href='/' passHref>
                <Nav.Link aria-label='Home'>Home</Nav.Link>
              </Link>

              <Link href='/blogs/[category]' as='/blogs/recent' passHref>
                <Nav.Link aria-label='Blog'>Blog</Nav.Link>
              </Link>

              <Link href='/hog' passHref>
                <Nav.Link aria-label='Humans of GCT'>Humans of GCT</Nav.Link>
              </Link>

              <Link href='/aperture' passHref>
                <Nav.Link aria-label='Aperture Newsletter'>Aperture Newsletter</Nav.Link>
              </Link>

              <Link href='/podcast' passHref>
                <Nav.Link aria-label='Podcast'>Podcast</Nav.Link>
              </Link>

              <Nav.Link href='https://www.youtube.com/ApertureBroadcastingChannelGCT' aria-label='ABC Channel'>ABC Channel</Nav.Link>

              <Link href='/team/[year]' as='/team/current-team' passHref>
                <Nav.Link aria-label='Team'>Team</Nav.Link>
              </Link>

            </Nav>

          </Navbar.Collapse>

        </Navbar>
      </div>
    )
  }
}

export default NavBar
