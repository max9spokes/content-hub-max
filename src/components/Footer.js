import React from "react"
import css from "@emotion/css"
import { useStaticQuery, graphql, Link } from "gatsby"
export default function Footer() {
  const {
    main: {
      footer: {
        logo,
        legalText: { legalText },
        termsLink,
      },
    },
  } = useStaticQuery(graphql`
    {
      main: contentfulContentMainScreen {
        footer {
          logo: poweredBy9sLogo {
            description
            file {
              url
            }
          }
          legalText {
            legalText
          }
          termsLink {
            ... on ContentfulRefNavigationElement {
              id
              title
              url
              style
              openNewTab
            }
          }
        }
      }
    }
  `)
  return (
    <div
      className="bg-primary"
      css={css`
        padding-top: 3rem;
        padding-bottom: 3rem;
      `}
    >
      <div className="container text-white">
        <div className="row">
          <div className="col col-12 col-md-7">
            <div className="d-flex flex-wrap justify-content-center d-md-block">
              {termsLink.map((item, i) => {
                return <FooterLink key={i} link={item} />
              })}
            </div>
            <p
              css={css`
                font-size: 14px;
                font-weight: 300;
                line-height: 17px;
                @media (max-width: 766px) {
                  text-align: center;
                }
              `}
            >
              {legalText}
            </p>
          </div>
          <div
            className="col col-12 col-md-2  offset-md-3"
            css={css`
              @media (max-width: 766px) {
                text-align: center;
                img {
                  position: relative;
                  left: -12px;
                }
              }
            `}
          >
            <img src={logo.file.url} alt={logo.description} />
          </div>
        </div>
      </div>
    </div>
  )
}

const FooterLink = ({ link }) => {
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
              color: ${link.style !== "Primary-CTA" ? "var(--white)" : null};
              &:hover {
                color: ${link.style !== "Primary-CTA" ? "var(--light)" : null};
              }
              margin-bottom: 0.5rem;
              display: inline-block;
              font-size: 18px;
              line-height: 21px;
            `,
            link.style !== "Link" ? btnDefaults : "default",
          ]}
          className={`${
            link.style === "Primary-CTA" ? "btn btn-primary " : ""
          } ${
            link.style === "Secondary-CTA" ? "btn btn-outline-primary" : ""
          } semibold mr-3`}
        >
          {link.title}
        </Link>
      )}
      {link.openNewTab && (
        <a
          href={link.url}
          css={css`
            color: ${link.style !== "Primary-CTA" ? "var(--white)" : null};
            &:hover {
              color: ${link.style !== "Primary-CTA" ? "var(--light)" : null};
            }
            margin-bottom: 0.5rem;
            display: inline-block;
            font-size: 18px;
            line-height: 21px;
          `}
          target="_blank"
          className={`${
            link.style === "Primary-CTA" ? "btn btn-primary" : null
          } ${
            link.style === "Secondary-CTA" ? "btn btn-outline-primary" : null
          } semibold mr-3`}
        >
          {link.title}
        </a>
      )}
    </>
  )
}
