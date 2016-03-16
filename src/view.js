import Header from './components/header/header.react';
import Links from './components/links/links.react';
import Konami from './components/konami/konami.react';
import React from 'react';
import Style from './style';

const View = ({backgroundColor, color, isKonami}) =>
  <div style={{display: 'flex'}}>
    <div
      className={Style.join(
        'rv-container',
        BODY_STYLE,
        {[BODY_SECRET_STYLE]: isKonami}
      )}
      style={{backgroundColor, color}}>
      <Header isKonami={isKonami} />
      <Links color={color} isKonami={isKonami} />
    </div>
    {isKonami ? <Konami /> : null}
    <Style.Element />
  </div>;

const TRANSITION_TIME = '1s';
const BODY_STYLE = Style.registerStyle({
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
  justifyContent: 'center',
  MozUserSelect: 'none',
  MsUserSelect: 'none',
  userSelect: 'none',
  WebkitTouchCallout: 'none',
  WebkitUserSelect: 'none',
  width: '100vw',
  transition: `width ${TRANSITION_TIME}`,
});

const BODY_SECRET_STYLE = Style.registerStyle({
  width: '15vw',
});

export default Style.component(View);
