import React from "react"
import Layout from "../components/layouts/main"
import ToolsContent from "../components/ToolsContent"
import Tools from "../components/Tools"
import { graphql } from "gatsby"
function Index({ data }) {
  return (
    <Layout>
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
        file {
          url
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
