import areaList from '../../../common/utils/address.js';
const Api = require('../../../config/method');
const Session = require('../../../common/auth/session');

Page({
  /**
   * 页面的初始数据
   */
  data: {
    username: '',
    phone: '',
    province: '',
    city: '',
    area: '',
    address: '',
    post: '',
    show: false,
    areaList: null,
    checked:true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      areaList: areaList
    })
    console.log(areaList);
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
   * 关闭弹出层
   * @param {*} 
   * @return
   */
  onPopupOpen() {
    this.setData({ show: true });
  },
  /**
   * 关闭弹出层
   * @param {*} 
   * @return
   */
  onClose() {
    this.setData({ show: false });
  },
  /**
   * 确认地址
   * @param {*}
   * @return {Array} list
   */
  onAreaConfirm: function (e) {
    this.setData({
      province: e.detail.values[0].name,
      city: e.detail.values[1].name,
      area: e.detail.values[2].name,
      show: false
    });
  },
  /**
   * 取消地址
   * @param {*} e 
   * @return
   */
  onAreaCancel: function (e) {
    this.setData({
      show: false
    });
  },
  /**
   * 收件姓名
   * @param {*} e 
   * @return
   */
  onChangeName(event) {
    this.setData({
      username: event.detail
    })
  },
  /**
   * 收件手机号
   * @param {*} e 
   * @return
   */
  onChangPhone(event) {
    console.log(event);
    this.setData({
      phone: event.detail
    })
  },
  /**
   * 收件地址
   * @param {*} e 
   * @return
   */
  onChangAddress(event) {
    this.setData({
      address: event.detail
    })
  },
  /**
   * 收件地址
   * @param {*} e 
   * @return
   */
  onChangPost(event) {
    this.setData({
      post: event.detail
    })
  },
  handleData: function () {
    let _this = this;
    let session=Session.get();
    let ndata = {
      'name': _this.data.username,
      'phone': _this.data.phone,
      'province': _this.data.province,
      'city': _this.data.city,
      'area': _this.data.area,
      'address': _this.data.address,
      'post': _this.data.post,
      'default': _this.data.default,
      'openid':session.openid,
    }
    Api.addressAdd(
      ndata
    ).then((data) => {
      console.log(data.errno);
      if(data.errno==0){
        wx.navigateTo({
          url: '/pages/address/index'
        })
      }
      resolve();
    }).catch(err => reject(err));
  },
  onChangeDefault:function(){
    let bool=!this.checked;
    this.setData({
      checked:bool
    });
  }
})