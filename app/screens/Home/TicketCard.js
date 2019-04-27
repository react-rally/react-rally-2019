import React from 'react';
import cx from 'classnames';
import constants from 'helpers/constants';
import Button from 'components/Button';

const TicketCard = ({ name, description, price, soldOut }) => {
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
          href={constants.Links.TICKET_SALES}
          disabled={soldOut}>
          {soldOut ? 'Sold Out' : 'Buy Now'}
        </Button>
      </div>
    </div>
  );
};

export default TicketCard;
