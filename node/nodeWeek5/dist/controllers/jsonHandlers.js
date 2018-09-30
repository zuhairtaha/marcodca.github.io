'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getJSON = getJSON;
exports.updateJSON = updateJSON;

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const url = 'http://api.jsonbin.io/b/5bacd7188713b17b52b01398';

async function getJSON() {
    const prom = new Promise((resolve, reject) => {
        (0, _request2.default)(url + "/latest", function (error, response, body) {
            resolve(body);
        });
    });
    const final = await prom;
    return JSON.parse(final);
}

function updateJSON(update) {
    const send = { data: [...update] };
    (0, _request2.default)({
        headers: {
            "Content-type": "application/json",
            "versioning": false
        },
        uri: url,
        method: "PUT",
        json: send
    }, function (error, response, body) {
        if (error) console.log(error);
        console.log(body);
    });
}
//# sourceMappingURL=jsonHandlers.js.map