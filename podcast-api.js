
export const queryAllPodCasts = ({ cursor, limit }) => {
  const query =
    `{
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

export default { queryAllPodCasts }
