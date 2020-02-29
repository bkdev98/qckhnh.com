import React from "react"

import Header from "../components/header"
import "./style.css"

const Layout = ({ children }) => (
  <div className="layout">
    {/* <Header /> */}
    <main>{children}</main>
  </div>
)

export default Layout
