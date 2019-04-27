import React, {Component, useState} from 'react';
import cx from 'classnames';
import {Route, NavLink} from 'react-router-dom';
import moment from 'moment';
import constants from 'helpers/constants';
import DateUtils from 'helpers/DateUtils';
import Button from 'components/Button';
import Countdown from 'components/Countdown';
import Tickets from 'components/Tickets';
import Icon from 'components/Icon';
import Newsletter from 'components/Newsletter';

const CONF_DATES_DISPLAY =
  moment.utc(constants.Dates.CONF_DAY_ONE).format('MMMM D') +
  '-' +
  moment.utc(constants.Dates.CONF_DAY_TWO).format('D, YYYY');

const HomeHeader = () => {
  const isHotelAvailable = true;
  const isConferenceLive = moment
    .utc()
    .isSameOrAfter(moment.utc(constants.Dates.CONF_DAY_ONE));
  const isCFPOpen = moment
    .utc()
    .isBetween(
      moment.utc(constants.Dates.CFP_OPEN),
      moment.utc(constants.Dates.CFP_CLOSE),
    );

  return (
    <div className="Home__Header">
      <div className="Home__Header__Wrapper">
        <img src="assets/dist/img/ReactLogo.svg" width="100" height="100" />
        <div className="Home__Header__Content">
          <h1>React Rally</h1>
          <h2>{CONF_DATES_DISPLAY}</h2>
          <h2>Salt Lake City, UT</h2>
          <p>
            Facebook's React has taken client side development by storm. From
            single-page apps, to server rendering, to native mobile, to apps on
            your TV, React is everywhere. Come hear from the best and the
            brightest in the React community about what makes it so incredible.
          </p>
          <div className="Home__Header__Buttons">
            {isConferenceLive ? (
              <NavLink to="/stream" className="Button large">
                Watch Live Stream
              </NavLink>
            ) : false ? (
              <Countdown
                date={new Date(
                  Date.parse(constants.Dates.CONF_DAY_ONE) +
                    DateUtils.HOURS * 9,
                ).toISOString()}
                label="Live stream coming soon"
              />
            ) : (
              <span>
                <Tickets />
                &nbsp;&nbsp;&nbsp;&nbsp;
                {isCFPOpen && (
                  <span>
                    <Button
                      href={constants.Links.PROPOSAL_FORM}
                      className="large primary">
                      Submit Proposal
                    </Button>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                  </span>
                )}
              </span>
            )}
            {isHotelAvailable && (
              <Button
                href={constants.Links.HOTEL_RESERVATION}
                className="large transparent">
                Book Hotel
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const navItems = [
  ['Speakers', '/speakers'],
  ['Schedule', '/schedule'],
  ['Venue', '/venue'],
  ['Sponsors', '/sponsors'],
  ['Conduct', '/conduct'],
  ['About', '/about'],
];

const Navigation = ({onMenuClick}) => {
  return (
    <div className="Header__Nav">
      <section className="Header__Nav__Menu">
        <NavLink to="/" id="logo" onClick={() => onMenuClick(false)}>
          <img src="assets/dist/img/ReactLogo.svg" width="44" height="44" />
        </NavLink>
        <ul>
          {navItems.map(([children, url]) =>
            <li key={url}>
              <NavLink
                activeClassName="active"
                to={url}
                onClick={() => onMenuClick(false)}>
                {children}
              </NavLink>
            </li>
          )}
        </ul>
      </section>
      <section className="Header__Nav__Social">
        <Icon href="https://twitter.com/ReactRally" type="twitter" />
        <Icon href="https://github.com/react-rally" type="github" />
        <Icon href="https://instagram.com/reactrally" type="instagram" />
        <Button href={constants.Links.TICKET_SALES} className="medium">
          Tickets
        </Button>
      </section>
      <button className="Header__Nav__Button" onClick={() => onMenuClick()}>
        <div className="Header__Nav__Button__Hamburger" />
        <div className="Header__Nav__Button__X">&times;</div>
      </button>
    </div>
  );
};

const Header = ({ isHomeScreen }) => {
  const [isMenuOpen, setMenuState] = useState(false);

  return (
    <header className={cx('Header', {
      Header__Home: isHomeScreen,
      'Header--menuOpen': isMenuOpen,
    })}>
      <Navigation onMenuClick={() => setMenuState(s => !s)} />
      {isHomeScreen && <HomeHeader />}
    </header>
  )
}

const HeaderRoute = () => (
  <Route
    path="/"
    render={({ match }) =><Header isHomeScreen={match.isExact}/>}
  />
);


export default HeaderRoute;
