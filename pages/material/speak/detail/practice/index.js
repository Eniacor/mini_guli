const app = getApp();
const WxParse = require('../../../../../common/component/wxParse/wxParse.js');
Page({
    /**
     * 页面的初始数据
     */
    data: {
        currenta: {
            poster: 'http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000',
            name: '此时此刻',
            author: '许巍',
            src: 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E06DCBDC9AB7C49FD713D632D313AC4858BACB8DDD29067D3C601481D36E62053BF8DFEAF74C0A5CCFADD6471160CAF3E6A&fromtag=46',
        },
        audioAction: {
            method: 'pause'
        },
        audioAction: {
            method: 'pause'
        },
        isPlay:0,
        current: 'tab1',
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
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {},
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {


    },
    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {},
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
    // audioAction: {
    //     method: 'pause'
    //   }
    // },
    audioPlayed: function (e) {
        console.log('audio is played')
    },
    audioTimeUpdated: function (e) {
        this.duration = e.detail.duration;
    },

    timeSliderChanged: function (e) {
        if (!this.duration)
            return;

        var time = this.duration * e.detail.value / 100;

        this.setData({
            audioAction: {
                method: 'setCurrentTime',
                data: time
            }
        });
    },
    playbackRateSliderChanged: function (e) {
        this.setData({
            audioAction: {
                method: 'setPlaybackRate',
                data: e.detail.value
            }
        })
    },

    playAudio: function () {
        this.setData({
            audioAction: {
                method: 'play'
            },
            isPlay:1,
        });
    },
    pauseAudio: function () {
        this.setData({
            audioAction: {
                method: 'pause'
            },
            isPlay:0,
        });
    },
    handleChange ({ detail }) {
        this.setData({
            current: detail.key
        });
    },

});