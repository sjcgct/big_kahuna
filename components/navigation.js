import { Nav, NavDropdown, Navbar } from 'react-bootstrap'
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

          <Navbar.Toggle className='navbar-toggler' aria-controls='basic-navbar-nav' />

          <Navbar.Collapse id='basic-navbar-nav'>

            <Nav className='mr-auto'>

              <Link href='/' passHref>
                <Nav.Link className='nav-blink' aria-label='Home'>Home</Nav.Link>
              </Link>

              <Link href='/blogs/[category]' as='/blogs/recent' passHref>
                <Nav.Link className='nav-blink' aria-label='Blog'>Blog</Nav.Link>
              </Link>

              <Link href='/hog' passHref>
                <Nav.Link className='nav-blink' aria-label='Humans of GCT'>Humans of GCT</Nav.Link>
              </Link>

              <Link href='/aperture' passHref>
                <Nav.Link className='nav-blink' aria-label='Aperture Newsletter'>Aperture Newsletter</Nav.Link>
              </Link>

              <Link href='/podcast' passHref>
                <Nav.Link className='nav-blink' aria-label='Podcast'>Podcast</Nav.Link>
              </Link>

              <Nav.Link className='nav-blink' href='https://www.youtube.com/ApertureBroadcastingChannelGCT' aria-label='ABC Channel'>ABC Channel</Nav.Link>

              <Link href='/team/[year]' as='/blogs/2019-20' passHref>
                <Nav.Link className='nav-blink' aria-label='About'>About</Nav.Link>
              </Link>

            </Nav>

          </Navbar.Collapse>

        </Navbar>
      </div>
    )
  }
}

export default NavBar
