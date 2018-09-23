const tips = require('../../../../common/tips.js');
const Api = require("../../../../config/method.js");
const Session = require('../../../../common/auth/session')
const app = getApp()
Page({
    /**
     * 页面的初始数据
     */
    data: {
        code:null
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
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
    handleData:function(e){
        let _this = this;
        if(this.data.code==null){
            tips.showSuccess("请输入兑换码!");
            return;
        }
        Api.VipExchange({
            code:this.data.code
        }).then((
            data
        ) => {
            tips.showSuccess(data.errdesc);
            setTimeout(()=>{
                wx.navigateTo({url: '/pages/person/member/index'});
            },1000);
            resolve();
        }).catch(err => reject(err));
    },
    handleCode:function(e){
        this.setData({
            code:e.detail.value
        });
    }

});
