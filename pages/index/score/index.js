const tips = require('../../../common/tips');
const Api = require('../../../config/method');
const WxParse = require('../../../common/component/wxParse/wxParse');
const app =getApp();
Page({
    /**
     * 页面的初始数据
     */
    data: {
       month:['错误','一','二','三','四','五','六','七','八','九','十','十一','十二']
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.handleData();
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

        console.log(app);
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
    // skipPage:app.skipPage,
    skipPage:app.skipPage,
    handleData:function(){
        let _this=this;
        Api.HighScoreIndex({}).then(({ data }) => {
            for(var j in data) {
                if(data[j]!=null){
                    for(let i=0;i<data[j].length;i++){
                        let time=_this.timestampToTime(data[j][i].addtime);
                        data[j][i].addtime=time.slice(0,10);
                        if(_this.strLength(data[j][i].title)>16){
                            data[j][i].title=data[j][i].title.slice(0,16)+'...';
                        }
                    }
                }
           }
            _this.setData({
                score:data
            });
            resolve();
        }).catch(err => reject(err));
        Api.Banner({
            type:4,
        }).then(({ data }) => {
            _this.setData({
                imgUrl:data
            });
            resolve();
        }).catch(err => reject(err));
    },
    timestampToTime:function (timestamp) {
        let date = new Date(timestamp * 1000);
        let Y = date.getFullYear() + '-';
        let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        let D = date.getDate() + ' ';
        let h = date.getHours() + ':';
        let m = date.getMinutes() + ':';
        let s = date.getSeconds();
        return Y+M+D+h+m+s;
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
