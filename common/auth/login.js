
const Session = require('./session');
const tips = require('../tips');
let logining = false;
let func_arr = [];
let login = (options) => {
    const session = Session.get();
    if (session) {
        wx.checkSession({
            success: function () {
                options.success();
            },
            fail: function () {
                if (func_arr.length == 0) doLogin(options);
                func_arr.push(options.success);
            },
        });
    } else {
        if (func_arr.length == 0) doLogin(options);
        func_arr.push(options.success);
    }
};

let doLogin = (options) => {
    wx.login({
        success: function (res) {
            let { code } = res;
            let data ={code:code}
            apiXcxLogin(options.url, { code }).then(data => {
                Session.set(data.data);
                func_arr.forEach(d => {
                    d();
                })
                func_arr = [];
            }).catch(err => {
                console.error(err);
                options.fail(new Error('用户登录失败，请检查网络状态'));
            })
        },
        fail: function (error) {
            // fail
            console.error(error);
            options.fail(new Error('获取微信用户信息失败，请检查网络状态'));
        }
    })
}

let apiXcxLogin = (url, data) => {
    return new Promise(function (resolve, reject) {
        wx.request({
            url: url,
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            data: data,
            method: 'POST',
            success: function (response) {
                var body = response.data
                if (body.errno == 0) {
                    resolve(body);
                } else {
                    tips.showModel('网络异常', body.errdesc);
                    reject(new Error(body.errdesc));
                }
            },
            fail: function (err) {
                tips.showModel('网络异常', err.errMsg || err)
                reject(err)
            }
        });
    });

}

module.exports = login;