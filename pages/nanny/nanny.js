Page({
  data: {
    sitter:{}
  },
  onLoad(options) {
    const id = options.id;
    const config = require('../../config.js');
    
    wx.request({
      url: `${config.shopify_admin_URL}/api/products/${id}`,
      method: 'GET',
      header: {
        'Content-Type': 'application/json',
        'cookie': config._vercel_jwt,
      },
      success: (res) => {
        this.setData({
          ...this.data,
          sitter: res.data.data,
        });
      },
      fail: (err) => {
        console.error('请求失败:', err);
      },
    });
  }
})
