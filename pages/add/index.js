const app = getApp()

Page({
  data: {
    type: 1,
    date: '请选择开奖时间',
    show: false,
    title: '',
    number: '',
    tnumber: '',
    imageArr: 'https://cdn.wyoumai.com/1540200968769578433.png',
    wechat:'',
  },
  onLoad: function () {},
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  handleClose(e) {
    this.setData({
      show: false
    });
  },
  handleType(e) {
    this.setData({
      show: false
    });
    this.setData({
      type: e.target.dataset.type
    });
  },
  handleOpen() {
    this.setData({
      show: true
    });
  },
  handleATitle(e) {
    this.setData({
      title: e.detail
    });
  },
  handleANuber(e) {
    this.setData({
      number: e.detail
    });
  },
  handleTNumber(e) {
    this.setData({
      tnumber: e.detail
    });
  },
  handleChoose: function () {
    let that = this;
    wx.chooseImage({
      count: '', // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        that.setData({
          imageArr: res.tempFilePaths[0],
        })
      }
    })
  },
  handleData: function () {
    let _this=this;
    let data={
      'name': _this.data.title,
      'num':_this.data.number,
      'way':_this.data.type,
      'wechat':_this.data.wechat,
    }
    if(_this.data.type==1){
      let date = new Date(_this.data.date);
      data['wayname']='自动开奖'
      data['time']= date.getTime();
    }else if(_this.data.type==2){
      data['wayname']='人数开奖'
      data['time']=0;
    }else if(_this.data.type==3){
      data['wayname']='手动开奖'
      data['time']=0;
    }else{
      data['wayname']='现场开奖'
      data['time']=0;
    }
    wx.uploadFile({
      url: 'https://www.wyoumai.com/api.php/Award/add', //仅为示例，非真实的接口地址
      filePath: this.data.imageArr,
      name: 'img',
      formData:data,
      success: function (res) {
        console.log(res);
      },
      fail: function (res) {
        tips.showModel('网络异常', "图片上传失败!");
      }
    })
  }
})