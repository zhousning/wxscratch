const app = getApp()

Page({

    options: {
        addGlobalClass: true
    },
    /**
     * 页面的初始数据
     */
    data: {
        StatusBar: app.globalData.StatusBar,
        CustomBar: app.globalData.CustomBar,
        gridCol: 2,
        skin: false,
        cardCur: 0,
        header_title: '',
        iconList: [],
        learn_ctg: null,
        qes_type: []
    },

    onLoad: function (options) {
        wx.showLoading({
            title: '数据加载中',
        })
        var that = this;
        var learn_ctg = options.learn_ctg;
        var openid = wx.getStorageSync('openId');

        wx.request({
            url: app.globalData.config.routes.learn_ctg_qes_bank,
            header: {
                'Accept': "*/*",
                'content-type': 'application/json' // 默认值
            },
            data: {
                learn_ctg_id: learn_ctg,
                openid: openid
            },
            success: function (res) {
                var objs = res.data.res;
                var header_title = res.data.title;
                var iconList = [];
                for (var i = 0; i < objs.length; i++) {
                    iconList.push({
                        url: '/pages/todos/qes_list/qes_list?learn_ctg_id=' + learn_ctg + '&qes_lib=' + objs[i].name,
                        icon: app.globalData.IconList[i],
                        color: app.globalData.colors[i],
                        badge: 1,
                        name: objs[i].name
                    })
                }
                that.setData({
                    iconList: iconList,
                    header_title: header_title
                })
                wx.hideLoading();
            },
            fail: function () {
                wx.hideLoading();
            }
        })
    },
})