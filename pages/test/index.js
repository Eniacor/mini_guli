const app = getApp()
Page({
    data: {
        imageArr: [],
        deleteImg: [],
        latitude: '',
        longitude: '',
        showModal: false,
        value1: 1,
        value2: '',
        value3: '',
    },

    onLoad: function () {},
    /**
     * 弹窗
     */
    showDialogBtn: function () {
        this.setData({
            showModal: true
        })
    },
    /**
     * 弹出框蒙层截断touchmove事件
     */
    preventTouchMove: function () {},
    /**
     * 隐藏模态对话框
     */
    hideModal: function () {
        this.setData({
            showModal: false
        });
    },
    /**
     * 对话框取消按钮点击事件
     */
    onCancel: function () {
        this.hideModal();
    },
    /**
     * 对话框确认按钮点击事件
     */
    onConfirm: function () {
        this.hideModal();
    },
    onLoad: function () {},
    chooseImg: function () {
        var that = this;
        wx.chooseImage({
            count: '', // 默认9
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function (res) {
                // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                for (var i = 0; i < res.tempFilePaths.length; i++) {
                    if (that.data.imageArr.length < 9) {
                        that.data.imageArr.push(res.tempFilePaths[i]);
                    }
                }
                console.log(that.data.imageArr);
                that.setData({
                    imageArr: that.data.imageArr,
                })
            }
        })
    },
  
    deleteImg: function (e) {
        var that = this;
        var imageArr = that.data.imageArr;
        var index = e.currentTarget.dataset.index; //获取当前长按图片下标
        wx.showModal({
            title: '提示',
            content: '确定要删除此图片吗？',
            success: function (res) {
                if (res.confirm) {
                    console.log('点击确定了');
                    imageArr.splice(index, 1);
                } else if (res.cancel) {
                    console.log('点击取消了');
                    return false;
                }
                that.setData({
                    imageArr: that.data.imageArr,
                });
            }
        })
    },

    onLoad: function () {
        this.getLoaction();
    },
    getLoaction: function () {
        var self = this;
        wx.getLocation({
            type: 'wgs84',
            success: function (res) {
                var latitude = res.latitude // 经度
                var longitude = res.longitude // 纬度
                // console.log(latitude);
                // console.log(longitude);
                self.setData({
                    latitude: latitude,
                    longitude: longitude
                })
                self.loadCity(latitude, longitude)
            }
        })
    },
    loadCity: function (longitude, latitude) {
        var page = this;
        var latitude = this.data.latitude;
        var longitude = this.data.longitude;
        wx.request({
            url: 'https://api.map.baidu.com/geocoder/v2/?ak=5iAsHDItP8SnU85BGttCfreSvSwOZf3U&location=' + latitude + ',' + longitude + '&output=json',
            data: {},
            header: {
                'Content-Type': 'application/json'
            },
            success: function (res) {
                // success    
                console.log(res);
                var city = res.data.result.addressComponent.city;
                page.setData({
                    currentCity: city
                });

            },
            fail: function () {
                page.setData({
                    currentCity: "获取定位失败"
                });
            },

        })
    },
    handleChange1({detail}) {
        this.setData({
            value1: detail.value
        })
    },

    handleChange2({detail}) {
        this.setData({
            value2: detail.value
        })
    }

})