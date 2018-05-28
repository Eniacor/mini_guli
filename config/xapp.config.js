let extConfig = wx.getExtConfigSync();
module.exports = {
    api_host: `https://5hao.sheep.squmo.com/api.php`
    //api_host: `https://a.squmo.com/${extConfig.project_key || 'caotan'}`
    // api_host: `https://${extConfig.api_host || 'www.squmo.com'}/api.php`
}