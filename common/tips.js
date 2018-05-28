// 显示繁忙提示
var showBusy = text => wx.showToast({
    title: text,
    icon: 'loading',
    duration: 2000
});
// 显示成功提示
var showSuccess = text => wx.showToast({
    title: text,
    icon: 'success'
});
// 显示失败提示
var showModel = (title, content) => {
    wx.hideToast();
    wx.showModal({
        title,
        content: (typeof content != 'string') ? JSON.stringify(content) : content,
        showCancel: false
    });
};
var showLoading = text => wx.showToast({
    title: text,
    icon: 'loading',
    mask: true,
    duration: 10000
})
var hideLoading = function () {
    wx.hideToast()
}
var showWarning = (title, content) => {
    wx.hideToast();
    wx.showModal({
        title,
        content: content,
        showCancel: false
    });
}
var showConfirm = (title, content, callback) => {
    wx.hideToast();
    wx.showModal({
        title,
        content: content,
        success: function (res) {
            if (res.confirm) {
                typeof callback == "function" && callback()
            }
        }
    });
}

var showAction = (title, content, callback) => {
    wx.hideToast();
    wx.showModal({
        title,
        content: content,
        success: function (res) {
            if (res.confirm) {
                typeof callback == "function" && callback()
            }
        }
    });
}
module.exports = {
    showBusy: showBusy,
    showSuccess: showSuccess,
    showModel: showModel,
    showLoading: showLoading,
    hideLoading: hideLoading,
    showWarning: showWarning,
    showConfirm: showConfirm,
    showAction: showAction
};
