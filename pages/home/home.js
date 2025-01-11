Page({
  data: {
    sitterLoading: true,
    sitterList: []
  },
  onLoad: function () {
    const config = require('../../config.js');
  
    // First wx.request
    wx.request({
      url: `${config.shopify_admin_URL}/api/collections`,
      method: 'GET',
      header: {
        'Content-Type': 'application/json',
        'cookie': config._vercel_jwt,
      },
      success: (res) => {
        // get sitter collection
        const sitterCollection = res.data.data.find(collection => collection.handle === 'sitter');
        if (!sitterCollection) {
          console.warn('Sitter collection not found');
          return;
        }
        const sitterCollectionId = sitterCollection.id;
        // get sitter collection products
        wx.request({
          url: `${config.shopify_admin_URL}/api/products`,
          method: 'POST',
          header: {
            'Content-Type': 'application/json',
            'cookie': config._vercel_jwt,
          },
          data: {
            "collection_id": sitterCollectionId,
          },
          success: (res) => {
            this.setData({
              sitterList: res.data.data,
              sitterLoading: false
            });
          },
          fail: (err) => {
            console.error('Second request failed:', err);
          },
        });
      },
      fail: (err) => {
        console.error('First request failed:', err);
      },
    });
  },
  
  handleItemClick(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/nanny/nanny?id=${id}`
    });
  }
})
