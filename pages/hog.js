import Head from 'next/head'
import React, { Component } from 'react'
import { getAllHogsForHome } from '../prismic-configuration'
import Layout from '../components/Layout'
import { PrismicLink } from 'apollo-link-prismic'
import ApolloClient from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import gql from 'graphql-tag'
import LoadingOverlay from 'react-loading-overlay'
import Deck from '../components/deck'
import Loading from 'react-simple-loading'

const apolloClient = new ApolloClient({
  link: PrismicLink({
    uri: 'https://sjcgctrepo.prismic.io/graphql',
    accessToken: process.env.PRISMIC_TOKEN
  }),
  cache: new InMemoryCache()
})

class HogPage extends Component {
  constructor (props) {
    super(props)
    var page_arr = []
    page_arr[0] = props.cursor
    this.state = {
      activePage: 0,
      total: props.totalCount,
      hogs: props.hogs,
      rediret: false,
      cursor: props.cursor,
      hasnext: props.hasnext,
      page_arr: page_arr,
      loadedtill: 0,
      loading: false
    }
    console.log(this.state.loadedtill)
  }

  async loadPage (page) {
    // console.log(this.getBlogForNextOrPrevPage(action,cursor,limit));
    var cursor = this.state.cursor
    var limit = 12

    var hogs = ''
    var curs = ''
    var hasnext = ''
    this.state.activePage = page
    // alert(this.state.activePage)

    var shallWeStore = true
    if (this.state.loadedtill >= page) {
      // alert("alread loaded")
      shallWeStore = false
      cursor = this.state.page_arr[page - 1]
    } else {
      // alert("newly loading")
      this.state.loadedtill = this.state.loadedtill + 1
    }

    this.setState({ loading: true })
    apolloClient.query({
      query: this.getHog(cursor, limit)
    }).then(response => {
      console.log('success')
      hogs = response.data.allHogs.edges
      curs = response.data.allHogs.pageInfo.endCursor
      hasnext = response.data.allHogs.pageInfo.hasNextPage
      if (shallWeStore === true) {
        this.state.page_arr[this.state.loadedtill] = curs
      }
      this.setState({ hogs: hogs, cursor: curs, hasnext: hasnext, loading: false })
    }).catch(error => {
      console.error('error')
      alert(error)
    })

    // alert(this.state.loadedtill+" max")
    for (var i = 0; i < this.state.loadedtill; i++) {
      // alert(this.state.page_arr[i])
      console.log('hi')
    }
  }

  getHog (lastPostCursor, limitation) {
    const query = gql`
    {
        allHogs (sortBy:date_DESC,after:"${lastPostCursor}",first:${limitation}){
          totalCount
          pageInfo{
            endCursor
            hasNextPage
            hasPreviousPage
            startCursor
          }
          edges{
            node{
              title
              name
              featured_image
              _meta{
                uid
              }
            }
          }
        }
      }`
    return query
  }

  async nextPage () {
    await this.loadPage(this.state.activePage + 1)
  }

  async prevPage () {
    if (this.state.activePage - 1 === 0) {
      this.state.hasprev = false
    }
    await this.loadPage(this.state.activePage - 1)
  }

  render () {
    if (this.state.loading) {
      return (
        <Layout>
          <Loading
            color='firebrick'
            stroke='10px'
            size='100px'
          />
        </Layout>
      )
    }

    return (

      <Layout>
        <Head>
          <title>Student Council - GCT</title>
        </Head>

        <Deck
          cards={this.state.hogs}
          type='hog'
        />

        <button hidden={this.state.activePage === 0} onClick={() => this.prevPage()}>
          Previous
        </button>

        <button hidden={!this.state.hasnext} onClick={() => this.nextPage()}>
            Next
        </button>

      </Layout>

    )
  }
}

export default HogPage

export async function getServerSideProps () {
  const posts = await getAllHogsForHome(' ', 12)
  var hogs = posts.edges
  var cursor = posts.pageInfo.endCursor
  var totalCount = posts.totalCount
  var hasnext = posts.pageInfo.hasNextPage
  return {
    props: { hogs, cursor, totalCount, hasnext }
  }
}
