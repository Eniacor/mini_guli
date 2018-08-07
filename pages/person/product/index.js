const tips = require('../../../common/tips.js');
const Api = require("../../../config/method.js");
const Session = require('../../../common/auth/session')
const app =getApp()
Page({
    /**
     * 页面的初始数据
     */
    data: {
    
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
        Api.Good({}).then(({
            data
        }) => {
            _this.setData({
                good:data
            });
            resolve();
        }).catch(err => reject(err));

        Api.Rgood({}).then(({
            data
        }) => {
            _this.setData({
                rgood:data
            });
            resolve();
        }).catch(err => reject(err));
    },
   
});
