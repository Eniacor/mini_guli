// orderBackInfo.js
const Api = require('../../config/method');
const orderListStore = require('../../common/store/orderListStore');
Page({
    /**
     * 页面的初始数据
     */
    data: {
        id: 0,
        loadEnd: false,
        website: {},
        express: [],
        index: 0,
        express_code: '',
        remark: ''
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
        Api.HomeWebsite().then(({ data }) => {
            self.setData({ website: data });
            return Api.FuncExpress();
        }).then(({ data }) => {
            self.setData({ express: data });
        }).then(() => {
            self.setData({ loadEnd: true });
        });
    },
    bindPickerChange: function(e) {
        let self = this;
        let { value } = e.detail;
        self.setData({ index: value });
    },
    bindExpressCodeInput: function(e) {
        let { value } = e.detail;
        this.setData({ express_code: value });
        return value
    },
    bindRemarkInput: function(e) {
        let { value } = e.detail;
        this.setData({ remark: value });
        return value
    },
    onTapSubmit: function() {
        let self = this;
        let { id, index, express_code, remark, express } = self.data;
        Api.OrderUpdateRefundInfo({ id, remark, express_code, express_id: express[index].id }).then(() => {
            orderListStore.set({
                is_reload: true
            });
            wx.navigateBack();
        });
    }
})
