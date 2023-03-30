let app = getApp()
Page({
  data: {

  },
  onLoad(options) {
    this.setData({
      type: options.type
    })
  },

  onReady() {
    const that = this
    if (this.data.type == 'myspeech') {
    wx.request({
      url: app.globalData.address + '/activity/Activity/selectActivityByNameAnd/?userName=' + app.globalData.username,
      method: 'POST',
      success(res) {
        for (let i of res.data) {
          if (i.type == 0) {
            i.type = '宣讲'
          }
          if (i.type == 1) {
            i.type = '面试'
          }
          if (i.status == 0) {
            i.status = '审核中'
          }
          if (i.status == 1) {
            i.status = '通过'
          }
          if (i.status == 2) {
            i.status = '未通过'
          }
        }
        that.setData({
          activity: res.data
        })
      }
    })
      
  }
  if (this.data.type == 'mylesson') {
    wx.request({
      url: '/activity/Lessons/selectLessonsByIdAndName',
      success(res) {
        
      }
    })
  }
  }
  

})