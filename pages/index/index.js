const Api = require('../../config/method');
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad: function () {
    this.handleDate();
  },
  handleDate: function(e) {
    let _this=this;
    Api.list({}).then(({ data }) => {
        _this.setData({
          list: data
        });
        resolve();
    }).catch(err => reject(err));
  }
})
