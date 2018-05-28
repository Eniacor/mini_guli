// pages/classify/index.js
const Api = require("../../config/method.js");
Page({
    data: {
        loadEnd: false,
        list: [],
        selectIndex: 0
    },
    onLoad: function(options) {
        // 页面初始化 options为页面跳转所带来的参数
        // this.init();
    },
    onReady: function() {
        // 页面渲染完成
    },
    onShow: function() {
        // 页面显示
        this.init();
    },
    onHide: function() {
        // 页面隐藏
    },
    onUnload: function() {
        // 页面关闭
    },
    init: function() {
        let self = this;
        this.getAllClassify().then(() => {
            self.setData({ loadEnd: true });
        })
    },
    getAllClassify: function() {
        let self = this;
        return new Promise((resolve, reject) => {
            Api.GoodsAllClassify().then(data => {
                console.log(data);
                self.setData({
                    list: data.data
                });
                resolve();
            }).catch(err => reject(err));
        })
    },
    onSelectFClassify: function(e) {
        this.setData({
            selectIndex: e.currentTarget.dataset.index
        })
    }
})
