let app = getApp()
Page({
  onLoad(options) {
    this.setData({
      id: options.id
    })
  },
  getText(e) {
    this.setData({
      text: e.detail.value
    })
  },
  submit() {
    wx.request({
      url: app.globalData.address + '/activity/Comments/addComments?activityId=' + this.data.id + '&comments=' + this.data.text + '&stuName=' + app.globalData.username,
      method: 'POST',
      success(res) {
        wx.showToast({
          title: '评论成功'
        })
        wx.redirectTo({
          url: '/pages/home/home',
        })
      }
    })
  }
})