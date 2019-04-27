import React from 'react';
import cx from 'classnames';
import moment from 'moment';

const UpcomingDate = ({ timestamp, description }) => {
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
      <img src={iconSource} alt="calendar" />
      <div>
        <time>{date.format('MMMM D, YYYY')}</time>
        <small>{description}</small>
      </div>
    </div>
  );
};

export default UpcomingDate;
