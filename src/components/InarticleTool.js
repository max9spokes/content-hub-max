import React, { useRef } from "react"
import ReactIframeResizer from "react-iframe-resizer-super"
import GatsbyImage from "gatsby-image"
import ShouldIframeUpdate from "./ShouldIframeUpdate"
import css from "@emotion/css"
export default function InarticleTool({ tool }) {
  const iframeRef = useRef(null)
  return (
    <>
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
