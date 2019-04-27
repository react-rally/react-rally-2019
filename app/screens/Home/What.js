import React from 'react';
import { Link } from 'react-router-dom';
import About from 'components/About';

const What = () => (
  <section className="Home__About">
    <h2>What is React Rally?</h2>
    <About />
    <Link to="/about" className="Link">
      More about React Rally &raquo;
    </Link>
  </section>
);

export default What;
