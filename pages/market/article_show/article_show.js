const app = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        article: {},
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        wx.showLoading({
            title: '数据加载中',
        })
        var that = this;
        var openid = wx.getStorageSync('openId');
        var article_id = options.article_id

        wx.request({
            url: app.globalData.config.routes.essay_show,
            header: {
                'Accept': "*/*",
                'content-type': 'application/json' // 默认值
            },
            data: {
                id: article_id,
                openid: openid
            },
            success: function (res) {
                var obj = res.data;
                var article = {};
                article['title'] = obj.title
                article['dept'] = obj.dept
                article['date'] = obj.article_date
                article['content'] = obj.content
                that.setData({
                    article: article
                })
                wx.hideLoading();
            },
            fail: function () {
                wx.hideLoading();
            }
        })
    },
})