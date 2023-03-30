let app = getApp()
Page({
  data: {

  },
  onLoad(options) {
    this.setData({
      lessonId: options.lessonid,
      lessonInfo: options.lessonInfo,
      lessons: options.lessons,
      enterid: options.enterid,
      userid: app.globalData.userid + ''
    })
    if (this.data.enterid == this.data.userid) {
      this.setData({
        manager: true
      })
    } else {
      this.setData({
        manager: false
      })
    }
  },

  onReady() {
    const that = this
    wx.request({
      url: app.globalData.address + '/activity/LessonsAttend/selectLessonAttendByLessonsId/' + this.data.lessonId,
      success(res) {
        that.setData({
          stu: res.data
        })
      }
    })
  },

  sign() {
    wx.request({
      url: app.globalData.address + '/activity/LessonsAttend/addLessonAttend/' + this.data.lessonId + '/' + app.globalData.username,
      success(res) {
        if (res.data == 1) {
          wx.showToast({
            title: '报名成功',
          })
        } else {
          wx.showToast({
            title: '报名失败！',
            icon: 'error'
          })
        }
      }
    })
  },

  pass(e) {
    const that = this
    const attendId = e.currentTarget.dataset.attendid
    const status = e.currentTarget.dataset.status
    wx.request({
      url: app.globalData.address + '/activity/LessonsAttend/alterLessonAttend/' + status + '/' + attendId,
      success(res) {
        console.log(res);
        that.onReady()
      }
    })
  }
})