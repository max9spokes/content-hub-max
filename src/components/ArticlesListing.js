import React, { useState, useEffect, useRef } from "react"
import css from "@emotion/css"
import styled from "@emotion/styled"
import { Masonry } from "react-masonry-responsive"
import { Link, useStaticQuery, graphql } from "gatsby"
import GatsbyImage from "gatsby-image"

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

export default function ArticlesListing() {
  const [active, setActive] = useState(0)
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const {
    c: { filterOptions, listArticles, articlesPerPage },
  } = useStaticQuery(graphql`
    {
      c: contentfulContentMainScreen {
        filterOptions
        articlesPerPage
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
  const BARITEMS = ITEMS.slice(0, indexOfLabel)
  const DROPDOWNITEMS = ITEMS.slice(indexOfLabel + 1)
  const DROPDOWNMENULABEL = ITEMS[indexOfLabel].item

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
    .map(article => {
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
        key: article.slug,
        node: (
          <Card to={article.slug} className="mb-3">
            <div>
              {article.mediaThumb && (
                <GatsbyImage
                  css={css`
                    margin-bottom: 1.25rem;
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
            </div>
          </Card>
        ),
      }
    })

  return (
    <div>
      <div
        id="filter"
        className="sticky-top"
        css={css`
          top: 0rem;
          background-color: #fff;
          border-bottom: 1px solid #979797;
          display: flex;
          padding-top: 0.5rem;
          margin-top: -0.5rem;
          justify-content: space-between;
          box-shadow: 0px 1rem 0px rgba(255, 255, 255, 1);
        `}
      >
        <div>
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
                  key={item}
                >
                  {item.item}
                </Item>
              )
            })}
          </Dropdown>
        </div>
      </div>
      <div id="listing">
        <div
          css={css`
            font-weight: 300;
            margin: 1.25rem 0;
            color: var(--secondary);
            line-height: 19px;
            text-transform: uppercase;
          `}
        >
          Latest Insights
        </div>
        <div id="list">
          <div>
            <Masonry gap={20} items={ARTICLES} minColumnWidth={180} />
            {}
          </div>
        </div>
        <div id="pagination" className="d-flex justify-content-center mb-3">
          <span css={PaginationLink}>1</span>
          <span css={PaginationLink} className="active">
            2
          </span>
        </div>
      </div>
    </div>
  )
}
