import React from "react"
import { Link } from "gatsby"

import Layout from "../layout"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <Link partiallyActive={true} className="nav" to="/now" activeClassName="active">now</Link>
    <Link partiallyActive={true} className="nav" to="/tracks" activeClassName="active">tracks</Link>
  </Layout>
)

export default IndexPage
