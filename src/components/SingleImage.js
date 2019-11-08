import React, { useState } from "react"
import GatsbyImage from "gatsby-image"
import { Link } from "gatsby"
import { Collapse } from "reactstrap"
import css from "@emotion/css"
import useScrollDirection from "./useScrollDirection"
import useMediaQuery from "./useMediaQuery"
export default function SingleImage(props) {
  return (
    <div
      className={"sticky-top"}
      css={css`
        top: calc(57px);
        border-right: 1px solid #ebebeb;
      `}
    >
      {" "}
      <GatsbyImage
        style={{ position: null }}
        css={css`
          width: 100%;
          @media (min-width: 767px) {
            height: calc(100vh - 57px);
            position: relative;
            width: calc(100% + (100vw - 100%) / 2);
            left: calc((100vw - 100%) / -2);
          }
        `}
        alt={props.mediaThumb.description}
        fluid={props.mediaThumb.fluid}
      />
      <Share data={props.socialShares} />
    </div>
  )
}

function Share({ data }) {
  const [open, setOpen] = useState(false)
  return (
    <div
      css={css`
        position: absolute;
        bottom: 1rem;
        right: 1rem;
        z-index: 9000;
        display: flex;
      `}
    >
      <div
        css={css`
          margin-right: 0.5rem;
        `}
      >
        <div
          className="d-flex"
          css={css`
            padding: 0 0.5rem;
            opacity: ${open ? 1 : 0};
            visibility: ${open ? "visible" : "hidden"};
            transform: translateX(${open ? 0 : "5px"});
            transition: all 300ms ease-in-out;
            svg {
              margin-left: 0.5rem;
              margin-right: 0.5rem;
              background: #fff;
              box-shadow: inset 1px 1px 3px rgba(255, 255, 255, 0.3);
              border-radius: 4px;
              cursor: pointer;
            }
          `}
        >
          <svg
            width="30"
            height="30"
            id="facebook"
            style={{ fill: "#3b5998" }}
            viewBox="2 2 85 85"
            onClick={() => {
              typeof window !== "undefined" &&
                window.open(
                  `https://www.facebook.com/sharer.php${objectToGetParams({
                    u: window.location.href,
                  })}`,
                  "_blank",
                  "menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=400,width=600"
                )
            }}
          >
            <path
              d="M90,15.001C90,7.119,82.884,0,75,0H15C7.116,0,0,7.119,0,15.001v59.998
		C0,82.881,7.116,90,15.001,90H45V56H34V41h11v-5.844C45,25.077,52.568,16,61.875,16H74v15H61.875C60.548,31,59,32.611,59,35.024V41
		h15v15H59v34h16c7.884,0,15-7.119,15-15.001V15.001z"
            />
          </svg>
          <svg
            width="30"
            height="30"
            viewBox="0 0 430.117 430.118"
            xmlSpace="preserve"
            onClick={() => {
              typeof window !== "undefined" &&
                window.open(
                  `https://linkedin.com/shareArticle${objectToGetParams({
                    mini: "true",
                    url: window.location.href,
                    ...{
                      title: data.title,
                      summary: data.summary,
                    },
                  })}`,
                  "_blank",
                  "menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=400,width=600"
                )
            }}
            style={{ fill: "#0077B5" }}
          >
            <path
              id="LinkedIn__x28_alt_x29_"
              d="M398.355,0H31.782C14.229,0,0.002,13.793,0.002,30.817v368.471
		c0,17.025,14.232,30.83,31.78,30.83h366.573c17.549,0,31.76-13.814,31.76-30.83V30.817C430.115,13.798,415.904,0,398.355,0z
		 M130.4,360.038H65.413V165.845H130.4V360.038z M97.913,139.315h-0.437c-21.793,0-35.92-14.904-35.92-33.563
		c0-19.035,14.542-33.535,36.767-33.535c22.227,0,35.899,14.496,36.331,33.535C134.654,124.415,120.555,139.315,97.913,139.315z
		 M364.659,360.038h-64.966V256.138c0-26.107-9.413-43.921-32.907-43.921c-17.973,0-28.642,12.018-33.327,23.621
		c-1.736,4.144-2.166,9.94-2.166,15.728v108.468h-64.954c0,0,0.85-175.979,0-194.192h64.964v27.531
		c8.624-13.229,24.035-32.1,58.534-32.1c42.76,0,74.822,27.739,74.822,87.414V360.038z M230.883,193.99
		c0.111-0.182,0.266-0.401,0.42-0.614v0.614H230.883z"
            />
          </svg>
          <svg
            width="30"
            height="30"
            viewBox="0 0 510 510"
            id="twitter"
            onClick={() => {
              typeof window !== "undefined" &&
                window.open(
                  `https://twitter.com/share${objectToGetParams({
                    url: window.location.href,
                    ...{
                      text: data.text,
                      via: data.via,
                    },
                  })}`,
                  "_blank",
                  "menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=400,width=600"
                )
            }}
            style={{ fill: "#38A1F3" }}
          >
            <path
              d="M459,0H51C22.95,0,0,22.95,0,51v408c0,28.05,22.95,51,51,51h408c28.05,0,51-22.95,51-51V51C510,22.95,487.05,0,459,0z
			 M400.35,186.15c-2.55,117.3-76.5,198.9-188.7,204C165.75,392.7,132.6,377.4,102,359.55c33.15,5.101,76.5-7.649,99.45-28.05
			c-33.15-2.55-53.55-20.4-63.75-48.45c10.2,2.55,20.4,0,28.05,0c-30.6-10.2-51-28.05-53.55-68.85c7.65,5.1,17.85,7.65,28.05,7.65
			c-22.95-12.75-38.25-61.2-20.4-91.8c33.15,35.7,73.95,66.3,140.25,71.4c-17.85-71.4,79.051-109.65,117.301-61.2
			c17.85-2.55,30.6-10.2,43.35-15.3c-5.1,17.85-15.3,28.05-28.05,38.25c12.75-2.55,25.5-5.1,35.7-10.2
			C425.85,165.75,413.1,175.95,400.35,186.15z"
            />
          </svg>
        </div>
      </div>
      <svg
        id="share"
        onClick={e => {
          setOpen(o => !o)
        }}
        css={css`
          cursor: pointer;
          opacity: 0.8;
          &:hover {
            opacity: 1;
          }
        `}
        viewBox="0 0 24 24"
        width="30"
        height="30"
        style={{ fill: "#fff" }}
      >
        <path d="M 18 2 C 16.35499 2 15 3.3549904 15 5 C 15 5.1909529 15.021791 5.3771224 15.056641 5.5585938 L 7.921875 9.7207031 C 7.3985399 9.2778539 6.7320771 9 6 9 C 4.3549904 9 3 10.35499 3 12 C 3 13.64501 4.3549904 15 6 15 C 6.7320771 15 7.3985399 14.722146 7.921875 14.279297 L 15.056641 18.439453 C 15.021555 18.621514 15 18.808386 15 19 C 15 20.64501 16.35499 22 18 22 C 19.64501 22 21 20.64501 21 19 C 21 17.35499 19.64501 16 18 16 C 17.26748 16 16.601593 16.279328 16.078125 16.722656 L 8.9433594 12.558594 C 8.9782095 12.377122 9 12.190953 9 12 C 9 11.809047 8.9782095 11.622878 8.9433594 11.441406 L 16.078125 7.2792969 C 16.60146 7.7221461 17.267923 8 18 8 C 19.64501 8 21 6.6450096 21 5 C 21 3.3549904 19.64501 2 18 2 z M 18 4 C 18.564129 4 19 4.4358706 19 5 C 19 5.5641294 18.564129 6 18 6 C 17.435871 6 17 5.5641294 17 5 C 17 4.4358706 17.435871 4 18 4 z M 6 11 C 6.5641294 11 7 11.435871 7 12 C 7 12.564129 6.5641294 13 6 13 C 5.4358706 13 5 12.564129 5 12 C 5 11.435871 5.4358706 11 6 11 z M 18 18 C 18.564129 18 19 18.435871 19 19 C 19 19.564129 18.564129 20 18 20 C 17.435871 20 17 19.564129 17 19 C 17 18.435871 17.435871 18 18 18 z" />
      </svg>
    </div>
  )
}

function objectToGetParams(object) {
  const params = Object.keys(object).filter(key => !!object[key])

  if (!params.length) {
    return ""
  }

  return (
    "?" +
    params.map(key => `${key}=${encodeURIComponent(object[key])}`).join("&")
  )
}
