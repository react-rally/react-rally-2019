import React from 'react'

export default ({ href, type }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className={`Icon Icon--${type}`}>
    <i className={`fa fa-${type}`}/>
  </a>
);
