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
        loadEnd: false,
        hasSign:0,
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
            if(data.vip_deadline*1000>=(new Date()).valueOf()){
                data.vipstatus=1;
            }else{
                data.vipstatus=0;
            }
            _this.setData({
                user: data
            });
            resolve();
        }).catch(err => reject(err));
    },
    hasSign: function () {
        let _this=this;
        let session = Session.get();
        Api.HasSign({
            type:1,
            uid:session.uid
        }).then((
            data
        ) => {
            _this.setData({
                hasSign:data.errdesc
            });
            resolve();
        }).catch(err => reject(err));
    },
    handleSign: function () {
        let _this=this;
        let session = Session.get();
        Api.Sign({
            uid:session.uid,
            type:1,
        }).then((
            data
        ) => {
            tips.showSuccess(data.errdesc);
            _this.hasSign();
            _this.handleData();
            resolve();
        }).catch(err => reject(err));
    },
    onShareAppMessage: function () {
        return {
            title: '文波教育',
            desc: '文波教育',   
            imageUrl: "/images/static/p4c.png",
            path: '/pages/index/index'
        }
    }
})