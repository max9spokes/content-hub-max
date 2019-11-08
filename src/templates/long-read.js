import React from "react"
import Layout from "../components/layouts/main"
import SingleContent from "../components/SingleContent"
import Tools from "../components/Tools"
import { graphql } from "gatsby"
import Seo from "../components/Seo"
function Index({ data }) {
  return (
    <Layout>
      <Seo
        data={{
          title: data.article.title,
          description: data.article.shortDescription.shortDescription
            .split("\n")[0]
            .toString(),
          image: data.article.mediaThumb.fluid.src,
          url:
            typeof window !== "undefined"
              ? window.origin + window.location.pathname
              : null,
        }}
      ></Seo>

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
      expanderH2
      shortDescription {
        shortDescription
      }
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
        file {
          url
        }
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
