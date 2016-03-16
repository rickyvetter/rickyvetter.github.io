import React from 'react';
import Style from '../../style';

const Header = ({isKonami}) =>
  <header
    className={Style.join({
      [HEADER_STYLE]: true,
      [HEADER_STYLE_SMALL]: isKonami,
    })}>
    <h1>Ricky Vetter</h1>
  </header>;

const TRANSITION_TIME = '1s';
const HEADER_STYLE = Style.registerStyle({
  fontSize: '4em',
  transition: `font-size ${TRANSITION_TIME}`,
});
const HEADER_STYLE_SMALL = Style.registerStyle({
  fontSize: '1em',
  transition: `font-size ${TRANSITION_TIME}`,
});

export default Header;
