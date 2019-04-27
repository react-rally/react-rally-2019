import React from 'react';
import {Link} from 'react-router-dom';
import shuffle from 'helpers/shuffle';
import Person from 'components/Person';
import speakers from '../../../api/speakers';

const featuredSpeakers = Object.values(speakers).filter(({ featured }) => featured);

const FeaturedSpeakers = () => 
  featuredSpeakers.length > 0 && (
    <section>
      <h2>Featured Speakers</h2>
      <div className="align-center">
        {shuffle(featuredSpeakers)
          .map(speaker => <Person {...speaker} key={speaker.avatar} />)
        }
      </div>
      <Link to="/speakers" className="Link">
        See All the Speakers &raquo;
      </Link>
    </section>
  );

export default FeaturedSpeakers;
