import { h } from '@cycle/web';

const containerStyles = {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    WebkitFlexDirection: 'column',
    WebkitJustifyContent: 'center',
    WebkitAlignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
};
const themeColor = document.querySelector('meta[name=theme-color]');

export default function view(state) {
    return state.map(({color, backgroundColor}) => {
        var computedContainerStyles = Object.assign(
            {},
            containerStyles,
            {
                backgroundColor,
                color
            }
        );
        // also set meta color
        themeColor.content = backgroundColor;

        return (
            <div className='rv-container' style={computedContainerStyles}>
                <site-header key='site-header'/>
                <links key='links' color={color}/>
            </div>
        );
    });
}
