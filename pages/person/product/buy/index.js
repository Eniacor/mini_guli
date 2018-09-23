const tips = require('../../../../common/tips.js');
const Api = require("../../../../config/method.js");
const Session = require('../../../../common/auth/session');
const WxParse = require('../../../../common/component/wxParse/wxParse.js');
const app =getApp()
Page({
    /**
     * 页面的初始数据
     */
    data: {},
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            id:options.id
        });
        this.handleData();
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
    },
    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {
    },
    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {
    },
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
    },
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
    },
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
    },
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
    },
   
    skipPage:app.skipPage,
    handleData:function(){
        let _this=this;
        Api.Gshow({
            id:_this.data.id
        }).then(({
            data
        }) => {
            console.log(data.detail);

            let article = data.detail;
            WxParse.wxParse('article', 'html', article, _this, 5);
            _this.setData({
                good:data
            });
            resolve();
        }).catch(err => reject(err));
    },
    handleName:function(e){
        if(!e.detail.value){
            tips.showSuccess("请输入收货人姓名");
        }
        this.setData({
            name:e.detail.value
        });
    },
    handleMobile:function(e){
        if(!e.detail.value){
            tips.showSuccess("请输入收货人手机号");
        }
        this.setData({
            mobile:e.detail.value
        });
    },
    handleWchat:function(e){
        if(!e.detail.value){
            tips.showSuccess("请输入收货人手机号");
        }
        this.setData({
            wchat:e.detail.value
        });
    },
    handleAddress:function(e){
        if(!e.detail.value){
            tips.showSuccess("请输入收货人手机号");
        }
        this.setData({
            address:e.detail.value
        });
    },
    handleBuy: function () {
        let session=Session.get();
      
        if(!this.data.name){
            tips.showSuccess("请输入姓名!");
            return;
        }
        if(!this.data.mobile){
            tips.showSuccess("请输入手机号!");
            return;
        }
        var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
        if(this.data.mobile){
            if (!myreg.test(this.data.mobile)) {
                tips.showSuccess("手机格式不正确!");
                return;
            }
        }
        if(!this.data.address){
            tips.showSuccess("请输入地址!");
            return;
        }
        if(!this.data.wchat){
            tips.showSuccess("请输入微信号!");
            return;
        }
       
       
      
        wx.request({
            url: 'https://a.squmo.com/wenbo/Goods/pay',
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            data: {
                uid:session.uid,
                pid:this.data.id,
                openid:session.openid,
                name:this.data.name,
                mobile:this.data.mobile,
                wchat:this.data.wchat,
                address:this.data.address
            },
            method: 'POST', //注意header
            success: function (res) {
                var datas = res.data;
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
   
});
