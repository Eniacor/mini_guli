const app = getApp();
// const tips = require('../../../../../common/tips.js');
// const md5 = require('../../../../../common/utils/md5.js');
// const Api = require("../../../../../config/method.js");
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
        score: ['请输入您的目标分数', 100, 200, 300, 400, 500, 600, 700],
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
    onReady: function () {},
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        // let appKey = '3dab2396ab7ca4f9';
        // let key = 'FSugZEbevvhW9cJux2qoD5ME8VFF7Bai';
        // let salt = (new Date).getTime();
        // let query = 'good';
        // let from = '';
        // let to = 'en';
        // let str1 = appKey + query + salt + key;
        // let sign = md5.hexMD5(str1);
        // wx.request({
        //     url: 'https://openapi.youdao.com/api', //仅为示例，并非真实的接口地址
        //     data: {
        //         q: query,
        //         appKey: appKey,
        //         salt: salt,
        //         from: from,
        //         to: to,
        //         sign: sign
        //     },
        //     header: {
        //         'content-type': 'application/json' // 默认值
        //     },
        //     success: function (res) {
        //         console.log(res.data)
        //     }
        // })
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

    getUserInfo: function (e) {
        if(e.detail.errMsg=="getUserInfo:ok"){
            let nickname=this.isEmptyValue(this.data.nickname,'用户昵称不能为空！',null);
            let date=this.isEmptyValue(this.data.date,'请选择您的考试时间!','请选择您的考试时间');
            let score=this.isEmptyValue(this.data.score[this.data.index],'请输入您的目标分数！','请输入您的目标分数');
            let email=this.isEmptyValue(this.data.email,'请输入您的邮箱！',null);
            let city=this.isEmptyValue(this.data.city,'请输入您所在的城市！',null);
            if(nickname&&date&&score&&email&&city){
                let data={
                    openid:"llll",
                    tel:18360172423,
                    tel_prefix:+86,
                    tel_nation:'国家',
                    nickname:this.data.nickname,
                    sex:this.data.sex,
                    exam_date:Math.round(new Date(this.data.date).getTime()/1000),
                    target_score:this.data.score[this.data.index],
                    has_experience:this.data.has_experience,
                    email:this.data.email,    
                    city:this.data.city,
                }
                console.log(data);
                Api.UserRegister({
                    openid:"o4ZdV4w9oS81VCxosjBJo8P08S0c",
                    tel:18360172423,
                    tel_prefix:+86,
                    tel_nation:'国家',
                    nickname:this.data.nickname,
                    sex:this.data.sex,
                    exam_date:Math.round(new Date(this.data.date).getTime()/1000),
                    target_score:this.data.score[this.data.index],
                    has_experience:this.data.has_experience,
                    email:this.data.email,    
                    city:this.data.city,
                }).then(({ data }) => {
                    
                    // self.setData({
                    //     list: data
                    // })
                    // self.makeData();
                    resolve();
                }).catch(err => reject(err));
    
                
            }
        }
    },
    isEmptyValue:function(value,errMsg,verified){
        if(value==verified){
            tips.showWarning('错误',errMsg);
            return false;
        }else{
            return true;
        }
    },
    getPhoneNumber:function(e){
        console.log(e.detail);
    }
});