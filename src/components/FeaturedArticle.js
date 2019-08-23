import React from "react"
import GatsbyImage from "gatsby-image"
import { Link, useStaticQuery, graphql } from "gatsby"
import css from "@emotion/css"
import useScrollDirection from "./useScrollDirection"

export default function FeaturedArticle() {
  const [direction] = useScrollDirection()
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
            description
            fluid(maxWidth: 1000) {
              base64
              # tracedSVG
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

  const description =
    article.shortDescription &&
    article.shortDescription.shortDescription.replace(/\[.+\]/, "")
  const linkSrc =
    article.shortDescription &&
    article.shortDescription.shortDescription.match(/\[.+\]/, "")[0]
  const linkText = linkSrc.slice(1, linkSrc.length - 1)

  return (
    <div
      className="sticky-top"
      css={css`
        top: calc(0.5rem + 57px);
        @media (min-width: 992px) {
          display: flex;
          flex-flow: column nowrap;
          max-height: calc(100vh - 0.5rem - 60px);
          height: 100vh;
        }
      `}
    >
      {" "}
      {article.mediaThumb && (
        <GatsbyImage
          css={css`
            width: 100%;

            @media (min-width: 992px) {
              flex-grow: 3;
              position: relative;

              width: calc(100% + (100vw - 100%) / 2);
              margin-left: calc((100vw - 100%) / -2);
            }
          `}
          alt={article.mediaThumb.description}
          fluid={article.mediaThumb.fluid}
        />
      )}
      <Link
        css={css`
          &:hover {
            text-decoration: none;
            h2 {
              text-decoration: underline;
            }
          }
          color: inherit;
        `}
        to={article.slug}
      >
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
          {description}
        </p>
        <span
          to={article.slug}
          css={css`
            font-size: 12px;
            font-weight: 700;
            color: var(--dark-font);
            display: inline-block;
            margin-bottom: 1rem;
          `}
        >
          {linkText}
        </span>
      </Link>
    </div>
  )
}
