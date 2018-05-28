// pages/goodList/goodList.js
const Api = require("../../config/method.js");
Page({
    data: {
        id: 0,
        list: [],
        order: 2,
        page: 1,
        allPage: 0,
        loading: false,
        noData: false,
        allData: false
    },
    onLoad: function(options) {
        // 页面初始化 options为页面跳转所带来的参数
        let { id } = options;
        this.setData({
            id
        });
        this.init();
    },
    onReady: function() {
        // 页面渲染完成
    },
    onShow: function() {
        // 页面显示
    },
    onHide: function() {
        // 页面隐藏
    },
    onReachBottom: function() {
        this.getGoodsByClassify();
    },
    onUnload: function() {
        // 页面关闭
    },
    init: function() {
        this.getGoodsByClassify();
    },
    getGoodsByClassify: function() {
        let self = this;
        let { id, order, page, allPage, loading, noData, allData, list } = this.data;
        if (loading || noData || allData) return;
        self.setData({ loading: true });
        return new Promise((resolve, reject) => {
            Api.GoodsList({
                    pid: id,
                    page,
                    order
                }).then(({ data }) => {
                    console.log('data',data)
                    let { good, all_page } = data;
                    console.log('good',good)
                    console.log('all_page',all_page)
                    if (all_page == 0) {
                        self.setData({ noData: true });
                        return;
                    }
                    if (page == all_page) {
                        self.setData({ allData: true });
                    }
                    console.log('list',list)
                    let l = [...list, ...good];
                    page++;
                    self.setData({
                        list: l,
                        page
                    });
                    resolve();
                }).catch(err => reject(err))
                .then(() => self.setData({ loading: false }));
        })
    },
    onChangeOrder: function(e) {
        let { type } = e.currentTarget.dataset;
        let { order } = this.data;
        if (type == 1) {
            if (order == 2) return;
            order = 2;
        } else if (type == 3) {
            if (order == 5) return;
            order = 5;
        } else {
            if (order == 3 || order == 4) {
                order = order == 3 ? 4 : 3;
            } else {
                order = 3
            }
        }
        this.setData({
            list: [],
            order,
            page: 1,
            allPage: 0,
            loading: false,
            noData: false,
            allData: false
        });
        this.getGoodsByClassify();
    }
})
