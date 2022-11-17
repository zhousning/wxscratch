// pages/todos/qes_list/qes_list.js
const app = getApp()
Page({

    options: {
        addGlobalClass: true
    },
    data: {
        StatusBar: app.globalData.StatusBar,
        CustomBar: app.globalData.CustomBar,
        gridCol: 2,
        skin: false,
        header_title: '',
        cardCur: 0,
        iconList: [],
        qes_lib: null,
        qes_type: []
    },

    onLoad: function (options) {
        wx.showLoading({
            title: '数据加载中',
        })
        var that = this;
        var qes_lib = options.qes_lib
        var learn_ctg_id = options.learn_ctg_id
        var openid = wx.getStorageSync('openId');

        wx.request({
            url: app.globalData.config.routes.qes_bank_lib_all,
            header: {
                'Accept': "*/*",
                'content-type': 'application/json' // 默认值
            },
            data: {
                openid: openid,
                learn_ctg_id: learn_ctg_id,
                qes_lib_name: qes_lib
            },
            success: function (res) {
                var objs = res.data.res;
                var iconList = [];
                for (var i = 0; i < objs.length; i++) {
                    iconList.push({
                        url: '/pages/todos/qes_index/qes_index?qes_lib=' + objs[i].id,
                        icon: app.globalData.IconList[i],
                        color: app.globalData.colors[i],
                        badge: 1,
                        name: objs[i].name,
                        title: objs[i].name
                    })
                }
                that.setData({
                    header_title: res.data.title,
                    iconList: iconList
                })
                wx.hideLoading();
            },
            fail: function (e) {
                console.log(e)
                wx.hideLoading();
            }
        })
    },
})