const Api = require("../../config/method.js");
const Session = require('../../common/auth/session')
const tips = require('../../common/tips.js');
Page({
    data: {
        btn_content: "获取手机验证码",
        flag: false,
    },
    onLoad: function () {

    },
    keyPhone: function (e) {
        let phone = e.detail.value;
        this.setData({
            phone: phone
        })
    },
    keyCode: function (e) {
        let code = e.detail.value;
        this.setData({
            code: code
        })
    },
    getCode: function () {
        let telphone = this.data.phone;
        const reg = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
        if (!reg.test(telphone)) {
            tips.showModel('提示', '请输正确手机号码');
            return;
        } else {
            Api.sendsmPhone({ telphone }).then(res => {
                let count = 60
                if (!res.errno) {
                    let timer = setInterval(() => {
                        count--;
                        this.setData({
                            flag: true,
                            btn_content: count + "s重新获取"
                        })
                        if (count == 0) {
                            clearInterval(timer);
                            this.setData({
                                flag: false,
                                btn_content: "重新获取"
                            })
                            return;
                        }
                    }, 1000)
                }
            })
        }
    },
    bindPhone: function () {
        let validate_code = this.data.code;
        let telphone = this.data.phone;
        Api.changePhone({ telphone, validate_code }).then(res => {
            if (!res.errno) {
                tips.showModel('提示', '绑定手机号成功');
                setTimeout(() => {
                    wx.navigateBack({ delta: 2 })
                }, 1500)
            }
        })
    }
})