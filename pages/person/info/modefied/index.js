const app = getApp();
const tips = require('../../../../common/tips.js');
const md5 = require('../../../../common/utils/md5.js');
const Api = require("../../../../config/method.js");
const Session = require('../../../../common/auth/session')
Page({
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
        score: ['请输入您的目标分数', 36, 50, 65,79],
        index: 0,
        hasRead: true,
        nickname:'',
        sex: 1,
        target_score:'',
        has_experience: 1,
        email: '',
        city: '',
        tel: '',
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let _this = this;
        let session = Session.get();
        Api.UserInfo({
            openid: session.openid
        }).then(({
            data
        }) => {
            data.exam_date=_this.timestampToTime(data.exam_date).slice(0,10);
            let sex=[{
                    name: '男',
                    value: 1,
                },
                {
                    name: '女',
                    value: 2,
                }]
            for(let i=0;i<sex.length;i++){
                if(sex[i].value==data.sex){
                    sex[i].checked=true
                    _this.setData({
                        sexs:sex,
                    });
                }
            }
            let pte=[{
                    name: '是',
                    value: 1,
                },
                {
                    name: '否',
                    value: 2,
            }]
            for(let i=0;i<pte.length;i++){
                if(pte[i].value==data.has_experience){
                    pte[i].checked=true
                    _this.setData({
                        ptes:pte,
                    });
                }
            }
            let score=['请输入您的目标分数', '36', '50', '65','79'];
            let index=score.indexOf(data.target_score);
            _this.setData({
                user: data,
                nickname:data.nickname,
                tel:data.tel,
                email:data.email,
                city:data.city,
                date:data.exam_date,
                index:index,
            });
            resolve();
        }).catch(err => reject(err));
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
    getMobile: function (e) {
        this.setData({
            tel: e.detail.value
        })
    },

    getUserInfo: function (e) {
        let session = Session.get();
        let nickname = this.isEmptyValue(this.data.nickname, '用户昵称不能为空！','');
        if(!nickname){
            return;
        }
        let date = this.isEmptyValue(this.data.date, '请选择您的考试时间!', '请选择您的考试时间');
        if(!date){
            return;
        }
        let score = this.isEmptyValue(this.data.score[this.data.index], '请输入您的目标分数！', '请输入您的目标分数');
        if(!score){
            return;
        }
        let email = this.isEmptyValue(this.data.email, '请输入您的邮箱！', '');
        if(!email){
            return;
        }else{
            var hasEmail = this.verifyEmail(this.data.email, '邮箱格式不正确!');
            if(!hasEmail){
                return;
            }
        }
        let city = this.isEmptyValue(this.data.city, '请输入您所在的城市！', '');
        if(!city){
            return;
        }
        let tel = this.isEmptyValue(this.data.tel, '请输入您的手机号！', '');
        if(!tel){
            return;
        }
       
        if(tel){
            var hasTel = this.verifyTel(this.data.tel, '手机格式不正确!');
        }
        let data={
            openid:session.openid,
            nickname: this.data.nickname,
            sex: this.data.sex,
            exam_date: Math.round(new Date(this.data.date).getTime() / 1000),
            target_score: this.data.score[this.data.index],
            has_experience: this.data.has_experience,
            email: this.data.email,
            city: this.data.city,
            tel:this.data.tel,
        }
        console.log(data);
        if (nickname && date && score && email && city && hasEmail && hasTel) {
            Api.Modified({
                openid:session.openid,
                nickname: this.data.nickname,
                sex: this.data.sex,
                exam_date: Math.round(new Date(this.data.date).getTime() / 1000),
                target_score: this.data.score[this.data.index],
                has_experience: this.data.has_experience,
                email: this.data.email,
                city: this.data.city,
                tel:this.data.tel,
            }).then(({data}) => {
                tips.showSuccess("修改成功!");
                setTimeout(()=>{
                    wx.redirectTo({url: '/pages/person/info/index'});
                },1000);
                resolve();
            }).catch(err => reject(err));
        }
    },
    isEmptyValue:function(value,errMsg,verified){
        if(value==verified){
            tips.showWarning('错误提示',errMsg);
            return false;
        }else{
            return true;
        }
    },
    getPhoneNumber:function(e){
        console.log(e.detail);
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
    verifyTel: function (value, errMsg) {
        let phoneReg = /^1[3-578]\d{9}$/;
        if (!phoneReg.test(value)){
            tips.showWarning('错误提示', errMsg);
            return false;
        } else {
            return true;
        }
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