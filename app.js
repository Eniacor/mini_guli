//const auth = require('./common/auth/index.js');
const api = require('./config/api.config');
const Session = require('./common/auth/session');
App({
    onLaunch: function() {
        // Session.clear();
        // auth.login({
        //     url: api.XcxLogin,
        //     success() {},
        //     fail() {}
        // });
    },
    onShow: function(options) {
        console.log(options);
    },
    onHide: function() {},
    getUserInfo: function(cb) {},
    globalData: {
        userInfo: null
    }
})
