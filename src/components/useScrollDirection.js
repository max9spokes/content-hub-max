import React, { useState, useEffect } from "react"

export default function useScrollDirection(params) {
  const [direction, setDirection] = useState("down")
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    let scrollInit = 0
    let initDirection = "down"
    const setStyle = e => {
      const newDirection =
        scrollInit > window.pageYOffset && window.pageYOffset !== 0
          ? "up"
          : "down"

      if (newDirection !== initDirection) {
        console.log("new direction", newDirection)
        setDirection(newDirection, direction)
      }

      initDirection = newDirection

      const nOL = window.pageYOffset > 57 ? "down" : "up"
      const OL = scrollInit > 57 ? "down" : "up"
      if (nOL !== OL) {
        console.log("offset", nOL, OL, offset)
        setOffset(window.pageYOffset)
      }
      scrollInit = window.pageYOffset
    }

    document.addEventListener("scroll", setStyle)
    return () => {
      document.removeEventListener("scroll", setStyle)
    }
  }, [])

  return [direction, offset]
}
