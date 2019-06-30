import React, { useState, useEffect, useRef } from "react"
import css from "@emotion/css"
import { Collapse } from "reactstrap"

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

  const ITEMS = [
    "News",
    "Starting up new",
    "Growing existing",
    "Financial education ",
    "Articles",
    "Business Tips",
    "Case Study",
    "Checklist",
  ].map((item, index) => {
    return {
      item,
      index,
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
        `}
      >
        <div>
          {ITEMS.filter(item => item.index < 4).map(item => {
            return (
              <Item
                active={item.index === active}
                onClick={e => {
                  setActive(item.index)
                  setDropdownOpen(false)
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
              More
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
            {ITEMS.filter(item => item.index > 3).map(item => {
              return (
                <Item
                  block
                  active={item.index === active}
                  onClick={e => {
                    setActive(item.index)
                    setDropdownOpen(false)
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
      <div id="listing">
        <div
          css={css`
            font-weight: 300;
            margin-top: 1.25rem;
            color: var(--secondary);
            line-height: 19px;
            text-transform: uppercase;
          `}
        >
          Latest Insights
        </div>
        <div id="list">
          {Array(10)
            .fill({ length: 20 })
            .map(() => {
              return (
                <div className="py-3">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Placeat sapiente tempora eius impedit dignissimos
                  necessitatibus? Ut sint voluptatibus quos eos, natus ipsa modi
                  soluta ex hic veritatis suscipit itaque officiis.
                </div>
              )
            })}
        </div>
      </div>
    </div>
  )
}
