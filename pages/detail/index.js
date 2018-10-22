const Api = require('../../config/method');
const app = getApp()
Page({
  data: {
    id:'',
    detail:null,
  },
  onLoad: function (options) {
    let _this=this;
    _this.handleDate(options.id);
  },
  handleDate: function(id) {
    let _this=this;
    Api.detail({
      id:id,
    }).then(({ data }) => {
        _this.setData({
          detail: data,
          id:id,
        });
        resolve();
    }).catch(err => reject(err));
  }
})
