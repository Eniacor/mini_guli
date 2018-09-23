const tips = require('../../../../common/tips');
const Api = require('../../../../config/method');
const Session = require('../../../../common/auth/session')
const WxParse = require('../../../../common/component/wxParse/wxParse.js');
const md5 = require('../../../../common/utils/md5.js');
const api = require('../../../../config/api.config');
const innerAudioContext = wx.createInnerAudioContext();
const app = getApp();
Page({
    /**
     * 页面的初始数据
     */
    data: {
        currentTime: '00:00',
        totalTime: '00:59',
        currentS: 0,
        totalS: 0,
        isPlay: 0,
        data: null,
        article: null,
        visible: false,
        collect:0,
        
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let session = Session.get();
        this.setData({
            id: options.id,
            identity: session.identity
        });
        this.handleData();
        innerAudioContext.onEnded(() => {
            this.setData({
                currentTime: '00:00',
                totalTime: '00:59',
                currentS: 0,
                totalS: 0,
                isPlay: 0,
                identity:session.identity,
            });
        })
        this.audioCtx = wx.createAudioContext('myAudio')

    },
    onHide:function(){
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
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
                        _this.has_collect();
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
    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {
       
    },
    onUnload: function () {
        innerAudioContext.stop();
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
        let session=Session.get();
        Api.QuestionShow({
            id: this.data.id
        }).then(({
            data
        }) => {
            let article = data.content;
            let answer = data.answer;
            if(answer=='<p><br></p>'){
                data['answers']=true;
            }
            data['addtime'] = that.timestampToTime(data['addtime']).slice(0, 10);
            data['snum']=0
            let num=parseInt(data['confirm_num']);
            if(num<10){
                data['snum']=0
            }else if(10<num<100){
                data['snum']=1
            }else if(100<num<200){
                data['snum']=2
            }else if(200<num<400){
                data['snum']=3
            }else if(400<num<600){
                data['snum']=4
            }else{
                data['snum']=5
            }

            
            if (data.discuz != null) {
                for (let i = 0; i < data.discuz.length; i++) {
                    data.discuz[i]['addtime'] = that.timestampToTime(data.discuz[i]['addtime']).slice(0, 10);
                }
            }
            WxParse.wxParse('article', 'html', article, that, 5);
            WxParse.wxParse('answer', 'html', answer, that, 5);
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
            that.has_collect();
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
    handleCollect: function () {
        let _this = this;
        let session = Session.get();
        Api.QuestionCollect({
            openid: session.openid,
            qid: this.data.data.id,
            type:this.data.data.question_type_id,
        }).then((data) => {
            tips.showSuccess(data.errdesc);
            _this.has_collect();
            resolve();
        }).catch(err => reject(err));
    },
    handleConfirm: function () {
        let _this = this;
        let session = Session.get();
        Api.QuestionConfirm({
            openid: session.openid,
            qid: this.data.data.id
        }).then((data) => {
            _this.handleData();
            tips.showSuccess(data.errdesc);
            resolve();
        }).catch(err => reject(err));
    },
    discuzLike: function (e) {
        let _this = this;
        let session = Session.get();
        Api.QuestionDiscuzLike({
            openid: session.openid,
            qid: e.currentTarget.dataset.id
        }).then((data) => {
            _this.handleData();
            tips.showSuccess(data.errdesc);
            resolve();
        }).catch(err => reject(err));
    },
    discuzLike: function (e) {
        let _this = this;
        let session = Session.get();
        Api.QuestionDiscuzLike({
            openid: session.openid,
            qid: e.currentTarget.dataset.id
        }).then((data) => {
            _this.handleData();
            tips.showSuccess(data.errdesc);
            resolve();
        }).catch(err => reject(err));
    },
    handlePrev: function () {
        let that = this;
        Api.QuestionPrev({
            id: this.data.data.id,
            qid:that.data.data.question_type_id
        }).then((data) => {
            if (data.errno==0) {
                that.setData({
                    id: data.errdesc,
                });
                that.handleData();
            } else {
                tips.showSuccess("已经无法切换啦!");
            }
            resolve();
        }).catch(err => reject(err));

    },
    handleNext: function () {
        let that = this;
        Api.QuestionNext({
            id: this.data.data.id,
            qid:that.data.data.question_type_id
        }).then((data) => {
            if (data.errno==0) {
                that.setData({
                    id: data.errdesc,
                });
                that.handleData();
            } else {
                tips.showSuccess("已经无法切换啦!");
            }
            resolve();
        }).catch(err => reject(err));
    },
    playSound: function (e) {
        console.log("ddd");
        console.log(e);
        this.setData({
            url: e.currentTarget.dataset.url,
        });
        this.audioCtx.play()
    },
    handlePlay: function (e) {
        this.setData({
            url: e.currentTarget.dataset.url,
            cstatus: e.currentTarget.dataset.id
        });
        this.audioCtx.play()
    },
    handleStop: function () {
        this.audioCtx.pause();
        this.setData({
            cstatus: null
        });
    },
    search: function (e) {
        let word = e.target.dataset.word;
        let index = e.target.dataset.index;
        let _this = this;
        let appKey = '3dab2396ab7ca4f9';
        let key = 'FSugZEbevvhW9cJux2qoD5ME8VFF7Bai';
        let salt = (new Date).getTime();
        let from = '';
        let to = 'zh-CHS';
        let query =this.palindrome(word);
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
                console.log(res.data.errorCode);
                if (res.data.errorCode == 301) {
                    tips.showSuccess("查词失败!");
                } else {
                    res.data['cuk'] = null;
                    res.data['cuks'] = null;
                    res.data['cus'] = null;
                    res.data['cuss'] = null;
                    res.data['cuk'] = res.data.basic['uk-phonetic'];
                    res.data['cuks'] = res.data.basic['uk-speech'];
                    res.data['cus'] = res.data.basic['us-phonetic'];
                    res.data['cuss'] = res.data.basic['us-speech'];
                    _this.setData({
                        query: res.data,
                        visible: true
                    });
                }
            }
        })
    },
    handleWord: function (e) {
        let _this = this;
        let session = Session.get();
        Api.QuestionNewWord({
            uid: session.uid,
            word: e.currentTarget.dataset.word
        }).then((data) => {
            tips.showSuccess(data.errdesc);
            _this.setData({
                visible: false
            });
            resolve();
        }).catch(err => reject(err));
    },
    handleCancel: function () {
        this.setData({
            visible: false
        });
    },
    audioEnd:function(){
        this.setData({
            cstatus: null
        });
    },
    has_collect:function(){
        let session = Session.get();
        Api.QHCollect({
            uid: session.uid,
            qid: this.data.id,
            type:this.data.data.question_type_id,
        }).then((data) => {
            this.setData({
                collect:data.collect,
            });
            resolve();
        }).catch(err => reject(err));
    },
    palindrome:function(str){
        var arr = str.split("");
        console.log(arr);
        arr = arr.filter(function(val) {
           return (val !== " " && val !== "," && val !== "." && val !== "?" && val !== ":" && val !== ";" && val !== "`" && val !== "'" && val !== "_" &&  val !== "/" && val !== "-" && val !== "\\" && val !== "" && val !== "\(" && val !== "\)");
        });
        return arr.join("");
    }
});