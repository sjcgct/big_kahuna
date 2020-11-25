
export const queryAllVideosForHome = () => {
  const query = `
  {
    allAbcs(sortBy:published_date_DESC) {
        edges{
         node{
            video_title
            published_date
            unique_id
             }
      }
    }
  }`
  return query
}
