// pages/search/search.js
const Api = require("../../config/method.js");
const Session = require('../../common/auth/session')
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
         this.init();
    },
    onReady: function() {
        // 页面渲染完成
    },
    onShow: function() {
        // 页面显示
        this.getStorage();
    },
    init: function() {      
        this.hotGoodsSearch();
        this.getStorage();
    },
    getStorage:function(){
        var self = this;
        wx.getStorage({
            key: 'hisGoods',
            success: function(res) {
                let { data } = res;
                data = JSON.parse(data);
                self.setData({
                    hisGoods:data
                })
            } 
          })
    },
    clearHis:function(){
        var self = this;
        wx.removeStorage({
            key: 'hisGoods',
            success: function(res) {
            self.setData({
                hisGoods: ''
            })
            } 
          })
    },
    hotGoodsSearch:function(){
        Api.hotWord().then(res=>{
            let { data } = res;
            this.setData({
                hotGoods:data,
                searchhot:data[0]
            })
        })
    },
    onBack:function(){
        wx.switchTab({url: '/pages/home/index'})
    },
    toSearch:function(e){
        let { item } = e.currentTarget.dataset;
        wx.navigateTo({
            url: `/pages/search/search?keyword=${item}`
        })
    },
    onSearch: function(e) {
        let { keyword,searchhot } = this.data;
         if (keyword == ''){
            keyword=searchhot.hotwords;
         };
         if(keyword=='') return;
         let hisGoods=[];
         if(this.data.hisGoods){
            hisGoods =this.data.hisGoods;     
         }
           hisGoods.push(keyword);
           hisGoods = JSON.stringify(hisGoods)
            wx.setStorage({
                key:"hisGoods",
                data:hisGoods
            })
         wx.navigateTo({
            url: `/pages/search/search?keyword=${keyword}`
        })
    },
    onKeywordInput: function(e) {
        this.setData({
            keyword: e.detail.value
        })
        return e.detail.value
    }
})
