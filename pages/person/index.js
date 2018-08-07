const app = getApp();
const Api = require("../../config/method.js");
const Session = require('../../common/auth/session')
const tips = require('../../common/tips');
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
        this.handleData();
        this.hasSign();
    },
    onReady: function () {
        // 页面渲染完成
    },
    onShow: function () {
        this.handleData();
        this.hasSign();
    },
    onHide: function () {
        // 页面隐藏
    },
    onUnload: function () {
        // 页面关闭
    },
    skipPage: app.skipPage,
    handleData: function () {
        let _this = this;
        let session = Session.get();
        Api.UserInfo({
            openid: session.openid
        }).then(({
            data
        }) => {
            
            console.log(data);
            _this.setData({
                user: data
            });
            resolve();
        }).catch(err => reject(err));
    },
    hasSign: function () {
        let _this=this;
        let session = Session.get();
        let start = new Date(new Date(new Date().toLocaleDateString()).getTime()); 
        let end = new Date(new Date(new Date().toLocaleDateString()).getTime() +24 * 60 * 60 * 1000 -1);
        Api.HasSign({
            start:Date.parse(new Date(start))/1000,
            end:Date.parse(new Date(end))/1000,
            uid:session.uid
        }).then(({
            data
        }) => {
            _this.setData({
                hasSign:data.has
            });
            resolve();
        }).catch(err => reject(err));

    },
    handleSign: function () {
        let session = Session.get();
        Api.Sign({
            uid:session.uid,
            type:1,
        }).then(({
            data
        }) => {
            tips.showSuccess("签到成功!");
            _this.setData({
                hasSign: data.has
            });
            resolve();
        }).catch(err => reject(err));
    },
    onShareAppMessage: function () {
        return {
            title: '文波教育',
            desc: '文波教育',
            // path: '/page/?id=123' // 路径，传递参数到指定页面。
        }
    }
})