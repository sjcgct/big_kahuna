import React, { Component } from 'react'
import { Nav, NavDropdown, Navbar, Button, Form, FormControl } from 'react-bootstrap'
import { getAllBlogsForHome } from '../../prismic-configuration'
import {queryAllBlogsForHome,queryByKeyWord,queryByYear} from '../../blog-api'
import Layout from '../../components/Layout'
import Deck from '../../components/deck'
import { PrismicLink } from 'apollo-link-prismic'
import ApolloClient from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import gql from 'graphql-tag'
import Loading from 'react-simple-loading';


const apolloClient = new ApolloClient({
  link: PrismicLink({
    uri: 'https://sjcgctrepo.prismic.io/graphql',
    accessToken: process.env.PRISMIC_TOKEN
  }),
  cache: new InMemoryCache()
})

class BlogPage extends Component {
  constructor (props) {
    super(props)
    var page_arr = []
    page_arr[0] = props.cursor
    var keyword=''

    var year_options = ['2019','2020'];
 


    this.state = {
      activePage: 0,
      total: props.totalCount,
      blogs: props.blogs,
      rediret: false,
      cursor: props.cursor,
      hasnext: props.hasnext,
      page_arr: page_arr,
      loadedtill: 0,
      loading: false,
      keyword:keyword,
      years:year_options,
      year:props.latest_year,
      isYearSearch:false
    }
  }

  async loadPage (page,keyword,year) {
    // console.log(this.getBlogForNextOrPrevPage(action,cursor,limit));
    var cursor = this.state.cursor
    var limit = 6

    var blogs = ''
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
    if(this.state.isYearSearch==false){
      var query=this.getBlogForKeyword(keyword,cursor,limit)
    }
    else{
      var query=this.getBlogForYear(year,cursor,limit)
    }
    apolloClient.query({
      query: query
    }).then(response => {
      blogs = response.data.allBlogss.edges
      curs = response.data.allBlogss.pageInfo.endCursor
      hasnext = response.data.allBlogss.pageInfo.hasNextPage
      if (shallWeStore === true) {
        this.state.page_arr[this.state.loadedtill] = curs
      }
      this.setState({ blogs: blogs, cursor: curs, hasnext: hasnext, loading: false })
    }).catch(error => {
      console.error('error')
      alert(error)
    })
  }

  getBlogForKeyword (keyword,lastPostCursor, limitation) {
    const query = gql`${queryByKeyWord({keyword,lastPostCursor, limitation})}`
    return query
  }

  getBlogForYear(year,lastPostCursor, limitation) {
    const query = gql`${queryByYear({year,lastPostCursor, limitation})}`
    return query
  }

  async nextPage () {
    await this.loadPage(this.state.activePage + 1,this.state.keyword,this.state.year)
  }

  async prevPage () {
    if (this.state.activePage - 1 === 0) {
      this.state.hasprev = false
    }
    await this.loadPage(this.state.activePage - 1,this.state.keyword,this.state.year)
  }

  async search () {
    this.setState({ loading: true ,isYearSearch:false}) 
    var keyword=this.state.keyword
    var loadedtill= 0
    var page_arr = []
    var limit=6
    var blogs = ''
    var curs = ''
    var hasnext = ''
    apolloClient.query({
        query: this.getBlogForKeyword(keyword,'', limit)
      }).then(response => {
        console.log('success')
        blogs = response.data.allBlogss.edges
        curs = response.data.allBlogss.pageInfo.endCursor
        hasnext = response.data.allBlogss.pageInfo.hasNextPage
        page_arr[0]=curs
        this.setState({ blogs: blogs, cursor: curs, hasnext: hasnext, loading: false,loadedtill:loadedtill,page_arr:page_arr,keyword:keyword,activePage:0,isYearSearch:false})
      }).catch(error => {
        console.error('error')
        alert(error)
      })

  }

  async searchByYear(year) {
    console.log("selected : "+year);
    this.setState({ loading: true ,isYearSearch:true}) 
    var loadedtill= 0
    var page_arr = []
    var limit=6
    var blogs = ''
    var curs = ''
    var hasnext = ''
    apolloClient.query({
        query: this.getBlogForYear(year,'', limit)
      }).then(response => {
        blogs = response.data.allBlogss.edges
        curs = response.data.allBlogss.pageInfo.endCursor
        hasnext = response.data.allBlogss.pageInfo.hasNextPage
        page_arr[0]=curs
        this.setState({ blogs: blogs, cursor: curs, hasnext: hasnext, loading: false,loadedtill:loadedtill,page_arr:page_arr,year:year,activePage:0,isYearSearch:true})
      }).catch(error => {
        console.error('error')
        alert(error)
      })
  }



  handleChange(value) {
    console.log(value);
    this.setState({
        keyword: value
    });

  }

  handleDropDownChange(value){
    console.log(value);
    this.setState({
      year: value
    }
  );
  }

  render () {
    if (this.state.loading) {
      return (
        <Layout>
          <Form inline>
          <FormControl name="text" type="text" placeholder="Search Blog" onChange={(e) =>this.handleChange(e.target.value)} className='mr-sm-2'/>
          <Button class="button" onClick={() => this.search()} variant='outline-success'>Search</Button>
          </Form>

          <NavDropdown title='Year' id='nav-dropdown'>
          <NavDropdown.Item onClick={() =>this.searchByYear(2019)}>2019</NavDropdown.Item>
          <NavDropdown.Item onClick={() =>this.searchByYear(2020)}>2020</NavDropdown.Item>
          </NavDropdown>
   
          <Loading
          color='firebrick'
          stroke='10px'
          size='100px'
        />
        </Layout>
      )
    }
    if (this.state.blogs.length == 0) {
      console.log("blogs size " + this.state.blogs.length);
      return (
        <Layout>
          <Form inline>
          <FormControl name="text" type="text" placeholder="Search Blog" onChange={(e) =>this.handleChange(e.target.value)} className='mr-sm-2'/>
          <Button class="button" onClick={() => this.search()} variant='outline-success'>Search</Button>
          </Form>

          <NavDropdown title='Year' id='nav-dropdown'>
          <NavDropdown.Item onClick={() =>this.searchByYear(2019)}>2019</NavDropdown.Item>
          <NavDropdown.Item onClick={() =>this.searchByYear(2020)}>2020</NavDropdown.Item>
          </NavDropdown>
          <h1>No results found</h1>
        </Layout>
      )
    }
    return (
      <Layout>
          <Form inline>
          <FormControl name="text" type="text" placeholder="Search Blog" onChange={(e) =>this.handleChange(e.target.value)} className='mr-sm-2'/>
          <Button class="button" onClick={() => this.search()} variant='outline-success'>Search</Button>
          </Form>

          <NavDropdown title='Year' id='nav-dropdown'>
          <NavDropdown.Item onClick={() =>this.searchByYear(2019)}>2019</NavDropdown.Item>
          <NavDropdown.Item onClick={() =>this.searchByYear(2020)}>2020</NavDropdown.Item>
          </NavDropdown>

        {this.state.blogs && (
          <Deck
            cards={this.state.blogs}
            type='blog'
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

export default BlogPage

export async function getServerSideProps () {
  const posts = await getAllBlogsForHome(' ', 6)
  var blogs = posts.edges
  var cursor = posts.pageInfo.endCursor
  var totalCount = posts.totalCount
  var hasnext = posts.pageInfo.hasNextPage
  var latest_year='2020'
  return {
    props: { blogs, cursor, totalCount, hasnext,latest_year }
  }
}
