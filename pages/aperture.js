import Layout from '../components/Layout'
import { getAllApertures } from '../prismic-configuration'
import React, { Component } from 'react'
import { PrismicLink } from 'apollo-link-prismic'
import ApolloClient from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import gql from 'graphql-tag'
import Loading from 'react-simple-loading'
import Head from 'next/head'
import ApertureDeck from '../components/AperturePage/aperturedeck'

const apolloClient = new ApolloClient({
  link: PrismicLink({
    uri: 'https://sjcgctrepo.prismic.io/graphql',
    accessToken: process.env.PRISMIC_TOKEN
  }),
  cache: new InMemoryCache()
})

class AperturePage extends Component {
  constructor (props) {
    super(props)
    var page_arr = []
    page_arr[0] = props.cursor
    this.state = {
      activePage: 0,
      total: props.totalCount,
      apertures: props.apertures,
      rediret: false,
      cursor: props.cursor,
      hasnext: props.hasnext,
      page_arr: page_arr,
      loadedtill: 0,
      loading: false,
      categoryId: props.categoryId,
      itemsPerPage: props.itemsPerPage,
      isFrameLoading: true
    }
  }

  async loadPage (page) {
    // console.log(this.getBlogForNextOrPrevPage(action,cursor,limit));
    var cursor = this.state.cursor

    var apertures = ''
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
      query: this.getAllApertures(cursor, this.state.itemsPerPage)
    }).then(response => {
      console.log('success')
      apertures = response.data.allAperturess.edges
      curs = response.data.allAperturess.pageInfo.endCursor
      hasnext = response.data.allAperturess.pageInfo.hasNextPage
      if (shallWeStore === true) {
        this.state.page_arr[this.state.loadedtill] = curs
      }
      this.setState({ apertures: apertures, cursor: curs, hasnext: hasnext, loading: false })
    }).catch(error => {
      console.error('error')
      alert(error)
    })
  }

  getAllApertures (cursor, limit) {
    const query = gql`{
      allAperturess(after:"${cursor}",first:${limit}) {
        totalCount
        pageInfo {
          hasNextPage
          endCursor
        }
        edges {
          node {
            description
            title
            link
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

  iframeDidLoad () {
    this.setState({ isFrameLoading: false })
    console.log('loaded if')
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
          <script src='//static.fliphtml5.com/web/js/plugin/LightBox/js/fliphtml5-light-box-api-min.js' />
        </Head>

        {this.state.apertures && (
          <ApertureDeck
            cards={this.state.apertures}
          />
        )}

        <button hidden={this.state.activePage === 0} onClick={() => this.prevPage()}>
         Previous
        </button>

        <p> </p>

        <button hidden={!this.state.hasnext} onClick={() => this.nextPage()}>
          Next
        </button>

      </Layout>

    )
  }
}

export default AperturePage

export async function getServerSideProps () {
  var itemsPerPage = 6
  var apertureResponse = await getAllApertures(' ', itemsPerPage)
  var apertures = apertureResponse.edges
  var cursor = apertureResponse.pageInfo.endCursor
  var hasnext = apertureResponse.pageInfo.hasNextPage
  var totalCount = apertureResponse.totalCount
  return {
    props: { apertures, cursor, totalCount, hasnext, itemsPerPage }
  }
}
