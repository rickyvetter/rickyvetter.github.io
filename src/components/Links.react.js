import {resumeLinks, reachMeLinks} from './linkData';
import React from 'react';
import Style from '../style';

const PROTOCOL = '//';

const Link = ({color, link}) =>
  <li>
    <a
      className={LINK_STYLE}
      href={PROTOCOL + link.href}
      style={{color}}
      target="_blank">
      {`:${link.text}:`}
    </a>
  </li>;

const Links = (props) =>
  <div className={Style.join({[LIST_CONTAINER_STYLE]: !props.isKonami})}>
    <ul
      className={Style.join(
        LIST_STYLE,
        {[LIST_SECRECT_STYLE]: props.isKonami}
      )}>
      {resumeLinks.map((link) =>
        <Link {...props} key={link.href} link={link} />)}
    </ul>
    <ul
      className={Style.join(
        LIST_STYLE,
        {[LIST_SECRECT_STYLE]: props.isKonami}
      )}>
      {reachMeLinks.map((link) =>
        <Link {...props} key={link.href} link={link} />)}
    </ul>
  </div>;

const LIST_CONTAINER_STYLE = Style.registerStyle({width: '20rem'});
const LIST_STYLE = Style.registerStyle({
  display: 'flex',
  fontSize: '1rem',
  WebkitJustifyContent: 'space-around',
  justifyContent: 'space-around',
  marginTop: '20px',
  flexDirection: 'row',
});
const LIST_SECRECT_STYLE = Style.registerStyle({
  flexDirection: 'column',
});
const LINK_STYLE = Style.registerStyle({
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'underline',
  },
});

export default Links;
