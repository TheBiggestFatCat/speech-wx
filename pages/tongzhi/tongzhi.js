let app = getApp()
Page({
  data: {
  },
  onReady() {
    const that = this
    that.setData({
      show: app.globalData.role
    })
    if (app.globalData.role == 2) {
      
    wx.request({
      url: app.globalData.address + '/activity/Activity/selectActivityByNameAnd/?userName=' + app.globalData.username,
      method: 'POST',
      success(res) {
        let inter = []
        for (let i of res.data) {
          if (i.type == 1 && i.status == 1) {
            inter.push(i)
          }
        }
        that.setData({
          inter: inter
        })
      }
    })
  }
    if (app.globalData.role == 3) {
      let results = []
      wx.request({
        url: app.globalData.address + '/activity/InterView/selectInterViewByStuName/' + app.globalData.username,
        success(res) {
          for (let i of res.data) {
            let result = {}
            result.info = i.interViewInfo
            wx.request({
              url: app.globalData.address + '/activity/Activity/selectActivityById/' + i.activityId,
              success(res) {
                result.title = res.data.title
                that.setData({
                  result: results
                })
              }
            })
            results.push(result)
          }
          
        }
      })
    }
  },

  goNewtongzhi(e) {
    wx.navigateTo({
      url: '/pages/newtongzhi/newtongzhi?activityid=' + e.currentTarget.dataset.activityid
    })
  }
})