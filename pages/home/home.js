const config = require('../../config.js');

Page({
  data:{
    newsLoading: true,
    newsList: [],
  },
  onLoad() {
    wx.request({
      url: `${config.shopify_admin_URL}/api/collections`,
      method: 'GET',
      header: {
        'Content-Type': 'application/json',
        cookie: config._vercel_jwt,
      },
      success: (res) => {
        const newsCollection = res.data.data.find((collection) => collection.handle === 'news');
        if (newsCollection) {
          wx.request({
            url: `${config.shopify_admin_URL}/api/products`,
            method: 'POST',
            header: {
              'Content-Type': 'application/json',
              cookie: config._vercel_jwt,
            },
            data: { collection_id: newsCollection.id, limit: 4 },
            success: (res) => {
              this.setData({
                newsList: res.data.data,
                newsLoading: false,
              })
            },
            fail: () => {
              this.updateGlobalData({ newsLoading: false });
            },
          });
        } else {
          this.updateGlobalData({ newsLoading: false });
        }
      },
      fail: () => {
        this.updateGlobalData({ newsLoading: false });
      },
    });
  },
  goToMoreInfo() {
    wx.navigateTo({
      url: '/pages/newsList/newsList',
    });
  },
  onLiClick(e) {
    wx.navigateTo({
      url: `/pages/newsEach/newsEach?key=${e.currentTarget.dataset.key}`,
    });
  }
});
