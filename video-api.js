
export const queryAllVideosForHome = () => {
  const query = `
      {
          allAbcs{
            
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
