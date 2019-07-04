import React from "react"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { BLOCKS, MARKS } from "@contentful/rich-text-types"
import { useStaticQuery, graphql } from "gatsby"
import { SingleImage } from "./SingleImage"
import css from "@emotion/css"
export default function SingleContent({ data: { article } }) {
  const options = {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: node => {
        const { file } = node.data.target.fields
        return (
          <img
            className="d-block mr-3 my-2 m w-50 float-left"
            src={file["en-US"].url}
          />
        )
      },
      [BLOCKS.QUOTE]: (node, children) => {
        return (
          <blockquote
            css={css`
              font-size: 19px;
              font-weight: 600;
              line-height: 23px;
            `}
          >
            {children}
          </blockquote>
        )
      },
    },
  }
  const isFirstNodeH2 =
    article &&
    article.body &&
    article.body.json.content[0].nodeType === "heading-2"
  const INTRO = isFirstNodeH2
    ? article.body.json.content[0].content[0].value
    : null
  const CONTENT = article && article.body && article.body.json
  isFirstNodeH2 && CONTENT.content.shift()

  return (
    <>
      {article && (
        <section>
          <div className="container mt-2">
            {" "}
            <div className="row  ">
              {article.mediaThumb && (
                <div className="col col-12 col-md-6">
                  <SingleImage mediaThumb={article.mediaThumb} />
                </div>
              )}
              <div
                className={`col col-12 ${article.mediaThumb ? "col-md-6" : 0}`}
              >
                <h1
                  css={css`
                    font-size: 32px;
                    font-weight: bold;
                    line-height: 32px;
                    text-align: center;
                    color: var(--dark-font);
                    max-width: 80%;
                    margin: 2rem auto 1rem auto;
                  `}
                >
                  {article.title}
                </h1>
                <div
                  css={css`
                    color: #002e6b;
                    text-align: center;
                    text-transform: uppercase;
                    font-size: 12px;
                    font-weight: 600;
                    line-height: 15px;
                  `}
                >
                  {article.category}
                </div>
                <p
                  className="excerpt"
                  css={css`
                    font-size: 14px;
                    font-weight: 600;
                    line-height: 17px;
                    text-align: center;
                    max-width: 80%;
                    margin: 2rem auto 1rem auto;
                  `}
                >
                  {INTRO}
                </p>
                <div
                  id="content"
                  className={"pb-4"}
                  css={css`
                    font-size: 14px;
                    line-height: 18px;
                  `}
                >
                  {documentToReactComponents(CONTENT, options)}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  )
}
