import Style from 'react-free-style';
import styleReset from './style/styleReset';
import globalStyle from './style/globalStyle';

const ourStyle = Style.create();

export default ourStyle;

styleReset(ourStyle);
globalStyle(ourStyle);
