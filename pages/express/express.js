// express.js
const Api = require('../../config/method');
Page({
    /**
     * 页面的初始数据
     */
    data: {
        id: 0,
        loadEnd: false,
        info: {}
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        let { id } = options;
        this.setData({ id });
        this.init();
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {},
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {},
    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {},
    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {},
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {},
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {},
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {},
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {},
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {},
    init: function() {
        let self = this;
        let { id } = self.data;
        Api.OrderExpress({ id }).then(({ data }) => {
            self.setData({ info: data, loadEnd: true });
        });
    }
})
