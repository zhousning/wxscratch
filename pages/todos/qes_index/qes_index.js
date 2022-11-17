const app = getApp()

Page({
  options: {
    addGlobalClass: true
  },
  /**
   * 页面的初始数据
   */
  data: {
    qes_type: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
        wx.showLoading({
            title: '数据加载中',
        })
        var that = this;
        var qes_lib = options.qes_lib
        var openid = wx.getStorageSync('openId');

        wx.request({
            url: app.globalData.config.routes.qes_bank_type_all,
            header: {
                'Accept': "*/*",
                'content-type': 'application/json' // 默认值
            },
            data: {
                openid: openid,
                qes_bank_id: qes_lib
            },
            success: function (res) {
                var obj = res.data;
                var qes_type = [{
                    'icon': 'single.png',
                    'title': '单选题',
                    'count': obj.single,
                    'url': '/pages/todos/qes_show/qes_show?type=single&qes_lib=' + qes_lib,
                  },
                  {
                    'icon': 'mcq.png',
                    'title': '多选题',
                    'count': obj.mcq,
                    'url': '/pages/todos/qes_show/qes_show?type=mcq&qes_lib=' + qes_lib
                  },
                  {
                    'icon': 'tof.png',
                    'title': '判断题',
                    'count': obj.tof,
                    'url': '/pages/todos/qes_show/qes_show?type=tof&qes_lib=' + qes_lib
                  },
                  {
                    'icon': 'qaa.png',
                    'title': '编程/操作题',
                    'count': obj.qaa,
                    'url': '/pages/todos/qes_show/qes_show?type=qaa&qes_lib=' + qes_lib
                  }
                ]
                that.setData({
                    qes_type: qes_type
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