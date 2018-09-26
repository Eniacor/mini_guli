const tips = require('../../../common/tips');
const Api = require('../../../config/method');
const Session = require('../../../common/auth/session')
const app = getApp();
Page({
    /**
     * 页面的初始数据
     */
    data: {
        sort:1,
        page:1,
        data:[],
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            id: options.id
        });
        this.handleData();
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
    onPullDownRefresh: function () {
        let page=this.data.page;
        page++;
        this.setData({
            page:page
        });
        this.handleData();
        wx.stopPullDownRefresh()
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
   
    skipPage: app.skipPage,
    handleData: function () {
        let _this = this;
        let session = Session.get();
        Api.QuestionIndex({
            page: _this.data.page,
            per_page: 20,
            openid: session.openid,
            type: this.data.id
        }).then(({
            data
        }) => {
            if(data==undefined){
                tips.showModel('提示','暂无更多');
                return;
            }
            for (let i = 0; i < data.length; i++) {
                if (_this.getStringLong(data[i]['title']) >25) {
                    data[i]['title'] = data[i]['title'].slice(0, 25) + '...';
                } else {
                    data[i]['title'] = data[i]['title'].slice(0, 25);
                }
                data[i]['content'] = data[i]['content'].slice(0, 80) + '...';
                data[i]['addtime'] = _this.timestampToTime(data[i]['addtime']).slice(0, 10);
                
                data[i]['snum']=0
                let num=parseInt(data[i]['confirm_num']);
                if(num<10){
                    data[i]['snum']=0
                }else if(10<num<100){
                    data[i]['snum']=1
                }else if(100<num<200){
                    data[i]['snum']=2
                }else if(200<num<400){
                    data[i]['snum']=3
                }else if(400<num<600){
                    data[i]['snum']=4
                }else{
                    data[i]['snum']=5
                }
            }
            data = _this.data.data.concat(data);
            _this.setData({
                data: data
            });
            resolve();
        }).catch(err => reject(err));
    },
    timestampToTime: function (timestamp) {
        let date = new Date(timestamp * 1000);
        let Y = date.getFullYear() + '-';
        let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        let D = date.getDate() + ' ';
        let h = date.getHours() + ':';
        let m = date.getMinutes() + ':';
        let s = date.getSeconds();
        return Y + M + D + h + m + s;
    },
    getStringLong: function (str) {
        if (str == null) return 0;
        if (typeof str != "string") {
            str += "";
        }
        return str.replace(/[^\x00-\xff]/g, "ab").length;
    },
    handleSearchD: function (e) {
        let _this = this;
        if (!this.data.search) {
            tips.showSuccess('内容不能为空!');
        }
        Api.QSearch({
            id: this.data.search
        }).then((res) => {
            let data = res.data;
            for (let i = 0; i < data.length; i++) {
                if (_this.getStringLong(data[i]['title']) > 17) {
                    data[i]['title'] = data[i]['title'].slice(0, 17) + '...';
                } else {
                    data[i]['title'] = data[i]['title'].slice(0, 17);
                }
                data[i]['content'] = data[i]['content'].slice(9, 100) + '...';
                data[i]['addtime'] = _this.timestampToTime(data[i]['addtime']).slice(0, 10);
                data[i]['snum']=0
                let num=parseInt(data[i]['confirm_num']);
                if(num<10){
                    data[i]['snum']=0
                }else if(10<num<100){
                    data[i]['snum']=1
                }else if(100<num<200){
                    data[i]['snum']=2
                }else if(200<num<400){
                    data[i]['snum']=3
                }else if(400<num<600){
                    data[i]['snum']=4
                }else{
                    data[i]['snum']=5
                };
            }
            _this.setData({
                data: data
            });
            resolve();
        }).catch(err => reject(err));
    },
    handleSearch: function (e) {
        this.setData({
            search: e.detail.value
        })
    },
    handleSort:function(e){
        console.log(e.currentTarget.dataset.sort);
        if(e.currentTarget.dataset.sort==1){
            this.handleData();
            this.setData({
                sort:1
            });
        }
        if(e.currentTarget.dataset.sort==2){
            let news=this.data.data;
            news.sort(this.handleCompare('confirm_num'))
            this.setData({
                sort:2,
                data:news
            });
        } 
    },
    handleCompare: function (property) {
        return function (a, b) {
            var value1 = a[property];
            var value2 = b[property];
            return value2-value1;
        }
    },
    onReachBottom(){
        let page=this.data.page;
        page++;
        this.setData({
            page:page
        });
        this.handleData();
    }
});