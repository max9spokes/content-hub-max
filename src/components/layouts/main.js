import React from "react"
import "../../theme/style.scss"
import { Global, css } from "@emotion/core"
import Header from "../Header"
import Footer from "../Footer"
const Layout = ({ children }) => (
  <>
    <Global
      styles={css`
        .bold {
          font-weight: 700;
        }
        .semibold {
          font-weight: 600;
        }
        .black {
          font-weight: 900;
        }
        .light {
          font-weight: 200;
        }
        .extralight {
          font-weight: 100;
        }
      `}
    />

    <Header />
    {children}
    <Footer />
  </>
)

export default Layout
