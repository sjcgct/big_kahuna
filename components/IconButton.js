import React, { Component } from 'react'
import Button from '@material-ui/core/Button'

class IconButton extends Component {
    constructor(props){
        super(props)
        this.state={
             isHidden:props.isHidden,
             icon:props.icon,
             onClick:props.onClick,
             text:props.text
        }
    }
    render() {
      return (
        <Button
        style={{
          color: "#e04f62",
        }}
        size="large"
        hidden={this.state.isHidden}
        onClick={this.state.onClick}
        startIcon={this.state.icon}
        >
          {this.state.text}
        </Button>
      )
    }
  }

  export default  IconButton