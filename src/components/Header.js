import React, { useState } from "react"
import css from "@emotion/css"
import { Link, useStaticQuery, graphql } from "gatsby"
import { Collapse } from "reactstrap"

const Navlink = ({ link }) => {
  const btnDefaults = css`
    font-size: 14px;
    line-height: 17px;
    font-weight: 600;
    padding: 0.5em 2.5em;
  `
  return (
    <>
      {!link.openNewTab && (
        <Link
          to={link.url}
          css={[
            css`
              color: ${link.style !== "Primary-CTA"
                ? "var(--dark-font)"
                : null};
              @media (max-width: 766px) {
                padding-top: 0.35rem;
                padding-bottom: 0.35rem;
              }
            `,
            link.style !== "Link" ? btnDefaults : "default",
          ]}
          className={`${
            link.style === "Primary-CTA" ? "btn btn-primary " : ""
          } ${
            link.style === "Secondary-CTA" ? "btn btn-outline-primary" : ""
          } semibold mx-3`}
        >
          {link.title}
        </Link>
      )}
      {link.openNewTab && (
        <a
          href={link.url}
          css={css`
            color: ${link.style !== "Primary-CTA" ? "var(--dark-font)" : null};
            @media (max-width: 766px) {
              padding-top: 0.35rem;
              padding-bottom: 0.35rem;
            }
          `}
          target="_blank"
          className={`${
            link.style === "Primary-CTA" ? "btn btn-primary" : null
          } ${
            link.style === "Secondary-CTA" ? "btn btn-outline-primary" : null
          } semibold mx-3`}
        >
          {link.title}
        </a>
      )}
    </>
  )
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const {
    c: {
      channel: [{ channelName, channelLogo }],
      navigation,
    },
  } = useStaticQuery(graphql`
    {
      c: contentfulContentMainScreen {
        channel {
          channelName
          channelLogo {
            title
            file {
              url
            }
          }
        }
        navigation {
          title
          url
          style
          openNewTab
        }
      }
    }
  `)

  return (
    <>
      <nav
        css={css`
          border-bottom: 2px solid #fba919;
        `}
      >
        <div className="container">
          <div className="d-flex d-flex align-items-center justify-content-between">
            <Link
              css={css`
                display: block;
                &:hover {
                  text-decoration: none;
                }
              `}
              className="logo"
            >
              <img
                src={channelLogo.file.url}
                css={css`
                  position: relative;
                  left: -15px;
                `}
                alt=""
              />
              <span
                className="bold"
                css={css`
                  color: var(--dark-font);
                `}
              >
                {channelName}
              </span>
            </Link>
            <div className="navlinks d-none d-md-flex align-items-center">
              {navigation.slice(0, navigation.length - 2).map((link, i) => {
                return <Navlink key={link.url} link={link} />
              })}
            </div>
            <div className="buttons   d-none d-md-flex  align-items-center">
              {navigation
                .slice(navigation.length - 2, navigation.length)
                .map((link, i) => {
                  return <Navlink key={link.url} link={link} />
                })}
            </div>
            <MenuBar
              className={"d-block d-md-none"}
              onClick={e => {
                setIsMenuOpen(i => !i)
              }}
              css={css`
                cursor: pointer;
              `}
            />
          </div>
        </div>
      </nav>
      <Collapse
        css={css`
          border-bottom: 1px solid var(--secondary);
        `}
        className="d-md-none"
        isOpen={isMenuOpen}
      >
        {" "}
        <div className="navlinks d-flex py-2 flex-column">
          {navigation.slice(0, navigation.length - 2).map((link, i) => {
            return <Navlink key={link.url} link={link} />
          })}
        </div>
      </Collapse>
      {typeof window !== "undefined" && window.location.pathname === "/" && (
        <div className="buttons w-100  d-flex d-md-none py-3  justify-content-center">
          {navigation
            .slice(navigation.length - 2, navigation.length)
            .map((link, i) => {
              return <Navlink key={link.url} link={link} />
            })}
        </div>
      )}
    </>
  )
}

function MenuBar(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 24 24"
      width={30}
      height={30}
      style={{ fill: "#032e66" }}
    >
      <path
        d="M 2 5 L 2 7 L 22 7 L 22 5 L 2 5 z M 2 11 L 2 13 L 22 13 L 22 11 L 2 11 z M 2 17 L 2 19 L 22 19 L 22 17 L 2 17 z"
        overflow="visible"
      />
    </svg>
  )
}
