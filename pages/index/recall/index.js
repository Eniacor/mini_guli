const tips = require('../../../common/tips');
const Api = require('../../../config/method');
const Session = require('../../../common/auth/session')
const app =getApp();
Page({
    /**
     * 页面的初始数据
     */
    data: {
        totalMemory:null,
        myMemory:null,
        Page:1,
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
        this.handleData();
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
        let page=this.data.page++;
        let _this=this;
        Api.MemoryIndex({
            page:page
        }).then(({ data }) => {
            for(let i=0;i<data.length;i++){
                let time=_this.timestampToTime(data[i].addtime);
                data[i].addtime=time.slice(0,10);
            }
            _this.setData({
                totalMemory:data
            });
            resolve();
        }).catch(err => reject(err));
        this.setData({
            page:page
        });
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
   
    handleData:function(){
        let _this=this;
        let session=Session.get();
        Api.MemoryIndex({
            page:1
        }).then(({ data }) => {
            for(let i=0;i<data.length;i++){
                let time=_this.timestampToTime(data[i].addtime);
                data[i].addtime=time.slice(0,10);
            }
            _this.setData({
                totalMemory:data
            });
            resolve();
        }).catch(err => reject(err));
        Api.MemoryMy({
            openid:session.openid
        }).then(({ data }) => {
            for(let i=0;i<data.length;i++){
                let time=_this.timestampToTime(data[i].addtime);
                data[i].addtime=time.slice(0,10);
            }
            _this.setData({
                myMemory:data
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
    }
});
