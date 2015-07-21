import { h } from '@cycle/web';

const containerStyles = {
    width: '100vw',
    height: '100vh',
    color: '#eee',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
};

export default function view(state) {
    return state.map(({detail, cssColor, mouseColor}) => {
        return (
            <div style={Object.assign({backgroundColor: mouseColor}, containerStyles)}>
                {/*<h1 className='title'>{`Ricky is ${detail}`}</h1>*/}
                <site-header key='site-header'/>
                <links key='links'/>
            </div>
        );
    });
}
