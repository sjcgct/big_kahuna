export const queryFooter = () => {
  const query = `
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
