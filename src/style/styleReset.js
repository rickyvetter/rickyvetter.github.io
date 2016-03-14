/*
 * @providesModule styleReset
 */

// http://meyerweb.com/eric/tools/css/reset/
export default function styleReset(Style) {
  Style.registerRule(
    'html,body,div,span,applet,object,iframe,h1,h2,h3,h4,h5,h6,p,blockquote,pre,a,abbr,acronym,address,big,cite,code,del,dfn,em,img,ins,kbd,q,s,samp,small,strike,strong,sub,sup,tt,var,b,u,i,center,dl,dt,dd,ol,ul,li,fieldset,form,label,legend,table,caption,tbody,tfoot,thead,tr,th,td,article,aside,canvas,details,embed,figure,figcaption,footer,header,hgroup,menu,nav,output,ruby,section,summary,time,mark,audio,video',
    {
      margin: 0,
      padding: 0,
      border: 0,
      fontSize: '100%',
      font: 'inherit',
      verticalAlign: 'baseline',
    }
  );
  /* HTML5 display-role reset for older browsers */
  Style.registerRule(
    'article,aside,details,figcaption,figure,footer,header,hgroup,menu,nav,section',
    {display: 'block'},
  );
  Style.registerRule('body', {lineHeight: 1});
  Style.registerRule('ol, ul', {listStyle: 'none'});
  Style.registerRule('blockquote, q', {quotes: 'none'});
  Style.registerRule(
    'blockquote:before,blockquote:after,q:before,q:after',
    {content: ['', 'none']},
  );
  Style.registerRule('table', {borderCollapse: `collapse`, borderSpacing: 0});

  Style.registerRule('body', {
    fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
    padding: 0,
    margin: 0,
  });
}
