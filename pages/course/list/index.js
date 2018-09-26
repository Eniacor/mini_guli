const tips = require('../../../common/tips');
const Api = require('../../../config/method');
var app = getApp();
Page({
    data: {
        token: '',
        uid: '',
        status: true,
        page: 1,
        list: [],
    },
    onShow: function () {},
    onLoad: function () {
        this.handleData();
    },
    onReachBottom: function () {
        let page=this.data.page;
        page++;
        this.setData({
            page:page
        });
        this.handleData();
    },
    handleData: function () {
        let _this = this;
        Api.Course({
            page: _this.data.page,
            per_page: 20,
        }).then(({
            data
        }) => {
            if (data) {
                for (let i = 0; i < data.length; i++) {
                    data[i].activity_time = _this.timestampToTime(data[i].activity_time).slice(0, 10);
                    if(_this.strLength(data[i].title)>12){
                        data[i].title=data[i].title.slice(0,12)+'...';
                    }
                }
            }
            data = _this.data.list.concat(data);
            _this.setData({
                list: data
            });
            resolve();
        }).catch(err => reject(err));
        Api.Banner({
            type:5,
        }).then(({ data }) => {
            console.log(data);
            _this.setData({
                imgUrls:data
            });
            resolve();
        }).catch(err => reject(err));
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
    strLength:function(str){
        var len = 0;
        for (var i=0; i<str.length; i++) { 
         var c = str.charCodeAt(i); 
        //单字节加1 
         if ((c >= 0x0001 && c <= 0x007e) || (0xff60<=c && c<=0xff9f)) { 
           len++; 
         } 
         else { 
          len+=2; 
         } 
        } 
        return len;
    }
})