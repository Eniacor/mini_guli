const tips = require('../../common/tips');
const Api = require('../../config/method');
const Session = require('../../common/auth/session')
const app =getApp();
const api = require('../../config/api.config');

Page({
    /**
     * 页面的初始数据
     */
    data: {
        imgUrls: [],
        indicatorDots:true,
        autoplay:true,
        interval: 5000,
        duration: 1000
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
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
    handleData:function(){
        let _this=this;
        Api.Fbanner({
        }).then(({ data }) => {
            console.log(data);
            _this.setData({
                imgUrls:data
            });
            resolve();
        }).catch(err => reject(err));
    }
  
});
