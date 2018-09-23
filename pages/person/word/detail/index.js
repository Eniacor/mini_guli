const Api = require("../../../../config/method.js");
const Session = require('../../../../common/auth/session')
const tips = require('../../../../common/tips');
const md5 = require('../../../../common/utils/md5.js');
const app = getApp()
Page({
    /**
     * 页面的初始数据
     */
    data: {
        audioCtx:null,
        index:2,
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let {word,id}=options;
        this.setData({
            id:id,
            can:word
        });
        this.handleData();
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        this.audioCtx = wx.createAudioContext('myAudio')
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
    skipPage:app.skipPage,
    playSound: function (e) {
        this.setData({
            url:e.currentTarget.dataset.url,
        });
        this.audioCtx.play()
    },
    handleDel:function(e){
        let _this=this;
        let session=Session.get();
        Api.NewWordD({
            id:e.currentTarget.dataset.id,
            uid:session.uid
        }).then((data) => {
            console.log(data);
            if(data.errdesc==1){
                tips.showSuccess('删除成功！');
                setTimeout(()=>{
                    wx.navigateTo({url: '/pages/person/word/index'});
                },1000);
            }else{
                tips.showSuccess('删除失败！');
                setTimeout(()=>{
                    wx.navigateTo({url: '/pages/person/word/index'});
                },1000);
            }
            resolve();
        }).catch(err => reject(err));
    },
    handlePre:function(e){
        let _this=this;
        let session=Session.get();
        Api.NewWordP({
            id:e.currentTarget.dataset.id,
            uid:session.uid
        }).then((data) => {
            console.log(data);
            if(data.errdesc){
                _this.setData({
                    can:data.errdesc.word,
                    id:data.errdesc.id
                });
                _this.handleData();
            }else{
                tips.showSuccess('暂无数据');
            }
            resolve();
        }).catch(err => reject(err));
    },
    handleNex:function(e){
        let _this=this;
        let session=Session.get();
        Api.NewWordN({
            id:e.currentTarget.dataset.id,
            uid:session.uid
        }).then((data) => {
            if(data.errdesc){
                _this.setData({
                    can:data.errdesc.word,
                    id:data.errdesc.id
                });
                _this.handleData();
            }else{
                tips.showSuccess("暂无数据！");
            }
            resolve();
        }).catch(err => reject(err));
    },
    handleData:function(){
        let _this=this;
        let appKey = '3dab2396ab7ca4f9';
        let key = 'FSugZEbevvhW9cJux2qoD5ME8VFF7Bai';
        let salt = (new Date).getTime();
        let query = _this.data.can;
        let from = '';
        let to = 'zh-CHS';
        let str1 = appKey + query + salt + key;
        let sign = md5.hexMD5(str1);
        wx.request({
            url: 'https://openapi.youdao.com/api', //仅为示例，并非真实的接口地址
            data: {
                q: query,
                appKey: appKey,
                salt: salt,
                from: from,
                to: to,
                sign: sign
            },
            header: {
                'content-type': 'application/json' // 默认值
            },
            success: function (res) {
                if(res.data.errorCode==301||res.data.errorCode==302){
                    // tips.showSuccess("查词失败!");
                }else{
                    res.data['cuk']=null;
                    res.data['cuks']=null;
                    res.data['cus']=null;
                    res.data['cuss']=null;
                    res.data['cuk']=res.data.basic['uk-phonetic'];
                    res.data['cuks']=res.data.basic['uk-speech'];
                    res.data['cus']=res.data.basic['us-phonetic'];
                    res.data['cuss']=res.data.basic['us-speech'];      
                    _this.setData({
                        word:res.data
                    });
                }
            }
        })
    }
});
