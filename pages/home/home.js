Page({
  data: {
    newsLoading: true,
    newsList: [],
    lessonLoading: true,
    lessonList: [],
    sitterLoading: true,
    sitterList: [],
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
        // get sitter collectionapi/products
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
            "limit": 10
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

        // get news collection
        const newsCollection = res.data.data.find(collection => collection.handle === 'news');
        if (!newsCollection) {
          console.warn('Sitter collection not found');
          return;
        }
        const newsCollectionId = newsCollection.id;
        // get news collection products
        wx.request({
          url: `${config.shopify_admin_URL}/api/products`,
          method: 'POST',
          header: {
            'Content-Type': 'application/json',
            'cookie': config._vercel_jwt,
          },
          data: {
            "collection_id": newsCollectionId,
            "limit": 4
          },
          success: (res) => {
            this.setData({
              newsList: res.data.data,
              newsLoading: false
            });
          },
          fail: (err) => {
            console.error('Second request failed:', err);
            this.setData({
              newsLoading: false
            })
          },
        });

        // get lesson collection
        const lessonCollection = res.data.data.find(collection => collection.handle === 'lessons');
        if (!lessonCollection) {
          console.warn('Lesson collection not found');
          return;
        }
        const lessonCollectionId = lessonCollection.id;
        // get lesson collection products
        wx.request({
          url: `${config.shopify_admin_URL}/api/products`,
          method: 'POST',
          header: {
            'Content-Type': 'application/json',
            'cookie': config._vercel_jwt,
          },
          data: {
            "collection_id": lessonCollectionId,
            "limit": 4
          },
          success: (res) => {
            this.setData({
              lessonList: res.data.dat,
              lessonLoading: false
            });
          },
          fail: (err) => {
            console.error('Second request failed:', err);
            this.setData({
              lessonLoading: false
            })
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
