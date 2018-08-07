const tips = require('../../../../common/tips');
const Api = require('../../../../config/method');
const Session = require('../../../../common/auth/session')
const WxParse = require('../../../../common/component/wxParse/wxParse.js');
const innerAudioContext = wx.createInnerAudioContext();
const recorderManager = wx.getRecorderManager()
const app = getApp();
Page({
    /**
     * 页面的初始数据
     */
    data: {
        currentTime: '00:00',
        totalTime:'00:59',
        currentS: 0,
        totalS: 0,
        isPlay: 0,
        data:null,
        article:null,
        current: 'tab1',
        status:1,
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            id: options.id,
        })
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
    onShareAppMessage: function () {
        return {
          title: '文波教育',
          desc: '文波教育',
          path: '/pages/index/index'
        }
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
            isPlay: 1
        })
    },
    pauseAudio: function () {
        innerAudioContext.pause();
        this.setData({
            isPlay: 0
        })
    },
    handleData: function () {
        let that = this;
        let session = Session.get();
        Api.QuestionExerciseShow({
            id: this.data.id
        }).then(({
            data
        }) => {
            let article = data.content;
            data['addtime'] = that.timestampToTime(data['addtime']).slice(0, 10);
            data['mydiscuz']=null;
            let arr=[];
            if (data.discuz!=null) {
                for (let i = 0; i < data.discuz.length; i++) {
                    data.discuz[i]['addtime'] = that.timestampToTime(data.discuz[i]['addtime']).slice(0, 10);
                    data.discuz[i]['recording_seconds'] = parseInt(data.discuz[i]['recording_seconds']/1000);
                    if(data.discuz[i]['uid']==session.uid){
                        arr.push(data.discuz[i]);
                    }
                }
            }
            data['mydiscuz']=arr;
            WxParse.wxParse('article', 'html', article, that, 5);
            let newArticle = that.data.article;
            for (let i = 0, j = newArticle.nodes.length; i < j; i++) {
                for (let m = 0, n = newArticle.nodes[i].nodes.length; m < n; m++) {
                    if (newArticle.nodes[i].nodes[m].node == 'text') {
                        newArticle.nodes[i].nodes[m].texta = newArticle.nodes[i].nodes[m].text.trim().split(/\s+/);
                    }
                }
            }
            innerAudioContext.src = data.recording;
            innerAudioContext.onError((res) => {
                console.log(res.errMsg)
                console.log(res.errCode)
            });
            innerAudioContext.onTimeUpdate((res) => {
                that.setData({
                    currentS: innerAudioContext.currentTime,
                    totalS: innerAudioContext.duration,
                    totalTime: that.secondToDate(innerAudioContext.duration),
                    currentTime: that.secondToDate(innerAudioContext.currentTime),
                });
            })
            innerAudioContext.onCanplay((res) => {
                console.log(res);
                console.log(innerAudioContext.duration);
            })
            innerAudioContext.onPlay((res) => {})

            that.setData({
                article: newArticle,
                data: data
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
    discuzLike: function (e) {
        let _this = this;
        let session = Session.get();
        Api.QuestionExerciseLike({
            openid: session.openid,
            qid: e.currentTarget.dataset.id
        }).then((data) => {
            _this.handleData();
            tips.showSuccess(data.errdesc);
            resolve();
        }).catch(err => reject(err));
    },
    handleNext: function () {
        let that = this;
        Api.QuestionPrev({
            id: this.data.data.id
        }).then(({data}) => {
            if(data.errno){
                that.setData({
                    id: data.id,
                });
            }else{
                tips.showSuccess("已经无法切换啦!");
            }
            resolve();
        }).catch(err => reject(err));
        
    },
    handlePrev: function () {
        let that = this;
        Api.QuestionNext({
            id: this.data.data.id
        }).then(({data}) => {
            if(data.errno){
                that.setData({
                    id: data.id,
                });
            }else{
                tips.showSuccess("已经无法切换啦!");
            }
            resolve();
        }).catch(err => reject(err));
    },
    handleP: function (e) {
        this.setData({
            url:e.currentTarget.dataset.url,
            cstatus:e.currentTarget.dataset.id
        });
        this.audioCtx.play()
    },
    handleS:function(){
        this.audioCtx.pause();
        this.setData({
            cstatus:null
        });
    },
    handlePlay: function (e) {
        const options = {
            duration: 10000, //指定录音的时长，单位 ms
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
    handleStop:function(){
        let _this = this;
        let session = Session.get();
        recorderManager.stop();
        recorderManager.onStop((res) => {
            const { tempFilePath, duration} = res;
            if (tempFilePath) {
                wx.uploadFile({
                    url: 'https://a.squmo.com/wenbo/Question/exerciseStore', //仅为示例，非真实的接口地址
                    filePath: tempFilePath,
                    name: 'recording',
                    formData: {
                        'openid': session.openid,
                        'qid': _this.data.id,
                        'time': duration,
                    },
                    success: function (res) {
                        tips.showSuccess("练习完成!");
                    },
                    fail: function (res) {
                        tips.showModel('网络异常', "图片上传失败!");
                    }
                })
            }
            _this.setData({
                status: 1,
            })
            _this.handleData();
        })
    },
    handleChange ({ detail }) {
        this.setData({
            current: detail.key
        });
    },
});