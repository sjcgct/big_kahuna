import Layout from '../components/Layout'
import { getAllPodCasts } from '../prismic-configuration'
import React, { Component } from 'react'
import { PrismicLink } from 'apollo-link-prismic'
import ApolloClient from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import gql from 'graphql-tag'
import Loading from 'react-simple-loading'
import Head from 'next/head'
import IconButton from '../components/IconButton'

const apolloClient = new ApolloClient({
  link: PrismicLink({
    uri: 'https://sjcgctrepo.prismic.io/graphql',
    accessToken: process.env.PRISMIC_TOKEN
  }),
  cache: new InMemoryCache()
})

class PodcostPage extends Component {
  constructor (props) {
    super(props)
    var page_arr = []
    page_arr[0] = props.cursor
    this.state = {
      activePage: 0,
      total: props.totalCount,
      pods: props.pods,
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

    var pods = ''
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
      query: this.getAllPods(cursor, this.state.itemsPerPage)
    }).then(response => {
      // console.log('success')
      pods = response.data.allPodcasts.edges
      curs = response.data.allPodcasts.pageInfo.endCursor
      hasnext = response.data.allPodcasts.pageInfo.hasNextPage
      if (shallWeStore === true) {
        this.state.page_arr[this.state.loadedtill] = curs
      }
      this.setState({ pods: pods, cursor: curs, hasnext: hasnext, loading: false })
    }).catch(error => {
      // console.error('error')
      alert(error)
    })
  }

  getAllPods (cursor, limit) {
    const query = gql`{
      allPodcasts(sortBy:date_DESC,after:"${cursor}",first:${limit}){
        totalCount
        pageInfo{
          hasNextPage
          endCursor
        }
        edges{
          node{
            date
            episode_link
            episode_number
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
    // console.log('loaded if')
  }

  render () {
    var podcasts = this.state.pods
    var len = podcasts.length
    var templateHTML = []

    for (var i = 0; i < len; i++) {
      var episode_link = podcasts[i].node.episode_link

      templateHTML[i] =
        <div className='col-sm-12 mt-1 mb-3'>
          <iframe src={episode_link} height='110%' width='100%' frameborder='0' scrolling='no' />
        </div>
    }

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
          <title>Podcast | Student Journalist Gouncil - GCT</title>
          <meta charset='utf-8' />
          <meta name='viewport' content='width=device-width, initial-scale=1, shrink-to-fit=no' />
          <meta
            name='Keywords'
            content='Government College of Technology, GCT, Student Journalist Council, Student Journalist Council-GCT, Podcast, GCT Podcast'
          />
          <meta
            name='Description'
            content='Student media body of Government College of Technology, Coimbatore. We are the face of Journalism and Photography inside the campus. We cover news happening inside the campus. We also publish the official student newsletter of the campus, Aperture.'
          />
        </Head>
        <div className='heading'>
          <h2>Podcast</h2>
        </div>

        <div className='container'>
          <div className='row'>
            {templateHTML}
          </div>

          <div className='pagination'>
            <div className='previous-container'>
              <button className='button' hidden={this.state.activePage === 0} onClick={() => this.prevPage()}>
              Previous
              </button>
            </div>
            <div className='next-container'>
              <button className='button' hidden={!this.state.hasnext} onClick={() => this.nextPage()}>
              Next
              </button>
            </div>
          </div>

        </div>

      </Layout>

    )
  }
}

export default PodcostPage

export async function getStaticProps () {
  var itemsPerPage = 10
  var podsresponse = await getAllPodCasts(' ', itemsPerPage)
  var pods = podsresponse.edges
  var cursor = podsresponse.pageInfo.endCursor
  var hasnext = podsresponse.pageInfo.hasNextPage
  var totalCount = podsresponse.totalCount
  return {
    props: { pods, cursor, totalCount, hasnext, itemsPerPage },
    revalidate: 1
  }
}
