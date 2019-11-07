const path = require("path")
const { createRemoteFileNode } = require(`gatsby-source-filesystem`)
const fs = require("fs")
const has = require("lodash.has")
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
    const parent = getNode(node.parent)
    const { name, absolutePath } = node
    const destination = path.resolve(`./public/iframes/${parent.contentful_id}`)

    extract(absolutePath, { dir: destination }, function(err) {})
  }
}

exports.createResolvers = ({
  actions,
  cache,
  createNodeId,
  createResolvers,
  store,
  reporter,
}) => {
  createResolvers({
    ContentfulContentLongRead: {
      embededTools: {
        type: ["ContentfulContentToolsTemplates"],
        resolve(source, args, context, info) {
          const bodyNode = context.nodeModel.getNodeById({
            id: source["body___NODE"],
          })
          const tools = context.nodeModel.getAllNodes({
            type: `ContentfulContentToolsTemplates`,
          })

          return bodyNode.content
            .filter(i => i.nodeType === "embedded-entry-block")
            .map(tool => {
              var toolId = tool.data.target.sys.id

              const t = tools
                ? tools.filter(a => {
                    return toolId.includes(a.contentful_id)
                  })
                : null
              return t && t.length >= 1 ? t[0] : null
            })
            .filter(i => i !== null)
        },
      },
    },
    ContentfulAsset: {
      localZipFolder: {
        type: `String`,
        resolve(source, args, context, info) {
          if (source.file && source.file.contentType == "application/zip") {
            let indexFile = null

            var files = fs.readdirSync(
              path.resolve(`./public/iframes/${source.contentful_id}`)
            )
            files.forEach(file => {
              if (/.*\.html$/.test(file)) {
                indexFile = file
              }
            })

            return `/content/iframes/${source.contentful_id}${
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
              path.resolve(`./public/iframes/${source.contentful_id}`)
            )
            files.forEach(file => {
              if (/.*\.html$/.test(file)) {
                indexFile = file
              }
            })

            if (indexFile) {
              var data = fs.readFileSync(
                path.resolve(
                  `./public/iframes/${source.contentful_id}/${indexFile}`
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

exports.onCreateWebpackConfig = ({ stage, actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, "src"), "node_modules"],
    },
  })
}
