// pages/goodDetail/goodDetail.js
const Api = require("../../config/method");
const WxParse = require('../../common/component/wxParse/wxParse')
import moment from '../../common/utils/moment'
const ATTR_ITEM_ACTIVE = 1;
const ATTR_ITEM_DISABLED = 2;
const ATTR_ITEM_NORMAL = 3;
Page({
    data: {
        id: 0,
        info: {},
        loadEnd: false,
        buyNum: 1,
        barType: 1,
        attr_arr: [],
        key_status: {},
        attr_str: '',
        showDialog: false,
        count: 0,
        is_collection: false,
        evalua_list: [],
        evalua_all_page: 0,
        desc: null
    },
    onLoad: function (options) {
        // 页面初始化 options为页面跳转所带来的参数
        let { id } = options;
        this.setData({ id });
        this.init();
    },
    onReady: function () {
        // 页面渲染完成
    },
    onShow: function () {
        // 页面显示
    },
    onHide: function () {
        // 页面隐藏
    },
    onUnload: function () {
        // 页面关闭
    },
    init: function () {
        let self = this;
        self.getCartInfo();
        self.getEvaluationList();
        self.getGoodDetail().then(() => self.setData({ loadEnd: true }));
    },
    getCartInfo: function () {
        let self = this;
        return new Promise((resolve, reject) => {
            Api.CartInfo().then(({ data }) => {
                let count = 0;
                data.forEach(d => count += parseInt(d.count));
                self.setData({ count });
                resolve();
            }).catch(err => reject(err));
        })
    },
    getGoodDetail: function () {
        let self = this;
        let { id } = self.data;
        return new Promise((resolve, reject) => {
            Api.GoodsInfo({ id }).then(({ data }) => {
                self.setData({ info: data });
                let { attr, group_status, attr_info,activity} = data;
                console.log('data', data);
                console.log('attr', attr);
                console.log('group_status', group_status);

                let attr_arr = [];
                attr.forEach(d => {
                    attr_arr.push(d.attr_value);
                });
                let key_status = {};
                group_status.forEach(d => {
                    console.log('d', d)
                    key_status[d.params] = d;
                });
                console.log('activity',activity)
                self.setData({
                    activity:activity,
                    attr_arr,
                    key_status,
                    attr_str: attr_arr.join('-'),
                    is_collection: data.is_collection == 1
                });
                try {
                    WxParse.wxParse('desc', 'html', data.content, self);
                } catch (e) {
                    WxParse.wxParse('desc', 'html', '<div style="text-align:center;font-size:15px; color:#959595; padding:15px 0 50px; background-color:#ffffff;margin-top:5px;">数据错误，请联系商家。</div>', self);
                }
                self.countDown();//秒杀
                self.makeAttr();
                resolve();
            }).catch(err => reject(err));
        });
    },
     //秒杀倒计时
     countDown: function () {
        setTimeout(() => {
            let ctime = this.dateformat();
            if (ctime.end) {
                this.setData({ end: true })
            } else {
                this.setData({
                    hrStr: ctime.hrStr,
                    minStr: ctime.minStr,
                    secStr: ctime.secStr
                })
            }
            this.countDown()
        }, 1000)
    },
     // 时间格式化输出，将时间戳转为 倒计时时间
     dateformat: function (micro_second) {
         let { activity } = this.data;
        let endtime = activity.end_time;
        let nowtime = Date.parse(new Date());
        nowtime = nowtime / 1000;
        let ctime = endtime - nowtime;
        if (ctime < 0) {
            return {
                end: true
            }
        }
        // 天数位   
        let day = Math.floor(ctime / 3600 / 24);
        let dayStr = day.toString();
        if (dayStr.length == 1) dayStr = '0' + dayStr;

        // 小时位   
        let hr = Math.floor(ctime / 3600);
        let hrStr = hr.toString();
        if (hrStr.length == 1) hrStr = '0' + hrStr;

        // 分钟位  
        let min = Math.floor(ctime / 60 % 60);
        let minStr = min.toString();
        if (minStr.length == 1) minStr = '0' + minStr;

        // 秒位  
        let sec = Math.floor(ctime % 60);
        let secStr = sec.toString();
        if (secStr.length == 1) secStr = '0' + secStr;

        let otime = { hrStr, minStr, secStr }
        return otime;
    },
    getEvaluationList: function () {
        let self = this;
        let { id } = self.data;
        Api.EvaluateList({
            object_id: id,
            page: 1
        }).then(({ data }) => {
            data.data = data.data.map((d) => {
                d.score = parseInt(d.score);
                d.create_time = moment.format(d.create_time, 'YYYY-MM-DD HH:mm:ss');
                return d;
            });
            self.setData({
                evalua_list: data.data || [],
                evalua_all_page: data.all_page
            })
        }).catch(err => {
            console.log(err);
        })
    },
    onChangeBar: function (e) {
        let { type } = e.currentTarget.dataset;
        this.setData({ barType: type });
    },
    makeAttr: function () {
        let { info, attr_arr, key_status } = this.data;
        let { attr, select_params_dialog, group_status } = info;
        select_params_dialog = select_params_dialog.map((d, i) => {
            d.params_children = d.params_children.map((dx, ix) => {
                let a = JSON.parse(JSON.stringify(attr_arr));
                a[i] = dx.params_id;
                let active_atr = a.join('-');
                dx.active_atr = key_status[active_atr];
                return dx;
            });
            return d
        })
        info.select_params_dialog = select_params_dialog;
        this.setData({
            info
        });
    },
    onClickAttr: function (e) {
        let { index, id } = e.currentTarget.dataset;
        console.log(index, id);
        let { attr_arr } = this.data;
        attr_arr[index] = id;
        this.setData({ attr_arr, attr_str: attr_arr.join('-') });
        this.makeAttr();
    },
    onBlock: function () {
        return;
    },
    onClose: function () {
        let { attr_str, key_status, id } = this.data;
        this.setData({
            showDialog: false
        });
        // if (key_status[attr_str].goods_id != id) {
        //     wx.redirectTo({
        //         url: `/pages/goodDetail/goodDetail?id=${key_status[attr_str].goods_id}`
        //     });
        // } else {
        //     this.setData({
        //         showDialog: false
        //     });
        // }
    },
    onClickShow: function () {
        this.setData({
            showDialog: true
        });
    },
    onTapCollect: function () {
        let { is_collection, id } = this.data;
        let self = this;
        if (is_collection) {
            Api.CollectionDelete({ id }).then(() => {
                self.setData({
                    is_collection: !is_collection
                })
            })
        } else {
            Api.CollectionAdd({ id }).then(() => {
                self.setData({
                    is_collection: !is_collection
                })
            })
        }
    },
    onTapAddcart: function () {
        let { id, buyNum } = this.data;
        let self = this;
        Api.CartAdd({ id: id, count: buyNum }).then(({ data }) => {
            wx.showToast({
                title: '成功',
                icon: 'success',
                duration: 2000
            })
            let count = 0;
            data.forEach(d => count += parseInt(d.count));
            self.setData({ count });
        });
    },
    onTapImmBuy: function (e) {
        let self = this;
        let { id, buyNum } = self.data;
        Api.OrderPrepare({ id, count: buyNum }).then(({ data }) => {
            wx.navigateTo({
                url: `/pages/orderConfirm/orderConfirm?id=${data}`
            })
        });
    },
    onStepperSub: function () {
        let { buyNum } = this.data;
        if (buyNum <= 1) {
            this.setData({ buyNum: 1 });
        } else {
            buyNum--;
            this.setData({ buyNum });
        }
    },
    onStepperAdd: function () {
        let { buyNum } = this.data;
        if (buyNum >= 200) {
            this.setData({ buyNum: 200 });
        } else {
            buyNum++;
            this.setData({ buyNum });
        }
    }
})
