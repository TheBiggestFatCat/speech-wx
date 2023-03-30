let app = getApp()
Page({
  data: {
    lessonData: []
  },

  onLoad(options) {
    this.setData({
      enterId: options.enterId,
      avatar: options.avatar,
      enterName: options.enter,
    })
  },

  onReady() {
    const that = this
    wx.request({
      url: app.globalData.address + '/activity/Lessons/selectLessonsByIdAndName?enterpriseId=' + that.data.enterId,
      method: 'POST',
      success(res) {
        that.setData({
          lessonData: res.data
        })
      }
    })
  },

  toLesson(e) {
    console.log(e.currentTarget.dataset);
    wx.navigateTo({
      url: '/pages/lesson/lesson?lessonid=' + e.currentTarget.dataset.lessonid + '&lessonInfo=' + e.currentTarget.dataset.lessoninfo + '&lessons=' + e.currentTarget.dataset.lessons + '&enterid=' + e.currentTarget.dataset.enterid
    })
  }
})