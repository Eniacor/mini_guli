const Api = require("../../config/method.js");
const Session = require('../../common/auth/session');
const tips = require('../../common/tips');
import moment from '../../common/utils/moment'
Page({
    data: {
        show: false
    },
    onLoad: function () {
        this.init();
    },
    onShow: function () {
        this.init();
    },
    init: function () {
        let self = this;
        let session = Session.get();
        if (session && session.uid) {
            Api.beanList().then(res => {
                let data = res.my_bean;
                data = data.map((d) => {
                    d.ctime = moment.format(d.ctime, 'YYYY-MM-DD HH:mm:ss');
                    return d;
                });
                this.setData({
                    lists: data
                })
            });
        } else {
            tips.showAction('系统提示', '您未绑定手机号，需要去绑定手机号码？', () => {
                let url = '/pages/bindPhone/bindPhone?from=' + encodeURIComponent('pages/dou/index');
                wx.navigateTo({ url })
            });
        }
    },
})