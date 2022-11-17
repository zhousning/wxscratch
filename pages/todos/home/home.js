// pages/todos/process/process.js
const init = require('../../../libs/syinit')
const app = getApp()

Component({
    options: {
        addGlobalClass: true
    },
    data: {
        StatusBar: app.globalData.StatusBar,
        CustomBar: app.globalData.CustomBar,
        notice: '',
        article_url: '',
        skin: false,
        cardCur: 0,
        swiperList: [{
            id: 0,
            type: 'image',
            url: ''
        }],
        iconList: [],
        lawList: [],
        gridCol: 1
    },
    lifetimes: {
        attached: function () {
            var that = this;
            init.notice(that);
            //init.qes_banks(that);
            init.learnctgs(that);
            init.lawctgs(that);
            init.carousels(that);
        },

    },
    methods: {
        DotStyle: function (e) {
            this.setData({
                DotStyle: e.detail.value
            })
        },
        cardSwiper: function (e) {
            this.setData({
                cardCur: e.detail.current
            })
        }
    }
})