import React, { Component } from 'react'
import LoaderDeckCard from './loaderDeckCard'

class LoaderDeck extends Component {
  constructor (props) {
    super(props)
    var LoaderDecks = []
    for (var j = 0; j < 9; j++) {
      LoaderDecks[j] = <LoaderDeckCard type={props.type} />
    }
    this.state = {
      loaderDecks: LoaderDecks
    }
  }

  componentDidMount () {
    window.scrollTo(0, 0)
  }

  render () {
    return (
      <div className='row'>
        {this.state.loaderDecks}
      </div>
    )
  }
}
export default LoaderDeck
