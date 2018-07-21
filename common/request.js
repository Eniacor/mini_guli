import Promise from './lib/es6-promise.min';
const Session = require('./auth/session');
const loginLib = require('./auth/index');
const tips = require('tips');
const api = require('../config/api.config');
module.exports = function (url, data, method,  options = {}) {
    return new Promise(function (resolve, reject) {
        let session;
        doRequestWithLogin();
        // 登录后再请求
        function doRequestWithLogin() {
            loginLib.login({
                url: api.XcxLogin,
                success: () => {
                    session = Session.get() || {};
                    data = data || {};
                    data.token = session.token || null;
                    if (session.uid) {
                        data.uid = session.uid || null
                    }
                    data.from = data.from || 'xcx';
                    doRequest();
                },
                fail: function (err) {
                    return reject(err)
                }
            });
        }

        function doRequest() {
            wx.request({
                header: {
                    'content-type':'application/x-www-form-urlencoded'
                },
                data: data,
                url: url,
                method: method || 'GET',
                success: function (response) {
                    let body = response.data;
                    console.log(body);
                    if (body.errno == 0) {
                        resolve(body);
                    } else {
                        if (body.errno == 10015) {
                            session = Session.get() || {};
                            if (session.uid) {
                                Session.clear();
                                doRequestWithLogin();
                            } else {
                                let route = getCurrentPages()[0].__route__;
                                let url = '/pages/bindPhone/bindPhone?from=' + encodeURIComponent(route);
                                // if (route == 'pages/order/index') {
                                //     // wx.navigateTo({ url });
                                // } else {
                                //     wx.redirectTo({ url })
                                // }
                            }
                        } else {
                            // tips.showModel('系统提示', url);
                            tips.showModel('系统提示', body.errdesc);
                            reject(new Error(body.errdesc));
                        }
                    }
                },
                fail: function (err) {
                    tips.showModel('网络异常', err.errMsg || err);
                    reject(err)
                }
            });
        }
    })
}
