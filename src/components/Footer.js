import React from "react"
import css from "@emotion/css"
export default function Footer() {
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
            <h3>Terms & conditions</h3>
            <p
              css={css`
                font-size: 14px;
                font-weight: 300;
                line-height: 17px;
                font-family: "Expert Sans";
              `}
            >
              This dashboard is for general information only and the information
              displayed is not financial, legal or tax advice. The information
              displayed should not be relied on for any purpose and you should
              seek advice specific to your circumstances from your professional
              advisers. BNZ may receive a reduction on the 9 Spokes licence fee
              when you sign up for certain apps through MyBusiness Live.
            </p>
          </div>
          <div className="col col-12 col-md-2 offset-md-3">LOGO</div>
        </div>
      </div>
    </div>
  )
}
