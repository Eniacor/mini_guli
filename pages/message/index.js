const Api = require("../../config/method.js");
import moment from '../../common/utils/moment'
Page({
    data: {
        page: 1,
        allPage: 0,
        loading: false,
        noData: false,
        allData: false
    },
    onLoad: function (options) {
        // 页面初始化 options为页面跳转所带来的参数
        this.init();
    },
    onReady: function () {
        // 页面渲染完成
    },
    onShow: function () {
        // 页面显示
    },
    onReachBottom: function () {
    },
    init: function () {
        Api.getMessageLists().then(res => {
            let { lists, all_page } = res.data;
            lists = lists.map(d => {
                d.create_time = moment.format(d.create_time, 'YYYY-MM-DD');
                return d;
            });
            this.setData({
                lists: lists
            })
        })
    },
    setMessageread: function (e) {
        let id = e.currentTarget.dataset.id
        Api.setMessageread({ id }).then(res => {
            this.init();
        })
    }
})