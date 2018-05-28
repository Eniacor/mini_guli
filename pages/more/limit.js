var app = getApp();
const Session = require('../../common/auth/session');
const tips = require('../../common/tips');
Page({
    data: {
        token: '',
        uid: ''
    },
    onShow: function () {
        this.init();
    },
    onLoad: function () {
        this.init();
    },
    init: function () {
        let session = Session.get();
        let token = session.token;
        let uid = session.uid;
        if (!uid) {
            tips.showAction('系统提示', '您未绑定手机号，需要去绑定手机号码？', () => {
                let url = '/pages/bindPhone/bindPhone?from=' + encodeURIComponent('pages/red/index');
                wx.navigateTo({ url })
            });
        }
        this.setData({
            token: token,
            uid: uid
        })
    },
})