// pages/speak/home/home.js
const app = getApp()
Component({
    options: {
        addGlobalClass: true,
    },
    /**
     * 组件的初始数据
     */
    data: {
        text: ''
    },

    /**
     * 组件的方法列表
     */
    methods: {
        bindFormSubmit: function (e) {
            var that = this;
            var text = e.detail.value.textarea;
            var openid = wx.getStorageSync('openId');

            if (text == null || text.trim().length < 20) {
                wx.showToast({
                    title: '请输入20个字以上',
                    icon: 'none',
                    duration: 2000
                })
            } else {
                wx.showLoading({
                    title: '系统正在处理中...',
                })
                wx.request({
                    url: app.globalData.config.routes.nhost + '/advises/create_advise',
                    method: 'post',
                    data: {
                        text: text,
                        openid: openid
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
                                title: '您的想法已收到，非常感谢您的支持。',
                                icon: 'none',
                                duration: 3000,
                                success: function() {
                                    that.setData({
                                        text: ''
                                    });
                                }
                            })
                        } else {
                            wx.showToast({
                                title: '提交失败,请重新提交',
                                icon: 'none',
                                duration: 2000
                            })
                        }
                    },
                    fail: function () {
                        wx.hideLoading();
                        wx.showToast({
                            title: '提交失败,请重新提交',
                            icon: 'none',
                            duration: 2000
                        })
                    }
                })
            }
        },
    }
})