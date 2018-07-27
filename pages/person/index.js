const app =getApp();
const Api = require("../../config/method.js");
const Session = require('../../common/auth/session')
Page({
    data: {
        nickname: '',
        cover: '',
        phone: '',
        level: '',
        bean_nums: '',
        coupon_amount: '',
        ticket_index: '',
        ticket_amount: '',
        loadEnd: false
    },
    onLoad: function (options) {
        // 页面初始化 options为页面跳转所带来的参数
    },
    onReady: function () {
        // 页面渲染完成
    },
    onShow: function () {
        // 页面显示
        this.init();
    },
    onHide: function () {
        // 页面隐藏
    },
    onUnload: function () {
        // 页面关闭
    },
    init: function () {
        let self = this;
        let session = Session.get();
        if (session && session.uid) {
            Api.UserInfo().then(({ data }) => {
                let phone = data.telphone.substr(0, 3) + '****' + data.telphone.substr(7, 4);
                self.setData({
                    uid:session.uid,
                    nickname: data.nickname,
                    cover: data.avatar,
                    phone: phone,
                    level: data.level_consume_str,
                    bean_nums: data.bean_nums,
                    ticket_amount: data.ticket_amount,
                    coupon_amount: data.coupon_amount,
                    ticket_index: data.ticket_index,
                    type:data.type
                })
            });
            //订单个数
            Api.orderTypeCount().then(({data})=>{
                self.setData({
                    orderData:data
                }) 
            })
        } else {
            this.getUserInfo()
                .then(() => self.setData({ loadEnd: true }));
        }
    },
    getUserInfo: function () {
        let self = this;
        return new Promise((resolve, reject) => {
            Api.XcxUserInfo().then(({ errdesc }) => {
                self.setData({
                    nickname: errdesc.nickname,
                    cover: errdesc.avatar
                })
                resolve();
            }).catch(err => reject(err));
        });
    },
    skipPage:app.skipPage,
})
