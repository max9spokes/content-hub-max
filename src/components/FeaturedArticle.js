import React from "react"
import GatsbyImage from "gatsby-image"
import { Link, useStaticQuery, graphql } from "gatsby"
import css from "@emotion/css"

export default function FeaturedArticle() {
  const {
    c: {
      featuredArticle: [article],
    },
  } = useStaticQuery(graphql`
    {
      c: contentfulContentMainScreen {
        featuredArticle {
          id
          slug
          title
          shortDescription {
            id
            shortDescription
          }
          mediaThumb {
            title
            fluid(maxWidth: 1000) {
              # base64
              tracedSVG
              aspectRatio
              src
              srcSet
              srcWebp
              srcSetWebp
              sizes
            }
          }
        }
      }
    }
  `)
  return (
    <div
      className="sticky-top"
      css={css`
        top: 0.5rem;
      `}
    >
      {" "}
      <GatsbyImage
        css={css`
          width: 100%;
          @media (min-width: 992px) {
            position: relative;
            width: calc(100% + (100vw - 100%) / 2);
            left: calc((100vw - 100%) / -2);
          }
        `}
        fluid={article.mediaThumb.fluid}
      />
      <h2
        css={css`
          color: var(--dark-font);
          margin-top: 1.25rem;
          font-weight: bold;
        `}
      >
        {article.title}
      </h2>
      <p
        css={css`
          font-size: 12px;
          line-height: 1.25;
          color: var(--dark-font);

          padding-right: 1rem;
          margin: 0;
          margin-bottom: 1.25em;
        `}
      >
        {article.shortDescription.shortDescription}
      </p>
      <Link
        to={article.slug}
        css={css`
          font-size: 12px;
          font-weight: 700;
          color: var(--dark-font);
          display: inline-block;
          margin-bottom: 3rem;
          @media (min-width: 767px) {
            margin-bottom: 7rem;
          }
        `}
      >
        Read more
      </Link>
    </div>
  )
}
