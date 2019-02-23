const Api = require('../../config/method');
const Session = require('../../common/auth/session');
const app = getApp()
Page({
  data: {
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // let _this = this;
    // console.log(options);
    // let nickName=options.nickName;
    // let avatarUrl=options.avatarUrl;
    // let {nickname,avatar_url}=options;
    // _this.setData({
    //   nickname:nickname,
    //   avatar_url:avatar_url,
    // });
    // _this.handleData(options.id);
    // _this.handleHas(options.id);
    // _this.handleList(options.id);
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
    　var that = this;
    　　// 设置菜单中的转发按钮触发转发事件时的转发内容
    　　var shareObj = {
    　　　　title: "活动推手",        // 默认是小程序的名称(可以写slogan等)
    　　　　path: '/pages/add/index',        // 默认是当前页面，必须是以‘/’开头的完整路径
    　　　　imgUrl: '',     //自定义图片路径，可以是本地文件路径、代码包文件路径或者网络图片路径，支持PNG及JPG，不传入 imageUrl 则使用默认截图。显示图片长宽比是 5:4
    　　　　success: function(res){
    　　　　　　// 转发成功之后的回调
    　　　　　　if(res.errMsg == 'shareAppMessage:ok'){
                console.log("huodong");
    　　　　　　}
    　　　　},
    　　　　fail: function(){
    　　　　　　// 转发失败之后的回调
    　　　　　　if(res.errMsg == 'shareAppMessage:fail cancel'){
    　　　　　　　　// 用户取消转发
    　　　　　　}else if(res.errMsg == 'shareAppMessage:fail'){
    　　　　　　　　// 转发失败，其中 detail message 为详细失败信息
    　　　　　　}
    　　　　},
    　　}
    　　// 来自页面内的按钮的转发
    　　if( options.from == 'button' ){
    　　　　var eData = options.target.dataset;
    　　　　console.log( eData.name );     // shareBtn
    　　　　// 此处可以修改 shareObj 中的内容
    　　　　shareObj.path = '/pages/btnname/btnname?btn_name='+eData.name;
    　　}
    　　// 返回shareObj
    　　return shareObj;
  },

  handleData: function (id) {
    let _this = this;
    Api.detail({
      id: id,
    }).then(({ data }) => {
      _this.setData({
        detail: data,
        id: id,
      });
      resolve();
    }).catch(err => reject(err));
  },
  handleHas: function (id) {
    let _this = this;
    let session = Session.get();
    Api.joinHas({
      openid: session.openid,
      aid: id,
    }).then((data) => {
      if (data.errdesc) {
        _this.setData({
          isTrue: data.errdesc
        });
      }
      resolve();
    }).catch(err => reject(err));
  },
  handleDo: function (e) {
    let _this = this;
    let session = Session.get();
    let id = e.target.dataset.id;
    Api.joinAdd({
      openid: session.openid,
      nickname:_this.data.nickname,
      avatar_url: _this.data.avatar_url,
      award_id: _this.data.id,
      formid:e.detail.formId,
    }).then((data) => {
      if (data.errno == 0) {
        // // _this.handleHas(id);
        // _this.onLoad()
        _this.setData({
          isTrue: true
        });
      }
      resolve();
    }).catch(err => reject(err));
  },
  handleList: function (id) {
    let _this = this;
    Api.joinList({
      aid: id
    }).then((data) => {
      if (data.errno == 0) {
        _this.setData({
          join: data.data
        });
      }
      resolve();
    }).catch(err => reject(err));
  },
  handleToPage: function () {
    wx.switchTab({
      url: '/pages/index/index'
    })
  },
  copyTBL: function (e) { 
    var self = this;
    wx.setClipboardData({
      data: self.data.detail.wechat,
      success: function (res) {
      }
    });
  },
})
