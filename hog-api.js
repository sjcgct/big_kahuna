

export const queryAllHOGs=({lastPostCursor,limitation})=>{
    const query=`
    {
        allHogs (sortBy:date_DESC,after:"${lastPostCursor}",first:${limitation}){
          pageInfo{
            hasNextPage
            endCursor
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
      return query;
}

export const queryHOGwithSlug=({slug})=>{
    const query=`
    {
        allHogs (uid:"${slug}"){
          edges{
            node{
              title
              name
              featured_image
              date
              content
              _meta{
                uid
              }
            }
          }
        }
      }`
      return query;
}

export default {queryHOGwithSlug,queryAllHOGs}



