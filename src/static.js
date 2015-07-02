import App from './index';

export default function(locals, callback) {
    callback(
        React.renderToString(React.createElement(App, locals))
    );
}
