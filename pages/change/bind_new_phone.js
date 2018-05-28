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
                    telphone: phone,
                })
            });
        }
    }
})