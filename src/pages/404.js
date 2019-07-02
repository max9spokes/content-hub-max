import React from "react"
import { navigate } from "gatsby"

export default function NoPage() {
  typeof window !== "undefined" && navigate("/")
  return <div />
}
