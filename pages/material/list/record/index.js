const tips = require('../../../../common/tips');
const Api = require('../../../../config/method');
const Session = require('../../../../common/auth/session')
const app=getApp();
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
        this.handleData();
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {},
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
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
    skipPage: app.skipPage,
    handleData:function(){
        let _this=this;
        let session=Session.get();
        Api.QuestionRecord({
            openid:session.openid,
        }).then(({ data }) => {
            for(let i=0;i<data.length;i++){
                if(_this.getStringLong(data[i]['title'])>17){
                    data[i]['title']=data[i]['title'].slice(0,17)+'...';
                }else{
                    data[i]['title']=data[i]['title'].slice(0,17);
                }
                data[i]['content']=data[i]['content'].slice(9,100)+'...';
                data[i]['addtime']=_this.timestampToTime(data[i]['addtime']).slice(0,10);

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
            _this.setData({
                data:data
            });
            resolve();
        }).catch(err => reject(err));
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
    getStringLong:function(str) {
        if (str == null) return 0;
        if (typeof str != "string"){
          str += "";
        }
        return str.replace(/[^\x00-\xff]/g,"ab").length;
      }
});