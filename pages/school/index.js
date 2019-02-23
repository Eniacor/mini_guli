const Api = require('../../config/method');
const Session = require('../../common/auth/session');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    all: 0,
    my: 0,
    zhong: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this;
    let session = Session.get();
    Api.awardAll({
      openid: session.openid,
    }).then(({ data }) => {
      _this.setData({
        all: data.length
      });
      resolve();
    }).catch(err => reject(err));

    Api.awardMy({
      openid: session.openid,
    }).then(({ data }) => {
      _this.setData({
        my: data.length
      });
      resolve();
    }).catch(err => reject(err));

    Api.awardZhong({
      openid: session.openid,
    }).then(({ data }) => {
      _this.setData({
        zhong: data.length
      });
      resolve();
    }).catch(err => reject(err));
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
  onSexChange:function(e){
    console.log(e);
  },
  onSexClick:function(e){
    let _this=this;
    console.log(e.target.dataset.name);
    
    _this.setData({
      radio: e.target.dataset.name
    });
  }
})