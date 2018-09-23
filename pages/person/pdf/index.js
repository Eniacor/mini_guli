const Api = require("../../../config/method.js");
const Session = require('../../../common/auth/session')
const tips = require('../../../common/tips');
const app = getApp()
Page({
    /**
     * 页面的初始数据
     */
    data: {
        count:0,
        options: {
            5: true,
            6: true,
            7: true,
            8: true,
            9: true,
            10: true,
            11: true,
            12: true,
            13: true,
            14: true,
            15: true,
            16: true,
            17: true,
            18: true,
            19: true,
            20: true,
            21: true,
            22: true,
            23: true,
            24: true,
        },
        speak: true,
        write: true,
        listen: true,
        read: true,
        checked: true,
        member:null,
        email:null,
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let session=Session.get();
        let _this=this;
        Api.VipHasMember({
            uid:session.uid
        }).then((
            data
        ) => {
            _this.setData({
                member: data.errdesc
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
    onShow: function () {},
    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {},
    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },
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

    handleItem: function (e) {
        let id = e.target.dataset.id;
        let str = "options." + id;
        if (this.data.options[id]) {
            this.setData({
                [str]: false,
            })
        } else {
            this.setData({
                [str]: true,
            })
        }
    },
    handleTitle1: function (e) {
        if (this.data.speak) {
            this.setData({
                ["options.5"]: false,
                ["options.6"]: false,
                ["options.7"]: false,
                ["options.8"]: false,
                ["options.9"]: false,
            });
            this.setData({
                speak: false
            });
        } else {
            this.setData({
                ["options.5"]: true,
                ["options.6"]: true,
                ["options.7"]: true,
                ["options.8"]: true,
                ["options.9"]: true,
            });
            this.setData({
                speak: true
            });
        }
    },
    handleTitle2: function (e) {
        if (this.data.write) {
            this.setData({
                ["options.18"]: false,
                ["options.19"]: false,
            });
            this.setData({
                write: false,
            })
        } else {
            this.setData({
                ["options.18"]: true,
                ["options.19"]: true,
            });
            this.setData({
                write: true,
            })
        }
    },
    handleTitle3: function (e) {
        if (this.data.listen) {
            this.setData({
                ["options.10"]: false,
                ["options.11"]: false,
                ["options.12"]: false,
                ["options.13"]: false,
                ["options.14"]: false,
                ["options.15"]: false,
                ["options.16"]: false,
                ["options.17"]: false,
            });
            this.setData({
                listen: false
            });
        } else {
            this.setData({
                ["options.10"]: true,
                ["options.11"]: true,
                ["options.12"]: true,
                ["options.13"]: true,
                ["options.14"]: true,
                ["options.15"]: true,
                ["options.16"]: true,
                ["options.17"]: true,
            });
            this.setData({
                listen: true
            });
        }
    },
    handleTitle4: function (e) {
        if (this.data.read) {
            this.setData({
                ["options.20"]: false,
                ["options.21"]: false,
                ["options.22"]: false,
                ["options.23"]: false,
                ["options.24"]: false,
            });
            this.setData({
                read: false
            });
        } else {
            this.setData({
                ["options.20"]: true,
                ["options.21"]: true,
                ["options.22"]: true,
                ["options.23"]: true,
                ["options.24"]: true,
            });
            this.setData({
                read: true
            });
        }
    },
    handleImg: function (e) {
        if (this.data.checked) {
            this.setData({
                speak: false,
                write: false,
                listen: false,
                read: false,
                ["options.5"]:  false,
                ["options.6"]:  false,
                ["options.7"]:  false,
                ["options.8"]:  false,
                ["options.9"]:  false,
                ["options.10"]: false,
                ["options.11"]: false,
                ["options.12"]: false,
                ["options.13"]: false,
                ["options.14"]: false,
                ["options.15"]: false,
                ["options.16"]: false,
                ["options.17"]: false,
                ["options.18"]: false,
                ["options.19"]: false,
                ["options.20"]: false,
                ["options.21"]: false,
                ["options.22"]: false,
                ["options.23"]: false,
                ["options.24"]: false,
                checked: false,
            });
        } else {
            this.setData({
                speak: true,
                write: true,
                listen: true,
                read: true,
                ["options.5"]: true,
                ["options.6"]: true,
                ["options.7"]: true,
                ["options.8"]: true,
                ["options.9"]: true,
                ["options.10"]: true,
                ["options.11"]: true,
                ["options.12"]: true,
                ["options.13"]: true,
                ["options.14"]: true,
                ["options.15"]: true,
                ["options.16"]: true,
                ["options.17"]: true,
                ["options.18"]: true,
                ["options.19"]: true,
                ["options.20"]: true,
                ["options.21"]: true,
                ["options.22"]: true,
                ["options.23"]: true,
                ["options.24"]: true,
                checked: true,
            });
        }

    },
    handleEmail:function(e){
        let session=Session.get();
        let data=[];
        let count=this.data.count;
        count++;
        this.setData({
            count:count
        });
        for(let i in this.data.options){
            if(this.data.options[i]){
                data.push(i);
            }
        };
        data=JSON.stringify(data); 
        let mailReg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
        if(this.data.email){
            if(!mailReg.test(this.data.email)){
                tips.showWarning('错误提示', "邮箱格式不正确!");   
                return;
            }
        }else{
            tips.showWarning('错误提示', "邮箱不能为空!");   
            return;
        }
        if(this.data.member=="不是会员"){
            tips.showSuccess(this.data.member);
            setTimeout(() => {
                wx.navigateTo({
                    url: '/pages/person/member/index'
                });
            }, 1000);
        }else if(this.data.member=="会员过期"){
            tips.showSuccess(this.data.member);
            setTimeout(() => {
                wx.navigateTo({
                    url: '/pages/person/member/index'
                });
            }, 1000);
        }else{
            if(this.data.count==1){
                Api.VipExport({
                    uid:session.uid,
                    email:this.data.email,
                    content:data
                }).then((
                    data
                ) => {
                    if(!data.errno){
                        tips.showSuccess("请邮箱登录查收!");
                        setTimeout(()=>{
                            wx.switchTab({url: '/pages/person/index'});
                        },1000);
                    }else{
                        tips.showSuccess(data.errno);
                    }
                    resolve();
                }).catch(err => reject(err));
            }
        }
    },
    handleMess:function(e){
        if(!e.detail.value){
            tips.showSuccess("请输入邮箱!");
        }
        this.setData({
            email:e.detail.value
        });
    }
});