// pages/cart/index.js
const Api = require("../../config/method");
const tips = require('../../common/tips.js');
const checkStatusKey = 'cart_check_status';
let Status = {
    get: function () {
        return wx.getStorageSync(checkStatusKey) || {};
    },
    set: function (session) {
        wx.setStorageSync(checkStatusKey, session);
    },
    clear: function () {
        wx.removeStorageSync(checkStatusKey);
    },
}
Page({
    data: {
        checkStatus: Status.get(),
        list: [],
        loadEnd: false,
        checked: false,
        price: 0,
        items: [],
        startX: 0, //开始坐标
        startY: 0,
        reclist: [],
        page: 1,
        allPage: 0,
        loadEnd: false,
        loading: false,
        noData: false,
        allData: false,
    },
    onLoad: function (options) {
        // 页面初始化 options为页面跳转所带来的参数
        this.init();
    },
    onReady: function () {
        // 页面渲染完成
    },
    onShow: function () {
        // 页面显示
        this.init();
    },
    onHide: function () {
        // 页面隐藏
    },
    onUnload: function () {
        // 页面关闭
    },
    init: function () {
        let self = this;
        self.getCartInfo().then(() => self.setData({ loadEnd: true }));
        this.getRecommendList();
    },
    getCartInfo: function () {
        let self = this;
        return new Promise((resolve, reject) => {
            Api.CartInfo().then(({ data }) => {
                self.setData({
                    list: data
                })
                self.makeData();
                resolve();
            }).catch(err => reject(err));
        });
    },
    onTapChecked: function (e) {
        let { id } = e.currentTarget.dataset;
        let { checkStatus } = this.data;
        let status = checkStatus[id] || false;
        checkStatus[id] = !status;
        Status.set(checkStatus);
        this.setData({ checkStatus });
        this.makeData();
    },
    onStepperSub: function (e) {
        let self = this;
        let { id } = e.currentTarget.dataset;
        let count = self.getGoodCount(id);
        
        count--;

        if (count == 0) {
            tips.showConfirm('系统提示', '确认删除此商品吗？', () => {
                self.editCart({ id, count }).then(() => {
                    self.makeData();
                });
            });
            return;
        } else {
            self.editCart({ id, count }).then(() => {
                self.makeData();
            });
        }
    },
    onStepperAdd: function (e) {
        let self = this;
        let { id } = e.currentTarget.dataset;
        let count = self.getGoodCount(id);
        count++;
        self.editCart({ id, count }).then(() => {
            self.makeData();
        });
    },
    editCart: function ({ id, count }) {
        let self = this;
        return new Promise((resolve, reject) => {
            Api.CartEdit({ id, count }).then(({ data }) => {
                self.setData({
                    list: data
                })
                resolve();
            }).catch(err => reject(err));
        });
    },
    getGoodCount: function (id) {
        let { list } = this.data;
        let count = 1;
        for (let i = 0; i < list.length; i++) {
            if (list[i].id == id) {
                count = parseInt(list[i].count);
                break;
            }
        }
        return count;
    },
    onTapAll: function () {
        let { checked, checkStatus, list } = this.data;
        let self = this;
        checked = !checked
        Status.clear();
        for (let i = 0; i < list.length; i++) {
            checkStatus[list[i].id] = checked;
        }

        Status.set(checkStatus);
        self.setData({ checked, checkStatus });
        self.makeData();
    },
    makeData: function () {
        let { checkStatus, list, checked, price } = this.data;
        let p = 0;
        for (let i = 0; i < list.length; i++) {
            let item = list[i];
            checked = checkStatus[item.id];
            if (checkStatus[item.id]) {
                p += (parseInt(item.price_system.price) / 100) * parseInt(item.count)
            }
        }
        this.setData({ checked, price: p });
    },
    onTapBuy: function () {
        let self = this;
        let { checkStatus, list } = self.data;
        let data = [];
        list.forEach(d => {
            if (checkStatus[d.id]) data.push(d.id);
        });
        let p = {};
        data.forEach((d, i) => {
            p[`data[${i}]`] = d;
        })
        if (data.length==0) {
            wx.showModal({
                title: '系统提示',
                content: '您还没有选择商品'
            })
            return;
        }
        Api.OrderPrepareByCart(p).then(({ data }) => {
            wx.navigateTo({
                url: `/pages/orderConfirm/orderConfirm?id=${data}`
            })
        })
    },
    //猜你喜欢\
    /**
     * params:dsadsa
     */
    getRecommendList: function () {
        let self = this;
        let { reclist, page, allPage, loading, noData } = this.data;
        console.log('this.data',this.data)
        if (noData) return;
        if (loading) return;
        if (page > allPage && allPage > 0) return;
        return new Promise((resolve, reject) => {
            self.setData({ loading: true });
            Api.GoodsRecommend({ page }).then(data => {
                if (data.data && data.data.good && data.data.good.length > 0) {
                    let l = [...reclist, ...data.data.good];
                    if (page == data.data.all_page) {
                        self.setData({
                            allData: true
                        });
                    }
                    page++;
                    self.setData({
                        reclist: l,
                        page: page,
                        allPage: data.data.all_page
                    });
                    resolve();
                } else {
                    this.setData({ noData: true });
                    resolve();
                }
            }).catch(err => reject(err))
                .then(() => self.setData({ loading: false }));
        });
    },
    //手指触摸动作开始 记录起点X坐标
    touchstart: function (e) {
        this.data.list.forEach(function (v, i) {
            if (v.isTouchMove)//只操作为true的
                v.isTouchMove = false;
        })
        this.setData({
            startX: e.changedTouches[0].clientX,
            startY: e.changedTouches[0].clientY,
            list: this.data.list
        })
    },
    //滑动事件处理
    touchmove: function (e) {
        var that = this,
            index = e.currentTarget.dataset.index,//当前索引
            startX = that.data.startX,//开始X坐标
            startY = that.data.startY,//开始Y坐标
            touchMoveX = e.changedTouches[0].clientX,//滑动变化坐标
            touchMoveY = e.changedTouches[0].clientY,//滑动变化坐标
            //获取滑动角度
            angle = that.angle({ X: startX, Y: startY }, { X: touchMoveX, Y: touchMoveY });
        that.data.list.forEach(function (v, i) {
            v.isTouchMove = false
            //滑动超过30度角 return
            if (Math.abs(angle) > 30) return;
            if (i == index) {
                if (touchMoveX > startX) //右滑
                    v.isTouchMove = false
                else //左滑
                    v.isTouchMove = true
            }
        })
        //更新数据
        that.setData({
            list: that.data.list
        })
    },
    angle: function (start, end) {
        var _X = end.X - start.X,
            _Y = end.Y - start.Y
        //返回角度 /Math.atan()返回数字的反正切值
        return 360 * Math.atan(_Y / _X) / (2 * Math.PI);
    },
    //删除事件
    del: function (e) {
        let self = this;
        let id = e.currentTarget.dataset.id,
            count = 0;
        tips.showConfirm('系统提示', '确认删除此商品吗？', () => {
            self.editCart({ id, count }).then(() => {
                self.makeData();
            });
        });
    }
})
