const Api = require("../../config/method.js");
const Session = require('../../common/auth/session')
Page({
    data: {
        show: false
    },
    onLoad: function () {
        this.init();
    },
    onShow: function () {
        this.init();
    },
    init: function () {
        let self = this;
        let session = Session.get();
        console.log('session is', session)
        if (session && session.uid) {
            Api.UserInfo().then(({ data }) => {
                console.log('data', data)
                let phone = data.telphone.substr(0, 3) + '****' + data.telphone.substr(7, 4);
                self.setData({
                    uid: session.uid,
                    nickname: data.nickname,
                    cover: data.avatar,
                    phone: phone,
                    gender: data.gender,
                    certificate_card: data.certificate_card,
                    level: data.level_consume_str,
                    bean_nums: data.bean_nums,
                    ticket_amount: data.ticket_amount,
                    coupon_amount: data.coupon_amount,
                    ticket_index: data.ticket_index,
                })
            });
        }
    },
    selectSex: function (e) {
        let gender = e.currentTarget.dataset.gender;
        Api.setSex({ gender }).then(res => {
            this.setData({
                show: false
            })
            this.init();
        })
    },
    setSex: function () {
        this.setData({
            show: true
        })
    }
})