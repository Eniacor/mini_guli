// bindPhone.js
const Api = require('../../config/method');
const auth = require('../../common/auth/index.js');
const api = require('../../config/api.config');
const Session = require('../../common/auth/session');
const orderListStore = require('../../common/store/orderListStore');
Page({
    /**
     * 页面的初始数据
     */
    data: {
        time: 0,
        getCodeTime: 0,
        phone: '',
        code: '',
        from: ''
    },
    timer: null,
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // this.downTime();
        let { from = '' } = options;
        console.log('from',decodeURIComponent(from) )
        this.setData({ from: decodeURIComponent(from) });
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () { },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        this.downTime();
    },
    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {
        if (this.timer) {
            clearInterval(this.timer);
        }
    },
    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {
        if (this.timer) {
            clearInterval(this.timer);
        }
    },
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () { },
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () { },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () { },
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () { },
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () { },
    downTime: function () {
        let self = this;
        this.timer = setInterval(() => {
            let { getCodeTime } = self.data;
            let now = Date.now();
            let t = Math.floor((now - getCodeTime) / 1000);
            if (t > 120) {
                self.setData({ time: 0 });
            } else {
                self.setData({ time: 120 - t });
            }
        }, 1000);
    },
    bindPhoneInput: function (e) {
        let { value } = e.detail;
        this.setData({ phone: value });
        return value;
    },
    bindCodeInput: function (e) {
        let { value } = e.detail;
        this.setData({ code: value });
        return value;
    },
    bindRecommendInput: function (e) {
        let { value } = e.detail;
        this.setData({ recommend: value });
        return value;
    },
    onTapGetCode: function () {
        let self = this;
        let { phone } = self.data;
        Api.UserSendSMT({ telphone: phone }).then(() => {
            self.setData({
                getCodeTime: Date.now()
            });
        });
    },

    onTapBind: function () {
        let self = this;
        let { phone, code, recommend, from } = self.data;
        console.log('phone, code,recommend,from', phone, code, recommend, from)
        Api.UserBind({ telphone: phone, validate_code: code, recommend_code: recommend }).then(({ data }) => {
            console.log('data', data)
            Session.set(data);                     
            if (from == 'pages/order/index') {
                orderListStore.set({ is_reload: true });
            }
            wx.switchTab({ url: '/pages/home/index' });
            // wx.navigateBack();
        });
    }
})
