'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _Routes = require('./Routes');

var _Routes2 = _interopRequireDefault(_Routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//We set up all the components of our router.
const app = (0, _express2.default)();

//We import the routes

app.use(_bodyParser2.default.urlencoded({
    extended: true
}));
app.use(_bodyParser2.default.json());
app.use('/notes', _Routes2.default);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Now listening to port ${port} mate`));
//# sourceMappingURL=app.js.map