var app = getApp();
const Session = require('../../common/auth/session')
Page({
    data: {
        token: '',
        uid: ''
    },
    onShow: function () {
         this.init();
    },
    onLoad: function () {
         this.init();
    },
    init: function () {
        // let session = Session.get();
        // let token = session.token;
        // let uid = session.uid;
        // this.setData({
        //     token: token,
        //     uid: uid
        // })
    },
})