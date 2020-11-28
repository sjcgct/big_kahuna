import React, { Component } from 'react'
import Layout from '../../components/Layout'
import YearPagination from '../../components/YearPagination'
import { getAllTeams, getByYear } from '../../prismic-configuration'
import { RichText } from 'prismic-reactjs'

class About extends Component {
  constructor (props) {
    super(props)
    var total_pages = props.years.length
    this.state = {
      years: props.years,
      year: props.current_year,
      total_pages: total_pages,
      post: props.post
    }
  }

  render () {
    var post = this.state.post
    var htmlcontent = []
    post.body.forEach((value) => {
      try {
        // htmlcontent.push(<img src={post.teampicture.url} />)
        htmlcontent.push(RichText.render(value.primary.subTeam))
        htmlcontent.push(RichText.render(value.primary.memberList))
      } catch (e) {}
    })

    var team_image=post.teampicture.url;

    return (
      <Layout>

        <div className='blog-container'>
          <div className='year-header'>
            <h3 className='text-center'>Team {this.state.year}</h3>
          </div>
          <div className='team-image-holder'>
          <img className='team-image' src={team_image} alt = 'alt ok?' />
          </div>
          <div className='team-container'>
          {htmlcontent}
          </div>
        </div>

        <YearPagination year={this.state.year} years={this.state.years}></YearPagination>

      </Layout>

    )
  }
}

export default About

export async function getServerSideProps ({ params }) {
  const current_year = params.year
  const teams = await getAllTeams()
  var edges = teams.edges
  var years = []
  for (var i = 0; i < edges.length; i++) {
    years[i] = edges[i].node.year
  }

  const fetchedpost = await getByYear(current_year)
  const post = fetchedpost[0].node

  return {
    props: { years, current_year, post }
  }
}
