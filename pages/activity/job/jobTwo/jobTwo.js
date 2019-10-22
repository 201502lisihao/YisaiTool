Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showShareMenu({
      withShareTicket: true
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (e) {
    var that = this;
    console.log('成功调用分享方法');
    var ret = {
      title: '转发得积分，免费吃牛肉',
      // imageUrl: 'https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640',
    };
    that.shareOk();
    return ret;
  },

  /**
   * 转发成功后的奖励
   */
  shareOk: function () {
    console.log('用户转发完成')
    //跳转至奖励页面，查询积分&告知用户如何使用
  }
})