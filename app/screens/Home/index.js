import React from 'react';
import What from './What';
import FeaturedSpeakers from './FeaturedSpeakers';
import Tickets from './Tickets';
import UpcomingDates from './UpcomingDates';

const Home = () => (
  <div className="Home">
    <What />
    <FeaturedSpeakers />
    <UpcomingDates />
    <Tickets />
  </div>
);

export default Home;
