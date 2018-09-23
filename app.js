const auth = require('./common/auth/index.js');
const api = require('./config/api.config');
const Session = require('./common/auth/session');
App({
    onLaunch: function () {
        Session.clear();
        auth.login({
            url: api.XcxLogin,
            success() {},
            fail() {},
        });
    },
    onShow: function (options) {
        console.log(options);
    },
    onHide: function () {},
    getUserInfo: function (cb) {},
    globalData: {
        userInfo: null
    },
    skipPage: function (e) {
        let{url,type}=e.currentTarget.dataset;
        console.log("klkk");
        switch (Number(type)) {
            case 0:
                wx.navigateTo({
                    url: url
                }) //保留当前页面，跳转到应用内的某个页面，使用wx.navigateBack可以返回到原页面。
                break;
            case 1:
                wx.redirectTo({
                    url: url
                }) //关闭当前页面，跳转到应用内的某个页面。
                break;
            case 2:
                wx.reLaunch({
                    url: url
                }) //关闭所有页面，打开到应用内的某个页面。
                break;
            case 3:
                wx.switchTab({
                    url: url
                }) //跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面。
                break;
            case 4:
                wx.redirectTo({
                    url: url
                }) //关闭当前页面，跳转到应用内的某个页面。
                break;
            case 5:
                wx.navigateBack({
                    delta: url
                }) //关闭当前页面，返回上一页面或多级页面。可通过 getCurrentPages()) 获取当前的页面栈，决定需要返回几层。
                break;
            default:
                console.log("我这儿等你");
        }
    },
    getQueryString: function (name) {
        let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        let r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    },
})