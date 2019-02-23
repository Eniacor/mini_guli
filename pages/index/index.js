const Api = require('../../config/method');
const app = getApp();
const Session = require('../../common/auth/session');

Page({
  data: {
    active: 0,
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    intro:false,  //是否显示介绍
    code:false,   //是否显示二维码
    search:true   //是否显示搜索框
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
   
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
    // let newPage = this.data.page;
    // newPage = newPage + 1;
    // this.setData({
    //   page: newPage,
    // });
    // this.handleDate();
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function( options ){
    // 　　var that = this;
    // 　　// 设置菜单中的转发按钮触发转发事件时的转发内容
    // 　　var shareObj = {
    // 　　　　title: "活动推手",        // 默认是小程序的名称(可以写slogan等)
    // 　　　　path: '/pages/add/index',        // 默认是当前页面，必须是以‘/’开头的完整路径
    // 　　　　imgUrl: '',     //自定义图片路径，可以是本地文件路径、代码包文件路径或者网络图片路径，支持PNG及JPG，不传入 imageUrl 则使用默认截图。显示图片长宽比是 5:4
    // 　　　　success: function(res){
    // 　　　　　　// 转发成功之后的回调
    // 　　　　　　if(res.errMsg == 'shareAppMessage:ok'){
    //             console.log("huodong");
    // 　　　　　　}
    // 　　　　},
    // 　　　　fail: function(){
    // 　　　　　　// 转发失败之后的回调
    // 　　　　　　if(res.errMsg == 'shareAppMessage:fail cancel'){
    // 　　　　　　　　// 用户取消转发
    // 　　　　　　}else if(res.errMsg == 'shareAppMessage:fail'){
    // 　　　　　　　　// 转发失败，其中 detail message 为详细失败信息
    // 　　　　　　}
    // 　　　　},
    // 　　}
    // 　　// 来自页面内的按钮的转发
    // 　　if( options.from == 'button' ){
    // 　　　　var eData = options.target.dataset;
    // 　　　　console.log( eData.name );     // shareBtn
    // 　　　　// 此处可以修改 shareObj 中的内容
    // 　　　　shareObj.path = '/pages/btnname/btnname?btn_name='+eData.name;
    // 　　}
    // 　　// 返回shareObj
    // 　　return shareObj;
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
  handlePage:function(e){
    wx.navigateTo({
      url: '/pages/detail/index?id='+e.target.dataset.id+'&nickname='+e.detail.userInfo.nickName+'&avatar_url='+e.detail.userInfo.avatarUrl,
    })
  },
  onChange(event) {
    wx.showToast({
      title: `切换到标签 ${event.detail.index + 1}`,
      icon: 'none'
    });
  },
  //弹出介绍信息
  onPopupIntro:function(e){
    this.setData({
      intro:!this.data.intro,
    });
  },
  //弹出/关闭搜索信息
  onPopupSearch:function(e){
    this.setData({
      search:!this.data.search,
    });
  },
  //弹出/关闭二维码信息
  onPopupCode:function(e){
    this.setData({
      code:!this.data.code,
    });
  },
})
