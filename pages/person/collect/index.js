const tips = require('../../../common/tips');
const Api = require('../../../config/method');
const Session = require('../../../common/auth/session');
const innerAudioContext = wx.createInnerAudioContext();
const app = getApp()
Page({
    /**
     * 页面的初始数据
     */
    data: {
        current: 'tab1',
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {},
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {},
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
    skipPage: app.skipPage,
    handleChange({detail}) {
        let session=Session.get();
        let _this = this;
        if (detail.key == 'tab2') {
            Api.PracticeMyCollect({
                uid:session.uid
            }).then((res) => {
                let data = res.data;
                if (data != null) {
                    for (let i = 0; i < data.length; i++) {
                        data[i].title = data[i].title.slice(0, 15);
                    }
                    _this.setData({
                        practice: data
                    });
                }
                resolve();
            }).catch(err => reject(err));
        } else if (detail.key == 'tab3') {
            Api.ActivityMyCollect({
                uid:session.uid
            }).then(({
                data
            }) => {
                if (data) {
                    for (let i = 0; i < data.length; i++) {
                        data[i].activity_time = _this.timestampToTime(data[i].activity_time).slice(0, 10);
                        data[i].title =data[i].title.slice(0, 14);
                    }
                }
                _this.setData({
                    list: data
                });
                resolve();
            }).catch(err => reject(err));
            Api.CourseMyCollect({
                uid:session.uid
            }).then(({
                data
            }) => {
                if (data) {
                    for (let i = 0; i < data.length; i++) {
                        data[i].activity_time = _this.timestampToTime(data[i].activity_time).slice(0, 10);
                        data[i].title =data[i].title.slice(0, 14);
                    }
                }
                _this.setData({
                    list1: data
                });
                resolve();
            }).catch(err => reject(err));
        } else if (detail.key == 'tab4') {
            Api. ArticleMyCollect({
                uid:session.uid
            }).then(({
                data
            }) => {
                if (data) {
                    for (let i = 0; i < data.length; i++) {
                        data[i]['addtime'] = _this.timestampToTime(data[i]['addtime']).slice(0, 10);
                        data[i].title =data[i].title.slice(0, 14);
                    }
                    console.log(data);
                    _this.setData({
                        score: data
                    });
                }
                resolve();
            }).catch(err => reject(err))
        }

        this.setData({
            current: detail.key
        });
    },
    timestampToTime:function (timestamp) {
        let date = new Date(timestamp * 1000);
        let Y = date.getFullYear() + '-';
        let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        let D = date.getDate() + ' ';
        let h = date.getHours() + ':';
        let m = date.getMinutes() + ':';
        let s = date.getSeconds();
        return Y+M+D+h+m+s;
    },
});