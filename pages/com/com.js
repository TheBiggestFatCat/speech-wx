let app = getApp()
Page({
  data: {
    page: 'speech',
    title: '',
    info: '',
    date: '',
    place: '',
    teacher: '',
    lessonTitle: '',
    lessonInfo: ''
  },
  
  // 切换发布类型
  toSpeech() {
    this.setData({
      animate: 'left: 0%',
      page: 'speech',
      title: '',
      info: '',
      date: '',
      place: '',
      teacher: ''
    })
  },
  toInterview() {
    this.setData({
      animate: 'left: 33.3%',
      page: 'interview',
      title: '',
      info: '',
      date: '',
      place: '',
      teacher: ''
    })
  },
  toLesson() {
    this.setData({
      animate: 'left: 66.6%',
      page: 'lesson',
      title: '',
      info: '',
      date: '',
      place: '',
      teacher: ''
    })
  },

  // 获取输入框信息
  getTitle(e) {
    this.setData({
      title: e.detail.value
    })
  },
  getInfo(e) {
    this.setData({
      info: e.detail.value
    })
  },
  getDate(e) {
    this.setData({
      date: e.detail.value
    })
  },
  getPlace(e) {
    this.setData({
      place: e.detail.value
    })
  },
  getTeacher(e) {
    this.setData({
      teacher: e.detail.value
    })
  },
  getLessonTitle(e) {
    this.setData({
      lessonTitle: e.detail.value
    })
  },
  getLessonInfo(e) {
    this.setData({
      lessonInfo: e.detail.value
    })
  },

  submit() {
    let url = app.globalData.address + '/activity/Activity/addActivity' + ((this.data.page == 'speech') ? '1/' : '2/') + app.globalData.username + '/' + this.data.title + '/' + this.data.info + '/' + this.data.date + '/' + this.data.place
    const check =this.data.page + app.globalData.username + this.data.title + this.data.info + this.data.date + this.data.place
    if (this.data.page == 'speech') {
      url = url + '/' + this.data.teacher
    }
    console.log(check);
    if (check.includes('/')) {
      wx.showToast({
        title: '不能带有斜杠！',
        icon: 'error'
      })
      return
    }
    wx.request({
      url: url,
      success(res) {
        if (res.data == 1) {
          wx.showToast({
            title: '发布成功',
          })
          wx.redirectTo({
            url: '/pages/home/home',
          })
        } else {
          wx.showToast({
            title: '内容不能为空',
            icon: 'error'
          })          
        }
      },
    })
  },

  submitLesson() {
    const that = this
    wx.request({
      url: app.globalData.address + '/activity/User/selectUserByName/' + app.globalData.username,
      success(res) {
        let url = app.globalData.address + '/activity/Lessons/addLessons' + '?lessons=' + that.data.lessonTitle + '&lessonsInfo=' + that.data.lessonInfo + '&enterpriseId=' + res.data.userId + '&enterpriseName=' + app.globalData.username
        wx.request({
          url: url,
          method: 'POST',
          success(res) {
            if (res.data == 1) {
              wx.showToast({
                title: '发布成功',
              })
              wx.redirectTo({
                url: '/pages/home/home',
              })
            }
          }
        })
      }
    })
    
  }
})