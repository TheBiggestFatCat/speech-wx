let app = getApp()
const FormData = require('./upload.js')
Page({
  data: {
    avatar: '',
    username: '',
    password: '',
    role: 3,
    checked: true
  },
  onLoad() {
    app.loginImgbed()
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
  register() {
    const that = this
    wx.request({
      url: app.globalData.address + '/activity/User/addUser/?userName=' + that.data.username + '&password=' + that.data.password + '&role=' + that.data.role + '&picture=' + that.data.avatar,
      method: 'POST',
      success(res) {
        if (res.data == 1) {
          wx.showToast({
            title: '注册成功',
          })
          setTimeout(() => {
            wx.switchTab({
              url: '/pages/home/home',
            })
          }, 2000)
          app.globalData.username = that.data.username
          app.globalData.password = that.data.password
          app.globalData.avatar = that.data.avatar
          app.globalData.role = that.data.role
        } else {
          wx.showToast({
            title: '注册失败',
            icon: 'error'
          })
        }
      },
      fail(res) {
        wx.showToast({
          title: '注册失败',
          icon: 'error'
        })
      }
    })
  },
  uploadAvatar() {
    const that = this
    wx.chooseMedia({
      count: 1,
      mediaType: ['image'],
      sourceType: ['album', 'camera'],
      camera: 'back',
      success(res) {
        wx.showLoading({
          title: '上传中',
        })
        const img = wx.getFileSystemManager().readFileSync(res.tempFiles[0].tempFilePath, "base64")
        const path = res.tempFiles[0].tempFilePath
        console.log(path);
        // 读取token
        wx.getStorage({
          key: 'token',
          success(res) {
            const token = res.data
            let formData = new FormData()
            formData.appendFile('file', path)
            let data = formData.getData();
            wx.request({
              url: 'https://imgbed.link/imgbed/file/upload',
              header: {
                'content-type': data.contentType,
                'token': token
              },
              method: 'POST',
              data: data.buffer,
              success(res) {
                that.setData({
                  avatar: res.data.rows[0].url
                })
                wx.showToast({
                  title: '上传成功',
                })
              },
              complete() {
                wx.hideLoading()
              }
            });
          }
        })
      }
    })
  },
  selection(e) {
    this.setData({
      role: e.detail.value
    })
  }

})
