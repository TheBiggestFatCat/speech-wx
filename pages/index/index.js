let app = getApp()
Page({
  data: {
    username: '',
    password: '',
    role: 3,
    checked: true
  },
  register() {
    wx.navigateTo({
      url: '/pages/register/register',
    })
  },
  getUsername(e) {
    this.setData({
      username: e.detail.value
    })
  },
  getPassword(e) {
    this.setData({
      password: e.detail.value
    })
  },
  // 登录按钮
  login() {
    const that = this
    wx.request({
      url: app.globalData.address + '/activity/User/userLogin/?username=' + this.data.username + '&password=' + this.data.password + '&role=' + this.data.role,
      method: 'POST',
      success(res) {
        if (res.data == 1) {
          wx.request({
            url: app.globalData.address + '/activity/User/selectUserByName/' + that.data.username,
            success(res) {
              that.setData({
                avatar: res.data.picture,
                userid: res.data.userId
              })
              app.globalData.username = that.data.username
              app.globalData.password = that.data.password
              app.globalData.avatar = that.data.avatar
              app.globalData.role = that.data.role
              app.globalData.userid = that.data.userid
            }
          })
          wx.switchTab({
            url: '/pages/home/home',
          })
        } else {
          wx.showToast({
            title: '登录失败',
            icon: 'error'
          })
        }
      }
    })
  },
  selection(e) {
    this.setData({
      role: e.detail.value
    })
  }
})