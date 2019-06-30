import React from "react"
import css from "@emotion/css"
import { Link } from "gatsby"
export default function Header() {
  const btnDefaults = css`
    font-size: 14px;
    line-height: 17px;
    font-weight: 600;
    padding: 0.5em 2.5em;
  `
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
              src="https://images.ctfassets.net/rhffukznzwn4/6v9z0Z0iSyL6t59NWMCPIM/a69ac385c8ddd0fbf78b2bb7f758eba0/bnz-logo.svg"
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
              My Business Live
            </span>
          </div>
          <div className="navlinks d-flex align-items-center">
            <Link
              to={"/"}
              css={css`
                color: var(--dark-font);
              `}
              className="bold mx-3"
            >
              Insights
            </Link>
            <Link to={"/"} className=" semibold mx-3">
              Dashboard
            </Link>
            <Link to={"/"} className=" semibold mx-3">
              Marketplace
            </Link>
          </div>
          <div className="buttons d-flex align-items-center">
            <Link to={"/"} css={btnDefaults} className="btn btn-primary mx-3">
              Sign up
            </Link>
            <Link
              to={"/"}
              css={btnDefaults}
              className="btn  btn-outline-primary semibold mx-3"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
