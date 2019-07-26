import React, { useState, useEffect } from 'react'
import { Link } from 'gatsby'

const Menu = ({ data, prefix, selected, ...props }) => {
  const [startPosition, setStartPosition] = useState(0);
  const [endPosition, setEndPosition] = useState(5);

  useEffect(() => {
    if (selected) {
      const index = data.findIndex(item => item.node.id === selected);
      if (index) {
        setStartPosition(index - 2 > 0 ? index - 2 : 0)
        setEndPosition(index + 3 > 5 ? index + 3 : 5)
      }
    }
  }, [])

  return (
    <div {...props}>
      {startPosition > 0 &&
        <i
          style={{ cursor: 'pointer', marginRight: 20 }}
          onClick={() => {
            setStartPosition(startPosition - 2 > 0 ? startPosition - 2 : 0);
            setEndPosition(startPosition + 3 > 5 ? startPosition + 3 : 5);
          }}
        >
          ...
        </i>
      }
      {data.slice(startPosition, endPosition).map(({ node: { frontmatter, fields } }, idx) => (
        <Link className='link' activeClassName='link-active' to={prefix + fields.slug} key={idx}>{frontmatter.title}</Link>
      ))}
      {endPosition < data.length &&
        <i style={{ cursor: 'pointer' }} onClick={() => setEndPosition(endPosition + 5)}>more...</i>}
    </div>
  )
}

export default Menu