import React from 'react'

export default ({ url, size = 200 }) => (
  <img src={url} className="Avatar" style={{
    width: size,
    height: size,
  }}/>
)
