import React, { useState, useEffect, useRef } from "react"
import css from "@emotion/css"
import styled from "@emotion/styled"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { Masonry } from "react-masonry-responsive"
import { Link, useStaticQuery, graphql } from "gatsby"
import GatsbyImage from "gatsby-image"
import { inherits } from "util"
import useScrollDirection from "./useScrollDirection"
import useMediaQuery from "./useMediaQuery"

export default function ArticlesListing() {
  const { lg } = useMediaQuery()
  const [active, setActive] = useState(0)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [currentPaginationPage, setCurrentPaginationPage] = useState(0)
  const direction = useScrollDirection()
  const scrollToRef = useRef(null)
  const barRef = useRef(null)
  const {
    c: { filterOptions, listArticles, articlesPerPage, body },
  } = useStaticQuery(graphql`
    {
      c: contentfulContentMainScreen {
        filterOptions
        articlesPerPage
        body {
          json
        }
        listArticles {
          slug
          title
          category
          topic
          shortDescription {
            id
            shortDescription
          }
          mediaThumb {
            description
            fluid(maxWidth: 400) {
              base64
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
  const [selectedFilter, setSelectedFilter] = useState(filterOptions[0])
  const ITEMS = filterOptions.map((item, index) => {
    return {
      item,
      index,
    }
  })
  const indexOfLabel = ITEMS.findIndex(value => /\[.+\]/.test(value.item))
  // let BARITEMS = ITEMS.slice(0, indexOfLabel)
  // let DROPDOWNITEMS = ITEMS.slice(indexOfLabel + 1)
  let DROPDOWNMENULABEL = ITEMS[indexOfLabel].item
  const [BARITEMS, setBAR] = useState(ITEMS.slice(0, indexOfLabel))
  const [DROPDOWNITEMS, setDROP] = useState(ITEMS.slice(indexOfLabel + 1))
  const ARTICLES = listArticles
    .filter(item => {
      if (filterOptions[0] == selectedFilter) {
        return true
      }
      if (
        (filterOptions[0] !== selectedFilter &&
          item.category &&
          item.category == selectedFilter) ||
        (item.topic && item.topic.includes(selectedFilter))
      ) {
        return true
      } else {
        return false
      }
    })
    .map((article, i) => {
      var shortDescription

      if (article.shortDescription.shortDescription.length < 200) {
        shortDescription = article.shortDescription.shortDescription
      } else {
        var words = article.shortDescription.shortDescription.split(" ")
        var final = words.reduce(
          (acc, cur) => {
            return {
              text:
                acc.textLength + cur.length > 200
                  ? acc.text
                  : acc.text + " " + cur,
              textLength: acc.textLength + cur.length,
            }
          },
          { text: "", textLength: 0 }
        )
        shortDescription = final.text + " ..."
      }

      return {
        key: `${article.slug}${Math.floor(Math.random() * 100).toString()}`,
        node: (
          <Card
            to={
              `${/^\//.test(article.slug) ? "" : "/"}` +
              article.slug +
              `${/\/$/.test(article.slug) ? "" : "/"}`
            }
            className="mb-3 clearfix"
          >
            {article.mediaThumb && (
              <GatsbyImage
                imgStyle={{ transition: null }}
                css={css`
                  margin-bottom: 1.25rem;
                  margin-right: 1rem;
                  picture > * {
                    transition: transform 300ms ease-in-out;
                    transform: scale(1);
                    &:hover {
                      transform: scale(1.03);
                    }
                  }

                  @media (max-width: 576px) {
                    width: 50%;
                    float: left;
                    &:first-child {
                      padding-bottom: ${(1 /
                        article.mediaThumb.fluid.aspectRatio) *
                        50}%;
                    }
                  }
                `}
                alt={article.mediaThumb.description}
                fluid={article.mediaThumb.fluid}
              />
            )}
            <div
              css={css`
                color: var(--dark-font);
                font-size: 12px;
                font-weight: 600;
                line-height: 15px;
                text-transform: uppercase;
              `}
            >
              {article.category}
            </div>
            <h3
              css={css`
                font-size: 18px;
                font-weight: bold;
                line-height: 23px;
                margin-top: 0.5rem;
                text-transform: uppercase;
                color: var(--secondary);
              `}
            >
              {article.title}
            </h3>
            <p
              css={css`
                font-size: 12px;
                line-height: 15px;

                margin-top: 0.5rem;
                color: var(--secondary);
              `}
            >
              {shortDescription}
            </p>
          </Card>
        ),
      }
    })
  useEffect(() => {
    const { offsetWidth, scrollWidth } = barRef.current
    console.log(offsetWidth, scrollWidth)
    console.dir(barRef.current)
    if (offsetWidth !== scrollWidth) {
      setDROP(DROPDOWNITEMS => [
        BARITEMS[BARITEMS.length - 1],
        ...DROPDOWNITEMS,
      ])
      setBAR(BARITEMS.slice(0, BARITEMS.length - 1))
    }
  })

  return (
    <div>
      <div
        id="filter"
        className="sticky-top"
        css={css`
          top: ${direction == "up" ? "57px" : 0};
          background-color: #fff;
          border-bottom: 1px solid #979797;
          display: flex;
          padding-top: 0.5rem;
          margin-top: -0.5rem;
          justify-content: space-between;

          box-shadow: 0px 0.5rem 0.5rem rgba(255, 255, 255, 1);
        `}
      >
        <div
          ref={barRef}
          css={css`
            white-space: nowrap;
            overflow: hidden;
          `}
        >
          {BARITEMS.map(item => {
            return (
              <Item
                active={item.index === active}
                onClick={e => {
                  setActive(item.index)
                  setDropdownOpen(false)

                  setSelectedFilter(item.item)
                }}
                key={item.index}
              >
                {item.item}
              </Item>
            )
          })}
        </div>
        <div>
          <div
            css={css`
              display: inline-flex;
              align-items: center;
              cursor: pointer;
            `}
            onClick={e => setDropdownOpen(s => !s)}
          >
            <span
              css={css`
                font-size: 12px;
                font-weight: 600;
                line-height: 15px;
                margin-right: 0.25rem;
              `}
            >
              {DROPDOWNMENULABEL.slice(1, DROPDOWNMENULABEL.length - 1)}
            </span>
            <span
              className="triangle"
              css={css`
                display: inline-block;
                width: 0;
                height: 0;

                border-left: 5px solid transparent;
                border-right: 5px solid transparent;

                border-top: 5px solid var(--secondary);
              `}
            />
          </div>
          <Dropdown setOpen={setDropdownOpen} open={dropdownOpen}>
            {DROPDOWNITEMS.map(item => {
              return (
                <Item
                  block
                  active={item.index === active}
                  onClick={e => {
                    setActive(item.index)
                    setDropdownOpen(false)
                    setSelectedFilter(item.item)
                  }}
                  key={item.index}
                >
                  {item.item}
                </Item>
              )
            })}
          </Dropdown>
        </div>
      </div>
      <div id="listing" ref={scrollToRef}>
        <div
          css={css`
            margin: 1.25rem 0;
            h2 {
              font-weight: 300;
              color: var(--secondary);
              line-height: 19px;
              font-size: 16px;
              text-transform: uppercase;
            }
          `}
        >
          {documentToReactComponents(body.json)}
        </div>
        <div id="list">
          <div>
            <Masonry
              gap={20}
              items={ARTICLES.slice(
                currentPaginationPage,
                currentPaginationPage + articlesPerPage
              )}
              minColumnWidth={lg ? 200 : 245}
            />
          </div>
        </div>

        <div id="pagination" className="d-flex justify-content-center mb-3">
          {ARTICLES.length === 0 && <p>No content to display.</p>}
          {ARTICLES.length / articlesPerPage > 1 &&
            ARTICLES.map((article, index) => {
              return index % articlesPerPage === 0 ? (
                <span
                  key={index}
                  index={index}
                  className={`${index === currentPaginationPage && "active"}`}
                  css={PaginationLink}
                  onClick={e => {
                    setCurrentPaginationPage(index)

                    typeof window !== "undefined" &&
                      window.scrollTo({
                        top:
                          window.scrollY +
                          scrollToRef.current.getBoundingClientRect().top -
                          20,
                        left: 0,
                        behavior: "smooth",
                      })
                  }}
                >
                  {index / articlesPerPage + 1}
                </span>
              ) : null
            })}
        </div>
      </div>
    </div>
  )
}

const Card = styled(Link)`
  display: block;
  &:hover {
    text-decoration: none;
  }
  &:hover h3 {
    text-decoration: underline;
  }
`

const Item = ({ children, active, block, onClick }) => {
  return (
    <span
      css={css`
        color: ${active ? "var(--primary)" : "var(--secondary)"};
        display: ${block ? "block" : "inline"};
        font-size: 12px;
        font-weight: 600;
        line-height: 15px;
        margin-right: 1.25rem;
        margin-bottom: ${block ? "1rem" : null};
        cursor: pointer;
        &:hover {
          color: ${active ? "var(--primary)" : "var(--dark)"};
        }
        &:last-of-type {
          margin-bottom: 0;
        }
      `}
      onClick={onClick}
    >
      {children}
    </span>
  )
}
const PaginationLink = css`
  font-size: 18px;
  font-weight: 600;
  line-height: 23px;
  color: var(--secondary);
  margin: 0 0.75rem;
  cursor: pointer;
  &.active {
    color: var(--primary);
  }
`

const Dropdown = ({ children, open, setOpen }) => {
  const dropRef = useRef(null)
  function handleClickOutside(event) {
    if (dropRef && dropRef.current && !dropRef.current.contains(event.target)) {
      open && setOpen(false)
    }
  }

  useEffect(() => {
    typeof window !== "undefined" &&
      document.addEventListener("click", handleClickOutside)
    return () => {
      typeof window !== "undefined" &&
        document.removeEventListener("click", handleClickOutside)
    }
  })
  return (
    <div
      ref={dropRef}
      style={{ width: "156px" }}
      css={css`
        width: 156px;
        background-color: #ffffff;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
        position: absolute;
        top: 2.25rem;
        right: 0rem;
        padding: 1rem;
        opacity: ${open ? 1 : 0};
        height: ${open ? "1000px" : 0};
        max-height: max-content;
        transition: all 300ms ease-in-out;
      `}
    >
      {children}
    </div>
  )
}
