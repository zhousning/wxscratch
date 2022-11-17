const config = require('config')
const app = getApp()

var init = {
    notice: function (that) {
        wx.request({
            //url: config.routes.notice_query_latest,
            url: config.routes.notice_query_latest,
            header: {
                'Accept': "*/*",
                'content-type': 'application/json' // 默认值
            },
            success: function (res) {
                var data = res.data
                if (data.id) {
                    var article_url = '/pages/todos/notice/notice?article_id=' + data.id
                    that.setData({
                        notice: data.title,
                        article_url: article_url
                    })
                }
            }
        })
    },
    learnctgs: function (that) {
        var openid = wx.getStorageSync('openId');
        wx.request({
            url: config.routes.learn_ctg_all,
            header: {
                'Accept': "*/*",
                'content-type': 'application/json' // 默认值
            },
            data: {
                openid: openid
            },
            success: function (res) {
                var objs = res.data;
                var iconList = [];
                for (var i = 0; i < objs.length; i++) {
                    iconList.push({
                        url: '/pages/todos/qes_first/qes_first?learn_ctg=' + objs[i].id,
                        icon: app.globalData.IconList[i],
                        color: app.globalData.colors[i],
                        badge: 1,
                        name: objs[i].name + '',
                        logo: objs[i].logo + '',
                    })
                }
                that.setData({
                    iconList: iconList
                })
            },
            fail: function () {}
        })
    },
    carousels: function (that) {
        var openid = wx.getStorageSync('openId');
        wx.request({
            url: config.routes.carousel,
            header: {
                'Accept': "*/*",
                'content-type': 'application/json' // 默认值
            },
            data: {
                openid: openid
            },
            success: function (res) {
                var objs = res.data.dogs;
                var swiperList = [];
                for (var i = 0; i < objs.length; i++) {
                    swiperList.push({
                        id: i,
                        type: 'image',
                        url: config.routes.nhost + objs[i]
                    })
                }
                that.setData({
                    swiperList: swiperList
                })
            },
            fail: function () {}
        })
    },
    lawctgs: function (that) {
        var openid = wx.getStorageSync('openId');
        wx.request({
            url: config.routes.law_ctg_all,
            header: {
                'Accept': "*/*",
                'content-type': 'application/json' // 默认值
            },
            data: {
                openid: openid
            },
            success: function (res) {
                var objs = res.data;
                var iconList = [];
                for (var i = 0; i < objs.length; i++) {
                    iconList.push({
                        url: '/pages/laws/qes_first/qes_first?law_ctg=' + objs[i].id,
                        icon: app.globalData.LawIconList[i],
                        color: app.globalData.colors[i],
                        badge: 1,
                        name: objs[i].name + '',
                    })
                }
                that.setData({
                    lawList: iconList
                })
            },
            fail: function () {}
        })
    },
    qes_banks: function (that) {
        var openid = wx.getStorageSync('openId');
        wx.request({
            url: config.routes.host + '/qes_banks/query_all',
            header: {
                'Accept': "*/*",
                'content-type': 'application/json' // 默认值
            },
            data: {
                openid: openid
            },
            success: function (res) {
                var objs = res.data;
                var iconList = [];
                for (var i = 0; i < objs.length; i++) {
                    iconList.push({
                        url: '/pages/todos/qes_list/qes_list?qes_lib=' + objs[i].name,
                        icon: app.globalData.IconList[i],
                        color: app.globalData.colors[i],
                        badge: 1,
                        name: i + 1 + '',
                        title: objs[i].name
                    })
                }
                //that.setData({
                //   iconList: iconList
                //})
                wx.hideLoading();
            },
            fail: function () {
                wx.hideLoading();
            }
        })
    }
}

module.exports = init