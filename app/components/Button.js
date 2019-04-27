import React from 'react'

export default ({ className = '', ...otherProps }) => (
  <a
    target="_blank"
    rel="noopener noreferrer"
    className={`Button ${className}`}
    {...otherProps}
  />
)
