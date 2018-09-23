const app = getApp();
const tips = require('../../../../common/tips.js');
// const md5 = require('../../common/utils/md5.js');
const Api = require("../../../../config/method.js");
Page({
    /**
     * 页面的初始数据
     */
    data: {
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
        name: '',
        wechat: '',
        mobile: '',
        remark: '',
        has_experience: 1,

        imageArr: [],
        deleteImg: [],
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {},
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

    skipPage: app.skipPage,

    radioPteChange: function (e) {
        this.setData({
            has_experience: e.detail.value
        })
    },

    getName: function (e) {
        this.setData({
            name: e.detail.value
        })
    },
    getWechat: function (e) {
        this.setData({
            wechat: e.detail.value
        })
    },
    getNumber: function (e) {
        this.setData({
            mobile: e.detail.value
        })
    },

    getRemark: function (e) {
        this.setData({
            remark: e.detail.value
        })
    },


    sendUserInfo: function (e) {
        let name = this.isEmptyValue(this.data.name, '请输入您的真实姓名！', '');
        let wechat = this.isEmptyValue(this.data.wechat, '请输入您的微信号!','');
        let mobile = this.isEmptyValue(this.data.mobile, '请输入您的手机号！','');
        if (name && wechat && mobile) {
            Api.ReserveReport({
                uid: 1,
                tid: 1,
                name:this.data.name,
                wechat: this.data.wechat,
                tel: this.data.mobile,
                test: this.data.has_experience,
                remark: this.data.remark
            }).then((data) => {
                if (data.errno == 0 && this.data.imageArr.length > 0) {
                    for (let i = 0; i < this.data.imageArr.length; i++) {
                        console.log(this.data.imageArr[i]);
                        wx.uploadFile({
                            url: 'https://a.squmo.com/wenbo/ReserveReport/image', //仅为示例，非真实的接口地址
                            filePath:this.data.imageArr[i],
                            name: 'img',
                            formData: {
                                'id': data.id
                            },
                            success: function (res) {
                                //do something
                            },
                            fail:function(res){
                                console.log(res);
                                tips.showModel('网络异常', "图片上传失败!");
                            }
                        })
                    }
                }
                wx.navigateBack({delta: '/pages/index/teacher/detail/index'}) //关闭
                
                resolve();
             
            }).catch(err => reject(err));
        }
    },
    isEmptyValue: function (value, errMsg, verified) {
        if (value == verified) {
            tips.showWarning('错误', errMsg);
            return false;
        } else {
            return true;
        }
    },
    chooseImg: function () {
        var that = this;
        wx.chooseImage({
            count: '', // 默认9
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function (res) {
                // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                for (var i = 0; i < res.tempFilePaths.length; i++) {
                    if (that.data.imageArr.length < 3) {
                        that.data.imageArr.push(res.tempFilePaths[i]);
                    }
                }
                console.log(that.data.imageArr);
                that.setData({
                    imageArr: that.data.imageArr,
                })
            }
        })
    },
    deleteImg: function (e) {
        var that = this;
        var imageArr = that.data.imageArr;
        var index = e.currentTarget.dataset.index; //获取当前长按图片下标
        wx.showModal({
            title: '提示',
            content: '确定要删除此图片吗？',
            success: function (res) {
                if (res.confirm) {
                    console.log('点击确定了');
                    imageArr.splice(index, 1);
                } else if (res.cancel) {
                    console.log('点击取消了');
                    return false;
                }
                that.setData({
                    imageArr: that.data.imageArr,
                });
            }
        })
    },
});