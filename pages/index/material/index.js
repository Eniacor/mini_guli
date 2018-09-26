const tips = require('../../../common/tips');
const Api = require('../../../config/method');
const Session = require('../../../common/auth/session')
const WxParse = require('../../../common/component/wxParse/wxParse');
const app = getApp()
Page({
    /**
     * 页面的初始数据
     */
    data: {
        email:'',
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
       this.handleIs();
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {},
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

        console.log(app);
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
    onPullDownRefresh: function () {
        wx.stopPullDownRefresh();
    },
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
    // skipPage:app.skipPage,
    skipPage: app.skipPage,
  
    bindChildrenChange: function (e) {
        this.setData({
            cindex: e.detail.value
        })
    },
    handleEmail:function(e){
        this.setData({
            email: e.detail.value
        })
    },
    handleLing:function(){
        let session=Session.get();
        let mailReg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
        if(this.data.email){
            if(!mailReg.test(this.data.email)){
                tips.showWarning('错误提示', "邮箱格式不正确!");   
                return;
            }
        }else{
            tips.showWarning('错误提示', "邮箱不能为空!");   
            return;
        }
        Api.Apply({
            openid:session.openid,
            email:this.data.email
        }).then(( data ) => {
            tips.showSuccess('发送成功!');
            setTimeout(() => {
                wx.switchTab({
                    url: '/pages/index/index'
                });
            }, 1000);
            resolve();
        }).catch(err => reject(err));
    },
    handleIs:function(){
        let _this=this;
        Api.VipText({}).then(({ data }) => {
            let content =data.content;
            let answer =data.answer;
            WxParse.wxParse('content', 'html', content, _this, 5);
            WxParse.wxParse('answer', 'html', answer, _this, 5);
            _this.setData({
                score:data
            });
            resolve();
        }).catch(err => reject(err));
    }
});