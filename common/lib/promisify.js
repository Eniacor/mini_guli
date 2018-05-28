var Q = require('./lib/q.min');
module.exports = api => {
    return (options, ...params) => {
        return Q.Promise((resolve, reject) => {
            api(Object.assign({}, options, { success: resolve, fail: reject }), ...params);
        });
    };
};
