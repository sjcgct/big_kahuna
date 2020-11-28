import ApolloClient from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { PrismicLink } from 'apollo-link-prismic'
import gql from 'graphql-tag'

const apolloClient = new ApolloClient({
  link: PrismicLink({
    uri: 'https://sjcgctrepo.prismic.io/graphql',
    accessToken: process.env.PRISMIC_TOKEN
  }),
  cache: new InMemoryCache()
})
var ID
var NO

apolloClient.query({
  query: getFooter()
}).then(response => {
//   console.log(JSON.stringify(response.data.allFooters.edges[0].node))
  // console.log('success')
  var email = response.data.allFooters.edges[0].node.email
  var contact = response.data.allFooters.edges[0].node.contact_number
  //   var email = 'hi@gmail.com'
  //   var contact = '123'
  console.log(email, contact)
  assign(email, contact)
}).catch(error => {
  // console.error('error')
  alert(error)
})

function getFooter () {
  const query = gql`
          {
              allFooters {
                edges {
                  node {
                    contact_number
                    email
                  }
                }
              }
            }`
  return query
}

function assign (email, contact) {
  ID = email
  NO = contact
}

export { ID, NO }
