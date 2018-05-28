// coupon.js
const Api = require('../../config/method');
const tips = require('../../common/tips');
import moment from '../../common/utils/moment'
Page({
    data: {
        list: {
            av: null,
            used: null,
            expire: null,
        },
        type: 'av',
        code: "",
        loadEnd: false,
        from: '',
        o_id: 0,
        order_price: 0,
        unchecked: false,
        checked: true,
    },
    onLoad: function (options) {
        // 页面初始化 options为页面跳转所带来的参数
        let { from, o_id, order_price, coupon_id } = options;
        console.log('coup', options)
        this.setData({ from, o_id, order_price, coupon_id });
        this.init();
    },
    onReady: function () {
        // 页面渲染完成
    },
    onShow: function () {
        // 页面显示
        // this.init()
    },
    onHide: function () {
        // 页面隐藏
    },
    onUnload: function () {
        // 页面关闭
    },
    init: function () {
        let self = this;
        let { type } = self.data;
        self.getCouponList(type).then(() => self.setData({ loadEnd: true }));
    },

    getCouponList: function (type = null) {
        let self = this;
        let { list, from, order_price } = self.data;
        return new Promise((resolve, reject) => {
            if (type == 'av' && from == 'confirm') {
                Api.CouponAvList({ price: order_price }).then(({ data }) => {
                    data = data.map(d => {
                        d.start_time = moment.format(d.start_time, 'YYYY-MM-DD');
                        d.end_time = moment.format(d.end_time, 'YYYY-MM-DD');
                        return d;
                    });
                    list[type] = data;
                    self.setData({ list });
                    resolve();
                }).catch(err => reject(err));
            } else {
                Api.CouponList({ type }).then(({ data }) => {
                    if (type) {
                        data = data.map(d => {
                            d.start_time = moment.format(d.start_time, 'YYYY-MM-DD');
                            d.end_time = moment.format(d.end_time, 'YYYY-MM-DD');
                            return d;
                        });
                        list[type] = data;
                        self.setData({ list });
                    }
                    resolve();
                }).catch(err => reject(err));
            }
        });
    },
    exchangeCoupon: function ({ code }) {
        return new Promise((resolve, reject) => {
            Api.CouponExchange({ coupon_code: code }).then(({ data }) => {
                resolve();
            }).catch(err => reject(err));
        });
    },
    onTapCouponTap: function (e) {
        let self = this;
        let { type } = e.currentTarget.dataset;
        let { list } = self.data;
        self.setData({ type });
        if (!list[type]) {
            self.setData({ loadEnd: false });
            self.getCouponList(type).then(() => self.setData({ loadEnd: true }));
        }
    },
    onTapExchange: function () {
        let self = this;
        let { code } = self.data;
        if (code == '') {
            tips.showModel('系统提示', '优惠券兑换码不能为空');
            return;
        }
        self.exchangeCoupon({ code }).then(() => {
            tips.showSuccess('优惠券兑换成功');
            self.setData({ code: '' });
            self.getCouponList('av');
        });
    },
    bindCodeInput: function (e) {
        let { value } = e.detail;
        value = value.trim();
        this.setData({ code: value });
        return value;
    },
    onTapSelectCoupon: function (e) {
        let self = this;
        let { type, o_id, from, order_price } = self.data;
        let { id } = e.currentTarget.dataset;
        let coupon_id = this.data.coupon_id;
        if (type != 'av') return;
        if (from != 'confirm') return;
        this.setData({
            checked: !this.data.checked
        })
        if (id != coupon_id) {
            Api.OrderSetCoupon({ id: o_id, coupon_id: id }).then(() => {
                wx.navigateBack();
            });
            return;
        }
        if (!this.data.checked) {
            Api.OrderDelCoupon({ id: o_id, coupon_id: id }).then(() => {
                wx.navigateBack();
            });
        } else {
            Api.OrderSetCoupon({ id: o_id, coupon_id: id }).then(() => {
                wx.navigateBack();
            });
        }
    }
})
