Page({
  data:{
    newsLoading: true,
    newsList: [],
  },
  onLoad() {
    const app = getApp();
    // Initialize with globalData
    this.setData({
      newsLoading: app.globalData.newsLoading,
      newsList: app.globalData.newsList,
    });
    // Add an event listener for globalData changes
    this.globalDataChangeListener = (updatedGlobalData) => {
      this.setData({ 
        newsLoading: updatedGlobalData.newsLoading,
        newsList: updatedGlobalData.newsList, 
      });
    };
    app.addEventListener('globalDataChange', this.globalDataChangeListener);
  },

  onUnload() {
    const app = getApp();
    // Remove the event listener when the page is unloaded
    app.removeEventListener('globalDataChange', this.globalDataChangeListener);
  },
});
