import React from 'react';
import TicketCard from './TicketCard';
import tickets from '../../../api/tickets';

const Tickets = () => (
  <section>
    <h2>Tickets</h2>
    {tickets.map((ticket, i) => <TicketCard key={i} {...ticket} />)}
  </section>
);

export default Tickets;
