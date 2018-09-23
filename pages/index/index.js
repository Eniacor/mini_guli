const tips = require('../../common/tips');
const Api = require('../../config/method');
const Session = require('../../common/auth/session')
const app =getApp();
Page({
    /**
     * 页面的初始数据
     */
    data: {
        imgUrls: [],
        indicatorDots:true,
        autoplay:true,
        interval: 5000,
        duration: 1000
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.handleData();
        if (wx.canIUse('loadFontFace')) {
            console.log("支持自定义字体");
            wx.loadFontFace({
              family: 'mini',
              source: 'url("https://cdn.caomall.net/15355991221772607881.ttf")',
              success: function(res) {
                console.log("字体加载成功") //  loaded
              },
              fail: function(res) {
                console.log("字体加载失败") //  error
              },
              complete: function(res) {
                console.log("加载完成");
              }
            });
          } else {
            console.log('不支持自定义字体')
          }
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
       
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
    },
    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {
    },
    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {
    },
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
    },
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
    },
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
    },
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
    },
    changeIndicatorDots: function (e) {
        this.setData({
            indicatorDots: !this.data.indicatorDots
        })
    },
    changeAutoplay: function (e) {
        this.setData({
            autoplay: !this.data.autoplay
        })
    },
    intervalChange: function (e) {
        this.setData({
            interval: e.detail.value
        })
    },
    durationChange: function (e) {
        this.setData({
            duration: e.detail.value
        })
    },
    skipPage:app.skipPage,
    search:function(e){
        let word=e.target.dataset.word;
        let index=e.target.dataset.index;
        console.log(word);
        console.log(index);
    },
    handleData:function(){
        let _this=this;
        Api.HighScoreIndexh({}).then(({ data }) => {
            for(let i=0;i<data.length;i++){
                if(_this.strLength(data[i].title)>19){
                    data[i].title=data[i].title.slice(0,19)+'...';
                }
            }
            _this.setData({
                score:data
            });
            resolve();
        }).catch(err => reject(err));
        Api.Banner({
            type:1,
        }).then(({ data }) => {
            console.log(data);
            _this.setData({
                imgUrls:data
            });
            resolve();
        }).catch(err => reject(err));

        //   wx.loadFontFace({
        //     family: 'jianxin',
        //     source: 'url("https://a.squmo.com/wenbo")',
        //     success: function(res) {
        //       console.log(res.status) //  loaded
        //     },
        //     fail: function(res) {
        //       console.log(res.status) //  error
        //     },
        //     complete: function(res) {
        //       console.log(res.status);
        //     }
        //   });
    },
    strLength:function(str){
        var len = 0;
        for (var i=0; i<str.length; i++) { 
         var c = str.charCodeAt(i); 
        //单字节加1 
         if ((c >= 0x0001 && c <= 0x007e) || (0xff60<=c && c<=0xff9f)) { 
           len++; 
         } 
         else { 
          len+=2; 
         } 
        } 
        return len;
    }
  
});
