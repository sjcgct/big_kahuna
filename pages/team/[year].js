import React, { Component } from 'react'
import Layout from '../../components/Layout'
import YearPagination from '../../components/YearPagination'
import { getAllTeams, getByYear } from '../../prismic-configuration'
import { RichText } from 'prismic-reactjs'
import Head from 'next/head'

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
        htmlcontent.push(RichText.render(value.primary.subTeam))
        htmlcontent.push(RichText.render(value.primary.memberList))
      } catch (e) {}
    })

    var team_image = post.teampicture.url

    return (
      <Layout menu={'team'}>
        <Head>
          <title>Student Journalist Gouncil - GCT | Student Media Body of GCT, Coimbatore</title>
          <meta charSet='utf-8' />
          <meta name='viewport' content='width=device-width, initial-scale=1, shrink-to-fit=no' />
          <meta
            name='Keywords'
            content='Government College of Technology, GCT, Student Media Body, Coimbatore, SJC, Student Journalist Council, Student Journalist Council - GCT, SJCGCT, Aperture, Humans of GCT, ABC Channel, GCT News, GCT Updates'
          />
          <meta
            name='Description'
            content='
          Student Journalist Council-GCT is the Student Media Body of Government College of Technology, Coimbatore. It covers and reports the
           various events and activities happening inside the campus.  It also steers "Humans of GCT", a storytelling project and publishes the student newsletter "Aperture".
          '
          />
          <meta name='robots' content='index, follow' />
        </Head>
        <YearPagination year={this.state.year} years={this.state.years} />

        <div className='blog-container'>

          <div className='team-image-holder'>
            <img className='team-image' src={team_image} alt = 'alt ok?' />
          </div>
          <div className='team-container'>
            {htmlcontent}
          </div>
        </div>

      </Layout>

    )
  }
}

export default About

export async function getServerSideProps ({ params }) {
  const teams = await getAllTeams()
  var edges = teams.edges
  var years = []
  for (var i = 0; i < edges.length; i++) {
    years[i] = edges[i].node.year
  }
  var current_year = years[i - 1]
  if (params.year !== 'current-team') {
    current_year = params.year
  }

  const fetchedpost = await getByYear(current_year)
  const post = fetchedpost[0].node

  return {
    props: { years, current_year, post }
  }
}
