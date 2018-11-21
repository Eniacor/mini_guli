const xapp = require('./xapp.config.js');
module.exports = {
    XcxLogin: `${xapp.api_host}/Weixin/getOpenId`,
    UserRegister: `${xapp.api_host}/Weixin/register`,
    BindPhone:`${xapp.api_host}/Weixin/decryptData`,
    UserInfo:`${xapp.api_host}/User/show`,
    //活动列表
    list:`${xapp.api_host}/Award/index`,
    //活动详情
    detail:`${xapp.api_host}/Award/show`,
    //参加活动
    joinHas:`${xapp.api_host}/Join/has_join`,
    joinAdd:`${xapp.api_host}/Join/add`,
    joinList:`${xapp.api_host}/Join/index`,
    joinMy:`${xapp.api_host}/Join/my_join`,
    //地址
    addressAdd:`${xapp.api_host}/Address/add`,
    addressDetail:`${xapp.api_host}/Address/show`,
    addressList:`${xapp.api_host}/Address/index`,
    //个人中心
    awardZhong:`${xapp.api_host}/Award/open_award`,
    awardMy:`${xapp.api_host}/Award/my_award`,
    awardAll:`${xapp.api_host}/Award/all_award`,
}  
