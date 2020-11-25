export const queryDisclaimer = () => {
  const query = `
  {
    allDisclaimers{
      edges{
        node{
          disclaimer_text
        }
      }
    }
  }`
  return query
}
