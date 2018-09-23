const tips = require('../../../common/tips.js');
const Api = require("../../../config/method.js");
const Session = require('../../../common/auth/session')
const app = getApp()
Page({
    /**
     * 页面的初始数据
     */
    data: {
        num:['零','一','二','三','四','五','六','七','八','九','十'],
        status:0,
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.handleData();
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {},
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {},
    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {},
    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {},
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {},
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {},
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {},
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {},
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {},

    skipPage: app.skipPage,
    handleData: function () {
        let session = Session.get();
        let _this = this;
        Api.VipMember({}).then(({
            data
        }) => {
            _this.setData({
                member: data
            });
            resolve();
        }).catch(err => reject(err));
      
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
    handleBuy: function () {
        let session=Session.get();
        let id=this.data.member[this.data.status].id;
        wx.request({
            url: 'https://a.squmo.com/wenbo/Vip/pay',
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            data: {
                uid:session.uid,
                pid:id,
                openid:session.openid,
            },
            method: 'POST', //注意header
            success: function (res) {
                var datas = res.data;
                console.log(res);
                wx.requestPayment({
                    'timeStamp': datas.data.timeStamp.toString(),
                    'nonceStr': datas.data.nonceStr,
                    'package': datas.data.package,
                    'signType': 'MD5',
                    'paySign': datas.data.sign,
                    'success': function (res) {
                        tips.showSuccess("支付成功!");
                        return;
                    },
                    'fail': function (res) {
                        tips.showSuccess("支付失败!");
                        return;
                    },
                    'complete': function (res) {
                        if (res.errMsg == 'requestPayment:ok') {
                            tips.showSuccess("支付成功!");
                        }
                        return;
                    }
                });
            }
        })
    },
    handleSwitch:function(e){
        this.setData({
            status:e.currentTarget.dataset.status,
            pid:e.currentTarget.dataset.pid
        })
    }
});