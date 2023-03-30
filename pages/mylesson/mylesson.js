let app = getApp()
Page({
  onReady() {
    const that = this
    // 如果是企业
    if (app.globalData.role == 2) {
      wx.request({
        url: app.globalData.address + '/activity/Lessons/selectLessonsByIdAndName?enterpriseId=' + app.globalData.userid,
        method: 'POST',
        success(res) {
          that.setData({
            enter: res.data
          })
        }
      })
    }
    // 如果是学生
    if (app.globalData.role == 3) {
      wx.request({
        url: app.globalData.address + '/activity/LessonsAttend/selectLessonsAttendByStuName/' + app.globalData.username,
        success(res) {
          that.setData({
            stuLesson: res.data
          })
        }
      })
    }
  },

  toLesson(e) {
    console.log(e.currentTarget.dataset);
    wx.navigateTo({
      url: '/pages/lesson/lesson?lessonid=' + e.currentTarget.dataset.lessonid + '&lessonInfo=' + e.currentTarget.dataset.lessoninfo + '&lessons=' + e.currentTarget.dataset.lessons + '&enterid=' + app.globalData.userid
    })
  }
})