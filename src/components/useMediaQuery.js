import React, { useState, useEffect } from "react"

export default function useMediaQuery() {
  const [breakpoints, setBreakpoints] = useState({
    xs: false,
    sm: false,
    md: false,
    lg: false,
    xl: false,
  })

  useEffect(() => {
    const getQueries = () => {
      setBreakpoints({
        xs: matchMedia("(min-width: 0)").matches,
        sm: matchMedia("(min-width: 576px)").matches,
        md: matchMedia("(min-width: 768px)").matches,
        lg: matchMedia("(min-width: 992px)").matches,
        xl: matchMedia("(min-width: 1200px)").matches,
      })
    }

    window.addEventListener("resize", getQueries)
    return () => {
      window.removeEventListener("resize", getQueries)
    }
  }, [])

  return breakpoints
}
