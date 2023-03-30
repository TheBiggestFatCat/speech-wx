let app = getApp()
Page({
  data: {
    passed: false
  },
  onLoad(options) {
    this.setData({
      activityid: options.activityid
    })
  },

  checkboxChange: function(e) {
    this.setData({
      passed: e.detail.value.length > 0
    });
  },

  getInput(e) {
    this.setData({
      stuname: e.detail.value
    })
  },

  getText(e) {
    this.setData({
      info: e.detail.value
    })
  },

  submit() {
    const that = this
    wx.request({
      url: app.globalData.address + '/activity/InterView/addInterView?activityId=' + that.data.activityid + '&interViewInfo=' + that.data.info + '&stuName=' + that.data.stuname,
      method: 'POST',
      success(res) {
        console.log(res);
      }
    })
  }
})