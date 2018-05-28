// evaluationList.js
const Api = require('../../config/method');
import moment from '../../common/utils/moment'
Page({
    /**
     * 页面的初始数据
     */
    data: {
        id: 0,
        list: [],
        page: 1,
        loading: false,
        noData: false,
        allData: false,
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        let { id } = options;
        this.setData({ id });
        this.init();
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
    onReachBottom: function() {
        this.getEvaluationList();
    },
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {},
    init: function() {
        let self = this;
        this.getEvaluationList().then(() => self.setData({ loadEnd: true }));
    },
    getEvaluationList: function() {
        let self = this;
        let { page, loading, noData, allData, list, id } = self.data;
        if (loading || noData || allData) return;
        self.setData({ loading: true });
        return new Promise((resolve, reject) => {
            Api.EvaluateList({ page, object_id: id }).then((json) => {
                let { all_page, data = [] } = json.data;
                data = data.map((d) => {
                    d.score = parseInt(d.score);
                    d.create_time = moment.format(d.create_time, 'YYYY-MM-DD HH:mm:ss');
                    return d;
                });
                if (all_page == 0) {
                    self.setData({ loading: false, noData: true });
                } else {
                    if (page == all_page) {
                        self.setData({ allData: true });
                    }
                    let l = [...list, ...data];
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
    }
})
