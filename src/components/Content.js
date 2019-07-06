import React from "react"
import FeaturedArticle from "./FeaturedArticle"
import ArticlesListing from "./ArticlesListing"
import css from "@emotion/css"

export default function Content() {
  return (
    <section
      css={css`
        @media (max-width: 768px) {
          margin-top: 120px;
        }
      `}
    >
      <div className="container mt-2">
        {" "}
        <div className="row  ">
          <div
            className="col col-12 col-lg-6"
            css={css`
              border-right: 1px solid #ebebeb;
            `}
          >
            <FeaturedArticle />
          </div>
          <div className="col col-12 col-lg-6">
            <ArticlesListing />
          </div>
        </div>
      </div>
    </section>
  )
}
