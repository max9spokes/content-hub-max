import React from "react"
import Helmet from "react-helmet"
import Layout from "../components/layouts/main"
import SingleContent from "../components/SingleContent"
import Tools from "../components/Tools"
import { graphql } from "gatsby"
function Index({ data }) {
  return (
    <Layout>
      <Helmet>
        <title>{data.article.title}</title>
      </Helmet>
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
      embededTools {
        contentful_id

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
      mediaThumb {
        description
        fluid(maxWidth: 1500, cropFocus: LEFT) {
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
