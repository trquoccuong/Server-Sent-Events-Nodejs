var SSE = require('./libs/sse');


module.exports = function (res, options) {
    var newServerSent = new SSE(res, options);
    return newServerSent;
};

module.exports.SSEServer = SSE;
