let app = getApp()
Page({
  data: {
    // 页面
    page: 'speech',
    animate: 'left: 0%',
    role: 3,
    speechData: [
    ],
    interviewData: [
    ],
    enterData: [],
    signinData: [],
  },
  onReady() {
    const that = this
    let spData = {}
    let interData = {}
    that.setData({
      role: app.globalData.role
    })
    // 宣讲
    wx.request({
      url: app.globalData.address + '/activity/Activity/selectActivityByAnd/?type=0&status=1',
      method: 'POST',
      success(res) {
        spData = res.data
        for (let i in spData) {
          wx.request({
            url: app.globalData.address + '/activity/User/selectUserByName/' + spData[i].userName,
            success(res) {
              spData[i].avatar = res.data.picture
              that.setData({
                speechData: spData,
                
              })
            }
          })
        }
      }
    })
    // 面试
    wx.request({
      url: app.globalData.address + '/activity/Activity/selectActivityByAnd/?type=1&status=1',
      method: 'POST',
      success(res) {
        interData = res.data
        for (let i in interData) {
          wx.request({
            url: app.globalData.address + '/activity/User/selectUserByName/' + interData[i].userName,
            success(res) {
              interData[i].avatar = res.data.picture
              that.setData({
                interviewData: interData,
                role: app.globalData.role
              })
            }
          })
        }
      }
    })
    // 企业
    wx.request({
      url: app.globalData.address + '/activity/User/selectUserByRole/2',
      success(res) {
        that.setData({
          enterData: res.data
        })
        for (let i in that.data.enterData) {
          wx.request({
            url: app.globalData.address + '/activity/Lessons/selectLessonsByIdAndName?enterpriseId=' + that.data.enterData[i].userId,
            method: 'POST',
            success(res) {
              if (res.data.length > 0) {
                that.setData({
                  ['enterData[' + i + '].show']: res.data.length
                })
              } else {
                that.setData({
                  ['enterData[' + i + '].show']: false
                })                
              }
            }
          })
        }
      }
    })
    // 打卡
    wx.request({
      url: app.globalData.address + '/activity/Application/selectApplicationByStuNameClock?stuName=' + app.globalData.username + '&clock=0',
      method: 'POST',
      success(res) {
        let signin = []
        that.setData({
          signinData: signin
        })
        if (res.data.length != 0) {
        for (let i of res.data) {
          const id = i.activityId
          wx.request({
            url: app.globalData.address + '/activity/Activity/selectActivityById/' + id,
            success(res) {
              signin.push(res.data)
              that.setData({
                signinData: signin
              })
            }
          })
        }
      }
      }
    })
  },

  toSpeech() {
    this.setData({
      animate: 'left: 0%',
      page: 'speech'
    })
    this.onReady()
  },
  toInterview() {
    this.setData({
      animate: 'left: 25%',
      page: 'interview'
    })
    this.onReady()
  },
  toLesson() {
    this.setData({
      animate: 'left: 50%',
      page: 'lesson'
    })
    this.onReady()
  },
  toSignin() {
    this.setData({
      animate: 'left: 75%',
      page: 'signin'
    })
    this.onReady()
  },
  toCom() {
    wx.navigateTo({
      url: '/pages/com/com',
    })
  },
  toEnter(e) {
    wx.navigateTo({
      url: '/pages/enter/enter?enterId=' + e.currentTarget.dataset.id + '&avatar=' + e.currentTarget.dataset.avatar + '&enter=' + e.currentTarget.dataset.enter
    })
  },
  toDetail(e) {
    const params = e.currentTarget.dataset
    if (params.type == 'speech') {
      console.log(params);
      const date = params.date
      const place = params.place
      const info = params.info
      const title = params.title
      const teacher = params.teacher
      const id = params.activityid
      wx.navigateTo({
        url: '/pages/detail/detail?date=' + date + '&place=' + place + '&info=' + info + '&title=' + title + '&teacher=' + teacher + '&id=' + id
      })
    }
    if (params.type == 'interview') {
      const date = params.date
      const place = params.place
      const info = params.info
      const title = params.title
      const id = params.activityid
      wx.navigateTo({
        url: '/pages/detail/detail?date=' + date + '&place=' + place + '&info=' + info + '&title=' + title + '&id=' + id
      })
    }
  },
  card(e) {
    const that = this
    wx.request({
      url: app.globalData.address + '/activity/Application/selectApplicationByIdStuNameClock?activityId=' + e.currentTarget.dataset.activityid + '&clock=0&stuName=' + app.globalData.username,
      method: 'POST',
      success(res) {
        wx.request({
          url: app.globalData.address + '/activity/Application/updateApplication/' + res.data[0].applicationId,
          success(res) {
            wx.showToast({
              title: '打卡成功',
            })
            that.onReady()
          }
        })
      }
    })
  }
})