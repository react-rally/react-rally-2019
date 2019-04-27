import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, Switch} from 'react-router-dom';
import {createBrowserHistory} from 'history';
import App from 'App';
import About from 'screens/About';
import Conduct from 'screens/Conduct';
import Home from 'screens/Home';
import Proposals from 'screens/Proposals';
import Schedule from 'screens/Schedule';
import Speakers from 'screens/Speakers';
import Sponsors from 'screens/Sponsors';
import Stream from 'screens/Stream';
import Venue from 'screens/Venue';
import ga from 'helpers/googleAnalytics';
import styles from './assets/css/styles.scss';

const NotFound = () => {
  return (
    <div className="NotFound">
      <img src="assets/dist/img/icons/t-rex.svg" />
      <h1>Sorry, you're looking for something that no longer exists.</h1>
      <section className="highlight">
        <p>
          But since you're here, why not{' '}
          <a href="https://youtu.be/dQw4w9WgXcQ" target="_blank">
            watch a video
          </a>{' '}
          of our favorite talk from last year?
        </p>
      </section>
    </div>
  );
};

// Fix history
(function() {
  const hash = location.hash;
  const redirect = sessionStorage.redirect;
  delete sessionStorage.redirect;

  // Fix history for redirect coming from gh-pages 404.html
  if (redirect && redirect !== location.href) {
    history.replaceState(null, null, redirect);
  }
  // Fix history for legacy hash history URLs
  else if (hash.trim().length !== 0) {
    history.replaceState(null, null, hash.replace('#', ''));
  }
})();

const history = createBrowserHistory();
ReactDOM.render(
  <Router
    history={history}
    onUpdate={() => {
      window.scrollTo(0, 0);
    }}>
      <App>
        <Switch>
          <Route exact path="/about" component={About} />
          <Route exact path="/conduct" component={Conduct} />
          <Route exact path="/schedule" component={Schedule} />
          <Route exact path="/speakers" component={Speakers} />
          <Route exact path="/sponsors" component={Sponsors} />
          <Route exact path="/stream" component={Stream} />
          <Route exact path="/venue" component={Venue} />
          <Route exact path="/" component={Home} />
          <Route path="*" component={NotFound} />
        </Switch>
      </App>
  </Router>,
  document.getElementById('container'),
);
