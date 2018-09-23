const app = getApp();
const tips = require('../../common/tips.js');
const md5 = require('../../common/utils/md5.js');
const Api = require("../../config/method.js");
const Session = require('../../common/auth/session')
const api = require('../../config/api.config');
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
        score: ['请输入您的目标分数',36,50,65,79],
        index: 0,
        hasRead: true,
        nickname:'',
        sex: 1,
        // exam_date: null,
        target_score:'',
        has_experience: 1,
        email:'',
        city:'',
        tel:'请绑定手机号'
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
        let _this=this;
        let session = Session.get();
        let tel = this.isEmptyValue(this.data.tel, '请绑定手机号！', '请绑定手机号');
        let nickname = this.isEmptyValue(this.data.nickname, '用户昵称不能为空！', '');
        let date = this.isEmptyValue(this.data.date, '请选择您的考试时间!', '请选择您的考试时间');
        let score = this.isEmptyValue(this.data.score[this.data.index], '请输入您的目标分数！', '请输入您的目标分数');
        let email = this.isEmptyValue(this.data.email, '请输入您的邮箱！','');
        let city = this.isEmptyValue(this.data.city, '请输入您所在的城市！','');
        if(email){
            var hasEmail = this.verifyEmail(this.data.email, '邮箱格式不正确!');
        }
        if (tel&&nickname && date && score && email && city&&hasEmail) {
            if (e.detail.errMsg == "getUserInfo:ok") {
                Api.UserRegister({
                    openid:session.openid,
                    tel:this.data.tel,
                    tel_prefix:this.data.tel_prefix,
                    tel_nation:e.detail.userInfo.country,
                    nickname: this.data.nickname,
                    avatarurl:e.detail.userInfo.avatarUrl,
                    sex: this.data.sex,
                    exam_date: Math.round(new Date(this.data.date).getTime() / 1000),
                    target_score: this.data.score[this.data.index],
                    has_experience: this.data.has_experience,
                    email: this.data.email,
                    city: this.data.city,
                }).then(({data}) => {
                    _this.handleLogin();
                    tips.showSuccess("注册成功!");
                    setTimeout(()=>{
                        wx.switchTab({url: '/pages/index/index'});
                    },1000);
                    resolve();
                }).catch(err => reject(err));
            }
        }
    },
    handleMobile:function(e){
        this.setData({
            tel: e.detail.value
        })
    },
    handleLogin:function(){
        let _this=this;
        let func_arr = [];
        Session.clear();
        wx.login({
            success: function (res) {
                let { code } = res;
                let data ={code:code}
                wx.request({
                    url: api.XcxLogin,
                    header: {
                        'content-type': 'application/x-www-form-urlencoded'
                    },
                    data: data,
                    method: 'POST',
                    success: function (response) {
                        let body = response.data
                        Session.set(body.result);
                        func_arr.forEach(d => {
                            d();
                        })
                        func_arr = [];
                        if(body.result.is_bind==1){
                            wx.switchTab({url:'/pages/index/index'})
                        }else{
                            _this.handleData(); 
                        }
                    },
                    fail: function (err) {
                        tips.showModel('网络异常', err.errMsg || err)
                    }
                });
            },
            fail: function (error) {
                // fail
                console.error(error);
                options.fail(new Error('获取微信用户信息失败，请检查网络状态'));
            }
        })
    },
    getPhoneNumber: function (e) {
        let session = Session.get();
        var _this = this;
        if (e.detail.errMsg == "getPhoneNumber:ok") {
            Api.BindPhone({
                session_key:session.session_key,
                encryptedData: e.detail.encryptedData,
                iv: e.detail.iv,
            }).then((data) => {
                console.log(data);
                _this.setData({
                    tel:data.result.purePhoneNumber,
                    tel_prefix:data.result.countryCode,
                });
                resolve();
            }).catch(err => reject(err));
        }
    },
    isEmptyValue: function (value, errMsg, verified) {
        if (value == verified) {
            tips.showWarning('错误提示', errMsg);
            return false;
        } else {
            return true;
        }
    },
    verifyEmail: function (value, errMsg) {
        let mailReg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
        if (!mailReg.test(value)){
            tips.showWarning('错误提示', errMsg);
            return false;
        } else {
            return true;
        }
    },
});