const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderList: [],
    hasOrderList: false,
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '拼命加载中...'
    });
    // 未登录处理
    if (!wx.getStorageSync('utoken')){
      //弹窗跳转首页登录
      this.unLogin();
    }
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
    //获取用户订单信息
    this.getOrderListByUserId();
  },

  getUserInfo: function (e) {
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
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.hideLoading();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    console.log('test');
    this.getOrderListByUserId();
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  /**
   * button带参数跳转订单详情页
   */
  orderDetail: function (id) {
    var id = id.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../orderResult/orderResult?orderId=' + id,
    });
  },

  /**
   * 根据userId获取用户订单
   */
  getOrderListByUserId: function () {
    var that = this;
    var userId = wx.getStorageSync('userId');
    //请求服务器，获取该用户实时的orderList并放入缓存
    wx.request({
      url: 'https://www.qianzhuli.top/wx/getorderlistbyuserid?userId=' + userId,
      success: function (res) {
        var orderList = res.data.order_list
        console.log(orderList);
        //放入本地缓存
        //wx.setStorageSync(key, orderList);
        //放入页面data
        if (orderList != false && orderList != undefined) {
          that.setData({
            orderList: orderList,
            hasOrderList: true
          })
        }
      },
      fail: function (res) {
        console.log('请求服务器获取用户orderlist失败');
        console.log(res);
      }
    })
  },
  /**
   * 即刻下单
   */
  goOrder: function () {
    wx.navigateTo({
      url: '/pages/Order/selectStore/selectStore',
    })
  },

  /**
   * 未登录处理
   */
  unLogin: function (){
      wx.showModal({
        content: '返回首页登录后可查看积分',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
            wx.redirectTo({
              url: '/pages/index/index',
            })
          }
        }
      });
    }
})