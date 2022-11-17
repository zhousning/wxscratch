const app = getApp()
Page({
    options: {
        addGlobalClass: true
    },
    data: {
        article_url: ''
    },
    onLoad: function (options) {
        let that = this;
        var article_id = options.article_id
        var article_url = app.globalData.config.routes.law_ctg_query_show + '?id=' + article_id
        that.setData({
            article_url: article_url
        })
    }
})