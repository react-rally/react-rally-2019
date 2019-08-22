import React from 'react';
import cx from 'classnames';
import moment from 'moment';
import Avatar from 'components/Avatar';
import constants from 'helpers/constants';
import DateUtils from 'helpers/DateUtils';
import scheduleInterval from 'helpers/scheduleInterval';
import ScheduleData from '../../../api/schedule';
import SpeakerData from '../../../api/speakers';

const CONF_DAY_ONE_DATE = moment.utc(constants.Dates.CONF_DAY_ONE);
const CONF_DAY_TWO_DATE = moment.utc(constants.Dates.CONF_DAY_TWO);

function parseTimeString(str) {
  let time = 0;
  let [hour, extra] = str.split(':');
  let [min, period] = extra.split(' ');

  time = parseInt(hour, 10);
  time += parseInt(min, 10) === 30 ? 0.5 : 0;

  if (period.toLowerCase() === 'pm' && time !== 12) {
    time += 12;
  }

  return time;
}

function isNowWithinTimeRange(date, startTime, endTime) {
  const OFFSET = 6;

  let startParsed = parseTimeString(startTime);
  let startHour = Math.floor(startParsed);
  let startMinute = Math.round(startParsed) > startHour ? 30 : 0;
  let endParsed = endTime ? parseTimeString(endTime) : null;
  let endHour = endParsed && Math.floor(endParsed);
  let endMinute = endParsed && Math.round(endParsed) > endHour ? 30 : 0;

  let start = moment
    .utc(date)
    .hour(startHour + OFFSET)
    .minute(startMinute);
  let end = endTime
    ? moment
        .utc(date)
        .hour(endHour + OFFSET)
        .minute(endMinute)
    : moment.utc(start).hour(startHour + 3 + OFFSET);

  return moment.utc().isBetween(start, end);
}

export default class extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // Default showing day two schedule if day two is today
      // TODO this isn't working since switching to moment
      selectedDay: moment.utc().isSame(CONF_DAY_TWO_DATE, 'day')
        ? 'dayTwo'
        : 'dayOne',
    };
  }

  componentDidMount() {
    this.cancelInterval = scheduleInterval(
      this.forceUpdate.bind(this),
      30 * DateUtils.MINUTES,
    );
    this.scrollToActiveSession();
  }

  componentWillUnmount() {
    if (typeof this.cancelInterval === 'function') {
      this.cancelInterval();
      this.cancelInterval = null;
    }
  }

  componentDidUpdate() {
    this.scrollToActiveSession();
  }

  scrollToActiveSession() {
    const activeElement = document.querySelector('.Schedule__Session--active');

    if (activeElement && activeElement !== this.activeElement) {
      this.activeElement = activeElement;

      if (activeElement.scrollIntoView) {
        // Set timeout to run after window.scrollTo being called from onUpdate in Router
        setTimeout(() => {
          activeElement.scrollIntoView({
            block: 'start',
            inline: 'nearest',
            behavior: 'smooth',
          });
        }, 500);
      }
    }
  }

  renderMenu() {
    return (
      <menu className="Schedule__Menu">
        <a
          href="javascript://"
          onClick={this.handleMenuItemClick.bind(this, 'dayOne')}
          className={cx('Schedule__Menu__Item', {
            'Schedule__Menu__Item--active': this.state.selectedDay === 'dayOne',
          })}>
          {CONF_DAY_ONE_DATE.format('dddd, MMMM D')}
        </a>
        <a
          href="javascript://"
          onClick={this.handleMenuItemClick.bind(this, 'dayTwo')}
          className={cx('Schedule__Menu__Item', {
            'Schedule__Menu__Item--active': this.state.selectedDay === 'dayTwo',
          })}>
          {CONF_DAY_TWO_DATE.format('dddd, MMMM D')}
        </a>
      </menu>
    );
  }

  render() {
    let selectedDay =
      this.state.selectedDay === 'dayOne'
        ? CONF_DAY_ONE_DATE
        : CONF_DAY_TWO_DATE;
    let schedule = ScheduleData[this.state.selectedDay];

    return (
      <div className="Schedule">
        {schedule.length > 0 ? (
          <div>
            {this.renderMenu()}
            {schedule.map((session, i) => {
              let speaker = session.speaker
                ? SpeakerData[session.speaker]
                : null;
              let sessionEnd = schedule[i + 1] ? schedule[i + 1].time : null;
              let isActive =
                moment.utc().isSame(selectedDay, 'day') &&
                isNowWithinTimeRange(selectedDay, session.time, sessionEnd);
              return (
                <div
                  className={cx('Schedule__Session', {
                    'Schedule__Session--active': isActive,
                    'Schedule__Session--speaker': speaker,
                    'Schedule__Session--description': session.description,
                  })}
                  key={i}>
                  <time>{session.time}</time>
                  <div className="Schedule__Session__Description">
                    {speaker ? (
                      <div>
                        <h4>{session.title}</h4>
                        <em>{speaker.name}</em>
                        <p
                          dangerouslySetInnerHTML={{
                            __html: (session.description || '').replace(
                              /\n/g,
                              '<br/>',
                            ),
                          }}
                        />
                      </div>
                    ) : (
                      <div>
                        <h4>{session.title}</h4>
                        <p>{session.description}</p>
                      </div>
                    )}
                  </div>
                  <div className="Schedule__Session__Avatar">
                    {speaker && <Avatar url={speaker.avatar} size={55} />}
                  </div>
                </div>
              );
            })}
            {this.renderMenu()}
          </div>
        ) : (
          <div className="align-center">
            <section className="highlight">
              <p>
                We will post the schedule once all proposals have been submitted
                and reviewed. Stay tuned!
              </p>
            </section>
          </div>
        )}
      </div>
    );
  }

  handleMenuItemClick(selectedDay) {
    this.setState(
      {
        selectedDay,
      },
      () => {
        let el = document.querySelector('.Schedule');
        let rect = el.getBoundingClientRect();

        if (rect.top < 0 && el && typeof el.scrollIntoView === 'function') {
          el.scrollIntoView({
            block: 'start',
            behavior: 'smooth',
          });
        }
      },
    );
  }
}
