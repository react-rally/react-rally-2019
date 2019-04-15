import React from 'react';
import {Link} from 'react-router';
import moment from 'moment';
import cx from 'classnames';
import constants from 'helpers/constants';
import shuffle from 'helpers/shuffle';
import About from 'components/About';
import Button from 'components/Button';
import Legend from 'components/Legend';
import Person from 'components/Person';
import SpeakerData from '../../../api/speakers';
import Tickets from '../../../api/tickets';

const {Dates} = constants;

const UpcomingDate = ({timestamp, description}) => {
  const date = moment.utc(timestamp);
  const isAfter = moment.utc().isAfter(date);
  const iconSource = `assets/dist/img/icons/calendar${
    isAfter ? '-complete' : ''
  }.svg`;

  return (
    <div
      className={cx({
        Home__UpcomingDate: true,
        'Home__UpcomingDate--disabled': isAfter,
      })}>
      <img src={iconSource} />
      <div>
        <time>{date.format('MMMM D, YYYY')}</time>
        <small>{description}</small>
      </div>
    </div>
  );
};

const TicketCard = ({name, description, price, soldOut}) => {
  return (
    <div
      className={cx('Home__TicketCard', {
        'Home__TicketCard--disabled': soldOut,
      })}>
      <div className="Home__TicketCard__Details">
        <h3>{name}</h3>
        <p>{description}</p>
      </div>
      <div className="Home__TicketCard__Order">
        <h2>{isNaN(price) ? '' : '$' + price}</h2>
        <Button
          className="primary"
          href={constants.TICKET_SALES}
          disabled={soldOut}>
          {soldOut ? 'Sold Out' : 'Buy Now'}
        </Button>
      </div>
    </div>
  );
};

export default () => {
  return (
    <div className="Home">
      <section className="Home__About">
        <h2>What is React Rally?</h2>
        <About />
        <Link to="/about" className="Link">
          More about React Rally &raquo;
        </Link>
      </section>
      {Object.keys(SpeakerData).length > 0 ? (
        <section>
          <h2>Featured Speakers</h2>
          {shuffle(Object.keys(SpeakerData))
            .filter(key => SpeakerData[key].featured)
            .map(key => {
              return <Person {...SpeakerData[key]} key={key} />;
            })}
        </section>
      ) : null}

      <section>
        <h2>Upcoming Dates</h2>
        <UpcomingDate
          timestamp={Dates.CFP_OPEN}
          description="Call for Proposals opens."
        />
        <UpcomingDate
          timestamp={Dates.CFP_CLOSE}
          description="Call for Proposals closes."
        />
        <UpcomingDate
          timestamp={Dates.TICKET_RELEASE}
          description="Early Bird Tickets (round one) go on sale."
        />
        <UpcomingDate
          timestamp={moment.utc(Dates.TICKET_RELEASE).add(7, 'days')}
          description="Early Bird Tickets (round two) go on sale."
        />
        <UpcomingDate
          timestamp={moment.utc(Dates.TICKET_RELEASE).add(14, 'days')}
          description="Standard tickets go on sale."
        />
      </section>

      <section>
        <h2>Tickets</h2>
        {Tickets.map((t, i) => {
          return <TicketCard key={i} {...t} />;
        })}
      </section>
    </div>
  );
};
