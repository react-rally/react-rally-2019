import React from 'react';
import moment from 'moment';
import UpcomingDate from './UpcomingDate';
import constants from 'helpers/constants';

const {Dates} = constants;

const dates = [
  [Dates.CFP_OPEN, 'Call for Proposals opens.'],
  [Dates.CFP_CLOSE, 'Call for Proposals closes.'],
  [Dates.TICKET_RELEASE, 'Early Bird Tickets (round one) go on sale.'],
  [moment.utc(Dates.TICKET_RELEASE).add(7, 'days'), 'Early Bird Tickets (round two) go on sale.'],
  [moment.utc(Dates.TICKET_RELEASE).add(14, 'days'), 'Standard tickets go on sale.'],
];

const UpcomingDates = () => (
  <section>
  <h2>Upcoming Dates</h2>
  {dates.map(
    ([timestamp, description]) => <UpcomingDate timestamp={timestamp} description={description}/>
  )}
  </section>
);

export default UpcomingDates;
