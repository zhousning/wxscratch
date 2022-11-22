const app = getApp()

Page({
    data: {
        PageCur: 'todos',
    },
    onShow() {
        let that = this;
        if (!app.globalData.hasUserInfo) {
            that.setData({
                PageCur: 'my'
            })
        }
    },
    NavChange(e) {
        let that = this;
        if (app.globalData.hasUserInfo) {
            that.setData({
                PageCur: e.currentTarget.dataset.cur
            })
        } else {
            that.setData({
                PageCur: 'my'
            })
        }
    },
    onShareAppMessage: function () {
        return app.createShareMessage();
    }
    
})