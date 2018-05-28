const Api = require('../../config/method');
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
})