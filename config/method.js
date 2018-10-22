const api = require('./api.config.js');
const request = require('../common/request.js');
module.exports = {
    XcxUserInfo: (data) => request(api.XcxUserInfo, data, 'POST'), 
    UserRegister: (data) => request(api.UserRegister, data, 'POST'),
    BindPhone:(data) =>request(api.BindPhone,data,'POST'),
    UserInfo:(data) => request(api.UserInfo,data,'GET'),

    list:(data) => request(api.list,data,'GET'),
    detail:(data) => request(api.detail,data,'GET'),
}