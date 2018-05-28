const Api = require("../../config/method.js");
Page({
    data: {
        show: false
    },
    onLoad: function () {
        this.init();
    },
    onShow: function () {
        this.init();
    },
    init: function () {
        Api.ticketList().then(res => {
            let { data } = res;
            this.setData({
                list: data
            })
        });
    }
})