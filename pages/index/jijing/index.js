
const app = getApp();
Page({
    data: {},
    onHide() {},
    onShow() {},
    deleteImage: function (e) {
        var that = this;
        var images = that.data.images;
        var index = e.currentTarget.dataset.index; //获取当前长按图片下标
        wx.showModal({
            title: '提示',
            content: '确定要删除此图片吗？',
            success: function (res) {
                if (res.confirm) {
                    console.log('点击确定了');
                    images.splice(index, 1);
                } else if (res.cancel) {
                    console.log('点击取消了');
                    return false;
                }
                that.setData({
                    images
                });
            }
        })
    }
})