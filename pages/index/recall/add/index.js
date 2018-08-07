const tips = require('../../../../common/tips');
const Api = require('../../../../config/method');
const Session = require('../../../../common/auth/session')
const app = getApp()
Page({
    /**
     * 页面的初始数据
     */
    data: {
        pindex:0,
        parent:[{
            "name":"请选择听/说/读/写"
        }],
        cindex:0,
        children:[{
            "name":"请选择具体题型"
        }],
        date: '请选择考试日期',
        import2:false,
        import3:false,
        import4:false,
        number:1,
        sindex:0,
        yindex:0,
        dindex:0,
        state:[{
            "name":"请选择考场所在国家"
        }],
        city:[{
            "name":"请选择考场所在城市"
        }],
        chang:[{
            "name":"请选择考场"
        }],
        title:'',
        content:'',
        content1:'',
        content2:'',
        content3:'',
        content4:'',
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        Api.TestPoint({}).then(({ data }) => {
            let state=[{
                "name":"请选择考场所在国家"
            }];
            for(let i in data){
                if(data[i].level==1){
                    state.push(data[i]);
                }
            }
            this.setData({
                state:state,
                point:data,
            });
            resolve();
        }).catch(err => reject(err));

        Api.QuestionType({}).then(({ data }) => {
            let parent=[{
                "name":"请选择听/说/读/写"
            }];
            
            for(let i in data){
                
                if(data[i].level=="1"){
                    data[i].name=data[i].long_name;
                    parent.push(data[i]);
                }else{
                    data[i].name=data[i].short_name;
                }
            }
            this.setData({
                parent:parent,
                question:data,
            });
            resolve();
        }).catch(err => reject(err));

    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {},
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

        console.log(app);
    },
    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {},
    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {},
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
        wx.stopPullDownRefresh();
    },
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {},
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {},
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {},
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {},
    // skipPage:app.skipPage,
    skipPage: app.skipPage,
    bindParentChange: function (e) {
        let data=[{
            name:"请选择具体题型"
        }];
        for(let i in this.data.question){
            if(this.data.question[i].level==2&&this.data.parent[e.detail.value].id==this.data.question[i].pid){
                data.push(this.data.question[i]);
            }
        }
        this.setData({
            pindex: e.detail.value,
            children:data,
            cindex:0,
        })
    },
    bindChildrenChange: function (e) {
        this.setData({
            cindex: e.detail.value
        })
    },
    bindDateChange: function (e) {
        this.setData({
            date: e.detail.value
        })
    },
    handleMore:function(e){
        let number=this.data.number;
        if(number<=4){
            number++
            let str="import"+number;
            this.setData({
                [str]:true,
                number:number,
            });
        }
    },
    handleData:function(){
        let session=Session.get();
        let time = new Date(this.data.date).getTime();
        Api.Memory({
            "openid":session.openid,
            "time":time/1000,
            "state": this.data.state[this.data.sindex].id,
            "city": this.data.city[this.data.yindex].id,
            "chang":this.data.chang[this.data.dindex].id,
            "parent":this.data.parent[this.data.pindex].id,
            "children":this.data.children[this.data.cindex].id,
            "title":this.data.title,
            "content":this.data.content,
            "import":this.data.content1,
            "import1":this.data.content2,
            "import2":this.data.content3,
            "import3":this.data.content4,
        }).then(({ data }) => {
            resolve();
        }).catch(err => reject(err));
        tips.showSuccess("添加成功!");
        setTimeout(()=>{
            wx.navigateTo({url: '/pages/index/recall/index'});
        },1000);
       
    },
    getTitle:function(e){
        this.setData({
            title:e.detail.value
        });
    },
    getContent:function(e){
        this.setData({
            content:e.detail.value
        });
    },
    getImport1:function(e){
        this.setData({
            content1:e.detail.value
        });
    },
    getImport2:function(e){
        this.setData({
            content2:e.detail.value
        });
    },
    getImport3:function(e){
        this.setData({
            content3:e.detail.value
        });
    },
    getImport4:function(e){
        this.setData({
            content4:e.detail.value
        });
    },
    bindStateChange: function (e) {
        let data=[{
            name:"请选择考场所在城市"
        }];
        for(let i in this.data.point){
            if(this.data.point[i].level==2&&this.data.state[e.detail.value].id==this.data.point[i].pid){
                data.push(this.data.point[i]);
            }
        }
        this.setData({
            sindex: e.detail.value,
            city:data,
            yindex:0,
        })
    },
    bindCityChange: function (e) {
        let data=[{
            name:"请选择考场"
        }];
        for(let i in this.data.point){
            if(this.data.point[i].level==3&&this.data.city[e.detail.value].id==this.data.point[i].pid){
                data.push(this.data.point[i]);
            }
        }
        this.setData({
            yindex: e.detail.value,
            chang:data,
            dindex:0,
        })
    },
    bindChangChange: function (e) {
        this.setData({
            dindex: e.detail.value
        })
    },
});