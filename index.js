var SSE = require('./libs/sse');

module.exports = function (res) {
    var newServerSent = new SSE(res);
    return newServerSent;
};