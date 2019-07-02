import React from "react"
import Layout from "../components/layouts/main"
import SingleContent from "../components/SingleContent"
import Tools from "../components/Tools"
import { graphql } from "gatsby"
function Index() {
  return (
    <Layout>
      <SingleContent />
      <Tools />
    </Layout>
  )
}

export default Index
