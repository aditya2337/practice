import React from 'react';

const Header = ({ label }) => (
  <header className="bg-white black-80 tc pv4 avenir w-100 mt5">
    <a href="https://gethyphen.com/" className="bg-black-80 ba b--black dib pa3 w2 h2 br-100" />
    <h1 className="mt2 mb0 baskerville i fw1 f1">Hyphen Assignment</h1>
    <h2 className="mt2 mb0 f6 fw4 ttu tracked">{label}</h2>
  </header>
);

export default Header;
