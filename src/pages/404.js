import React from "react"
import { navigate } from "gatsby"

export default function NoPage() {
  navigate("/")
  return <div />
}
