const api = require('./api.config.js');
const request = require('../common/request.js');
module.exports = {
    XcxUserInfo: (data) => request(api.XcxUserInfo, data, 'POST'), 
    UserRegister: (data) => request(api.UserRegister, data, 'POST'),
    BindPhone:(data) =>request(api.BindPhone,data,'POST'),
    UserInfo:(data) => request(api.UserInfo,data,'GET'),
    //参与抽奖
    joinHas:(data) => request(api.joinHas,data,'POST'),
    joinAdd:(data) => request(api.joinAdd,data,'POST'),
    joinList:(data) => request(api.joinList,data,'POST'),
    joinMy:(data) => request(api.joinMy,data,'POST'),
    //抽奖列表
    list:(data) => request(api.list,data,'GET'),
    detail:(data) => request(api.detail,data,'GET'),
    //地址
    addressAdd:(data) => request(api.addressAdd,data,'POST'),
    addressDetail:(data) => request(api.addressDetail,data,'GET'),
    addressList:(data) => request(api.addressList,data,'GET'),
    //个人中心
    awardZhong:(data) => request(api.awardZhong,data,'POST'),
    awardMy:(data) => request(api.awardMy,data,'POST'),
    awardAll:(data) => request(api.awardAll,data,'POST'),
}