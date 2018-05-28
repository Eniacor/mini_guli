const Api = require('../../config/method');
const tips = require('../../common/tips.js');
Page({
    data: {
        token: '',
        uid: '',
        withdraw_type:1
    },
    onShow: function () {
        this.init();
    },
    onLoad: function () {
        this.init();
    },
    init: function () {
        Api.canshWithdraw().then(res => {
            let { can_get } = res;
            this.setData({
                can_get: can_get
            })
        })
    },
    onTextInput: function (e) {
        let { value } = e.detail;
        this.setData({ price: value });
        return value;
    },
    accountInput: function (e) {
        let { value } = e.detail;
        this.setData({ account: value });
        return value;
    },

    radioChange: function (e) {
        let { value } = e.detail;
        this.setData({
            withdraw_type: value
        })
        return value;
    },
    submitDraw: function () {
        let price = this.data.price;
        let account = this.data.account;
        let { withdraw_type } = this.data;
        if(!price){
            tips.showModel('系统提示','请输入兑换数量');
            return;
        }
        if(!account){
          tips.showModel('系统提示','请输入账户');
          return;
        }
        Api.canshConfirm({
            price: price, api_type: 1, account: account, withdraw_type: withdraw_type
        }).then(res => {
            let { server_price } = res;
            tips.showAction('系统提示', '本次提现需扣除手续费:' + server_price + '个5号券,确认提现？', () => {
                Api.canshConfirm({
                    price: price,
                    api_type: 2,
                    account: account,
                    withdraw_type: withdraw_type
                }).then(res => {
                    tips.showSuccess('提现成功');
                    setTimeout(() => {
                        let url = '/pages/quan/index';
                        wx.redirectTo({ url })
                    }, 1500)
                })
            });
        })

    }
})