const Api = require("../../config/method.js");
const Session = require('../../common/auth/session')
const tips = require('../../common/tips.js');
Page({
    data: {},
    onLoad: function () {
        this.init();
    },
    init: function () {
        let self = this;
        let session = Session.get();
        if (session && session.uid) {
            Api.UserInfo().then(({ data }) => {
                let phone = data.telphone.substr(0, 3) + '****' + data.telphone.substr(7, 4);
                
                self.setData({
                    uid: session.uid,
                    nickname: data.nickname,
                })
            });
        }
    },
    keyname: function (e) {
        let nickname = e.detail.value;
        this.setData({
            nickname: nickname
        })
    },
    changeNickname: function () {
        let nickname = this.data.nickname;
        Api.changeNickname({ nickname }).then(res => {
            wx.navigateBack({ url: '/pages/detail/index' })
        })
    }
})