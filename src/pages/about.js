import React, { useState } from "react"

import Layout from "../layout"
import SEO from "../components/seo"

const experiences = [
  `Flutter, NetlifyCMS, Webpack, TypeScript, Vue`,
  `, Express, MongoDB, Socket.io, Styled Components`,
  `, Ant Design, Material UI, Angular, Redux, Wordpress`,
  `, Ruby on Rails, Adonis JS, Phoenix Framework, Laravel, PostgreSQL`,
  `, C/C++, Java, .NET, MSSQL, Python.`,
]

const AboutPage = () => {
  const [count, setCount] = useState(0);
  return (
    <Layout>
      <SEO title="About" />
      <div className="about">
        <p style={{ textDecoration: 'line-through' }}>I'm not a fan of softwares. I just try to do something when I'm still here.</p>
        <p>Anyway, I'm a full-stack developer. I used to be a freelancer, working on UI/UX and branding stuff before mainstream coding.</p>
        <p>I founded my first tech company <a href="https://innoteq.vn">Innoteq Co., Ltd</a>, which provide tech solutions for your real-life problems.</p>
        <p>I also run an one-man digital studio at <a href="https://quocs.com">Quocs.com</a>, in case you got a project in mind and I'd love to hear everything about it.</p>
        <p>
          <span>I use JavaScript for most of my projects. I have experience in React, React Native, GraphQL, Gatsby, Electron, </span>
          {experiences.slice(0, count).map((item, idx) => <span key={idx}>{item}</span>)}
          {count < experiences.length && <span> and <i style={{ cursor: 'pointer' }} onClick={() => setCount(count + 1)}>more...</i></span>}
        </p>
      </div>
    </Layout>
  );
}

export default AboutPage
