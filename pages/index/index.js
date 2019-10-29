//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    welcome: '你好！',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    bnrUrl: [{
      "url": "https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640"
    }, {
      "url": "https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640"
    }, {
      "url": "https://images.unsplash.com/photo-1551446591-142875a901a1?w=640"
    }],
    list: [
      {
        id: 'zhaopin',
        name: '招兵买马',
        open: false,
        pages: [
          {
            name: '人事助理',
            url: '/pages/activity/job/jobOne/jobOne'
          },
          {
            name: '销售主管',
            url: '/pages/activity/job/jobTwo/jobTwo'
          },
        ]
      },
      {
        id: 'user',
        name: '个人中心',
        open: false,
        pages: [
          {
            name: '我的积分',
            url: '/pages/user/myPoints/myPoints'
          }
        ]
      },
      {
        id: 'more',
        name: '更多',
        open: false,
        pages: [
          {
            name: '在线商城',
            url: '/pages/more/mall/mall'
          },
          {
            name: '关于我们',
            url: '/pages/more/about/about'
          },
        ]
      }
    ]
  },
  /**
   * 页面加载函数
   */
  onLoad: function () {
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
    wx.showShareMenu({
      withShareTicket: true
    });

    //获取欢迎词
    this.getWelcome();
  },

  //列表伸缩
  kindToggle: function (e) {
    var id = e.currentTarget.id, list = this.data.list;
    for (var i = 0, len = list.length; i < len; ++i) {
      if (list[i].id == id) {
        list[i].open = !list[i].open
      } else {
        list[i].open = false
      }
    }
    this.setData({
      list: list
    });
  },
  
  /**
   * 获取欢迎词
   */
  getWelcome: function () {
    var that = this;
    var nowDate = new Date();
    var nowHour = nowDate.getHours();
    //console.log(nowHour);
    if (nowHour >= 6 && nowHour <= 8) {
      that.setData({
        welcome: '早上好！'
      })
    }
    if (nowHour >= 9 && nowHour <= 11) {
      that.setData({
        welcome: '上午好！'
      })
    }
    if (nowHour >= 12 && nowHour <= 14) {
      that.setData({
        welcome: '中午好！'
      })
    }
    if (nowHour >= 15 && nowHour <= 18) {
      that.setData({
        welcome: '下午好！'
      })
    }
    if ((nowHour >= 19 && nowHour <= 23) || (nowHour >= 0 && nowHour <= 5)) {
      that.setData({
        welcome: '晚上好！'
      })
    }
  },

  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
    //访问服务器保存用户信息并缓存在本地
    app.checkUser();
  },
  /**
   * 分享测试
   */
  onShareAppMessage: function (e) {
    console.log('成功调用分享方法');
    console.log(e);
    return {
      title: '免费吃牛肉',
    }
  },
  /**
   * 注销
   */
  logout: function (){
    wx.removeStorageSync('utoken');
    this.setData({
      hasUserInfo: false,
      userInfo:{}
    });
  } 
})
