const Api = require('../../config/method');
const app = getApp()

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

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

    // 获取access_token
    wx.request({
      url: 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=你的自己的appid&secret=你自己的session_key',
      method: "GET",
      success: function (res) {
        console.log(res, "res")
        console.log(res.data.access_token, "access_token")
        that.setData({
          access_token: res.data.access_token,
        })
      }
    })

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
  onShareAppMessage: function () {

  },
  handleDate: function () {
    let _this = this;
    Api.list({
      page: _this.data.page,
      per_page: 4,
    }).then(({ data }) => {
      let newList = _this.data.list;
      newList = newList.concat(data);
      _this.setData({
        list: newList
      });
      resolve();
    }).catch(err => reject(err));
  },
  // 点击执行方法
  form: function (e) {
    var that = this;
    var fId = e.detail.formId;
    // 网络请求
    var l = 'https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token=' + that.data.access_token;
    // 需要传的参数
    var d = {
      touser: that.data.openid, //用户的openid
      template_id: 'XX1hceIwI1XiQaUc5Z4qIrZnYQkYEHElSq5m6yIa0M8',//这个是申请的模板消息id，位置在微信公众平台/模板消息中添加并获取
      page: '/pages/index/index', //点击通知跳转的页面
      form_id: fId, //表单提交场景下，为 submit 事件带上的 formId

      //此处必须为data,只有人说value也可以,可能官方已经修复这个bug
      data: {
        "keyword1": {
          "value": "酒店",
          "color": "#4a4a4a"
        },
        "keyword2": {
          "value": "2018-03-22",
          "color": "#9b9b9b",
        },
        "keyword3": {
          "value": "$300",
          "color": "#9b9b9b"
        },
        "keyword4": {
          "value": "中国",
          "color": "#9b9b9b"
        },
      },
      color: '#ccc',
      emphasis_keyword: 'keyword1.DATA'
    }
    wx.request({
      url: l,
      data: d,
      method: 'POST', //此处不能有请求头
      success: function (res) {
        console.log(res, "push msg");
      },
      fail: function (err) {
        console.log(err, "push err");
      }
    });
  },

})
