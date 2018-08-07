const Api = require('../../../../../config/method');
const Session = require('../../../../../common/auth/session')
const tips = require('../../../../../common/tips');
const app = getApp()
Page({
    /**
     * 页面的初始数据
     */
    data: {
        page: 1,
        id: null,
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let _this = this;
        let id = options.id;
        Api.PracticeTask({
            page: this.data.page,
            per_page: 20,
            task_id: id
        }).then((res) => {
            console.log(res);
            let data = res.data;
            _this.setData({
                task: data,
                id: id
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
    onPullDownRefresh: function () {},
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
    onShareAppMessage: function () {
        return {
            title: '文波教育',
            desc: '文波教育',
            path: '/pages/index/index'
        }
    },
    handleCollect: function (e) {
        let session = Session.get();
        console.log(e);
        Api.PracticeCollect({
            pid: e.currentTarget.dataset.id,
            uid: session.uid
        }).then((res) => {
            tips.showSuccess(data.errdesc);
            resolve();
        }).catch(err => reject(err));
    }
});