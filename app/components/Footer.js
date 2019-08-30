import React from "react";
import constants from "helpers/constants";
import Button from "components/Button";
import Icon from "components/Icon";
import Newsletter from "components/Newsletter";

export default () => {
  return (
    <div className="Footer">
      <div>
        <Newsletter />
      </div>
      <div className="Footer__Grid">
        <div className="Footer__Grid__Left">
          <section>
            <h4>About React Rally</h4>
            <div>
              React Rally is a community conference about React and topics
              interesting to React developers. We focus on a friendly, welcoming
              atmosphere, engaging talks from new and established speakers, and
              plenty of hallway-track time to chat with interesting people. Join
              us!
            </div>
          </section>
          <section>
            <h4>Past Conferences</h4>
            <a href="https://2015.reactrally.com" target="_blank">
              2015
            </a>
            &nbsp;&bull;&nbsp;
            <a href="https://2016.reactrally.com" target="_blank">
              2016
            </a>
            &nbsp;&bull;&nbsp;
            <a href="https://2017.reactrally.com" target="_blank">
              2017
            </a>
            &nbsp;&bull;&nbsp;
            <a href="https://2018.reactrally.com" target="_blank">
              2018
            </a>
          </section>
          <section>
            <h4>Contact</h4>
            <div>
              Get in touch with us at{" "}
              <a href="mailto:team@reactrally.com">team@reactrally.com</a>.
            </div>
          </section>
          <section>
            <Icon href="https://twitter.com/ReactRally" type="twitter" />
            <Icon href="https://github.com/react-rally" type="github" />
            <Icon href="https://instagram.com/reactrally" type="instagram" />
          </section>
          <section>
            &copy; {new Date().getFullYear()}{" "}
            <a href="https://www.trace.events" target="_blank">
              Trace Events, LLC
            </a>
          </section>
        </div>
        <div className="Footer__Grid__Right">
          <section className="Footer__Tickets">
            <h2>Don't lose your spot.</h2>
            <Button
              href={constants.Links.TICKET_SALES}
              className="medium primary"
            >
              Buy Tickets
            </Button>
          </section>
        </div>
      </div>
    </div>
  );
};
