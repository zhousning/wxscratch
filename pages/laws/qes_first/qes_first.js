// pages/todos/qes_list/qes_list.js
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
        law_ctg: null,
        qes_type: []
    },

    onLoad: function (options) {
        wx.showLoading({
            title: '数据加载中',
        })
        var that = this;
        var law_ctg = options.law_ctg;
        var openid = wx.getStorageSync('openId');

        wx.request({
            url: app.globalData.config.routes.law_ctg_qes_bank,
            header: {
                'Accept': "*/*",
                'content-type': 'application/json' // 默认值
            },
            data: {
                law_ctg_id: law_ctg,
                openid: openid
            },
            success: function (res) {
                var objs = res.data.res;
                var header_title = res.data.title;
                var iconList = [];
                for (var i = 0; i < objs.length; i++) {
                    var url = '';
                    if (objs[i].ctg == 'PDF') {
                        url = ''
                    } else {
                        url = '/pages/laws/qes_show/qes_show?' + 'article_id=' + objs[i].id
                    }
                    iconList.push({
                        url: url,
                        id: objs[i].id,
                        ctg: objs[i].ctg,
                        attach: objs[i].attach,
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
    openDoc(e) {
        var url = app.globalData.config.routes.nhost + e.currentTarget.dataset.url;
        var id = e.currentTarget.dataset.id;
        var books = wx.getStorageSync('books') || {}
        if (books[id]) {
            var filePath = books[id]
            wx.openDocument({
                filePath: filePath,
            })
        } else {
            wx.showLoading({
                title: '数据加载中',
            })
            wx.downloadFile({
                url: url,
                success: function (res) {
                    var filePath = res.tempFilePath
                    books[id] = filePath
                    wx.setStorageSync('books', books)
                    setTimeout(function () {
                        wx.openDocument({
                            filePath: filePath,
                            success: function (res) {
                                wx.hideLoading();
                            }
                        })
                    }, 3000);
                }
            })
        }

    }
})