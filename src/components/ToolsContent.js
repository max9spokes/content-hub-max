import React, { useRef } from "react"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { BLOCKS, MARKS } from "@contentful/rich-text-types"
import { useStaticQuery, graphql } from "gatsby"
import { SingleImage } from "./SingleImage"
import ReactIframeResizer from "react-iframe-resizer-super"

import ShouldIframeUpdate from "./ShouldIframeUpdate"
import css from "@emotion/css"
import useScrollDirection from "./useScrollDirection"

import GatsbyImage from "gatsby-image"
export default function SingleContent({ data: { tool } }) {
  const iframeRef = useRef(null)
  const [direction] = useScrollDirection()
  const options = {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: node => {
        const { file } = node.data.target.fields
        return <img className="d-block  my-2  " src={file["en-US"].url} />
      },
    },
  }

  return (
    <>
      <div className="container py-5">
        <div className="row">
          <div className="col col-12 col-md-6 ">
            <div
              className="sticky-top"
              css={css`
                top: 2rem;
              `}
            >
              <h2
                css={css`
                  font-size: 32px;
                  font-weight: bold;
                  line-height: 32px;
                  text-align: center;
                  color: var(--dark-font);
                `}
              >
                {tool.title}
              </h2>
              {tool.mediaThumb &&
                tool.mediaThumb.file.contentType !== "image/svg+xml" && (
                  <GatsbyImage
                    alt={tool.mediaThumb.description}
                    fluid={tool.mediaThumb.fluid}
                  />
                )}
              {tool.mediaThumb &&
                tool.mediaThumb.file.contentType == "image/svg+xml" && (
                  <img
                    className="my-4 mx-auto d-block"
                    alt={tool.mediaThumb.description}
                    src={tool.mediaThumb.file.url}
                  />
                )}

              <div
                css={[
                  contentStyle,
                  css`
                    text-align: center;
                    margin: 1.25rem 0;
                  `,
                ]}
              >
                {documentToReactComponents(tool.body.json)}
              </div>
            </div>
          </div>
          <div className="col col-12 col-md-6">
            {tool && tool.tool && tool.tool.localZipFolder && (
              <ShouldIframeUpdate tool={tool}>
                {" "}
                <ReactIframeResizer
                  iframeResizerOptions={{ checkOrigin: false }}
                  ref={iframeRef}
                  title={tool.title}
                  style={{ height: null }}
                  css={css`
                    border: none;
                    width: 100%;
                    height: ${resizeIframe(iframeRef)};
                  `}
                  src={
                    process.env.NODE_ENV === "production"
                      ? tool.tool.localZipFolder
                      : null
                  }
                  content={
                    process.env.NODE_ENV === "development"
                      ? tool.tool.localZipHtmlSrc
                      : null
                  }
                />
              </ShouldIframeUpdate>
            )}
            {tool && tool.tool && !tool.tool.localZipFolder && (
              <div>
                <a href={tool.tool.file.url}>
                  {" "}
                  {tool.mediaThumb &&
                    tool.mediaThumb.file.contentType !== "image/svg+xml" && (
                      <GatsbyImage
                        alt={tool.mediaThumb.description}
                        fluid={tool.mediaThumb.fluid}
                      />
                    )}
                  {tool.mediaThumb &&
                    tool.mediaThumb.file.contentType == "image/svg+xml" && (
                      <img
                        className="my-4 mx-auto d-block"
                        alt={tool.mediaThumb.description}
                        src={tool.mediaThumb.file.url}
                      />
                    )}
                  <div className="text-center">Download</div>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
function resizeIframe(obj) {
  var {
    contentWindow: {
      document: {
        body: { scrollHeight },
      },
    } = {
      document: {
        body: {
          scrollHeight: 0,
        },
      },
    },
  } = obj
  return scrollHeight + "px"
}

const contentStyle = css`
  font-size: 14px;
  line-height: 1.36;
  p {
    margin-bottom: 14px;
  }
  /* @md */
  @media (min-width: 768px) {
    font-size: 16px;
    line-height: 1.38;
    p {
      margin-bottom: 16px;
    }
  }

  h1 {
    font-size: 35px;
    letter-spacing: normal;
    font-weight: bold;
    line-height: 1.2;
  }
  h2 {
    font-size: 28px;
    letter-spacing: normal;
    font-weight: semibold;
    line-height: 1.2;
  }

  h3 {
    font-size: 24px;
    letter-spacing: normal;
    font-weight: semibold;
    line-height: 1.3;
  }
  h4 {
    font-size: 20px;
    letter-spacing: normal;
    font-weight: regular;
    line-height: 1.45;
    margin-bottom: 12px;
  }

  ul {
    font-size: 16px;
    letter-spacing: normal;
    font-weight: regular;
    line-height: 1.38;
    margin-bottom: 16px;
    list-style-type: disc;
    padding-left: 20px;
    padding-right: 10px;
  }

  ol {
    font-size: 16px;
    letter-spacing: normal;
    font-weight: regular;
    line-height: 1.38;
    margin-bottom: 16px;
    list-style-type: lower-alpha;
    padding-left: 20px;
    padding-right: 10px;
  }
`
