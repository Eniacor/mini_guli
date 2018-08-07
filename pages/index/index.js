const tips = require('../../common/tips');
const Api = require('../../config/method');
const Session = require('../../common/auth/session')
const app =getApp();
Page({
    /**
     * 页面的初始数据
     */
    data: {
        imgUrls: [
            '../../images/static/banner1.png',
            '../../images/static/banner1.png',
            '../../images/static/banner1.png'
        ],
        indicatorDots:true,
        autoplay:true,
        interval: 5000,
        duration: 1000
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
    changeIndicatorDots: function (e) {
        this.setData({
            indicatorDots: !this.data.indicatorDots
        })
    },
    changeAutoplay: function (e) {
        this.setData({
            autoplay: !this.data.autoplay
        })
    },
    intervalChange: function (e) {
        this.setData({
            interval: e.detail.value
        })
    },
    durationChange: function (e) {
        this.setData({
            duration: e.detail.value
        })
    },
    skipPage:app.skipPage,
    search:function(e){
        let word=e.target.dataset.word;
        let index=e.target.dataset.index;
        console.log(word);
        console.log(index);
    },
    handleData:function(){
        let _this=this;
        Api.HighScoreIndex({}).then(({ data }) => {
            for(let i=0;i<data.length;i++){
                data[i]["title"]=data[i]["title"].slice(0,19)+'...';
            }
            _this.setData({
                score:data
            });
            resolve();
        }).catch(err => reject(err));
    }
});
