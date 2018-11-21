const Api = require('../../config/method');
const Session = require('../../common/auth/session');
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initData(options.type);
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
  initData: function (type) {
    let _this = this;
    let session = Session.get();
    if (type == 1) {
      Api.awardAll({
        openid: session.openid,
      }).then(({ data }) => {
        for(let i=0;i<data.length;i++){
          data[i].addtime=_this.fmtDate(data[i].addtime).slice(0,10);
        }
        _this.setData({
          list: data
        });
        resolve();
      }).catch(err => reject(err));
    } else if (type == 2) {
      Api.awardMy({
        openid: session.openid,
      }).then(({ data }) => {
        for(let i=0;i<data.length;i++){
          data[i].addtime=_this.fmtDate(data[i].addtime).slice(0,10);
        }
        _this.setData({
          list: data
        });
        resolve();
      }).catch(err => reject(err));
    } else {
      Api.awardZhong({
        openid: session.openid,
      }).then(({ data }) => {
        for(let i=0;i<data.length;i++){
          data[i].addtime=_this.fmtDate(data[i].addtime).slice(0,10);
        }
        _this.setData({
          list: data
        });
        resolve();
      }).catch(err => reject(err));
    }
  },
  fmtDate: function (unixtimestamp) {
    var unixtimestamp = new Date(unixtimestamp*1000);
    var year = 1900 + unixtimestamp.getYear();
    var month = "0" + (unixtimestamp.getMonth() + 1);
    var date = "0" + unixtimestamp.getDate();
    var hour = "0" + unixtimestamp.getHours();
    var minute = "0" + unixtimestamp.getMinutes();
    var second = "0" + unixtimestamp.getSeconds();
    return year + "-" + month.substring(month.length-2, month.length)  + "-" + date.substring(date.length-2, date.length)
        + " " + hour.substring(hour.length-2, hour.length) + ":"
        + minute.substring(minute.length-2, minute.length) + ":"
        + second.substring(second.length-2, second.length);
  }
})