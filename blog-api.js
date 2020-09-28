export const queryAllBlogsForHome = ({ lastPostCursor, limitation }) => {
  const query =
        `
        {
          allBlogss(sortBy: date_DESC, after:"${lastPostCursor}",first:${limitation}){
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
                date
                featured_image
                excerpt
                author {
                  _linkType
                }
                category {
                  ... on Category{
                    name
                    _meta {
                      id
                    }
                  }
                }
                _meta{
                  uid
                }
                excerpt
              }
            }
          }
        }
      `
  return query
}

export const queryBlogsWithSlug = ({ slug }) => {
  const query =
  `{
    allBlogss(uid:"${slug}") {
    edges{
      node{
        title
        date
        content
        featured_image
        excerpt
        body{
          ... on BlogsBodyQuote{
            primary {
              quote
            } 
            type
          }
          ... on BlogsBodyImage{
            primary {
              image
              imageDescription
            }
            type
          }
          ... on BlogsBodyParagraph{
            primary {
              paragraph
            }
            type
          }
        }
        author {
          ... on Author{
            name
            picture
            about
            _meta {
              id
            }
          }
        }
        category {
          ... on Category{
            name
            _meta {
              id
            }
          }
        }
        _meta {
          uid
        }
        excerpt
      }
     }
    }
  }
  `
  return query
}

export const queryBlogsWithSameCategory = ({ categoryId, limitation, lastPostCursor }) => {
  const query =
    `{
      allBlogss(where:{category:"${categoryId}"},sortBy: date_DESC, after:"${lastPostCursor}",first:${limitation}){
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
            date
            featured_image
            excerpt
            author {
              _linkType
            }
            category {
              ... on Category{
                name
                _meta {
                  id
                }
              }
            }
            _meta{
              uid
            }
            excerpt
          }
        }
      }
  }`
  return query
}

export const queryGetCategoryIdByName = ({ categoryName }) => {
  const query =
  `{
    allCategorys(where:{name:"${categoryName}"}){
      edges{
        node{
          name
          _meta {
            id
          }
        }
      }
    }
  }`

  return query
}

export const queryByKeyWord = ({ keyword, lastPostCursor, limitation }) => {
  const query = `{
    allBlogss(where:{title_fulltext:"${keyword}"},sortBy: date_DESC,after:"${lastPostCursor}",first:${limitation}){
      totalCount
      pageInfo{
        endCursor
        hasNextPage
      }
      edges{
        node{
          title
          date
          featured_image
          excerpt
          author {
            ... on Author{
              name
              picture
              about
              _meta {
                id
              }
            }
          }
          
          category {
            _linkType
          }
          _meta{
            uid
          }
          excerpt
        }
      }
    }
}`
  return query
}

export const queryByYear = ({ year, lastPostCursor, limitation }) => {
  var prevyear = year - 1
  const query = `{
    allBlogss(where:{date_before:"${year}-12-31",date_after:"${prevyear}-12-31"},sortBy: date_DESC,after:"${lastPostCursor}",first:${limitation}){
      totalCount
      pageInfo{
        endCursor
        hasNextPage
      }
      edges{
        node{
          title
          date
          featured_image
          excerpt
          author {
            ... on Author{
              name
              picture
              about
              _meta {
                id
              }
            }
          }
          
          category {
            _linkType
          }
          _meta{
            uid
          }
          excerpt
        }
      }
    }
}`
  return query
}

export default { queryBlogsWithSameCategory, queryBlogsWithSlug, queryAllBlogsForHome, queryGetCategoryIdByName, queryByKeyWord, queryByYear }
