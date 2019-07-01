import React from "react"

import Layout from "../layout"
import SEO from "../components/seo"

const ContactPage = () => (
  <Layout>
    <SEO title="Contact" />
    <p className="link-active">Quoc Khanh</p>
    <p style={{ margin: 0 }}>0949 840 370</p>
    <p style={{ margin: 0 }}>bkdev98@gmail.com</p>
    <br />
    <p style={{ margin: 0 }}>fb.com/bkdev98</p>
    <p style={{ margin: 0 }}>github.com/bkdev98</p>
    <p style={{ margin: 0 }}>twitter.com/bkdev98</p>
  </Layout>
)

export default ContactPage
