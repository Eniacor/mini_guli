// pages/order/index.js
const Api = require('../../config/method');
const orderStatus = require('../../config/orderStatus.config');
const moment = require('../../common/utils/moment');
const orderListStore = require('../../common/store/orderListStore');
const Session = require('../../common/auth/session');
const tips = require('../../common/tips');

Page({
  data: {
    page: 1,
    loading: false,
    noData: false,
    allData: false,
    list: []
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    console.log('options',options)
    let status = options.status;
    orderListStore.clear();
    let userSession = Session.get() || {};
    if(userSession.uid){
        this.init(status);
    } else {
      orderListStore.set({ is_reload: true });
      tips.showAction('系统提示','您未绑定手机号，需要去绑定手机号码？',()=>{
          let url = '/pages/bindPhone/bindPhone?from=' + encodeURIComponent('pages/order/index');
          wx.navigateTo({ url })
      });
    }
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
    let session = orderListStore.get() || {};
    let userSession = Session.get() || {};
    if (userSession.uid && session.is_reload) {
      this.setData({
        page: 1,
        loading: false,
        noData: false,
        allData: false,
        list: []
      });
      this.init();
      orderListStore.set({ is_reload: false });
    } else if (!userSession.uid){
        tips.showAction('系统提示', '您未绑定手机号，需要去绑定手机号码？', () => {
            let url = '/pages/bindPhone/bindPhone?from=' + encodeURIComponent('pages/order/index');
            wx.navigateTo({ url })
        });
    }
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  onReachBottom: function () {
    this.getOrderList()
  },
  init: function (status) {
    this.getOrderList(status);
  },
  getOrderList: function (status) {
    let self = this;
    let { page, loading, noData, allData, list } = self.data;
    if (loading || noData || allData) return;
    self.setData({ loading: true });
    return new Promise((resolve, reject) => {
      Api.OrderList({ page,type:status }).then((json) => {
        let { all_page, order = [] } = json.data;
        order = order.map(d => {
          d.create_time = moment.format(d.create_time, 'YYYY-MM-DD HH:mm:ss');
          d.status_str = orderStatus[d.process_status]
          return d;
        })
        if (all_page == 0) {
          self.setData({ loading: false, noData: true });
        } else {
          if (page == all_page) {
            self.setData({ allData: true });
          }
          let l = [...list, ...order];
          page++;
          self.setData({
            page,
            loading: false,
            list: l
          });
        }
        resolve();
      }).catch(err => reject(err));
    });
  },
  onTapPay: function (e) {
    // 去支付
    let self = this;
    let { index } = e.currentTarget.dataset;
    let { list } = self.data;
    let { id } = list[index];
    wx.navigateTo({
      url: `/pages/orderDetail/orderDetail?id=${id}`
    });
  },
  onTapCancelOrder: function (e) {
    // 取消订单
    let self = this;
    let { index } = e.currentTarget.dataset;
    let { list } = self.data;
    let { id } = list[index];
    tips.showConfirm('系统提示', '确认取消订单吗？', () => {
      Api.OrderCancel({ id }).then(({ data }) => {
        list.splice(index, 1);
        self.setData({ list });
      });
    })
  },
  onTapApplyBackMoney: function (e) {
    // 申请退款
    let self = this;
    let { index } = e.currentTarget.dataset;
    let { list } = self.data;
    let { id } = list[index];
    tips.showConfirm('系统提示', '确认申请退款吗？', () => {
      Api.OrderRefund({ id, remark: '小程序' }).then(({ data }) => {
        list[index].process_status = data;
        list[index].status_str = orderStatus[data];
        self.setData({ list });
      })
    });
  },
  onTapExpressInfo: function (e) {
    // 物流信息
    let self = this;
    let { index } = e.currentTarget.dataset;
    let { list } = self.data;
    let { id } = list[index];
    wx.navigateTo({
      url: `/pages/express/express?id=${id}`
    });
  },
  onTapConfirmGet: function (e) {
    // 确认收货
    let self = this;
    let { index } = e.currentTarget.dataset;
    let { list } = self.data;
    let { id } = list[index];
    tips.showConfirm('系统提示', '确认收货吗？', () => {
      Api.OrderGet({ id }).then(({ data }) => {
        list[index].process_status = data;
        list[index].status_str = orderStatus[data];
        self.setData({ list });
      });
    });
  },
  onTapApplyBackGoods: function (e) {
    // 申请退货
    let self = this;
    let { index } = e.currentTarget.dataset;
    let { list } = self.data;
    let { id } = list[index];
    tips.showConfirm('系统提示', '确认申请退货吗？', () => {
      Api.OrderRefundGood({ id, remark: '小程序' }).then(({ data }) => {
        list[index].process_status = data;
        list[index].status_str = orderStatus[data];
        self.setData({ list });
      })
    });
  },
  onTapWriteEvaluation: function (e) {
    // 撰写评价
    let self = this;
    let { index } = e.currentTarget.dataset;
    let { list } = self.data;
    let { id } = list[index];
    wx.navigateTo({
      url: `/pages/evaluationGoods/evaluationGoods?id=${id}`
    });
  },
  onTapGotoUpExpress: function (e) {
    // 提交物流
    let self = this;
    let { index } = e.currentTarget.dataset;
    let { list } = self.data;
    let { id } = list[index];
    wx.navigateTo({
      url: `/pages/orderBackInfo/orderBackInfo?id=${id}`
    });
  }
})
