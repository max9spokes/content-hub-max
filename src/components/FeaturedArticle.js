import React from "react"
import GatsbyImage from "gatsby-image"
import { Link } from "gatsby"
import css from "@emotion/css"
export class FeaturedArticle extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div
        className="sticky-top"
        css={css`
          top: 0.5rem;
          border-right: 1px solid #ebebeb;
        `}
      >
        {" "}
        <GatsbyImage
          css={css`
            margin-left: calc((100vh - 100%) / -2);
          `}
          fluid={this.props.fluid}
        />
        <h2
          css={css`
            color: var(--dark-font);
            margin-top: 1.25rem;
            font-weight: bold;
          `}
        >
          Tips from a veteran of the service industry
        </h2>
        <p
          css={css`
            font-size: 12px;
            line-height: 1.25;
            color: var(--dark-font);
            margin: 0;
            margin-bottom: 1.25em;
          `}
        >
          Dreams are important. Not the dreams you have when sleeping. I’m
          talking about the dreams you have for your future — the dreams that
          keep you going — the dreams that make each day worth living.
        </p>
        <Link
          to="/"
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
}
