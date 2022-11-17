// pages/todos/process/process.js
const app = getApp()

Component({
  options: {
    addGlobalClass: true
  },
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    articles: []
  },
  lifetimes: {
    attached: function() {
      wx.showLoading({
        title: '数据加载中',
      })
      var that = this;
      var openid = wx.getStorageSync('openId');
      
      wx.request({
        url: app.globalData.config.routes.essay_all,
        header: {
          'Accept': "*/*",
          'content-type': 'application/json' // 默认值
        },
        data: {
          openid: openid
        },
        success: function (res) {
          var objs = res.data;
          var articles = [];
          for (var i = 0; i < objs.length; i++) {
            articles.push({
              url: '/pages/market/article_show/article_show?article_id=' + objs[i].id,
              title: objs[i].title,
              dept: objs[i].dept,
              date: objs[i].article_date,
            })
          }
          that.setData({
            articles: articles
          })
          wx.hideLoading();
        },
        fail: function () {
          wx.hideLoading();
        }
      })
    }
  },
})
