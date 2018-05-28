// addEvaluation.js
const apiConfig = require('../../config/api.config');
const tips = require('../../common/tips');
const Api = require('../../config/method');
const orderListStore = require('../../common/store/orderListStore');
Page({
    /**
     * 页面的初始数据
     */
    data: {
        score: 0,
        images: [],
        text: '',
        o_id: 0,
        id: 0
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        console.log(options);
        let { o_id, id } = options;
        this.setData({ o_id, id });
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {},
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {},
    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {},
    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {},
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {},
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {},
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {},
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {},
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {},
    onTapStar: function(e) {
        let { index } = e.currentTarget.dataset;
        this.setData({ score: index + 1 });
    },
    onTextInput: function(e) {
        let { value } = e.detail;
        this.setData({ text: value });
        return value;
    },
    onTapUpload: function(e) {
        let { images } = this.data;
        let self = this;
        wx.chooseImage({
            count: (3 - images.length),
            success: function(res) {
                var tempFilePaths = res.tempFilePaths
                tempFilePaths.forEach(d => {
                    wx.uploadFile({
                        url: apiConfig.FuncUpload, //仅为示例，非真实的接口地址
                        filePath: d,
                        name: 'inner_img',
                        formData: { from: 'pc' },
                        success: function(res) {
                            let data = JSON.parse(res.data);
                            images.push(data);
                            self.setData({ images });
                        },
                        fail: function(err) {
                            console.log(err);
                        }
                    })
                })
            }
        })
    },
    onTapDel: function(e) {
        let self = this;
        let { index } = e.currentTarget.dataset;
        let { images } = self.data;
        tips.showConfirm("系统提示", "确认删除图片吗？", () => {
            images.splice(index, 1);
            self.setData({ images });
        });
    },
    onTapSubmit: function(e) {
        let self = this;
        let { o_id, id, score, images, text } = self.data;
        let dto = {
            content: text,
            order_id: o_id,
            score: score,
            object_id: id
        }
        images.forEach((d, i) => {
            dto[`images[${i}]`] = d.data;
        });
        Api.EvaluateCreate(dto).then(() => {
            orderListStore.set({
                is_reload: true
            });
            wx.navigateBack();
        });
    }
})
