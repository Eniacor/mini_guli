// pages/address/address.js
const Api = require("../../config/method.js");
Page({
    data: {
        loadEnd: false,
        type: 'add',
        id: 0,
        addressMap: [],
        mapValue: [0, 0, 0],
        selectValue: [0, 0, 0],
        showMap: false,
        name: '',
        phone: '',
        address: '',
        is_default: false,
        showAddress:false
    },
    onLoad: function(options) {
        // 页面初始化 options为页面跳转所带来的参数
        console.log(options);
        let self = this;
        self.setData({
            type: options.type,
            id: options.id || 0
        });
        self.init();
    },
    onReady: function() {
        // 页面渲染完成
    },
    onShow: function() {
        // 页面显示
    },
    onHide: function() {
        // 页面隐藏
    },
    onUnload: function() {
        // 页面关闭
    },
    init: function() {
        let { type, id } = this.data;
        let self = this;
        if (type == 'add') {
            self.getAddressMap().then(() => {
                self.setData({
                    loadEnd: true
                });
            })
        } else if (type == 'edit') {
            self.getAddressMap().then(() => {
                return self.getAddressOne();
            }).then(() => {
                self.setData({
                    loadEnd: true
                });
            })
        }
    },
    initEditData: function(data) {
        console.log(data);
        let { province, city, district } = data;
        let { addressMap, mapValue } = this.data;
        addressMap.forEach((d, i) => {
            if (d.id == province) {
                mapValue[0] = i;
            }
        });
        addressMap[mapValue[0]].child.forEach((d, i) => {
            if (d.id == city) {
                mapValue[1] = i;
            }
        });
        addressMap[mapValue[0]].child[mapValue[0]].child.forEach((d, i) => {
            if (d.id == district) {
                mapValue[2] = i;
            }
        });
        this.setData({
            name: data.consignee,
            phone: data.telphone,
            address: data.address,
            is_default: data.is_default == '1',
            mapValue: mapValue,
            selectValue: mapValue
        })
    },
    getAddressMap: function() {
        let self = this;
        return new Promise((resolve, reject) => {
            Api.AddressMap().then(({ data }) => {
                self.setData({
                    addressMap: data
                });
                resolve();
            }).catch(err => reject(err));
        });
    },
    getAddressOne: function() {
        let self = this;
        let { id } = this.data;
        return new Promise((resolve, reject) => {
            Api.AddressOne({ id }).then(({ data }) => {
                self.initEditData(data);
                resolve();
            }).catch(err => reject(err));
        });
    },
    showAddressPicker: function() {
        this.setData({
            showMap: true
        });
    },
    hideAddressPicker: function() {
        let { mapValue } = this.data;
        this.setData({
            showMap: false,
            selectValue: mapValue
        });
    },
    submitAddressPicker: function() {
        let { selectValue } = this.data;
        this.setData({
            showAddress:true,
            showMap: false,
            mapValue: selectValue
        });
    },
    onChangeAddressPicker: function(e) {
        this.setData({
            selectValue: e.detail.value
        })
    },
    onNameInput: function(e) {
        this.setData({
            name: e.detail.value
        })
        return e.detail.value
    },
    onPhoneInput: function(e) {
        this.setData({
            phone: e.detail.value
        })
        return e.detail.value
    },
    onAddressInput: function(e) {
        this.setData({
            address: e.detail.value
        })
        return e.detail.value
    },
    onDefaultChange: function(e) {
        this.setData({
            is_default: e.detail.value
        })
    },
    onTapSubmit: function() {
        console.log(this.data);
        let { type, id, addressMap, mapValue, showMap, name, phone, address, is_default } = this.data;
        if (type == 'add') {
            Api.AddressAdd({
                province: addressMap[mapValue[0]].id,
                city: addressMap[mapValue[0]].child[mapValue[1]].id,
                area: addressMap[mapValue[0]].child[mapValue[1]].child[mapValue[2]].id,
                street: address,
                telphone: phone,
                user: name,
                is_default: is_default ? 1 : 0
            }).then(() => {
                wx.navigateBack();
            })
        } else if (type == 'edit') {
            Api.AddressModify({
                id,
                province: addressMap[mapValue[0]].id,
                city: addressMap[mapValue[0]].child[mapValue[1]].id,
                area: addressMap[mapValue[0]].child[mapValue[1]].child[mapValue[2]].id,
                street: address,
                telphone: phone,
                user: name,
                is_default: is_default ? 1 : 0
            }).then(() => {
                wx.navigateBack();
            })
        }
    },
    onBlock: function() {
        return;
    }
})
