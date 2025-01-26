const config = require('./config.js');

App({
  globalData: {
    newsLoading: true,
    newsList: [],
  },
  // Event system
  eventListeners: {},
  // Add an event listener
  addEventListener(eventName, callback) {
    if (!this.eventListeners[eventName]) {
      this.eventListeners[eventName] = [];
    }
    this.eventListeners[eventName].push(callback);
  },
  // Remove an event listener
  removeEventListener(eventName, callback) {
    if (this.eventListeners[eventName]) {
      this.eventListeners[eventName] = this.eventListeners[eventName].filter(
        (cb) => cb !== callback
      );
    }
  },
  // Trigger an event
  triggerEvent(eventName, data) {
    if (this.eventListeners[eventName]) {
      this.eventListeners[eventName].forEach((callback) => callback(data));
    }
  },
  // Update globalData and trigger events
  updateGlobalData(newData) {
    const eventNames = [config.homePageMonitorGlobalData, config.newsPageMonitorGlobalData]

    Object.assign(this.globalData, newData);
    eventNames.forEach((eventName) => this.triggerEvent(eventName, this.globalData))
  },
  onLaunch() {
    // get collections
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
            data: { collection_id: newsCollection.id },
            success: (res) => {
              this.updateGlobalData({
                newsList: res.data.data,
                newsLoading: false,
              });
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
});
