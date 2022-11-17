// components/article_show/article_show.js
const app = getApp()
Component({
    options: {
        addGlobalClass: true
    },
    properties: {
        url: String
    },
    data: {
        StatusBar: app.globalData.StatusBar,
        CustomBar: app.globalData.CustomBar,
        article: {},
    },
    lifetimes: {
        ready: function() {
            wx.showLoading({
                title: '数据加载中',
            })
            var that = this;
            var openid = wx.getStorageSync('openId');
            wx.request({
                url: that.properties.url,
                header: {
                    'Accept': "*/*",
                    'content-type': 'application/json' // 默认值
                },
                data: {
                    openid: openid
                },
                success: function (res) {
                    var obj = res.data;
                    var content = obj.content.replace(/\<img/gi, '<img style="max-width:100%;height:auto;display:block;margin:10px 0;"')
                    var article = {};
                    article['title'] = obj.title
                    article['dept'] = obj.dept == null ? '' : obj.dept
                    article['date'] = obj.article_date
                    article['content'] = content 
                    that.setData({
                        article: article
                    })
                    wx.hideLoading();
                },
                fail: function (e) {
                    wx.hideLoading();
                }
            })
        }
    }
})