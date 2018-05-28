// about.js
const Api = require('../../config/method');
const WxParse = require('../../common/component/wxParse/wxParse');
Page({
    /**
     * 页面的初始数据
     */
    data: {
        info: {},
        loadEnd: false,
        desc: null
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.init();
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
    init: function () {
        let self = this;
        Api.HomeAbout().then(({ data }) => {
            // company_info
            try {
                WxParse.wxParse('desc', 'html', data.company_info, self);
            } catch (e) {
                console.log(e);
                WxParse.wxParse('desc', 'html', '<div style="text-align:center;font-size:15px; color:#959595; padding:15px 0 50px; background-color:#ffffff;margin-top:5px;">数据错误，请联系商家。</div>', self);
            }
            self.setData({ loadEnd: true, info: data });
        }).catch(err => console.err(err));
    }
});
