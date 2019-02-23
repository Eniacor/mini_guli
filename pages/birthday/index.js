Page({
  /**
   * 页面的初始数据
   */
  data: {
    currentDate: new Date().getTime(),
    minDate:'1970-01-01',
    show:false,
    columns: ['白羊座', '金牛座', '双子座', '巨蟹座', '狮子座','处女座', '天秤座', '天蝎座', '射手座', '摩羯座','水瓶座', '双鱼座']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
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

  onChange(event) {
    this.setData({
      currentDate: event.detail.value
    });
  },
  onClose() {
    this.setData({ show: false });
  },
  /**
   * 关闭弹出层
   * @param {*} 
   * @return
   */
  onPopupOpen() {
    this.setData({ show: true });
  },
})