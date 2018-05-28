const Api = require("../../config/method.js");
const QQMapWX = require('../../common/qqmap-wx-jssdk.min.js');
const tips = require('../../common/tips.js');
Page({
    data: {
        latitude: '39.9046900000',
        longitude: '116.4071700000',
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
        showAddress: false,
        isLoaction: false
    },
    onLoad: function (options) {
        let self = this;
        self.init();
    },
    onReady: function (e) {
        this.mapCtx = wx.createMapContext('myMap')
    },
    init: function () {
        let {
            type,
            id
        } = this.data;
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
    initEditData: function (data) {
        console.log(data);
        let {
            province,
            city,
            district
        } = data;
        let {
            addressMap,
            mapValue
        } = this.data;
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
    getAddressMap: function () {
        let self = this;
        return new Promise((resolve, reject) => {
            Api.AddressMap().then(({
                data
            }) => {
                self.setData({
                    addressMap: data
                });
                resolve();
            }).catch(err => reject(err));
        });
    },
    showAddressPicker: function () {
        this.setData({
            showMap: true
        });
    },
    hideAddressPicker: function () {
        let {
            mapValue
        } = this.data;
        this.setData({
            showMap: false,
            selectValue: mapValue
        });
    },
    submitAddressPicker: function () {
        let {
            selectValue
        } = this.data;
        this.setData({
            showAddress: true,
            showMap: false,
            mapValue: selectValue
        });
    },
    onChangeAddressPicker: function (e) {
        this.setData({
            selectValue: e.detail.value
        })
    },
    keyInput: function (e) {
        let {
            value
        } = e.detail;
        this.setData({
            info: value
        });
        return value;
    },
    onTapSubmit: function () {
        console.log(this.data);
        if (!this.data.isLoaction) {
            tips.showModel('系统提示', '缺少信息，请定位后操作');
            return;
        }
        let {
            addressMap,
            mapValue,
            info,
            latitude,
            longitude
        } = this.data;
        let province = addressMap[mapValue[0]].name,
            city = addressMap[mapValue[0]].child[mapValue[1]].name,
            area = addressMap[mapValue[0]].child[mapValue[1]].child[mapValue[2]].name;
        let province_id = addressMap[mapValue[0]].id,
            city_id = addressMap[mapValue[0]].child[mapValue[1]].id,
            area_id = addressMap[mapValue[0]].child[mapValue[1]].child[mapValue[2]].id;
        this.setData({
            selected: true
        })
        let url = '/pages/shop/index?province=' + province + '&city=' + city + '&area=' + area + '&info=' + info + '&province_id=' + province_id +
            '&city_id=' + city_id + '&area_id=' + area_id + '&latitude=' + latitude + '&longitude=' + longitude;
        console.log('url', url)
        wx.navigateTo({
            url: url
        })
    },
    //定位
    addressLocation: function () {
        var self = this;
        let {
            addressMap,
            mapValue,
            info,
            selectValue
        } = this.data;
        let province = addressMap[mapValue[0]].name,
            city = addressMap[mapValue[0]].child[mapValue[1]].name,
            area = addressMap[mapValue[0]].child[mapValue[1]].child[mapValue[2]].name;
        if (!info) {
            tips.showModel('系统提示', '请输入详情地址');
            return;
        }
        var address = province + city + area + info;
        console.log('address', address)
        var demo = new QQMapWX({
            key: 'EALBZ-YHGWQ-XI55S-GD4WQ-J6WHF-UBF7Z' // 必填
        });
        demo.geocoder({
            address: address,
            success: function (res) {
                console.log(res);
                var location = res.result.location;
                console.log('location.lat', location.lat)
                console.log('location.lng', location.lng)
                self.setData({
                    latitude: location.lat,
                    longitude: location.lng,
                    isLoaction: true,
                    markers: [{
                        id: "1",
                        latitude: location.lat,
                        longitude: location.lng,
                        width: 30,
                        height: 30,
                        iconPath: "../../images/icon/location.png",
                        title: "哪里"
                    }],
                })

            },
            fail: function (res) {
                tips.showModel('系统提示', '定位失败');
            },
        });
    },
})
