const Api = require('../../config/method');
const app = getApp();
const Session = require('../../common/auth/session');

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    page: 1,
    list: [],
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
      // 获取access_token
      // wx.request({
      //   url: 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=你的自己的appid&secret=你自己的session_key',
      //   method: "GET",
      //   success: function (res) {
      //     console.log(res, "res")
      //     console.log(res.data.access_token, "access_token")
      //     that.setData({
      //       access_token: res.data.access_token,
      //     })
      //   }
      // })
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
    this.setData({
      page: 1,
      list: []
    });
    this.handleDate();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    let _this = this;
    _this.setData({
      list: []
    });
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
    let newPage = this.data.page;
    newPage = newPage + 1;
    this.setData({
      page: newPage,
    });
    this.handleDate();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function( options ){
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
  handleDate: function () {
    let _this = this;
    Api.list({
      page: _this.data.page,
      per_page: 4,
    }).then(({ data }) => {

      if(data.errdesc!='获取数据失败!'){
        let newList = _this.data.list;
        newList = newList.concat(data);
        _this.setData({
          list: newList
        });
      }
      resolve();
    }).catch(err => reject(err));
  },
  // 点击执行方法
  form: function (e) {
    var that = this
    let session=Session.get();
    wx.request({
      url: "https://www.wyoumai.com/api.php/Weicall/access_token",
      data: {
        "form_id": e.detail.formId,
        "openid":session.openid,
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded' 
      },
      success: function (res) {
        console.log(res.data)
      },
      fail: function(e){
      }
    })
  },
})
