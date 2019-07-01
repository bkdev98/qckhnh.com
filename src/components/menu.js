import React, { useState, useEffect } from 'react'
import { Link } from 'gatsby'

const Menu = ({ data, prefix, selected, ...props }) => {
  const [numToShow, setNumToShow] = useState(5);

  useEffect(() => {
    if (selected) {
      const index = data.findIndex(item => item.node.id === selected);
      if (index && index > numToShow - 1) {
        setNumToShow(index + 1)
      }
    }
  }, [])

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