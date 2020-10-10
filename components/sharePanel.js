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
  } from "react-share";

class SharePanel extends Component {
  constructor (props) {
    super(props)
    this.state = {
      url: props.url,
      caption:props.caption
    }
  }

  render () {
    return (
        <div>
        <FacebookShareButton
        url={this.state.url}
        quote={this.state.caption}
      >
        <FacebookIcon size={32} round />
      </FacebookShareButton>

      <WhatsappShareButton
        url={this.state.url}
        title={this.state.caption}
        separator=":: "
      >
        <WhatsappIcon size={32} round />
      </WhatsappShareButton>

      <LinkedinShareButton 
        url={this.state.url}>
        <LinkedinIcon size={32} round />
      </LinkedinShareButton>

      <TwitterShareButton
        url={this.state.url}
        title={this.state.caption}
          >
      <TwitterIcon size={32} round />
    </TwitterShareButton>

      </div>
    )
  }
}
export default SharePanel
