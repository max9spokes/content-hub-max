import React from "react"
import css from "@emotion/css"
import { useStaticQuery, graphql, navigate, Link } from "gatsby"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import loadable from "@loadable/component"
import Slider from "react-slick"

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
            description
            file {
              url
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
        <div
          css={css`
            .slick-track {
              min-width: 100%;
            }
            .slick-dots {
              position: relative;
              li {
                margin-left: 0.5rem;
                margin-right: 0.5rem;
                &.slick-active {
                  button {
                    background: var(--primary);
                  }
                }
                button {
                  background: #ddd;
                  border-radius: 50%;
                  @media (max-width: 576px) {
                    width: 16px;
                    height: 16px;
                  }
                  &::before {
                    content: "";
                  }
                }
              }
            }
          `}
        >
          <Slider
            arrows={false}
            dots={true}
            infinite={tools.length > 3}
            centerMode={false}
            speed={500}
            slidesToShow={3}
            slidesToScroll={3}
            responsive={[
              {
                breakpoint: 992,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 2,
                  initialSlide: 0,
                },
              },
              {
                breakpoint: 576,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1,
                  initialSlide: 0,
                },
              },
            ]}
          >
            {tools.map((tool, i) => {
              return (
                <div
                  key={i}
                  css={css`
                    padding: 0.3rem 1rem 0.3rem 0rem;
                    @media (max-width: 576px) {
                      padding: 0.3rem 1rem 0.3rem 0rem;
                    }
                  `}
                >
                  <Link
                    to={tool.slug}
                    className="card"
                    css={css`
                      box-shadow: 4px 2px 4px 0 rgba(0, 0, 0, 0.3);
                      @media (max-width: 576px) {
                        box-shadow: -1px 1px 3px 0 rgba(0, 0, 0, 0.3);
                      }
                      background-color: #ffffff;
                      border-radius: 0;
                      padding: 1rem 1rem 2rem 1rem;
                      cursor: pointer;
                      &:hover {
                        text-decoration: none;
                      }
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
                      {tool.title}
                    </h3>
                    <div className="row">
                      {tool.mediaThumb && (
                        <div className="col col-3">
                          <img
                            alt={tool.mediaThumb.description}
                            src={tool.mediaThumb.file.url}
                          />
                        </div>
                      )}
                      <div
                        className="col col-9 text-secondary"
                        css={css`
                          font-size: 12px;
                          line-height: 15px;
                        `}
                      >
                        {tool.shortDescription.shortDescription}
                      </div>
                    </div>
                  </Link>
                </div>
              )
            })}
          </Slider>
        </div>
      </div>
    </div>
  )
}
