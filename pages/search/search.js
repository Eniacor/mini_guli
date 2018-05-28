// pages/search/search.js
const Api = require("../../config/method.js");
Page({
    data: {
        list: [],
        order: 2,
        page: 1,
        allPage: 0,
        loading: false,
        noData: false,
        allData: false,
        keyword: ''
    },
    onLoad: function(options) {
        // 页面初始化 options为页面跳转所带来的参数
         let { keyword } = options;
         console.log('keyword',keyword)
         this.setData({ keyword: keyword});
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
    onUnload: function() {
        // 页面关闭
    },
    onReachBottom: function() {
        this.getGoodsSearch();
    },
    init: function() {
        this.getGoodsSearch();
    },
    getGoodsSearch: function() {
        let self = this;
        let { keyword, order, page, allPage, loading, noData, allData, list } = this.data;
        if (loading || noData || allData) return;
        self.setData({ loading: true });
        return new Promise((resolve, reject) => {
            Api.GoodsSearch({
                    word: keyword,
                    page,
                    order
                }).then(({ data }) => {
                    let { good, all_page } = data;
                    if (all_page == 0) {
                        self.setData({ noData: true });
                        return;
                    }
                    if (page == all_page) {
                        self.setData({ allData: true });
                    }
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
        this.getGoodsSearch();
    },
    onSearch: function() {
        let { keyword } = this.data;
         if (keyword == '') return;
        this.setData({
            list: [],
            order: 2,
            page: 1,
            allPage: 0,
            loading: false,
            noData: false,
            allData: false,
            keyword
        });
        this.getGoodsSearch();
    },
    onKeywordInput: function(e) {
        this.setData({
            keyword: e.detail.value
        })
        return e.detail.value
    }
})
