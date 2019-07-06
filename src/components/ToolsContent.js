import React, { useRef } from "react"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { BLOCKS, MARKS } from "@contentful/rich-text-types"
import { useStaticQuery, graphql } from "gatsby"
import { SingleImage } from "./SingleImage"
import ReactIframeResizer from "react-iframe-resizer-super"
import css from "@emotion/css"
import useScrollDirection from "./useScrollDirection"
export default function SingleContent({ data: { tool } }) {
  const iframeRef = useRef(null)
  const direction = useScrollDirection()
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
                top: ${direction == "up" ? "calc(57px + 2rem)" : "2rem"};
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
              <img
                src={tool.mediaThumb.file.url}
                alt=""
                className="my-4 mx-auto d-block"
              />
              <div
                css={css`
                  font-size: 14px;
                  font-weight: 600;
                  line-height: 17px;
                  text-align: center;
                  margin: 1.25rem 0;
                `}
              >
                {documentToReactComponents(tool.body.json)}
              </div>
            </div>
          </div>
          <div className="col col-12 col-md-6">
            {tool && tool.tool && tool.tool.localZipFolder && (
              <ReactIframeResizer
                iframeResizerOptions={{ checkOrigin: false }}
                ref={iframeRef}
                title="tool"
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
            )}
            {tool && tool.tool && !tool.tool.localZipFolder && (
              <div>
                <a href={tool.tool.file.url}>
                  {" "}
                  <img
                    src={tool.mediaThumb.file.url}
                    alt=""
                    className="my-4 mx-auto d-block"
                  />
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
