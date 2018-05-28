const Api = require('../../config/method');
const tips = require('../../common/tips.js');
Page({
    data: {
        token: '',
        uid: ''
    },
    onShow: function () {
        this.init();
    },
    onLoad: function () {
        this.init();
    },
    init: function () {
        Api.ticketAmount().then(res => {
            let { data } = res;
            this.setData({
                amount: data
            })
        })
    },
    onTextInput: function (e) {
        let { value } = e.detail;
        this.setData({ num: value });
        return value;
    },
    submitPay: function () {
        let num = this.data.num;
        console.log(num);
        const reg = /(^[1-9]\d*(\.\d{1,2})?$)|(^0(\.\d{1,2})?$)/;

        if (!num) {
            tips.showModel('系统提示', '请输入充值五号券数量');
            return;
        }

        if (!reg.test(num)) {
            tips.showModel('系统提示', '请输入正确格式五号券数量');
            return;
        }

        if (parseFloat(num) < 10) {
            tips.showModel('系统提示', '最少充值10元');
            return;
        }
        Api.addOrder({ price: num, pay_type: 1 }).then(res => {
            console.log('res', res)
            let { data } = res;
            Api.PayCall({ order_id: data, source: 5, type: 4 }).then(({ data }) => {
                console.log('data', data)
                wx.requestPayment({
                    'timeStamp': data.js.timeStamp,
                    'nonceStr': data.js.nonceStr,
                    'package': data.js.package,
                    'signType': 'MD5',
                    'paySign': data.js.paySign,
                    'success': function (res) {
                        tips.showBusy('支付中...');
                        setTimeout(() => {
                            wx.redirectTo({
                                url: '/pages/quan/index'
                            });
                        }, 1900);
                    },
                    'fail': function (res) {
                        wx.redirectTo({
                            url: '/pages/quan/index'
                        })
                    }
                })
            })
        })

    }
})