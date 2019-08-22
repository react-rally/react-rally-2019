import React from 'react';

export default props => {
  return (
    <a
      href={props.href}
      target="_blank"
      onClick={props.onClick}
      className={'Button' + (props.className ? ' ' + props.className : '')}
      disabled={props.disabled}>
      {props.children}
    </a>
  );
};
