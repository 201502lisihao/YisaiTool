const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    maskHidden: false,
    nickName: "",
    avatarUrl: "",
    imagePath: "",
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
    var that = this;
    wx.getUserInfo({
      success: res => {
        this.setData({
          nickName: res.userInfo.nickName,
          avatarUrl: res.userInfo.avatarUrl
        })
        console.log('nickName:' + this.data.nickName + ' avatarUrl:' + this.data.avatarUrl);
        // 头像下载到本地，暂时不用展示用户头像和昵称 需要的时候再看
        // wx.downloadFile({
        //   url: res.userInfo.avatarUrl,
        //   success: function (res) {
        //     if (res.statusCode === 200) {
        //       that.setData({
        //         avatarUrl: res.tempFilePath
        //       })
        //     }
        //   }
        // })
      }
    })
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
   * 用户点击生成海报
   */
  createNewPoster: function (e) {
    // 未登录处理
    if (!wx.getStorageSync('utoken')) {
      //弹窗跳转首页登录
      this.unLogin();
    } else {
      var that = this;
      this.setData({
        maskHidden: false
      });
      wx.showToast({
        title: '海报生成中...',
        icon: 'loading',
        duration: 1000
      });
      setTimeout(function () {
        that.doCreateNewPoster();
        wx.hideToast()
        that.setData({
          maskHidden: true
        });
      }, 1000)
    }
  },

  doCreateNewPoster: function () {
    var that = this;
    var context = wx.createCanvasContext('mycanvas');
    context.setFillStyle("#ffe200")
    context.fillRect(0, 0, 375, 670)
    var path = "/images/poster/posterOne.png";
    //将模板图片绘制到canvas,在开发工具中drawImage()函数有问题，不显示图片
    //不知道是什么原因，手机环境能正常显示
    //绘制背景
    context.drawImage(path, 0, 0, 375, 670);
    //绘制头像
    // var path1 = that.data.avatarUrl;
    // console.log(path1, "path1")
    //将模板图片绘制到canvas,在开发工具中drawImage()函数有问题，不显示图片
    // var path2 = "/images/job/jobOne_1.png";
    // var path3 = "/images/job/jobOne_1.png";
    // var path4 = "/images/job/jobOne_1.png";
    // var path5 = "/images/job/jobOne_1.png";
    // context.drawImage(path2, 126, 186, 120, 120);
    //不知道是什么原因，手机环境能正常显示
    // context.save(); // 保存当前context的状态

    //绘制名字
    // var nickName = that.data.nickName;
    // context.setFontSize(24);
    // context.setFillStyle('#333333');
    // context.setTextAlign('center');
    // context.fillText(nickName, 185, 340);
    // context.stroke();
    //绘制一起吃面标语
    // context.setFontSize(14);
    // context.setFillStyle('#333333');
    // context.setTextAlign('center');
    // context.fillText("邀请你一起去吃面", 185, 370);
    // context.stroke();
    //绘制验证码背景
    // context.drawImage(path3, 48, 390, 280, 84);
    //绘制code码
    // context.setFontSize(40);
    // context.setFillStyle('#ffe200');
    // context.setTextAlign('center');
    // context.fillText(that.data.code, 185, 435);
    // context.stroke();
    //绘制左下角文字背景图
    // context.drawImage(path4, 25, 520, 184, 82);
    // context.setFontSize(12);
    // context.setFillStyle('#333');
    // context.setTextAlign('left');
    // context.fillText("进入小程序输入朋友的邀请", 35, 540);
    // context.stroke();
    // context.setFontSize(12);
    // context.setFillStyle('#333');
    // context.setTextAlign('left');
    // context.fillText("码，朋友和你各自获得通用", 35, 560);
    // context.stroke();
    // context.setFontSize(12);
    // context.setFillStyle('#333');
    // context.setTextAlign('left');
    // context.fillText("优惠券1张哦~", 35, 580);
    // context.stroke();
    //绘制右下角扫码提示语
    // context.drawImage(path5, 248, 578, 90, 25);
    //绘制头像
    // context.arc(186, 246, 50, 0, 2 * Math.PI) //画出圆
    // context.strokeStyle = "#ffe200";
    // context.clip(); //裁剪上面的圆形
    // context.drawImage(path1, 136, 196, 100, 100); // 在刚刚裁剪的园上画图

    // 最终绘制
    context.draw();
    //将生成好的图片保存到本地，需要延迟一会，绘制期间耗时
    setTimeout(function () {
      wx.canvasToTempFilePath({
        canvasId: 'mycanvas',
        destWidth: 750,
        destHeight: 1228,
        success: function (res) {
          var tempFilePath = res.tempFilePath;
          //获取屏幕可用高度，计算海报距离屏幕顶部距离
          //todo lisihao 不同宽高比下，适配问题
          var systemInfo = wx.getSystemInfoSync();
          var canvasWidth = systemInfo.windowWidth * 0.8;
          var canvasHeight = canvasWidth / (375 / 614);
          console.log('宽：' + canvasWidth + ' 高：' + canvasHeight);

          that.setData({
            imagePath: tempFilePath,
            canvasWidth: canvasWidth,
            canvasHeight: canvasHeight
            // canvasHidden: true
          });
        },
        fail: function (res) {
          console.log(res);
        }
      });
    }, 200);
  },
  /**
   * 用户点击保存到本地
   */
  saveToAlbum: function () {
    var that = this
    wx.saveImageToPhotosAlbum({
      filePath: that.data.imagePath,
      success(res) {
        wx.showModal({
          content: '图片已保存到相册，分享到朋友圈后，可在 首页-个人中心-我的积分 中查看及使用积分',
          showCancel: false,
          confirmText: '好的',
          confirmColor: '#333',
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定');
              /* 该隐藏的隐藏 */
              that.setData({
                maskHidden: false
              })
              // 给用户奖励积分
              that.shareOk();
            }
          }, fail: function (res) {
            console.log("用户点击确定失败");
          }
        })
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (e) {
    // 未登录处理
    if (!wx.getStorageSync('utoken')) {
      //弹窗跳转首页登录
      this.unLogin();
    } else {
      var that = this;
      console.log('成功调用分享方法');
      var ret = {
        title: '转发得积分，免费吃牛肉',
        // imageUrl: 'https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640',
      };
      that.shareOk();
      //ret为转发框的内容，可自定义
      return ret;
    }
  },

  /**
   * 转发成功后的奖励
   */
  shareOk: function () {
    console.log('用户转发完成')
    //请求服务端保存积分订单,转发奖励10积分
    wx.request({
      url: 'https://www.qianzhuli.top/yisai/createorder',
      method: 'POST',
      data: {
        userId: wx.getStorageSync('userId'),
        awardPoint: 10,
        applyFrom: '转发得积分',
        orderDetail: 'nothing'
      },
      success: function (res) {
        console.log('调用服务器保存积分成功,res=');
        console.log(res);
        //服务器返回保存积分成功
        if (res.data.code == 200) {
          console.log('积分奖励成功,res=' + res)
          //跳转至奖励页面，查询积分&告知用户如何使用
          //todo lisihao
          // wx.navigateTo({
          //   url: '/pages/index/index',
          // })
        }
      },
      fail: function (res) {
        //清除订单备注的缓存
        console.log('积分奖励失败,res=' + res)
      }
    })
  },

  /**
   * 未登录处理
   */
  unLogin: function () {
    wx.showModal({
      content: '返回首页登录后，可参与分享得积分活动',
      showCancel: false,
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          // wx.redirectTo({
          //   url: '/pages/index/index',
          // })
          wx.navigateBack({

          });
        }
      }
    });
  }
})