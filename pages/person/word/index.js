const Api = require("../../../config/method.js");
const Session = require('../../../common/auth/session')
const tips = require('../../../common/tips');
const md5 = require('../../../common/utils/md5.js');
const innerAudioContext = wx.createInnerAudioContext();
const app = getApp()
Page({
    /**
     * 页面的初始数据
     */
    data: {
       words:[]
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
    handleData:function(){
        let session=Session.get();
        let _this=this;
        Api.QuestionMyWord({
            uid:session.uid
        }).then(({data}) => {
            let words=[];
            for(let i=0;i<data.length;i++){
                let word= data[i].word;
                let appKey = '3dab2396ab7ca4f9';
                let key = 'FSugZEbevvhW9cJux2qoD5ME8VFF7Bai';
                let salt = (new Date).getTime();
                let query = word;
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
                        console.log(res);
                        if(res.data.errorCode==301||res.data.errorCode==302){
                            tips.showSuccess("查词失败!");
                        }else{
                            res.data['cuk']=null;
                            res.data['cuks']=null;
                            res.data['cus']=null;
                            res.data['cuss']=null;
                            res.data['cuk']=res.data.basic['uk-phonetic'];
                            res.data['cuks']=res.data.basic['uk-speech'];
                            res.data['cus']=res.data.basic['us-phonetic'];
                            res.data['cuss']=res.data.basic['us-speech'];   
                            res.data['id']=data[i].id;
                            let words=_this.data.words.concat(res.data);
                            _this.setData({
                                words: words
                            });
            
                        }
                    }
                })
            }
            resolve();
        }).catch(err => reject(err));
    },
    playSound: function (e) {
        this.setData({
            url:e.currentTarget.dataset.url,
        });
        this.audioCtx.play()
    },
});
