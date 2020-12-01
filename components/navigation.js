import { Nav, Navbar } from 'react-bootstrap'
import React, { Component } from 'react'
import Link from 'next/link'

class NavBar extends Component {
  constructor (props) {
    super(props)

    var style_map = {
      blog: 'navbar-link',
      hog: 'navbar-link',
      aperture: 'navbar-link',
      team: 'navbar-link',
      home: 'navbar-link',
      podcast: 'navbar-link',
      abc: 'navbar-link'
    }

    style_map[props.menu] = 'navbar-link-active'
    this.state = {
      menu: props.menu,
      style_map: style_map
    }
  }

  render () {
    return (
      <div className='container'>
        <Navbar className='navbar' expand='lg'>
          <Navbar.Brand className='navbar-brand-holder' href='/'>
            <a href='/' aria-label='logo'>
              <img alt='logo' className='navbar-brand-image' src='/sjc.svg' />
            </a>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls='basic-navbar-nav' />

          <Navbar.Collapse id='basic-navbar-nav'>

            <Nav className='w-100'>

              <Link href='/' passHref>
                <Nav.Link className={`${this.state.style_map.home} mx-auto`} aria-label='Home'>Home</Nav.Link>
              </Link>

              <Link href='/blogs/[category]' as='/blogs/recent' passHref>
                <Nav.Link className={`${this.state.style_map.blog} mx-auto`} aria-label='Blog'>Blog</Nav.Link>
              </Link>

              <Link href='/hog' passHref>
                <Nav.Link className={`${this.state.style_map.hog} mx-auto`} aria-label='Humans of GCT'>Humans of GCT</Nav.Link>
              </Link>

              <Link href='/aperture' passHref>
                <Nav.Link className={`${this.state.style_map.aperture} mx-auto`} target='_blank' aria-label='Aperture Newsletter'>Aperture Newsletter</Nav.Link>
              </Link>

              <Link href='/podcast' passHref>
                <Nav.Link className={`${this.state.style_map.podcast} mx-auto`} aria-label='Podcast'>Podcast</Nav.Link>
              </Link>

              <Nav.Link href='https://www.youtube.com/ApertureBroadcastingChannelGCT' rel='noopener noreferrer' target='_blank' className={`${this.state.style_map.abc} mx-auto`} aria-label='ABC Channel'>ABC Channel</Nav.Link>

              <Link href='/team/[year]' as='/team/current-team' passHref>
                <Nav.Link className={`${this.state.style_map.team} mx-auto`} aria-label='Team'>Team</Nav.Link>
              </Link>

            </Nav>

          </Navbar.Collapse>

        </Navbar>
      </div>
    )
  }
}

export default NavBar
