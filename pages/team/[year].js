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
    // var htmlcontent = []
    // post.body.forEach((value) => {
    //   try {
    //     htmlcontent.push(<br></br>)
    //     var subTeam = value.primary.subTeam
    //     var members = value.primary.memberList
    //     var memberList = members[0].text.split(',')
    //     htmlcontent.push(<h1 className='blog-post-title'>{RichText.asText(subTeam)}</h1>)
    //     memberList.forEach(member => {
    //       htmlcontent.push(<blockquote> {member} </blockquote>)
    //     })
    //   } catch (e) {}
    // })

    var htmlcontent = []
    post.body.forEach((value) => {
      try {
        htmlcontent.push(RichText.render(value.primary.subTeam))
        htmlcontent.push(RichText.render(value.primary.memberList))
      } catch (e) {}
    })
    // var htmltitle
    // htmltitle = post.body.map(slice => {
    //   if (slice.type === 'sub-team') {
    //     return RichText.render(slice.primary.subTeam)
    //   }
    // })
    // var htmlcontent
    // htmlcontent = post.body.map(slice => {
    //   if (slice.type === 'sub-team') {
    //     return RichText.render(slice.primary.memberList)
    //   }
    // })

    return (
      <Layout>

        <div className='blog-container'>
          {htmlcontent}
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
