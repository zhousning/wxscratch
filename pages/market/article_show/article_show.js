const app = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        article_qrcode: '/images/gykgwx.png',
        article: {},
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        wx.showLoading({
            title: '数据加载中',
        })
        wx.showShareMenu({
            withShareTicket: true,
            menus: ['shareAppMessage', 'shareTimeline']
        })
        var that = this;
        var article_id = options.article_id

        wx.request({
            url: app.globalData.config.routes.essay_show,
            header: {
                'Accept': "*/*",
                'content-type': 'application/json' // 默认值
            },
            data: {
                id: article_id,
            },
            success: function (res) {
                var obj = res.data;
                var article = {};
                article['id'] = article_id
                article['title'] = obj.title
                article['dept'] = obj.dept
                article['date'] = obj.article_date
                article['content'] = obj.content
                article['image'] = obj.image
                that.setData({
                    article_qrcode: app.globalData.config.routes.host + 'article_qrcode.jpg',
                    article: article
                })
                wx.hideLoading();
            },
            fail: function () {
                wx.hideLoading();
            }
        })
    },
    onShareAppMessage: function () {
        return app.createShareMessage();
    },
    onShareTimeline: function() {
        var article = this.data.article
        return {
            title: article.title,
            query: {
                id: article.id
            },
            imageUrl: app.globalData.config.routes.host + article.image
        };
    }
})