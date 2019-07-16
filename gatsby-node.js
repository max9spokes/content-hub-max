const path = require("path")
const { createRemoteFileNode } = require(`gatsby-source-filesystem`)
const fs = require("fs")
var extract = require("extract-zip")
exports.createPages = async ({ actions, graphql }) => {
  const {
    data: {
      all: { pages },
      allTools: { nodes: tools },
    },
  } = await graphql(`
    {
      all: allContentfulContentLongRead {
        pages: nodes {
          slug
        }
      }
      allTools: allContentfulContentToolsTemplates {
        nodes {
          slug
          tool {
            children {
              id
            }
          }
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
  tools.forEach(tool => {
    actions.createPage({
      path: tool.slug,
      component: path.resolve("./src/templates/tools-template.js"),
      context: {
        slug: tool.slug,
      },
    })
  })
}

const downloadTools = async ({
  nodes,
  store,
  cache,
  createNode,
  createNodeId,
  _auth,
}) => {
  nodes.map(async node => {
    let fileNode
    if (node.file && node.file.contentType === "application/zip") {
      try {
        fileNode = await createRemoteFileNode({
          url: "http:" + node.file.url,
          parentNodeId: node.id,
          store,
          cache,
          createNode,
          createNodeId,
        })
      } catch (e) {
        console.log(e)
      }
    }
    if (fileNode) {
      node.localFile___NODE = fileNode.id
    }
    return node
  })
}

exports.onCreateNode = async ({
  node,
  actions: { createNodeField, createNode, createParentChildLink },
  store,
  cache,
  createNodeId,
  getNode,
}) => {
  node.file &&
    node.file.contentType === "application/zip" &&
    (await downloadTools({
      nodes: [node],
      store,
      cache,
      createNode: createNode,
      createNodeId,
    }))
  if (node.internal.type === "File" && node.extension === "zip") {
    // console.log(node)
    const parent = getNode(node.parent)
    const { name, absolutePath } = node
    const destination = path.resolve(
      `./public/iframes/${parent.internal.contentDigest}`
    )

    extract(absolutePath, { dir: destination }, function(err) {
      // console.log(err)
    })
  }
}

// exports.sourceNodes = ({ actions, schema }) => {
//   const { createTypes } = actions
//   const typeDefs = [
//     "type ContentfulAsset implements Node { localFolder: LocalFolder }",
//     schema.buildObjectType({
//       name: "LocalFolder",
//       fields: {
//         path: {
//           type: "String",
//           resolve: (source, args, context, info) => {
//             // If we were linking by ID, we could use `getNodeById` to
//             // find the correct author:
//             // return context.nodeModel.getNodeById({
//             //   id: source.author,
//             //   type: "AuthorJson",
//             // })
//             // But since we are using the author email as foreign key,
//             // we can use `runQuery`, or simply get all author nodes
//             // with `getAllNodes` and manually find the linked author
//             // node:
//             return context.nodeModel.getNodeById({
//               id: source.children[0].id,
//               type: "File",
//             })
//           },
//         },
//       },
//     }),
//   ]
//   createTypes(typeDefs)
// }
exports.createResolvers = ({
  actions,
  cache,
  createNodeId,
  createResolvers,
  store,
  reporter,
}) => {
  createResolvers({
    ContentfulAsset: {
      localZipFolder: {
        type: `String`,
        resolve(source, args, context, info) {
          if (source.file && source.file.contentType == "application/zip") {
            let indexFile = null
            var files = fs.readdirSync(
              path.resolve(
                `./public/iframes/${source.internal.contentDigest}`
              )
            )
            files.forEach(file => {
              if (/.*\.html$/.test(file)) {
                indexFile = file
              }
            })

            return `/content/iframes/${source.internal.contentDigest}${
              indexFile ? "/" + indexFile : ""
            }`
          } else {
            return null
          }
        },
      },
      localZipHtmlSrc: {
        type: `String`,
        resolve(source, args, context, info) {
          if (source.file && source.file.contentType == "application/zip") {
            let indexFile = null
            var files = fs.readdirSync(
              path.resolve(
                `./public/iframes/${source.internal.contentDigest}`
              )
            )
            files.forEach(file => {
              if (/.*\.html$/.test(file)) {
                indexFile = file
              }
            })

            if (indexFile) {
              var data = fs.readFileSync(
                path.resolve(
                  `./public/iframes/${
                    source.internal.contentDigest
                  }/${indexFile}`
                ),
                { encoding: "utf-8" }
              )
            }

            return data ? data.toString() : data
          } else {
            return null
          }
        },
      },
    },
  })
}
