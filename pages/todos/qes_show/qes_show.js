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
        answer: '', //用于换题后radio清空
        myAnswer: '', //用于给正确答案显示绿色字体
        previous_disabled: true,
        next_disabled: false,
        hiddenTrueAnswer: true,
        hiddenAnalyse: true,
        modalName: '',
        text: '', //纠错弹出框
        count: 0,
        qes_title: '',
        qes_type: '',
        qes_options: [],
        select_qesnum: 0,
    },
    radioChange(e) {
        let items = this.data.qes_options
        for (let i = 0, len = items.length; i < len; ++i) {
            if (items[i].value === e.detail.value) {
                items[i].checked = true
                if (items[i].true_answer) {
                    items[i].answer_true = true
                } else {
                    items[i].answer_false = true
                }
            } else {
                items[i].checked = false
            }
        }

        this.setData({
            qes_options: items
        })
    },
    checkboxChange(e) {
        let items = this.data.qes_options
        const values = e.detail.value
        for (let i = 0, lenI = items.length; i < lenI; ++i) {
            items[i].checked = false

            for (let j = 0, lenJ = values.length; j < lenJ; ++j) {
                if (items[i].value === values[j]) {
                    items[i].checked = true
                    if (items[i].true_answer) {
                        items[i].answer_true = true
                    } else {
                        items[i].answer_false = true
                    }
                    break
                }
            }
        }
        this.setData({
            qes_options: items
        })
    },
    showTrueAnswer: function () {
        this.setData({
            hiddenTrueAnswer: false
        })
    },
    showAnalyse: function () {
        this.setData({
            hiddenAnalyse: false
        })
    },
    previousQes: function () {
        var that = this;
        var current = that.data.current - 1
        that.setData({
            next_disabled: false,
            answer: '',
            current: current,
            myAnswer: '',
            hiddenAnalyse: true,
            hiddenTrueAnswer: true,
        })
        if (current == 0) {
            that.setData({
                previous_disabled: true
            })
        } else {
            that.setData({
                previous_disabled: false
            })
        }
        that.set_question()
    },
    nextQes: function () {
        var that = this;
        var current = that.data.current + 1
        var count = that.data.count 
        that.setData({
            previous_disabled: false,
            answer: '',
            current: current,
            myAnswer: '',
            hiddenAnalyse: true,
            hiddenTrueAnswer: true,
        })
        if (current == count - 1) {
            that.setData({
                next_disabled: true
            })
        } else {
            that.setData({
                next_disabled: false
            })
        }
        that.set_question()
    },
    //点击弹出模态框
    showModal(e) {
        this.setData({
            select_qesnum: this.data.current,
            modalName: e.currentTarget.dataset.target
        })
    },
    //答题卡取消按钮
    cancelAnsSheet(e) {
        this.setData({
            modalName: null,
        })
    },
    //答题卡确定按钮
    confirmAnsSheet(e) {
        var that = this;
        var current = that.data.select_qesnum
        var count = that.data.count
        var previous_disabled = true
        var next_disabled = true
        if (current == 0) {
            previous_disabled = true
        } else {
            previous_disabled = false
        }
        if (current == count - 1) {
            next_disabled = true
        } else {
            next_disabled = false
        }
        that.setData({
            modalName: null,
            current: current,
            previous_disabled: previous_disabled,
            next_disabled: next_disabled,
        })
        that.set_question()
    },
    set_question() {
        var that = this;
        var current = that.data.current
        var questions = wx.getStorageSync('questions')
        var qes_title = questions[current].title.replaceAll("src='", "src='" + app.globalData.config.routes.nhost)
        var qes_type = questions[current].type
        var qes_answer = questions[current].answer.replaceAll("src='", "src='" + app.globalData.config.routes.nhost)
        var qes_analyse = questions[current].analyse.replaceAll("src='", "src='" + app.globalData.config.routes.nhost)

        var options = questions[current].options
        var option_arr = []
        for(var i=0; i < options.length; i++) {
            option_arr.push({
                id: options[i].id, 
                value: options[i].value, 
                content: options[i].content.replaceAll("src='", "src='" + app.globalData.config.routes.nhost), 
                true_answer: options[i].true_answer 
            })
        }
        that.setData({
            qes_title: qes_title,
            qes_type: qes_type,
            qes_answer: qes_answer,
            qes_analyse: qes_analyse,
            qes_options: option_arr
        })
    },
    //选择编号显示绿色背景
    choose_qesnum(e) {
        var val = e.currentTarget.dataset.target
        this.setData({
            select_qesnum: val 
        })
    },
    onLoad: function (options) {
        var that = this;
        var openid = wx.getStorageSync('openId');
        var qes_lib = options.qes_lib;
        var type = options.type
        var current= that.data.current

        wx.showLoading({
            title: '数据加载中',
        })
        wx.request({
            url: app.globalData.config.routes.host + '/wx_qesbanks/' + type + '_query_all',
            header: {
                'Accept': "*/*",
                'content-type': 'application/json' // 默认值
            },
            data: {
                qes_bank_id: qes_lib,
                openid: openid
            },
            success: function (res) {
                var questions = res.data;

                wx.setStorageSync('questions', questions)
                var options = questions[current].options
                var option_arr = []
                for(var i=0; i < options.length; i++) {
                    option_arr.push({
                        id: options[i].id, 
                        value: options[i].value, 
                        content: options[i].content.replaceAll("src='", "src='" + app.globalData.config.routes.nhost), 
                        true_answer: options[i].true_answer 
                    })
                }
                that.setData({
                    next_disabled: questions.length <= 1 ? true : false, 
                    count: questions.length,
                    qes_title: questions[current].title.replaceAll("src='", "src='" + app.globalData.config.routes.nhost),
                    qes_type: questions[current].type,
                    qes_answer: questions[current].answer.replaceAll("src='", "src='" + app.globalData.config.routes.nhost),
                    qes_analyse: questions[current].analyse.replaceAll("src='", "src='" + app.globalData.config.routes.nhost),
                    qes_options: option_arr 
                })
                wx.hideLoading();
            },
            fail: function () {
                wx.hideLoading();
            }
        })
    },
    //提交纠错内容
    bindFormSubmit: function (e) {
        var that = this;
        var text = e.detail.value.textarea;
        var questions = this.data.questions;
        var current = this.data.current;
        var openid = wx.getStorageSync('openId');

        if (text == null || text.trim().length < 20) {
            wx.showToast({
                title: '请输入20个字以上',
                icon: 'none',
                duration: 2000
            })
        } else {
            wx.showLoading({
                title: '系统正在处理中...',
            })
            text = '题目：' + questions[current].title + '【问题】' + text
            wx.request({
                url: app.globalData.config.routes.advise_create,
                method: 'post',
                header: {
                    'Accept': "*/*",
                    'content-type': 'application/json' // 默认值
                },
                data: {
                    text: text,
                    openid: openid
                },
                success: function (res) {
                    var status = res.data.status
                    wx.hideLoading();
                    if (status == 'success') {
                        wx.showToast({
                            title: '您的问题已收到，非常感谢您的支持。',
                            icon: 'none',
                            duration: 3000,
                            success: function () {
                                that.setData({
                                    modalName: null,
                                    text: ''
                                })
                            }
                        })
                    } else {
                        wx.showToast({
                            title: '提交失败,请重新提交',
                            icon: 'none',
                            duration: 2000
                        })
                    }
                },
                fail: function () {
                    wx.hideLoading();
                    wx.showToast({
                        title: '提交失败,请重新提交',
                        icon: 'none',
                        duration: 2000
                    })
                }
            })
        }
    },
    //答题卡取消按钮
    cancelCorrect(e) {
        this.setData({
            modalName: null,
            text: ''
        })
    },
})