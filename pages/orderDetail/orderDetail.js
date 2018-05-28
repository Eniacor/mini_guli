// orderDetail.js
const Api = require('../../config/method');
const orderStatus = require('../../config/orderStatus.config');
const moment = require('../../common/utils/moment');
const orderListStore = require('../../common/store/orderListStore');
const tips = require('../../common/tips');
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
       
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {},
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {   
        this.init();
    },
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
        this.getOrderInfo().then(() => self.setData({ loadEnd: true }));
    },
    getOrderInfo: function() {
        let self = this;
        let { id } = self.data;
        if(id){
            return new Promise((resolve, reject) => {
                Api.OrderInfo({ id }).then(({ data }) => {
                    let { coupon } = data;
                    let coupon_str = '';
                    if (coupon.type == 1) {
                        coupon_str = `立减${parseInt(coupon.price) / 100}元`
                    } else {
                        coupon_str = `满${parseInt(coupon.conditions) / 100}减${parseInt(coupon.price) / 100}元`
                    }
                    data.coupon_str = coupon_str;
                    data.status_str = orderStatus[data.process_status];
                    data.create_time = moment.format(data.create_time, 'YYYY-MM-DD HH:mm:ss');
                    self.setData({ info: data });
                    resolve();
                }).catch(err => reject(err));
            });
        }
   
    },
    onTapPay: function(e) {
        // 去支付
        let self = this;
        let { id } = self.data;
        Api.PayCall({ order_id: id, source: 5 }).then(({ data }) => {
            wx.requestPayment({
                'timeStamp': data.js.timeStamp,
                'nonceStr': data.js.nonceStr,
                'package': data.js.package,
                'signType': 'MD5',
                'paySign': data.js.paySign,
                'success': function(res) {
                    orderListStore.set({
                        is_reload: true
                    });
                    tips.showBusy('支付中...');
                    setTimeout(() => {
                        wx.redirectTo({
                            url: '/pages/order/index'
                        });
                    }, 1900);
                },
                'fail': function(res) {}
            })
        })
    },
    onTapCancelOrder: function(e) {
        // 取消订单
        let self = this;
        let { id } = self.data;
        tips.showConfirm('系统提示', '确认取消订单吗？', () => {
            Api.OrderCancel({ id }).then(({ data }) => {
                orderListStore.set({
                    is_reload: true
                });
                wx.navigateBack();
            });
        })
    },
    onTapApplyBackMoney: function(e) {
        // 申请退款
        let self = this;
        let { id, info } = self.data;
        tips.showConfirm('系统提示', '确认申请退款吗？', () => {
            Api.OrderRefund({ id, remark: '小程序' }).then(({ data }) => {
                info.process_status = data;
                self.setData({ info });
                orderListStore.set({
                    is_reload: true
                });
            })
        });
    },
    onTapExpressInfo: function(e) {
        // 物流信息
        let self = this;
        let { id } = self.data;
        wx.navigateTo({
            url: `/pages/express/express?id=${id}`
        });
    },
    onTapConfirmGet: function(e) {
        // 确认收货
        let self = this;
        let { id } = self.data;
        tips.showConfirm('系统提示', '确认收货吗？', () => {
            Api.OrderGet({ id }).then(({ data }) => {
                info.process_status = data;
                self.setData({ info });
                orderListStore.set({
                    is_reload: true
                });
            });
        });
    },
    onTapApplyBackGoods: function(e) {
        // 申请退货
        let self = this;
        let { id } = self.data;
        tips.showConfirm('系统提示', '确认申请退货吗？', () => {
            Api.OrderRefundGood({ id, remark: '小程序' }).then(({ data }) => {
                info.process_status = data;
                self.setData({ info });
                orderListStore.set({
                    is_reload: true
                });
            });
        });
    },
    onTapWriteEvaluation: function(e) {
        // 撰写评价
        let self = this;
        let { id } = self.data;
        wx.navigateTo({
            url: `/pages/evaluationGoods/evaluationGoods?id=${id}`
        });
    },
    onTapGotoUpExpress: function(e) {
        // 提交物流
        let self = this;
        let { id } = self.data;
        wx.navigateTo({
            url: `/pages/orderBackInfo/orderBackInfo?id=${id}`
        });
    }
})
