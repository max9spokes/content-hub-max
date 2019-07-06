import React, { useState, useEffect } from "react"

export default function useScrollDirection(params) {
  const [direction, setDirection] = useState("down")

  useEffect(() => {
    let scrollInit = 0
    const setStyle = e => {
      setDirection(() => {
        return scrollInit > window.pageYOffset && window.pageYOffset !== 0
          ? "up"
          : "down"
      })
      scrollInit = window.pageYOffset
    }

    document.addEventListener("scroll", setStyle)
    return () => {
      document.removeEventListener("scroll", setStyle)
    }
  }, [])

  return direction
}
