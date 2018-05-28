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
                    personal_name: data.personal_name,
                    certificate_card: data.certificate_card
                })
            });
        }
    },
    keyname: function (e) {
        let name = e.detail.value;
        this.setData({
            personal_name: name
        })
    },
    keycard: function (e) {
        let card = e.detail.value;
        this.setData({
            personal_card: card
        })
    },

    setCard: function () {
        let personal_name = this.data.personal_name;
        let certificate_card = this.data.personal_card;
        const reg = /^\d{15}|\d{18}$/
        if (!personal_name) {
            tips.showModel('提示', '请输入真实姓名');
            return;
        }
        if (reg.test(certificate_card)) {
            Api.setCard({ personal_name, certificate_card }).then(res => {
                wx.navigateBack({ url: '/pages/detail/index' })
            })
        } else {
            tips.showModel('提示', '请输入正确格式身份证号');
        }

    }
})