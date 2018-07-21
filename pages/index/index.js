
const app =getApp()
const WxParse = require('../../common/component/wxParse/wxParse.js');

Page({
    /**
     * 页面的初始数据
     */
    data: {
        imgUrls: [
            '../../images/static/banner1.png',
            '../../images/static/banner1.png',
            '../../images/static/banner1.png'
        ],
        indicatorDots:true,
        autoplay:true,
        interval: 5000,
        duration: 1000
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
    
        var that = this;
        var article = `<p>Do you <span style=\"background-color: rgb(194, 79, 74);\">lovSince</span> I go to <span style=\"text-decoration-line: underline;\">school</span>, I learn so many words.&nbsp;</p><p><br></p>
        <p>Do you <span style=\"background-color: rgb(194, 79, 74);\">lovSince</span> I go to <span style=\"text-decoration-line: underline;\">school</span>, I learn so many words.&nbsp;</p><p><br></p>`;
        WxParse.wxParse('article', 'html', article, that, 5);

        let newArticle=this.data.article;
        for(let i=0,j=newArticle.nodes.length;i<j;i++){
            for(let m=0,n=newArticle.nodes[i].nodes.length;m<n;m++){
                if(newArticle.nodes[i].nodes[m].node=='text'){
                    newArticle.nodes[i].nodes[m].texta=newArticle.nodes[i].nodes[m].text.trim().split(/\s+/);
                }
            }
        }

        this.setData({
            article:newArticle,
        });
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
    }
});
