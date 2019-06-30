import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { FeaturedArticle } from "./FeaturedArticle"
import ArticlesListing from "./ArticlesListing"

export default function Content() {
  const { main } = useStaticQuery(graphql`
    {
      main: file(name: { eq: "placeholder-main" }) {
        sharp: childImageSharp {
          fluid(maxHeight: 1600, maxWidth: 2000, cropFocus: CENTER) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)
  return (
    <section>
      <div className="container mt-2">
        {" "}
        <div className="row  ">
          <div className="col col-12 col-md-6">
            <FeaturedArticle fluid={main.sharp.fluid} />
          </div>
          <div className="col col-12 col-md-6">
            <ArticlesListing />
          </div>
        </div>
      </div>
    </section>
  )
}
