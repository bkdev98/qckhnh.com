import React, { useState } from 'react'
import { Link } from 'gatsby'

const Menu = ({ data, prefix, ...props }) => {
  const [numToShow, setNumToShow] = useState(5);

  return (
    <div {...props}>
      {data.slice(0, numToShow).map(({ node: { id, frontmatter, fields } }) => (
        <Link className='link' activeClassName='link-active' to={prefix + fields.slug} key={id}>{frontmatter.title}</Link>
      ))}
      {numToShow < data.length &&
        <i style={{ cursor: 'pointer' }} onClick={() => setNumToShow(numToShow + 5)}>more...</i>}
    </div>
  )
}

export default Menu