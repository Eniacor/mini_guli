const tips = require('../../../../common/tips');
const Api = require('../../../../config/method');
const Session = require('../../../../common/auth/session')
const recorderManager = wx.getRecorderManager()
const innerAudioContext = wx.createInnerAudioContext()
const app = getApp();
Page({
    /**
     * 页面的初始数据
     */
    data: {
        status: 1,
        sound: null,
        type: 1,
        temp:'',
        text:'',
        cstatus:1,
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(options);
        this.setData({
            id: options.id,
            type: options.type,
            back:options.back
        })
        // this.handleData();
      
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
        recorderManager.stop();
    },
    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {
        recorderManager.stop();
    },
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
    skipPage: app.skipPage,
    handleData: function () {
        if(this.data.text==''&&this.data.temp==''){
            tips.showModel('错误提示', "内容不能为空!");
            return;
        }
        if (this.data.type == 1) {
            let _this = this;
            let session = Session.get();
            if (_this.data.temp) {
                wx.uploadFile({
                    url: 'https://a.squmo.com/wenbo/Question/discuz', //仅为示例，非真实的接口地址
                    filePath: this.data.temp,
                    name: 'recording',
                    formData: {
                        'openid': session.openid,
                        'qid': _this.data.id,
                        'time': _this.data.time,
                        'content':_this.data.text
                    },
                    success: function (res) {
                        tips.showSuccess("评论成功!");
                        setTimeout(() => {
                            wx.redirectTo({
                                url: '/pages/material/list/dati/index?id=' + _this.data.back
                            });
                        }, 1000);
                    },
                    fail: function (res) {
                        tips.showModel('网络异常', "图片上传失败!");
                    }
                })
            } else {
                Api.QuestionDiscuz({
                    openid: session.openid,
                    qid: _this.data.id,
                    time: 0,
                    content:_this.data.text
                }).then((data) => {
                    tips.showSuccess("评论成功!");
                    setTimeout(() => {
                        wx.redirectTo({
                            url: '/pages/material/list/dati/index?id=' + _this.data.back
                        });
                    }, 1000);
                }).catch(err => reject(err));
            }
        } else if (this.data.type == 2) {
            let _this = this;
            let session = Session.get();
            if (_this.data.temp) {
                wx.uploadFile({
                    url: 'https://a.squmo.com/wenbo/Question/remark', //仅为示例，非真实的接口地址
                    filePath: this.data.temp,
                    name: 'recording',
                    formData: {
                        'openid': session.openid,
                        'qid': _this.data.id,
                        'time': _this.data.time,
                        'content':_this.data.text
                    },
                    success: function (res) {
                        tips.showSuccess("点评成功!");
                        setTimeout(() => {
                            wx.redirectTo({
                                url: '/pages/material/list/dati/index?id=' + _this.data.back
                            });
                        }, 1000);
                    },
                    fail: function (res) {
                        tips.showModel('网络异常', "图片上传失败!");
                    }
                })
            } else {
                Api.QuestionRemark({
                    openid: session.openid,
                    qid: _this.data.id,
                    time: 0,
                    'content':_this.data.text
                }).then((data) => {
                    tips.showSuccess("评论成功!");
                    setTimeout(() => {
                        wx.redirectTo({
                            url: '/pages/material/list/dati/index?id=' + _this.data.back
                        });
                    }, 1000);

                }).catch(err => reject(err));
            }
        } else if (this.data.type == 3) {
            let _this = this;
            let session = Session.get();
            if (_this.data.temp) {
                wx.uploadFile({
                    url: 'https://a.squmo.com/wenbo/Question/exerciseRemark', //仅为示例，非真实的接口地址
                    filePath: this.data.temp,
                    name: 'recording',
                    formData: {
                        'openid': session.openid,
                        'qid': _this.data.id,
                        'time': _this.data.time,
                        'content':_this.data.text,
                    },
                    success: function (res) {
                        tips.showSuccess("评论成功!");
                        setTimeout(() => {
                            wx.redirectTo({
                                url: '/pages/material/list/practice/index?id=' + _this.data.back
                            });
                        }, 1000);
                    },
                    fail: function (res) {
                        tips.showModel('网络异常', "图片上传失败!");
                    }
                })
            } else {
                Api.QuestionExerciseRemark({
                    openid: session.openid,
                    qid: _this.data.id,
                    time: 0,
                    content:_this.data.text
                }).then((data) => {
                    tips.showSuccess("评论成功!");
                    setTimeout(() => {
                        wx.redirectTo({
                            url: '/pages/material/list/practice/index?id=' + _this.data.back
                        });
                    }, 1000);
                }).catch(err => reject(err));
            }
        }
    },
    handleP: function (e) {
        innerAudioContext.src = this.data.temp;
        innerAudioContext.play();
        this.setData({
            cstatus:2
        });
    },
    handleS:function(){
        innerAudioContext.pause();
        this.setData({
            cstatus:1
        });
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
    handleCollect: function () {
        let _this = this;
        let session = Session.get();
        Api.QuestionCollect({
            openid: session.openid,
            qid: this.data.data.id
        }).then((data) => {
            _this.handleData();
            tips.showSuccess(data.errdesc);
            resolve();
        }).catch(err => reject(err));
    },
    handleStart: function () {
        const options = {
            duration: 180000, //指定录音的时长，单位 ms
            sampleRate: 16000, //采样率
            numberOfChannels: 1, //录音通道数
            encodeBitRate: 96000, //编码码率
            format: 'mp3', //音频格式，有效值 aac/mp3
            frameSize: 50, //指定帧大小，单位 KB
        }
        //开始录音
        recorderManager.start(options);
        recorderManager.onStart(() => {
            console.log('recorder start')
        });
        //错误回调
        recorderManager.onError((res) => {
            console.log(res);
        })
        this.setData({
            status: 2
        });
    },
    handleStop: function () {
        let _this = this;
        recorderManager.stop();
        recorderManager.onStop((res) => {
            this.tempFilePath = res.tempFilePath;
            const {
                tempFilePath,
                duration
            } = res

            _this.setData({
                temp: tempFilePath,
                time: parseInt(duration / 1000),
                status: 1,
            })
        })

    },
    handleText: function (e) {
        this.setData({
            text: e.detail.value
        });
    },
    secondToDate: function (s) {
        var t;
        if (s > -1) {
            var hour = Math.floor(s / 3600);
            var min = Math.floor(s / 60) % 60;
            var sec = s % 60;
            if (hour < 10) {
                t = '0' + hour + ":";
            } else {
                t = hour + ":";
            }

            if (min < 10) {
                t += "0";
            }
            t += min + ":";
            if (sec < 10) {
                t += "0";
            }
            t += sec.toFixed(2);
        }
        return t;
    },
});