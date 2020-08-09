import Prismic from 'prismic-javascript'

import { queryBlogsWithSameCategory, queryBlogsWithSlug, queryAllBlogsForHome } from './blog-api'
import { queryHOGwithSlug, queryAllHOGs } from './hog-api'

const REPOSITORY = process.env.PRISMIC_REPOSITORY_NAME
const REF_API_URL = `https://${REPOSITORY}.prismic.io/api/v2`
var GRAPHQL_API_URL = `https://${REPOSITORY}.prismic.io/graphql`
// export const API_URL = 'https://your-repo-name.cdn.prismic.io/api/v2'
export const API_TOKEN = process.env.PRISMIC_TOKEN
export const API_LOCALE = process.env.PRISMIC_LOCALE
// Prismic API endpoint
export const apiEndpoint = process.env.PRISMIC_URL

// Access Token if the repository is not public
// Generate a token in your dashboard and configure it here if your repository is private
export const accessToken = process.env.PRISMIC_TOKEN

// Client method to query Prismic
export const client = Prismic.client(apiEndpoint, { accessToken })

export const PrismicClient = Prismic.client(REF_API_URL, {
  accessToken: API_TOKEN
})

async function fetchAPI (query, { variables } = {}) {
  const prismicAPI = await PrismicClient.getApi()
  console.log(`${prismicAPI}`)
  const res = await fetch(
      `${GRAPHQL_API_URL}?query=${query}&variables=${JSON.stringify(variables)}`,
      {
        headers: {
          'Prismic-Ref': prismicAPI.masterRef.ref,
          'Content-Type': 'application/json',
          'Accept-Language': API_LOCALE,
          Authorization: `Token ${API_TOKEN}`
        }

      }
  )

  if (res.status !== 200) {
    console.log(await res.text())
    throw new Error('Failed to fetch API')
  }

  const json = await res.json()
  if (json.errors) {
    console.error(json.errors)
    throw new Error('Failed to fetch API')
  }
  return json.data
}

export async function getAllBlogsForHome (lastPostCursor, limitation) {
  console.log('here man ')
  const query = queryAllBlogsForHome({ lastPostCursor, limitation })
  const data = await fetchAPI(query)
  return data.allBlogss
}

export async function getBlogsWithSlug (slug) {
  const query = queryBlogsWithSlug({ slug })
  const data = await fetchAPI(query)
  return data.allBlogss.edges
}

export async function getBlogsWithSameCategory (categoryId, limitation, lastPostCursor) {
  const query = queryBlogsWithSameCategory({ categoryId, limitation, lastPostCursor })
  const data = await fetchAPI(query)
  return data.allBlogss
}

export async function getAllHogsForHome (lastPostCursor, limitation) {
  const query = queryAllHOGs({ lastPostCursor, limitation })
  const data = await fetchAPI(query)
  return data.allHogs
}

export async function getHogWithSlug (slug) {
  const query = queryHOGwithSlug({ slug })
  const data = await fetchAPI(query)
  return data.allHogs.edges
}
