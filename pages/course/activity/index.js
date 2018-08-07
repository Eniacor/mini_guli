const tips = require('../../../common/tips');
const Api = require('../../../config/method');
var app = getApp();
Page({
    data: {
        token: '',
        uid: '',
        status: true,
        page: 1,
        list: [],
    },
    onShow: function () {},
    onLoad: function () {
        this.handleData();
    },
    onPullDownRefresh: function () {
        let page=this.data.page;
        page++;
        this.setData({
            page:page
        });
        this.handleData();
        wx.stopPullDownRefresh()
    },
    handleData: function () {
        let _this = this;
        Api.Activity({
            page: _this.data.page,
            per_page: 20,
        }).then(({
            data
        }) => {
            if (data) {
                for (let i = 0; i < data.length; i++) {
                    data[i].activity_time = _this.timestampToTime(data[i].activity_time).slice(0, 10);
                }
            }
            data = _this.data.list.concat(data);
            _this.setData({
                list: data
            });
            resolve();
        }).catch(err => reject(err));
    },
    skipPage: app.skipPage,
    timestampToTime: function (timestamp) {
        let date = new Date(timestamp * 1000);
        let Y = date.getFullYear() + '-';
        let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        let D = date.getDate() + ' ';
        let h = date.getHours() + ':';
        let m = date.getMinutes() + ':';
        let s = date.getSeconds();
        return Y + M + D + h + m + s;
    }
})