const xapp = require('./xapp.config.js');
module.exports = {

    XcxLogin: `${xapp.api_host}/Xcx/xcx_guest_login`,
    HomeBanner: `${xapp.api_host}/Home/get_banner`,
    HomeIndex: `${xapp.api_host}/Home/app_index`,
    FuncUpload: `${xapp.api_host}/Func/upload_img`,
    XcxUserInfo: `${xapp.api_host}/Xcx/xcx_user_info`,
    UserInfo: `${xapp.api_host}/User/user_info`,
    UserSendSMT: `${xapp.api_host}/Wechatuser/send_sm_third`,
    UserBind: `${xapp.api_host}/Xcx/bind_new_user`,
    HomeWebsite: `${xapp.api_host}/Home/website`,
    HomeAbout: `${xapp.api_host}/Home/about_us`,
    GoodsRecommend: `${xapp.api_host}/Goods/recommend`,
    GoodsAllClassify: `${xapp.api_host}/Goods/get_all_classify`,
    GoodsList: `${xapp.api_host}/Goods/get_by_classify`,
    GoodsSearch: `${xapp.api_host}/Goods/good_search`,
    GoodsInfo: `${xapp.api_host}/Goods/goods_info`,
    AddressLists: `${xapp.api_host}/Address/lists`,
    AddressMap: `${xapp.api_host}/Address/get_map`,
    AddressAdd: `${xapp.api_host}/Address/add`,
    AddressOne: `${xapp.api_host}/Address/get_one`,
    AddressModify: `${xapp.api_host}/Address/modify`,
    AddressDel: `${xapp.api_host}/Address/del`,
    CartAdd: `${xapp.api_host}/Cart/add_cart`,
    CartInfo: `${xapp.api_host}/Cart/cart_info`,
    CartEdit: `${xapp.api_host}/Cart/edit_cart`,
    CollectionList: `${xapp.api_host}/Collection/lists`,
    CollectionAdd: `${xapp.api_host}/Collection/add`,
    CollectionDelete: `${xapp.api_host}/Collection/delete`,
    EvaluateList: `${xapp.api_host}/Evaluate/get_by_good`,
    EvaluateCreate: `${xapp.api_host}/Evaluate/create_to_order`,
    CouponList: `${xapp.api_host}/Coupon/lists`,
    CouponExchange: `${xapp.api_host}/Coupon/exchange`,
    CouponAvList: `${xapp.api_host}/Coupon/get_av_coupons`,
    CouponUse: `${xapp.api_host}/Coupon/use_coupon`,
    OrderList: `${xapp.api_host}/Order/lists`,
    OrderCancel: `${xapp.api_host}/Order/cancel_order`,
    OrderRefund: `${xapp.api_host}/Order/refund`,
    OrderRefundGood: `${xapp.api_host}/Order/refund_good`,
    OrderGet: `${xapp.api_host}/Order/is_get`,
    OrderPrepareByCart: `${xapp.api_host}/Order/prepare_order_by_cart`,
    OrderPrepare: `${xapp.api_host}/Order/prepare_order`,
    OrderSetCoupon: `${xapp.api_host}/Order/set_coupon`,
    OrderDelCoupon: `${xapp.api_host}/Order/delete_coupon`,
    OrderUpdateAddress: `${xapp.api_host}/Order/update_ship_address`,
    OrderUpdateRemark: `${xapp.api_host}/Order/update_remark`,
    OrderUpdatePayMethod: `${xapp.api_host}/Order/update_pay_method`,
    OrderCreate: `${xapp.api_host}/Order/create_order`,
    OrderPerpareInfo: `${xapp.api_host}/Order/perpare_info`,
    OrderInfo: `${xapp.api_host}/Order/info`,
    OrderExpress: `${xapp.api_host}/Order/express`,
    OrderUpdateRefundInfo: `${xapp.api_host}/Order/update_refund_info`,
    orderTypeCount: `${xapp.api_host}/Order/order_type_count`,
    orderSetbean: `${xapp.api_host}/Order/set_bean`,//使用5号豆
    orderSetticket: `${xapp.api_host}/Order/set_ticket`,//使用5号券   
    orderDelbean: `${xapp.api_host}/Order/del_bean`,//不使用5号豆
    orderDelticket: `${xapp.api_host}/Order/del_ticket`,//不使用5号豆券 
    PayCall: `${xapp.api_host}/Pay/pay_api_call`,
    FuncExpress: `${xapp.api_host}/Func/express`,
    setCookie: `${xapp.api_host}/User/set_cookie`,
    getMessage: `${xapp.api_host}/Message/not_read_count`,
    getMessageLists: `${xapp.api_host}/Message/lists`,
    setMessageread: `${xapp.api_host}/Message/set_read`,
    changeNickname: `${xapp.api_host}/User/modify_nickname`,
    setCard: `${xapp.api_host}/User/modify_idcard`,
    setSex: `${xapp.api_host}/User/modify_gender`,
    changePhone: `${xapp.api_host}/User/modify_telphone`,
    sendsmPhone: `${xapp.api_host}/User/send_sm_t`,
    hotWord: `${xapp.api_host}/Goods/hot_word`,
    beanList: `${xapp.api_host}/Bean/my_bean_list`,
    ticketAmount: `${xapp.api_host}/Ticket/my_ticket_amount`,
    ticketList: `${xapp.api_host}/Ticket/total_lists`,
    ticketList: `${xapp.api_host}/Ticket/total_lists`,
    addOrder: `${xapp.api_host}/Recharge/create_order`,
    canshWithdraw: `${xapp.api_host}/User/withdraw_cash_data`,
    canshConfirm: `${xapp.api_host}/User/withdraw_cash_confirm_data`,
    uploadImg: `${xapp.api_host}/User/upload_business_img`,
    addEditInfo: `${xapp.api_host}/MyBusiness/add_edit_info`,
    getBusinessInfo: `${xapp.api_host}/MyBusiness/get_my_info`,
}  
