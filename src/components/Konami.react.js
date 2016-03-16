import React from 'react';
import ReactPlayer from 'react-player';
import Style from '../style';

const Konami = () =>
  <div className={WRAPPER_STYLE}>
    <div className={GUARD_STYLE} />
    <ReactPlayer
      url='https://www.youtube.com/watch?v=dQw4w9WgXcQ'
      playing={true}
      height="100vh"
      className={VIDEO_STYLE}
      youtubeConfig={{loop: 1}}
    />
  </div>;

const WRAPPER_STYLE = Style.registerStyle({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flex: 1,
});
const VIDEO_STYLE = Style.registerStyle({
  flex: 1,
  height: '100vh',
  zIndex: -2,
});
const GUARD_STYLE = Style.registerStyle({
  position: 'fixed',
  right: 0,
  left: 0,
  top: 0,
  bottom: 0,
  zIndex: -1,
});

export default Konami;
