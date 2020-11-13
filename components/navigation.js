import { Nav, NavDropdown, Navbar } from 'react-bootstrap'
import React, { Component } from 'react'
import Link from 'next/link'

class NavBar extends Component {
  render () {
    var redirect = {
      pathname: `/blogs/[slug]`,
      state: { slug: 'recent' }
    }
    return (
      <Navbar className='navbar' expand='lg'>
        <Navbar.Brand href='/'>
          <a href='/'>
            <img src='https://raw.githubusercontent.com/sjcgct/sjc_gct_web/master/sjc_logo_black.png' style={{ width: 50, marginTop: -7, marginLeft: -5 }} />
          </a>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls='basic-navbar-nav' />

        <Navbar.Collapse id='basic-navbar-nav'>

          <Nav className='mr-auto'>

            <Link href='/' passHref>
              <Nav.Link>Home</Nav.Link>
            </Link>

            <Link href='/blogs/[category]' as={`/blogs/recent`} passHref>
              <Nav.Link>Blogs</Nav.Link>
            </Link>

            <Link href='/hog' passHref>
              <Nav.Link>Humans of GCT</Nav.Link>
            </Link>

            <Link href='/aperture' passHref>
              <Nav.Link>Aperture Newsletter</Nav.Link>
            </Link>

            <Link href='/podcast' passHref>
              <Nav.Link>Podcast</Nav.Link>
            </Link>

            <Nav.Link href='https://www.youtube.com/ApertureBroadcastingChannelGCT'>ABC Channel</Nav.Link>

            <Link href='/about' passHref>
              <Nav.Link>About</Nav.Link>
            </Link>

          </Nav>

        </Navbar.Collapse>

      </Navbar>
    )
  }
}

export default NavBar
