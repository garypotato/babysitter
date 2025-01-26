const config = require('../../config.js');
const eventName = config.homePageMonitorGlobalData

Page({
  data:{
    newsLoading: true,
    newsList: [],
  },
  onLoad() {
    const app = getApp();
    this.setData({
      newsLoading: app.globalData.newsLoading,
      newsList: app.globalData.newsList.slice(0,4),
    });
    // Add an event listener for globalData changes
    this.globalDataChangeListener = (updatedGlobalData) => {
      this.setData({ 
        newsLoading: updatedGlobalData.newsLoading,
        newsList: updatedGlobalData.newsList.slice(0,4), 
      });
    };
    app.addEventListener(eventName, this.globalDataChangeListener);
  },
  onUnload() {
    const app = getApp();
    // Remove the event listener when the page is unloaded
    app.removeEventListener(eventName, this.globalDataChangeListener);
  },
  goToMoreInfo() {
    console.log('clicked')
    wx.navigateTo({
      url: '/pages/newsList/newsList',
    });
  },
});
