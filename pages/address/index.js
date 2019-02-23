const Api = require('../../config/method');
const app = getApp();
const Session = require('../../common/auth/session');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:[
      {
        id:1,
        name:"刘三毛",
        phone:"18360172424",
        province:"江苏省",
        city:"宿迁市",
        area:"宿豫区",
        detail:"花果山水帘洞花果山水帘洞花果山水帘洞花果山水帘洞花果山水帘洞",
      },
      {
        id:2,
        name:"刘三毛",
        phone:"18360172424",
        province:"江苏省",
        city:"宿迁市",
        area:"宿豫区",
        detail:"花果山水帘洞花果山水帘洞花果山水帘洞花果山水帘洞花果山水帘洞",
      }
    ],
    default:1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.initDate();
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
  /***
   * init data;
   */
  initDate:function(){
    let session=Session.get();
    let _this=this;
    Api.addressList({
      openid:session.openid
    }).then(( data ) => {
        _this.setData({
          address: data.data
        });
        resolve();
    }).catch(err => reject(err));
  },
  onSexClick:function(e){
    let _this=this;

    console.log(e.target.dataset.id);
    _this.setData({
      default:e.target.dataset.id
    });
  }
})