import React from "react"
import Helmet from "react-helmet"
import Layout from "../components/layouts/main"
import ToolsContent from "../components/ToolsContent"
import Tools from "../components/Tools"
import GatsbyImage from "gatsby-image"
import { graphql } from "gatsby"
function Index({ data }) {
  return (
    <Layout>
      <Helmet>
        <title>{data.tool.title}</title>
      </Helmet>
      <ToolsContent data={data} />
      <Tools />
    </Layout>
  )
}

export default Index
export const query = graphql`
  query Tools($slug: String) {
    tool: contentfulContentToolsTemplates(slug: { eq: $slug }) {
      title
      body {
        json
      }

      mediaThumb {
        description
        fluid {
          base64
          aspectRatio
          src
          srcSet
          srcWebp
          srcSetWebp
          sizes
        }
        file {
          url
          contentType
        }
      }
      tool {
        localZipFolder
        localZipHtmlSrc

        file {
          url
          fileName
          contentType
        }
      }
    }
  }
`
