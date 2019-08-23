import React, { useEffect, useState } from "react"
import css from "@emotion/css"
import useScrollDirection from "./useScrollDirection"
export default function BackToTheTop() {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const getOffset = () => {
      const offset = window.pageYOffset
      if (offset > 500 && !visible) {
        setVisible(true)
      } else if (offset < 500 && visible) {
        setVisible(false)
      }
    }
    typeof window !== "undefined" &&
      window.addEventListener("scroll", getOffset)

    return () =>
      typeof window !== "undefined" &&
      window.addEventListener("scroll", getOffset)
  })

  return (
    <>
      <div
        onClick={e => {
          typeof window !== "undefined" &&
            window.scrollTo({ top: 0, behavior: "smooth" })
        }}
        css={css`
          width: 30px;
          height: 30px;
          background-color: rgb(3, 46, 102);
          position: fixed;
          bottom: 20px;
          right: 20px;
          z-index: 1000;
          border-radius: 100px;
          display: ${visible ? "flex" : "none"};
          justify-content: center;
          align-items: center;
          cursor: pointer;

          &::after {
            content: "";
            display: block;
            position: relative;
            top: 2px;
            width: 10px;
            height: 10px;
            border: 2px solid white;
            border-color: white transparent transparent white;
            border-top-left-radius: 2px;
            transform: rotate(45deg);
          }
        `}
      />
    </>
  )
}
