import React from "react"
import Layout from "../components/layouts/main"
import SingleContent from "../components/SingleContent"
import Tools from "../components/Tools"
import { graphql } from "gatsby"
function Index({ data }) {
  return (
    <Layout>
      <SingleContent data={data} />
      <Tools />
    </Layout>
  )
}

export default Index
export const query = graphql`
  query LongPost($slug: String) {
    article: contentfulContentLongRead(slug: { eq: $slug }) {
      title
      category
      mediaThumb {
        description
        fluid(maxWidth: 1500) {
          base64
          aspectRatio
          src
          srcSet
          srcWebp
          srcSetWebp
          sizes
        }
      }
      body {
        id
        json
      }
    }
  }
`
