const Api = require('../../../config/method');
const app = getApp()
Page({
    /**
     * 页面的初始数据
     */
    data: {
        practice: [],
        page:1,
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let _this=this;
        this.handleData();
        Api.Banner({
            type:2,
        }).then(({ data }) => {
            _this.setData({
                imgUrls:data
            });
            resolve();
        }).catch(err => reject(err));
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {},
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        console.log(app);
    },
    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {},
    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {},
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onReachBottom(){
        let page=this.data.page;
        page++;
        this.setData({
            page:page
        });
        this.handleData();
    },
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {},
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {},
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {},
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {},
    // skipPage:app.skipPage,
    skipPage: app.skipPage,
    handleData:function(){
        let _this = this;
        Api.PracticeList({
            page:_this.data.page,
            per_page:20
        }).then((res) => {
            let data = res.data;
            if (data != null) {
                for (let i = 0; i < data.length; i++) {
                    data[i].title = data[i].title.slice(0, 15);
                }
                data=_this.data.practice.concat(data);
                _this.setData({
                    practice: data
                });
            }
            resolve();
        }).catch(err => reject(err));
    },
});