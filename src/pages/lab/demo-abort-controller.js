import React from "react"

import Layout from "../../layout"
import SEO from "../../components/seo"
import { LabHeader } from './index';
import DemoProblemReactHooks from '../../components/lab/problem-fetch-api-react-hooks';
import DemoSolutionReactHooks from '../../components/lab/solution-fetch-api-react-hooks';
import DemoSolutionReactComponent from '../../components/lab/solution-fetch-api-react-component';

const DemoAbortControllerPage = () => {
  return (
    <Layout>
      <LabHeader />
      <SEO
        title="Demo AbortController"
        thumbnail="/assets/abort-controller.png"
        description="Giải quyết vấn đề fetch API trong React"
      />
      <img alt="Demo AbortController" src="/assets/abort-controller.png" />
      <h3>Demo AbortController</h3>
      <p>This lab related to the article <a href="/tutorials/mot-van-de-khi-fetch-api-trong-react/">Một vấn đề khi fetch API trong React</a></p>
      <h4>1. Reproduce problem using React useEffect</h4>
      <li>Normal case <a href="https://github.com/bkdev98/qckhnh.com/tree/master/src/components/lab/problem-fetch-api-react-hooks.js" target="__blank">[source code]</a></li>
      <DemoProblemReactHooks />
      <li>Race conditions <a href="https://github.com/bkdev98/qckhnh.com/tree/master/src/components/lab/problem-fetch-api-react-hooks.js" target="__blank">[source code]</a></li>
      <DemoProblemReactHooks showDelay />
      <li>Solution (using Hook useEffect) <a href="https://github.com/bkdev98/qckhnh.com/tree/master/src/components/lab/solution-fetch-api-react-hooks.js" target="__blank">[source code]</a></li>
      <DemoSolutionReactHooks showDelay />
      <li>Solution (using Class Component) <a href="https://github.com/bkdev98/qckhnh.com/tree/master/src/components/lab/solution-fetch-api-react-component.js" target="__blank">[source code]</a></li>
      <DemoSolutionReactComponent showDelay />
    </Layout>
  )
}

export default DemoAbortControllerPage
