const tips = require('../../../../common/tips');
const Api = require('../../../../config/method');
const Session = require('../../../../common/auth/session')
const app =getApp();
Page({
    /**
     * 页面的初始数据
     */
    data: {

    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let id=options.id;
        this.setData({
            id:id
        });
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
        wx.stopPullDownRefresh()
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
    skipPage:app.skipPage,
    handleData:function(){
        let _this=this;
        Api.MemoryItem({
            id:this.data.id
        }).then(({ data }) => {
            let time=_this.timestampToTime(data.examtime);
            data.examtime=time.slice(0,10);
            if(data.discuz){
                for(let i=0;i<data.discuz.length;i++){
                    let time=_this.timestampToTime(data.discuz[i].addtime);
                    data.discuz[i].addtime=time.slice(0,10);
                }
            }
            _this.setData({
                memory:data
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
    handleCollect:function(){
        let _this=this;
        let session=Session.get();
        Api.MemoryCollect({
            openid:session.openid,
            mid:this.data.id
        }).then(( data ) => {
            _this.handleData();
            tips.showSuccess(data.errdesc);
            resolve();
        }).catch(err => reject(err));
       
    },
    handleLike:function () {
        let _this=this;
        let session=Session.get();
        Api.MemoryLike({
            openid:session.openid,
            mid:this.data.id
        }).then(( data ) => {
            _this.handleData();
            tips.showSuccess(data.errdesc);
            resolve();
        }).catch(err => reject(err));
    },
    handleCLike:function (event) {
        let _this=this;
        let session=Session.get();
      
        let id=e.target.dataset.id;
        Api.MemoryDLike({
            openid:session.openid,
            mid:id
        }).then(( data ) => {
            _this.handleData();
            tips.showSuccess(data.errdesc);
            resolve();
        }).catch(err => reject(err));
    }
});
