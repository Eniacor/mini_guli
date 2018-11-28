const Api = require('../../config/method');
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    page:1,
    list:[],
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.handleDate();
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
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    let newPage=this.data.page;
    newPage=newPage+1;
    this.setData({
      page:newPage,
    });
    this.handleDate();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  handleDate: function() {
    let _this=this;
    Api.list({
      page:_this.data.page,
      per_page:4,
    }).then(({ data }) => {
        let newList=_this.data.list;
        newList=newList.concat(data);
        _this.setData({
          list:newList
        });
        resolve();
    }).catch(err => reject(err));
  },
})
