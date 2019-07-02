const path = require("path")

exports.createPages = async ({ actions, graphql }) => {
  const {
    data: {
      all: { pages },
    },
  } = await graphql(`
    {
      all: allContentfulContentLongRead {
        pages: nodes {
          slug
        }
      }
    }
  `)

  pages.forEach(page => {
    actions.createPage({
      path: page.slug,
      component: path.resolve("./src/templates/long-read.js"),
      context: {
        slug: page.slug,
      },
    })
  })
}
