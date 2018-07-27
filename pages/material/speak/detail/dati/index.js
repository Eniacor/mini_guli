const app = getApp();
const WxParse = require('../../../../../common/component/wxParse/wxParse.js');
const innerAudioContext = wx.createInnerAudioContext()
const innerAudioContext2 = wx.createInnerAudioContext()
Page({
    /**
     * 页面的初始数据
     */
    data: {
        currentTime: 0,
        totalTime: 0,
        currentS: 0,
        totalS: 0,
        isPlay: 0,
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        var article = `
        <p>Do you&nbsp;lovSince&nbsp;I go to&nbsp;school, I learn so many words. Do you&nbsp;lovSince&nbsp;I go to&nbsp;school, I learn so many words. Do you&nbsp;lovSince&nbsp;I go to&nbsp;school, I learn so many words. Do you&nbsp;lovSince&nbsp;I go to&nbsp;school, I learn so many words. Do you&nbsp;lovSince&nbsp;I go to&nbsp;school, I learn so many words. Do you&nbsp;lovSince&nbsp;I go to&nbsp;school, I learn so many words. Do you&nbsp;lovSince&nbsp;I go to&nbsp;school, I learn so many words. Do you&nbsp;lovSince&nbsp;I go to&nbsp;school, I learn so many words. Do you&nbsp;lovSince&nbsp;I go to&nbsp;school, I learn so many words. Do you&nbsp;lovSince&nbsp;I go to&nbsp;school, I learn so many words. Do you&nbsp;lovSince&nbsp;I go to&nbsp;school, I learn so many words. Do you&nbsp;lovSince&nbsp;I go to&nbsp;school, I learn so many words.&nbsp;</p><p><br></p><p><br></p>`;
        WxParse.wxParse('article', 'html', article, that, 5);
        let newArticle = this.data.article;
        for (let i = 0, j = newArticle.nodes.length; i < j; i++) {
            for (let m = 0, n = newArticle.nodes[i].nodes.length; m < n; m++) {
                if (newArticle.nodes[i].nodes[m].node == 'text') {
                    newArticle.nodes[i].nodes[m].texta = newArticle.nodes[i].nodes[m].text.trim().split(/\s+/);
                }
            }
        }
        this.setData({
            article: newArticle,
        });
        
        innerAudioContext.autoplay = true;
        innerAudioContext.src = 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E06DCBDC9AB7C49FD713D632D313AC4858BACB8DDD29067D3C601481D36E62053BF8DFEAF74C0A5CCFADD6471160CAF3E6A&fromtag=46'
        console.log(innerAudioContext.duration);
        innerAudioContext.onError((res) => {
            console.log(res.errMsg)
            console.log(res.errCode)
        })
        innerAudioContext.onTimeUpdate((res) => {
            this.setData({
                currentS: innerAudioContext.currentTime,
                totalS: innerAudioContext.duration,
                totalTime: this.secondToDate(innerAudioContext.duration),
                currentTime: this.secondToDate(innerAudioContext.currentTime),
            });
            innerAudioContext.autoplay = false;
        })
        innerAudioContext.onCanplay((res) => {
            console.log(res);
            console.log(innerAudioContext.duration);
        })
        innerAudioContext.onPlay((res) => {})
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
        innerAudioContext.stop();
    },
    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {},
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {},
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {},
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {},
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {},
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {},
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
    skipPage: app.skipPage,
    secondToDate: function (s) {
        let minute = parseInt(s / 60) > 0 ? parseInt(s / 60) > 9 ? parseInt(s / 60) : '0' + parseInt(s / 60) : '00';
        let second = Math.floor(s % 60) > 9 ? Math.floor(s % 60) : '0' + Math.floor(s % 60);
        return minute + ':' + second;
    },
    playAudio: function () {
        innerAudioContext.play();
        this.setData({
            isPlay:1
        })
    },
    pauseAudio: function () {
        innerAudioContext.pause();
        this.setData({
            isPlay:0
        })
    }
});