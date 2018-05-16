//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    state:1,
    myitem: [{ image: "/pages/image/caomei.jpg", choose: ["草莓","西瓜","苹果","香蕉"],anser:1},
             { image: "/pages/image/juzi.jpg", choose: ["草莓", "西瓜", "苹果", "桔子"], anser: 4 }],
    index:0   
  },
  //事件处理函数    
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
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
  getUserInfo2: function(e) {
    console.log(e.detail.userInfo)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
    this.setData({ mytxt: '123' })
  },
  choose: function (event){
    if (event.currentTarget.dataset.id == this.data.myitem[this.data.index].anser)
    {
      this.setData({ state: 2 })
    } 
    else{
      this.setData({ state: 3 })
    } 
  },
  next:function(e){
    this.setData({ state: 1 })
    var indextmp = this.data.index
    indextmp++;
    indextmp = indextmp % (this.data.myitem.length)
    this.setData({ index: indextmp })
  }
})
