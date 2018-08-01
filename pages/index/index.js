//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: '事件处理函数',
    userInfo: {},
    dataList: [],
    img: `/images/icon-confirm.png`,
    msg: '',
    name: 'wechat',
    hasUserInfo: false,
    textTitle: '深夜不睡觉',
    array: [1, 2, 3, 4, 5, 6],
    today: 3,
    count: 1,
    nameA: { firstName: 'wang', lastName: 'hui' },
    nameB: { firstName: 'zhang', lastName: 'san' },
    nameC: { firstName: 'li', lastName: 'dongdong' },
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  // 事件处理函数
  bindClick() {
    this.setData({ name: 'wanbghui' })
    console.log('你真的点击了我，你想知道什么呢？')
  },
  add() {
    this.setData(
      {
        count: this.data.count + 1
      }
    )
  },
  onLoad: function () {
    this.setData({ msg: 'World!' })
    // wx.request({
    //   url: 'https://m-flight.jd.id/tiket-pesawat/api/advertisement/page/mobile_ticket_ad_slot_page/module/carousel_moudel').then(res=>{
    //   console.log('res',res.data)
    // })
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
