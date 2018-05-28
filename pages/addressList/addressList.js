// pages/addressList/addressList.js
const Api = require("../../config/method.js");
const tips = require('../../common/tips.js');
Page({
  data: {
    list: [],
    loadEnd: false,
    from: '',
    o_id: 0
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    let { o_id, from } = options;
    this.setData({ from, o_id });
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
    this.init();
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  init: function () {
    let self = this;
    self.getAddressList()
      .then(() => self.setData({ loadEnd: true }));
  },
  getAddressList: function () {
    let self = this;
    return new Promise((resolve, reject) => {
      Api.AddressLists().then(({ data }) => {
        self.setData({
          list: data
        });
        resolve();
      }).catch(err => reject(err));
    });
  },

  onClickDel: function (e) {
    let self = this;
    let { id } = e.currentTarget.dataset;
    tips.showConfirm('系统提示', '确认删除吗？', () => {
      self.addressDel(id).then(() => {
        self.getAddressList();
      })
    });
  },
  addressDel: function (id) {
    return new Promise((resolve, reject) => {
      Api.AddressDel({ id })
        .then(() => resolve())
        .catch(err => reject(err));
    });
  },
  onTapSelectAddress: function (e) {
    let self = this;
    let { from, o_id } = self.data;
    let { id } = e.currentTarget.dataset;
    if (from == 'confirm') {
      Api.OrderUpdateAddress({ id: o_id, ship_address_id: id }).then(() => {
        wx.navigateBack();
      });
    }
  }
})
