import React from "react"
import GatsbyImage from "gatsby-image"
import { Link } from "gatsby"
import css from "@emotion/css"
export class SingleImage extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div
        className="sticky-top"
        css={css`
          top: 0rem;

          border-right: 1px solid #ebebeb;
        `}
      >
        {" "}
        <GatsbyImage
          style={{ position: null }}
          css={css`
            width: 100%;
            @media (min-width: 767px) {
              height: 100vh;
              position: relative;
              width: calc(100% + (100vw - 100%) / 2);
              left: calc((100vw - 100%) / -2);
            }
          `}
          alt={this.props.mediaThumb.description}
          fluid={this.props.mediaThumb.fluid}
        />
      </div>
    )
  }
}
