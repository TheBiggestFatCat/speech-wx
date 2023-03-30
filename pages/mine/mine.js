let app = getApp()
Page({
  data: {

  },
  onLoad(options) {

  },
  onReady() {
    console.log(app.globalData);
    this.setData({
      username: app.globalData.username,
      avatar: app.globalData.avatar,
      role: app.globalData.role
    })
  },

  toMyspeech(e) {
    const type = e.currentTarget.dataset.type
    wx.navigateTo({
      url: '/pages/myspeech/myspeech?type=' + type,
    })
  },

  toTongzhi(e) {
    wx.navigateTo({
      url: '/pages/tongzhi/tongzhi',
    })
  },

  toMylesson() {
    wx.navigateTo({
      url: '/pages/mylesson/mylesson',
    })
  },

  exit() {
    app.globalData = {}
    app.globalData.address = 'http://127.0.0.1:8091'
    wx.redirectTo({
      url: '/pages/index/index',
    })
  }
})