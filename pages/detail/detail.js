let app = getApp()
Page({
  data: {

  },

  onLoad(options) {
    this.setData({
      detail: options
    })
  },

  onReady() {
    const that = this
    wx.request({
      url: app.globalData.address + '/activity/Comments/selectCommentsByActivityId/' + that.data.detail.id,
      success(res) {
        for (let i of res.data) {
          i.date = i.date.substring(0, 10)
        }
        that.setData({
          comments: res.data
        })
      }
    })
  },

  bao(e) {
    wx.request({
      url: app.globalData.address + '/activity/Application/addApplication/' + app.globalData.username + '/' + e.currentTarget.dataset.activityid,
      success(res) {
        wx.showToast({
          title: '报名成功',
        })
      }
    })
  },

  toComment() {
    wx.navigateTo({
      url: '/pages/comment/comment?id=' + this.data.detail.id
    })
  }
})