import React, { Component } from 'react'
// import Button from '@material-ui/core/Button'

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
      <button
        className='btn btn-lg'
        hidden={this.state.isHidden}
        onClick={this.state.onClick}
      >
        {this.state.text}
        <i class={this.state.style} />
      </button>

    // <a
    //       hidden={this.state.isHidden}
    //       onClick={this.state.onClick}
    //       class="btn btn-lg btn-danger">
    //         <span class="glyphicon glyphicon-arrow-right"></span> {this.state.text}</a>

    // <Button
    // style={{
    //   color: "#e04f62",
    // }}
    // size="large"
    // hidden={this.state.isHidden}
    // onClick={this.state.onClick}
    // startIcon={this.state.icon}
    // >
    //   {this.state.text}
    // </Button>
    )
  }
}

export default IconButton
