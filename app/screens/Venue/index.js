import React from 'react';
import moment from 'moment';
import constants from 'helpers/constants';
import Button from 'components/Button';

export default () => {
  return (
    <div className="Venue">
      <section>
        <h2>
          Sheraton Salt Lake City Hotel
          <br />
          <small>150 West 500 South, Salt Lake City, UT, 84101</small>
        </h2>
        <div className="Venue__Details">
          <div className="Venue__Details__Mapbox">
            <a href={constants.Links.VENUE_DIRECTIONS} target="_blank">
              <img src="assets/dist/img/Sheraton_Map.png" width="400" />
            </a>
            <div className="Venue__Details__Mapbox__Address">
              <strong>Sheraton Salt Lake City Hotel</strong>
              <small>150 West 500 South, Salt Lake City, UT, 84101</small>
            </div>
            <Button
              href={constants.Links.HOTEL_RESERVATION}
              className="primary">
              Book a Room
            </Button>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <Button href={constants.Links.VENUE_DIRECTIONS}>
              Get Directions
            </Button>
          </div>
          <div className="Venue__Details__Description">
            <p>
              Sheraton Salt Lake City Hotel is a world class hotel located in
              the heart of the downtown business and entertainment district.
            </p>
            <p>
              We have arranged a group discount with Sheraton Salt Lake City for
              attendees of React Rally. Rooms are available for $
              {constants.Prices.HOTEL_RATE} per night. This discounted rate is
              only available until{' '}
              {moment.utc(constants.Dates.HOTEL_DISCOUNT).format('MMMM Do')} and
              there are a limited number of rooms available, so book your room
              early.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2>The Afterparty</h2>
        <div className="Venue__Details">
          <div className="Venue__Details__Mapbox">
            <a href={constants.Links.PARTY_DIRECTIONS} target="_blank">
              <img src="assets/dist/img/Gateway_Map.png" width="400" />
            </a>
            <div className="Venue__Details__Mapbox__Address">
              <strong>The Gateway</strong>
              <small>
                10 North Rio Grande Street, Salt Lake City, UT, 84101
              </small>
            </div>
            <Button href={constants.Links.PARTY_DIRECTIONS}>
              Get Directions
            </Button>
          </div>
          <div className="Venue__Details__Description">
            <p>
              Join us after the conference on Friday for dinner, dessert, lawn
              games, and live music. Be there!
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
