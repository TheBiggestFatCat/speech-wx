// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  async loginImgbed() {
    wx.request({
      url: 'https://imgbed.link/imgbed/user/login',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        phoneNum: '15921869133',
        pwd: 'Zqy12345'
      },
      // 本地缓存图床token
      success(res) {
        wx.setStorage({
          key: 'token',
          data: res.data.token
        })
      },
      method: 'POST'
    })
  },
  globalData: {
    address: 'http://127.0.0.1:8091',
    token: '',
    username: '',
    password: '',
    avatar: '',
    role: ''
  }
})
