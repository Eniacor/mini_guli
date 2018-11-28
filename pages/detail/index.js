const Api = require('../../config/method');
const Session = require('../../common/auth/session');
const app = getApp()
Page({
  data: {
    id: '',
    detail: null,
    isTrue: false,
    join: null
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this;
    _this.handleData(options.id);
    _this.handleHas(options.id);
    _this.handleList(options.id);
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
      nickname: e.detail.userInfo.nickName,
      avatar_url: e.detail.userInfo.avatarUrl,
      award_id: id
    }).then((data) => {
      if (data.errno == 0) {
        _this.handleHas(id);
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
  }
})
