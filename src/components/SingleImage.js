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
          css={css`
            margin-left: calc((100vh -150%) / -2);
          `}
          fluid={this.props.fluid}
        />
      </div>
    )
  }
}
