import React, {useEffect, useState} from 'react';
import {Link} from 'react-router';
import axios from 'axios';
import moment from 'moment';
import cx from 'classnames';
import constants from 'helpers/constants';
import shuffle from 'helpers/shuffle';
import About from 'components/About';
import Button from 'components/Button';
import Person from 'components/Person';
import SpeakerData from '../../../api/speakers';

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
      <img alt="" src={iconSource} />
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
        {!isNaN(price) && (
          <h2>{`$${price}`}</h2>
        )}
        <Button
          className="primary"
          href={constants.Links.TICKET_SALES}
          disabled={soldOut}>
          {soldOut ? 'Sold Out' : 'Buy Now'}
        </Button>
      </div>
    </div>
  );
};

export default () => {
  const [ticketList, setTicketList] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:2000/api/releases').then(res => {
      console.log(res.data.data || res.data.releases);
      setTicketList(res.data.data || res.data.releases);
    });
  }, []);

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
          <div className="align-center">
            {shuffle(Object.keys(SpeakerData))
              .filter(key => SpeakerData[key].featured)
              .map(key => {
                return <Person {...SpeakerData[key]} key={key} />;
              })}
          </div>
          <Link to="/speakers" className="Link">
            See All the Speakers &raquo;
          </Link>
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
        {ticketList
          .filter(t => !t.secret)
          .map(t => {
            const price = (isNaN(t.price) ? '' : '$') + parseInt(t.price, 10);
            const isOnSale = moment.utc().isAfter(moment.utc(t.start_at));
            const label = t.sold_out
              ? 'Sold Out'
              : isOnSale
              ? 'Buy Now'
              : 'Coming Soon';

            return (
              <Card key={t.id} className="TicketCard">
                <h3>{t.title}</h3>
                <p>{t.description}</p>
                <h2>{price}</h2>
                <Button
                  href={constants.Links.TICKET_SALES}
                  disabled={t.sold_out}>
                  {label}
                </Button>
              </Card>
            );
          })}
      </section>
    </div>
  );
};
