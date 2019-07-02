import React from "react"
import css from "@emotion/css"
import { Link, useStaticQuery, graphql } from "gatsby"

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
    <nav
      css={css`
        border-bottom: 2px solid #fba919;
      `}
    >
      <div className="container">
        <div className="d-flex d-flex align-items-center justify-content-between">
          <div className="logo">
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
          </div>
          <div className="navlinks d-flex align-items-center">
            {navigation.slice(0, navigation.length - 2).map((link, i) => {
              return <Navlink key={link.url} link={link} />
            })}
          </div>
          <div className="buttons d-flex align-items-center">
            {navigation
              .slice(navigation.length - 2, navigation.length)
              .map((link, i) => {
                return <Navlink key={link.url} link={link} />
              })}
          </div>
        </div>
      </div>
    </nav>
  )
}
