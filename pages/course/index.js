const tips = require('../../common/tips');
const Api = require('../../config/method');
var app = getApp();
Page({
    data: {
        token: '',
        uid: '',
        status: true,
    },
    onShow: function () {},
    onLoad: function () {
        this.handleCourse();
        this.handleActivity();
    },
    handleSwitch(e) {
        if(e.currentTarget.dataset.id==1){
            wx.navigateTo({url:'/pages/course/index'})
        }else if(e.currentTarget.dataset.id==2){
            wx.navigateTo({url:'/pages/course/index'})
        }else if(e.currentTarget.dataset.id==3){
            wx.navigateTo({url:'/pages/course/index'})
        }else if(e.currentTarget.dataset.id==4){
            wx.navigateTo({url:'/pages/course/index'})
        }else if(e.currentTarget.dataset.id==5){
            wx.navigateTo({url:'/pages/course/index'})
        }else if(e.currentTarget.dataset.id==6){
            wx.navigateTo({url:'/pages/course/index'})
        }
        this.setData({
            status: e.currentTarget.dataset.id
        });
    },
    skipPage: app.skipPage,
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
    handleCourse:function(){
        let _this=this;
        Api.Course({
            'page':1,
            'per_page':3,
        }).then(({
            data
        }) => {
            if(data){
                for(let i=0;i<data.length;i++){
                    data[i].activity_time=_this.timestampToTime(data[i].activity_time).slice(0,10);
                }
            }
            _this.setData({
                course:data
            });
            resolve();
        }).catch(err => reject(err));
    },
    handleActivity:function(){
        let _this=this;
        Api.Activity({
            'page':1,
            'per_page':3,
        }).then(({
            data
        }) => {
            if(data){
                for(let i=0;i<data.length;i++){
                    data[i].activity_time=_this.timestampToTime(data[i].activity_time).slice(0,10);
                }
            }
            _this.setData({
                activity:data
            });
            resolve();
        }).catch(err => reject(err));
    }
})