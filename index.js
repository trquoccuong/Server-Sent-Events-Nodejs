var SSE = require('./libs/sse');

module.exports = function (res,option) {
    var newServerSent = new SSE(res,option);
    return newServerSent;
};
