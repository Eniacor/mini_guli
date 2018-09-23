const app = getApp();
const tips = require('../../../common/tips.js');
const md5 = require('../../../common/utils/md5.js');
const Api = require("../../../config/method.js");
const Session = require('../../../common/auth/session')
Page({
    /**
     * 页面的初始数据
     */
    data: {
        sexs: [{
                name: '男',
                value: 1,
                checked: 'true'
            },
            {
                name: '女',
                value: 2,
            },
        ],
        ptes: [{
                name: '是',
                value: 1,
                checked: 'true'
            },
            {
                name: '否',
                value: 2,
            },
        ],
        date: '请选择您的考试时间',
        score: ['请输入您的目标分数', 36, 50, 65, 79],
        index: 0,
        hasRead: true,

        nickname: null,
        sex: 1,
        // exam_date: null,
        target_score: null,
        has_experience: 1,
        email: null,
        city: null,
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        this.handleData();
    },
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
    skipPage: app.skipPage,
    radioSexChange: function (e) {
        this.setData({
            sex: e.detail.value
        })
    },
    radioPteChange: function (e) {
        this.setData({
            has_experience: e.detail.value
        })
    },
    radioIsChange: function () {
        if (this.data.hasRead) {
            this.setData({
                hasRead: false
            })
        } else {
            this.setData({
                hasRead: true
            })
        }
    },
    bindScoreChange: function (e) {
        this.setData({
            index: e.detail.value
        })
    },
    bindDateChange: function (e) {
        this.setData({
            date: e.detail.value
        })
    },
    getNickname: function (e) {
        console.log(e.detail)
        this.setData({
            nickname: e.detail.value
        })
        console.log(this.data.register);
    },
    getEmail: function (e) {
        this.setData({
            email: e.detail.value
        })
        console.log(this.data.register);
    },
    getCity: function (e) {
        this.setData({
            city: e.detail.value
        })
    },

    isEmptyValue:function(value,errMsg,verified){
        if(value==verified){
            tips.showWarning('错误',errMsg);
            return false;
        }else{
            return true;
        }
    },
    handleData: function () {
        let _this = this;
        let session = Session.get();
        Api.UserInfo({
            openid: session.openid
        }).then(({
            data
        }) => {
            data.exam_date=_this.timestampToTime(data.exam_date).slice(0,10);
            _this.setData({
                user: data,
                sex:data.sex,
                has_experience:data.has_experience
            });
            resolve();
        }).catch(err => reject(err));
    },
    timestampToTime: function (timestamp) {
        let date = new Date(timestamp * 1000);
        let Y = date.getFullYear() + '-';
        let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        let D = date.getDate() + ' ';
        let h = date.getHours() + ':';
        let m = date.getMinutes() + ':';
        let s = date.getSeconds();
        return Y + M + D + h + m + s;
    },
});