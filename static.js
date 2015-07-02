import App from './src/index';

export default function(locals, callback) {
    callback(
        React.renderToString(React.createElement(App, locals))
    );
}
