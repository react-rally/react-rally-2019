import React from 'react';
import constants from 'helpers/constants';
import Button from 'components/Button';
import SponsorData from '../../../api/sponsors';

export default () => {
  return (
    <div className="Sponsors">
      <section className="highlight">
        <p>
          A huge thank you to our fine sponsors. If you're interested in
          supporting React Rally, take a look at our prospectus and get in
          touch.
        </p>
        <br />
        <Button href={constants.Links.SPONSOR_PROSPECTUS} className="primary">
          Download Prospectus
        </Button>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <Button href={constants.Links.EMAIL_ORGANIZERS}>Get in Touch</Button>
      </section>

      {Object.keys(SponsorData)
        .filter(level => SponsorData[level].length > 0)
        .map(level => {
          return (
            <section key={level}>
              <h2>{level}</h2>
              {SponsorData[level].map((sponsor, i) => {
                return sponsor.image ? (
                  <a
                    key={i}
                    href={sponsor.url}
                    target="_blank"
                    title={sponsor.name}>
                    <img
                      src={sponsor.image}
                      style={sponsor.style}
                      alt={sponsor.name}
                    />
                  </a>
                ) : (
                  <a key={i} href={sponsor.url} target="_blank">
                    {sponsor.name}
                  </a>
                );
              })}
            </section>
          );
        })}
    </div>
  );
};
