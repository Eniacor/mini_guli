const xapp = require('./xapp.config.js');
module.exports = {
    XcxLogin: `${xapp.api_host}/Weixin/getOpenId`,
    UserRegister: `${xapp.api_host}/Weixin/register`,
    BindPhone:`${xapp.api_host}/Weixin/decryptData`,
    UserInfo:`${xapp.api_host}/User/show`,

    list:`${xapp.api_host}/Award/index`,
    detail:`${xapp.api_host}/Award/show`,
}  
