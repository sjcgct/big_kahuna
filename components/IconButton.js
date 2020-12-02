import React, { Component } from 'react'

class IconButton extends Component {
  constructor (props) {
    super(props)
    var style = 'fas fa-arrow-right pl-1'
    if (props.next === false) {
      style = 'fas fa-arrow-left pl-1'
    }
    this.state = {
      isHidden: props.isHidden,
      style: style,
      onClick: props.onClick,
      text: props.text
    }
  }

  render () {
    return (
      <button hidden={this.state.isHidden} onClick={this.state.onClick}>
        {this.state.text}
      </button>
    )
  }
}

export default IconButton
