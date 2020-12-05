import React, { Component } from 'react'
import { FacebookProvider, Comments } from 'react-facebook'
export default class Example extends Component {
  render () {
    return (
      <FacebookProvider appId='1049032935614467'>
        <Comments href='http://localhost:3000/hi.js' />
      </FacebookProvider>
    )
  }
}
