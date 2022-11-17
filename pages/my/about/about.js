const app = getApp();
const configs = require('../../../libs/config.js')
Page({
    data: {
        StatusBar: app.globalData.StatusBar,
        CustomBar: app.globalData.CustomBar,
        ColorList: app.globalData.ColorList,
        ongoing: false,
        username: '',
        phone: '',
        company: '',
        index: 0,
        picker: [],
    },
    onLoad: function () {
        let that = this;
        let openid = wx.getStorageSync('openId')
        wx.showLoading({
            title: '数据加载中',
        })
        wx.request({
            url: configs.routes.status,
            method: 'get',
            header: {
                'Accept': "*/*",
                'content-type': 'application/json' // 默认值
            },
            data: {
                openid: openid
            },
            success: function (res) {
                var index = 0
                var data = res.data
                var name = data.name
                var phone = data.phone
                var fct = data.fct
                var array = []
                var fcts = data.fcts
                for(var i=0; i<fcts.length; i++){
                    if (fcts[i] == fct) {
                        index = i
                    }
                    array.push(fcts[i])
                }
                that.setData({
                    username: name,
                    phone: phone,
                    picker: array,
                    index: index
                })
                wx.hideLoading();
            }
        })
    },
    PickerChange(e) {
        this.setData({
            index: e.detail.value
        })
    },
    // 获取输入账号 
    usernameInput: function (e) {
        this.setData({
            username: e.detail.value
        })
    },

    // 获取输入密码 
    phoneInput: function (e) {
        this.setData({
            phone: e.detail.value
        })
    },

    // 登录处理
    login: function () {
        var that = this;
        var openid = wx.getStorageSync('openId')
        if (this.data.username.length == 0) {
            wx.showToast({
                title: '名称不能为空',
                icon: 'none',
                duration: 2000
            })
        } else {
            wx.showLoading({
                title: '系统正在处理中...',
            })
            wx.request({
                url: configs.routes.set_fct,
                method: 'post',
                data: {
                    openid: openid,
                    name: that.data.username,
                    phone: that.data.phone,
                    fct: that.data.picker[that.data.index]
                },
                header: {
                    'Accept': "*/*",
                    'content-type': 'application/json' // 默认值
                },
                success: function (res) {
                    var status = res.data.status
                    wx.hideLoading();
                    if (status == 'success') {
                        wx.showToast({
                            title: '保存成功',
                            icon: 'none',
                            duration: 2000
                        })
                    } else {
                        wx.showToast({
                            title: '保存失败',
                            icon: 'none',
                            duration: 2000
                        })
                    }
                },
                fail: function () {
                    wx.hideLoading();
                    wx.showToast({
                        title: '提交失败，请重新提交',
                        icon: 'none',
                        duration: 2000
                    })
                }
            })
        }
    },
    pageBack() {
        wx.navigateBack({
            delta: 1
        });
    }
});