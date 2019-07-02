import React from "react"
import css from "@emotion/css"
import { useStaticQuery, graphql } from "gatsby"

export default function Tools() {
  const {
    c: { tools },
  } = useStaticQuery(graphql`
    {
      c: contentfulContentMainScreen {
        tools: toolsTemplates {
          title
          shortDescription {
            shortDescription
          }
          slug

          mediaThumb {
            title
            fluid {
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
    <div className="bg-light">
      <div
        className="container"
        css={css`
          padding-top: 3.635rem;
          padding-bottom: 3.635rem;
        `}
      >
        <h2
          css={css`
            font-size: 26px;
            font-weight: 700;
            line-height: 31px;
            margin-bottom: 1.25rem;
            text-transform: uppercase;
            color: var(--dark-font);
          `}
        >
          Tools and Templates
        </h2>
        <div className="row">
          <div className="col col-md-4">
            {" "}
            <div
              className="card"
              css={css`
                box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
                background-color: #ffffff;
                border-radius: 0;
                padding: 1rem 1rem 2rem 1rem;
              `}
            >
              <h3
                css={css`
                  font-size: 17px;
                  font-weight: 600;
                  line-height: 20px;
                  color: var(--primary);
                `}
              >
                Business plan health check
              </h3>
              <div className="row">
                <div className="col col-3">ICON</div>
                <div
                  className="col col-9 text-secondary"
                  css={css`
                    font-size: 12px;
                    line-height: 15px;
                  `}
                >
                  Dreams are important. Not the dreams you have when sleeping.
                  I’m talking about the dreams you have for your future — the
                  dreams that keep you going — the dreams that make each day
                  worth living.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
