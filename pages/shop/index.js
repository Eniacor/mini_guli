var app = getApp();
const Api = require("../../config/method.js");
const Session = require('../../common/auth/session');
const tips = require('../../common/tips');
var licensearr = [];
var photoarr = [];
Page({
    data: {
        token: '',
        uid: '',
        licensearr: [],
        photoarr: [],
        name: '',
        intro: '',
        cname: '',
        phone: ''
    },
    onShow: function () {
        this.init();
    },
    onReady: function () {
        //this.init();
    },
    onLoad: function (options) {
        let { province, city, area, info, province_id, city_id, area_id, latitude, longitude } = options;
        let address = province + city + area + info;
        if(address){
            this.setData({
                province: province,
                city: city,
                area: area,
                info: info,
                address: address,
                province_id: province_id,
                city_id: city_id,
                area_id: area_id,
                latitude: latitude,
                longitude: longitude,
                onload:true
            })
        }
    },
    init: function () {
        var self = this;
        let session = Session.get();
        let token = session.token;
        let uid = session.uid;
        if (!uid) {
            tips.showAction('系统提示', '您未绑定手机号，需要去绑定手机号码？', () => {
                let url = '/pages/bindPhone/bindPhone?from=' + encodeURIComponent('pages/shop/index');
                wx.navigateTo({ url })
            });
        }
        this.setData({
            token: token,
            uid: uid
        })
        Api.getBusinessInfo().then(res => {
            let { id, province_name, city_name, area_name, street, province_id, city_id, area_id, name, info, connect_tel, connect_user, lng, lat } = res.data.base_info;
            let address = province_name + city_name + area_name + street;
            var b_data = {};
            b_data.result = res.data.img_business;

            var l_data = {};
            l_data.result = res.data.img_license;
            var img_license = [],
                img_business = [];
            if (res.data.length != 0) {
                for (var i = 0; i < b_data.result.length; i++) {
                    img_business.push(b_data.result[i]['img']);
                }

                for (var i = 0; i < l_data.result.length; i++) {
                    img_license.push(l_data.result[i]['img']);
                }
            }
            console.log('elf.data.onload',self.data.onload)
            if(self.data.onload){
                self.setData({
                    sid: id,
                    name: name,
                    intro: info,
                    cname: connect_user,
                    phone: connect_tel,
                    licensearr: img_license,
                    photoarr: img_business,
                })  
            }else{
                self.setData({
                    sid: id,
                    address: address,
                    name: name,
                    intro: info,
                    cname: connect_user,
                    phone: connect_tel,
                    licensearr: img_license,
                    photoarr: img_business,
                    province_id: province_id,
                    city_id: city_id,
                    area_id: area_id,
                    province: province_name,
                    city: city_name,
                    area: area_name,
                    info: street,
                    latitude: lat,
                    longitude: lng
                })
            }
            
        })
    },
    //确认提交
    submitShop: function () {
        let { name, intro, cname, phone, licensearr, photoarr, sid,
            province, city, area, info, address,
            province_id, city_id, area_id, latitude, longitude, } = this.data
        if (sid) {//修改
            Api.addEditInfo({
                m_b_id: sid,
                name: name,
                info: intro,
                connect_user: cname,
                connect_tel: phone,
                province_id: province_id,
                province_name: province,
                city_id: city_id,
                city_name: city,
                area_id: area_id,
                area_name: area,
                street: info,
                lat: latitude,
                lng: longitude,
                img_license: licensearr,
                img_business: photoarr,
            }).then(res => {
                tips.showConfirm('系统提示', '修改成功', () => {
                    wx.switchTab({
                        url: '/pages/mine/index',
                    })
                });
            })
        } else {
            Api.addEditInfo({
                name: name,
                info: intro,
                connect_user: cname,
                connect_tel: phone,
                province_id: province_id,
                province_name: province,
                city_id: city_id,
                city_name: city,
                area_id: area_id,
                area_name: area,
                street: info,
                lat: latitude,
                lng: longitude,
                img_license: licensearr,
                img_business: photoarr,
            }).then(res => {
                tips.showConfirm('系统提示', '提交成功', () => {
                    wx.switchTab({
                        url: '/pages/mine/index',
                    })
                });
            })
        }


    },
    removeImg: function (arr, val) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] == val) {
                arr.splice(i, 1);
                break;
            }
        }
        return arr;
    },
    removeLicense: function (e) {
        let { src } = e.currentTarget.dataset;
        let licensearr = this.data.licensearr;
        licensearr = this.removeImg(licensearr, src)
        this.setData({
            licensearr: licensearr
        })
    },
    removeBusiness: function (e) {
        let { src } = e.currentTarget.dataset;
        let photoarr = this.data.photoarr;
        photoarr = this.removeImg(photoarr, src)
        this.setData({
            photoarr: photoarr
        })
    },

    nameInput: function (e) {
        let { value } = e.detail;
        this.setData({ name: value });
        return value;
    },
    introInput: function (e) {
        let { value } = e.detail;
        this.setData({ intro: value });
        return value;
    },
    cnameInput: function (e) {
        let { value } = e.detail;
        this.setData({ cname: value });
        return value;
    },
    phoneInput: function (e) {
        let { value } = e.detail;
        this.setData({ phone: value });
        return value;
    },
    //上传图片 from licesens--营业执照 photo--商家照片
    uploadImg: function (e) {
        var self = this;
        let { from } = e.currentTarget.dataset;
        let arr = this.data.photoarr;
        if (arr.length >= 9) {
            tips.showModel('系统提示', '最多上传9张商家图片');
            return;
        }
        wx.chooseImage({
            count: 9 - arr.length, // 默认9
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function (res) {
                // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                let tempFilePaths = res.tempFilePaths
                let arr = self.uploadMutileimg({
                    url: 'https://5hao.sheep.squmo.com/api.php/User/upload_business_img',
                    path: tempFilePaths,
                    from: from
                })
            }
        })
    },
    //微信上传多张图片
    uploadMutileimg: function (data) {
        var that = this,
            i = data.i ? data.i : 0,
            success = data.success ? data.success : 0,
            fail = data.fail ? data.fail : 0;
        wx.uploadFile({
            url: data.url,
            filePath: data.path[i],
            name: 'file',
            success: (res) => {
                success++;
            },
            fail: (res) => {
                fail++;
            },
            complete: (res) => {
                i++;
                var imgdata = JSON.parse(res.data);
                var img = imgdata.data[0];
                if (data.from == "license") {
                    that.data.licensearr.push(img)
                } else if (data.from == "photo") {
                    that.data.photoarr.push(img)
                }
                if (i == data.path.length) { //当图片传完时，停止调用   
                    if (data.from == "license") {
                        that.setData({
                            licensearr: that.data.licensearr
                        })
                    } else if (data.from == "photo") {
                        that.setData({
                            photoarr: that.data.photoarr
                        })
                    }
                } else {//若图片还没有传完，则继续调用函数                    
                    data.i = i;
                    data.success = success;
                    data.fail = fail;
                    that.uploadMutileimg(data);
                }

            }
        })
    },

})