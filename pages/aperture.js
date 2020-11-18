import Layout from '../components/Layout'
import { getAllApertures } from '../prismic-configuration'
import React, { Component } from 'react'
import { PrismicLink } from 'apollo-link-prismic'
import ApolloClient from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import gql from 'graphql-tag'
import Head from 'next/head'
import ApertureDeck from '../components/AperturePage/aperturedeck'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import IconButton from '../components/IconButton'

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
    var cursor = this.state.cursor

    var apertures = ''
    var curs = ''
    var hasnext = ''
    this.state.activePage = page

    var shallWeStore = true
    if (this.state.loadedtill >= page) {
      shallWeStore = false
      cursor = this.state.page_arr[page - 1]
    } else {
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

  render () {
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

        <IconButton text='Previous' icon={<ArrowBackIcon />} isHidden={this.state.activePage === 0} onClick={() => this.prevPage()}> </IconButton>
        <IconButton text='Next' icon={<ArrowForwardIcon />} isHidden={!this.state.hasnext} onClick={() => this.nextPage()}> </IconButton>

      </Layout>

    )
  }
}

export default AperturePage

export async function getStaticProps () {
  var itemsPerPage = 4
  var apertureResponse = await getAllApertures(' ', itemsPerPage)
  var apertures = apertureResponse.edges
  var cursor = apertureResponse.pageInfo.endCursor
  var hasnext = apertureResponse.pageInfo.hasNextPage
  var totalCount = apertureResponse.totalCount
  return {
    props: { apertures, cursor, totalCount, hasnext, itemsPerPage },
    revalidate: 1
  }
}
