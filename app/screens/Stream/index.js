import React from 'react';
import constants from 'helpers/constants';
import {getLiveStreamEmbedURL} from 'helpers/livestream';

export default () => {
  let url = getLiveStreamEmbedURL();

  return (
    <div className="Stream">
      <iframe
        className="Stream__Embedded"
        width="560"
        height="315"
        src={url}
        frameBorder="0"
        allow="autoplay; encrypted-media"
        allowFullScreen
      />
      <div className="Stream__Caption">
        <img src="assets/dist/img/ReactLogoRed.svg" width="42" />
        <h2>React Rally 2019 Live Stream</h2>
      </div>
    </div>
  );
};
