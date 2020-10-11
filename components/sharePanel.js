import React, { Component } from 'react'
import {
  FacebookShareButton,
  FacebookIcon,
  WhatsappIcon,
  WhatsappShareButton,
  LinkedinShareButton,
  LinkedinIcon,
  TwitterShareButton,
  TwitterIcon
} from 'react-share'

class SharePanel extends Component {
  constructor (props) {
    super(props)
    this.state = {
      url: props.url,
      caption: props.caption
    }
  }

  render () {
    return (
      <div className='ml-3'>
        <FacebookShareButton
          url={this.state.url}
          quote={this.state.caption}
          className='share-button'
        >
          <FacebookIcon size={40} round />
        </FacebookShareButton>

        <WhatsappShareButton
          url={this.state.url}
          title={this.state.caption}
          separator=':: '
          className='share-button'
        >
          <WhatsappIcon size={40} round />
        </WhatsappShareButton>

        <LinkedinShareButton
          url={this.state.url}
          className='share-button'
        >
          <LinkedinIcon size={40} round />
        </LinkedinShareButton>

        <TwitterShareButton
          url={this.state.url}
          title={this.state.caption}
          className='share-button'
        >
          <TwitterIcon size={40} round />
        </TwitterShareButton>

      </div>
    )
  }
}
export default SharePanel