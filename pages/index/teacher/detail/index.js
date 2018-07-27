
const app =getApp();
const WxParse = require('../../../../common/component/wxParse/wxParse.js');
Page({
    /**
     * 页面的初始数据
     */
    data: {
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        var article = `<blockquote>教师履历:</blockquote><p>2015年以来,文波老师,　在建筑工程市场上，一般称工程承包方提出的索赔为施工索赔，即由于业主或其他方面的原因致使承包者在项目施工中付出了额外的费用或造成了损失.</p><p>2015年以来,文波老师,　在建筑工程市场上，一般称工程承包方提出的索赔为施工索赔，即由于业主或其他方面的原因致使承包者在项目施工中付出了额外的费用或造成了损失，承包商通过合法途径和程序</p><blockquote>教师特点:</blockquote><ul><li><span style=\"font-weight: bold;\">雅思语法方面:</span>　在建筑工程市场上，一般称工程承包方提出的索赔为施工索赔，即由于业主或其他方面的原因致使承包者在项目施工中付出了额外的费用或造成了损失，承包商通过合法途径和程序<br></li></ul>`;
        WxParse.wxParse('article', 'html', article, that, 5);
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
    },
    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {
    },
    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {
    },
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
    },
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
    },
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
    },
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
    },
    skipPage:app.skipPage,
});
