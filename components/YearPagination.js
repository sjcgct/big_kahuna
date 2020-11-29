const { Component } = require('react')

class YearPagination extends Component {
  constructor (props) {
    super(props)
    var next_year = this.getNext(props.year, props.years)
    var prev_year = this.getPrev(props.year, props.years)
    var hide_next = false
    var hide_prev = false
    if (next_year === null) {
      hide_next = true
    }
    if (prev_year === null) {
      hide_prev = true
    }

    this.state = {
      year: props.year,
      years: props.years,
      next_year: next_year,
      prev_year: prev_year,
      hide_next: hide_next,
      hide_prev: hide_prev
    }
  }

  getNext (current_year, years) {
    if (years[years.length - 1] === current_year) {
      return null
    }
    for (var i = 0; i < years.length; i++) {
      if (years[i] === current_year) return years[i + 1]
    }
  }

  getPrev (current_year, years) {
    if (years[0] === current_year) {
      return null
    }
    for (var i = 1; i < years.length; i++) {
      if (years[i] === current_year) return years[i - 1]
    }
  }

  render () {
    return (
      <div className='row'>
        <div className='mx-auto year-header'>
          <a className='team-page-vector-previous-link' hidden={this.state.hide_prev} href={`/team/${this.state.prev_year}`}>
            <img className='team-page-vector' src='/previous1.svg' />
          </a>
          <h3 className='year-name'>Team {this.state.year}</h3>
          <a className='team-page-vector-next-link' hidden={this.state.hide_next} href={`/team/${this.state.next_year}`}>
            <img className='team-page-vector' src='/next1.svg' />
          </a>
          <style jsx>{`
                        .team-page-vector {
                          width: 24px;
                          height: 24px;
                          display: inline;    
                          margin-bottom: 12px;
                          color:  #5cdb95;
                          fill: currentColor;
                        }

                        .team-page-vector-next-link {
                          margin-left: 15px;
                        }
                        
                        .team-page-vector-previous-link {
                          margin-right: 15px;
                        }
                        `}
          </style>
        </div>
      </div>
    )
  }
}

export default YearPagination
