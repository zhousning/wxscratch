const timer = require('../../../plugins/wxTimer')
const question = require('../../../datas/question')
const app = getApp()
Page({
  options: {
    addGlobalClass: true
  },
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    questions: [],
    current: 0,
    previous: 0,
    next: 0,
    previous_disabled: true,
    next_disabled: false,
    wxTimerList: {}
  },
  globalObj: {
    wxTimer: null
  },
  radioChange(e) {
    let current = this.data.current
    let questions = this.data.questions
    let items = questions[current].options
    for (let i = 0, len = items.length; i < len; ++i) {
      items[i].checked = items[i].value === e.detail.value
    }

    let options = 'questions[' +current + '].options'
    this.setData({
      [options]: items
    })
  },
  checkboxChange(e) {
    let current = this.data.current
    let questions = this.data.questions
    let items = questions[current].options
    const values = e.detail.value
    for (let i = 0, lenI = items.length; i < lenI; ++i) {
      items[i].checked = false

      for (let j = 0, lenJ = values.length; j < lenJ; ++j) {
        if (items[i].value === values[j]) {
          items[i].checked = true
          break
        }
      }
    }
    let options = 'questions[' +current + '].options'
    this.setData({
      [options]: items
    })
  },
  showTrueAnswer: function () {
    this.setData({
      hiddenTrueAnswer: false
    })
  },
  previousQes: function () {
    var val = this.data.current - 1
    this.setData({
      next_disabled: false,
      current: val
    })
    if (val == 0) {
      this.setData({
        previous_disabled: true
      })
    } else {
      this.setData({
        previous_disabled: false
      })
    }
  },
  nextQes: function () {
    var val = this.data.current + 1
    var qes = this.data.questions
    this.setData({
      previous_disabled: false,
      current: val
    })
    if (val == qes.length - 1) {
      this.setData({
        next_disabled: true
      })
    } else {
      this.setData({
        next_disabled: false
      })
    }
  },
  hand_paper: function(){

  },

  onLoad: function (options) {
    var that = this;
    that.setData({
      questions: question.questions.items
    })
    // // var openid = wx.getStorageSync('openid');
    // // var qes_lib = options.qes_lib;
    // // var type = options.type

    // // wx.showLoading({
    // //   title: '数据加载中',
    // // })
    // // wx.request({
    // //   url:  app.globalData.setting.routes.host + '/qes_banks/' + qes_lib + '/' + type + '/query_all',
    // //   header: {
    // //     'Accept': "*/*",
    // //     'content-type': 'application/json' // 默认值
    // //   },
    // //   data: {
    // //     openid: openid
    // //   },
    // //   success: function (res) {
    // //     var objs = res.data;
    // //     var qes_type = '';
    // //     switch (type) {
    // //       case 'singles':
    // //         qes_type = '单选题'
    // //         break;
    // //         case 'mcqs':
    // //         qes_type = '多选题'
    // //         break;
    // //         case 'tofs':
    // //         qes_type = '判断题'
    // //         break;
    // //         case 'qaas':
    // //         qes_type = '问答题'
    // //         break;
    // //     }
    // //     that.setData({
    // //       questions: objs,
    // //       qes_type: qes_type
    // //     })
    // //     wx.hideLoading();
    // //   },
    // //   fail: function () {
    // //     wx.hideLoading();
    // //   }
    // })
  },

  onReady: function () {
    var that = this;
    that.globalObj.wxTimer = new timer({
      beginTime: "00:12:10",
      name: 'wxTimer',
      complete: function () {
        console.log("完成了")
      },
      interval: 2,
      intervalFn: function () {
        console.log('read 2');
      }
    })
    that.globalObj.wxTimer.start(that);
  },

  onShow: function () {

  },

  onHide: function () {


  },

  onUnload: function () {
    var that = this;
    that.globalObj.wxTimer.stop();
    wx.showModal({
      title: '提示',
      content: '考试进行中，离开将不计入考试成绩',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }
})