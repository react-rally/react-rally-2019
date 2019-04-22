import React, {Component} from 'react';
import moment from 'moment';

import constants from 'helpers/constants';
import Button from 'components/Button';
import Countdown from 'components/Countdown';

const TICKET_RELEASE_TIME = moment
  .utc(constants.Dates.TICKET_RELEASE)
  .add(14, 'days');

export default class Tickets extends Component {
  componentWillUnmount() {
    clearTimeout(this.__timer);
  }

  render() {
    const ticketsAvailable = moment.utc().isSameOrAfter(TICKET_RELEASE_TIME);

    if (!ticketsAvailable) {
      this.__timer = setTimeout(this.forceUpdate.bind(this), 1000);
    }

    return (
      <div className="Tickets">
        {ticketsAvailable ? (
          <Button href={constants.Links.TICKET_SALES} className="large">
            Register Now
          </Button>
        ) : (
          <Countdown
            date={TICKET_RELEASE_TIME}
            label={`Tickets on sale ${TICKET_RELEASE_TIME.format(
              'MMMM DD, YYYY',
            )}...`}
          />
        )}
      </div>
    );
  }
}
