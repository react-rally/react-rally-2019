import React from 'react'
import Avatar from 'components/Avatar'
import Icon from 'components/Icon'

export default ({ avatar, name, title, twitter, github }) => (
  <div className="Person">
    <Avatar url={avatar} size={200}/>
    <b>{name}</b><br/>
    <em>{title}</em>
    <div className="Person__Social">
      {twitter && <Icon href={`https://twitter.com/${twitter}`} type="twitter"/>}
      {github && <Icon href={`https://github.com/${github}`} type="github"/>}
    </div>
  </div>
);
