// orderConfirm.js
const Api = require('../../config/method');
const orderListStore = require('../../common/store/orderListStore');
const tips = require('../../common/tips');

Page({
    data: {
        id: 0,
        loadEnd: false,
        remark: '',
        showFlag: true,
        actualPrice: '',
        quanChecked: false,
        douChecked: false
    },
    onLoad: function (options) {
        // 页面初始化 options为页面跳转所带来的参数
        let { id } = options;
        this.setData({ id });
        this.init();
    },
    onReady: function () {
        // 页面渲染完成
    },
    onShow: function () {
        // 页面显示
        if (!this.data.showFlag) {
            return;
        }
        this.init();
    },
    onHide: function () {
        // 页面隐藏
    },
    onUnload: function () {
        // 页面关闭
    },
    init: function () {
        let self = this;
        self.getOrderPerpareInfo().then(() => self.setData({ loadEnd: true }));
    },
    getOrderPerpareInfo: function () {
        let self = this;
        let { id } = self.data;
            return new Promise((resolve, reject) => {
                Api.OrderPerpareInfo({ id }).then(({ data }) => {
                    let { coupon } = data;
                    let coupon_str = '';
                    if (coupon.type == 1) {
                        coupon_str = `立减${parseInt(coupon.price) / 100}元`
                    } else {
                        coupon_str = `满${parseInt(coupon.conditions) / 100}减${parseInt(coupon.price) / 100}元`
                    }
                    data.coupon_str = coupon_str;
                    if (data.ship_address.telphone) {
                        data.ship_address.telphone = data.ship_address.telphone.substr(0, 3) + '****' + data.ship_address.telphone.substr(7, 4);
                    }
                    self.setData({
                        info: data
                    });
                    resolve();
                }).catch(err => reject(err));
            })
    },
    bindRemarkInput: function (e) {
        let { value } = e.detail;
        this.setData({ remark: value });
        return value
    },
    //五号券
    selectQuanChange: function (e) {
        let self = this;
        let ticket_price = this.data.info.ticket.canuse_price;
        let { id } = this.data.info;
        if (e.detail.value == true) {
            Api.orderSetticket({ id, ticket_price }).then((data) => {
                self.init();
            })
        } else {
            Api.orderDelticket({ id }).then((data) => {
                self.init();
            })
        }
    },
    //五号豆
    selectDouChange: function (e) {
        let self = this;
        let bean_num = this.data.info.bean.canuse_num;
        let { id } = this.data.info;
        if (e.detail.value == true) {
            Api.orderSetbean({ id, bean_num }).then(() => {
                self.init();
            })
        } else {
            Api.orderDelbean({ id }).then(() => {
                self.init();
            })
        }


    },
    //去付款
    onTapSubmit: function (e) {
        let self = this;
        let { id, remark } = self.data;
        remark = (remark == '') ? '无' : remark;
        Api.OrderUpdateRemark({ id, remark }).then(() => {
            return Api.OrderUpdatePayMethod({ type: 1, id });
        }).then(() => {
            return Api.OrderCreate({ id });
        }).then(({ not_to_pay }) => {
            orderListStore.set({ is_reload: true });
            if (not_to_pay == 1) {
                wx.switchTab({ url: '/pages/order/index' });
            } else {
                self.setData({
                    showFlag: false
                })
                Api.PayCall({ order_id: id, source: 5 }).then(({ data }) => {
                    wx.requestPayment({
                        'timeStamp': data.js.timeStamp,
                        'nonceStr': data.js.nonceStr,
                        'package': data.js.package,
                        'signType': 'MD5',
                        'paySign': data.js.paySign,
                        'success': function (res) {
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
                        'fail': function (res) {
                            wx.redirectTo({
                                url: `/pages/orderDetail/orderDetail?id=${id}`
                            });
                            self.setData({
                                showFlag: true
                            })
                        }
                    })
                })
            }
        })
    },
    onPay: function (argument) { }
})
