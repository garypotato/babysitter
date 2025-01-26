const config = require('../../config.js');

Page({
  data: {
    news: null,
    newsLoading: true
  },
  onLoad(options) {
    const newsId = options.key;

    wx.request({
      url: `${config.shopify_admin_URL}/api/products/${newsId}`,
      method: 'GET',
      header: {
        'Content-Type': 'application/json',
        cookie: config._vercel_jwt,
      },
      success: (res) => {
        this.setData({
          news: res.data.data, 
          newsLoading: false 
        });
      },
      fail: () => {
        this.setData({
          news:{
            title: "抱歉, 服務器出錯了"
          }, 
          newsLoading: false 
        });
      },
    });
  },
})
