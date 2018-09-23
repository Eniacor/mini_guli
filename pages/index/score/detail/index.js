const tips = require('../../../../common/tips');
const Api = require('../../../../config/method');
const Session = require('../../../../common/auth/session')
const WxParse = require('../../../../common/component/wxParse/wxParse');
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
        console.log(options.month);
        this.setData({
            id:options.id,
            month:options.month
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
        Api.HighScoreShow({
            id:this.data.id
        }).then(({ data }) => {
            data.addtime=_this.timestampToTime(data.addtime);
            let article =data.content;
            WxParse.wxParse('article', 'html', article, _this, 5);
            _this.setData({
                score:data
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
    timestampToTime:function (timestamp) {
        let date = new Date(timestamp * 1000);
        let Y = date.getFullYear() + '-';
        let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        let D = date.getDate() + ' ';
        let h = date.getHours() + ':';
        let m = date.getMinutes() + ':';
        let s = date.getSeconds();
        return Y+M+D+h+m+s;
    }
});
