Page({
  data: {
    sitterList: []
  },
  onLoad: function () {
    this.setData({
      sitterList: require('../../data/sitter').sitterList
    })

    wx.request({
      url: 'https://shopify-admin-883s4ssig-garychens-projects.vercel.app/api/shopify', 
      method: 'GET', 
      header: {
        'Content-Type': 'application/json', 
        'cookie': '_vercel_jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJXQ21ORjlaZmh2YnFVT0FIandqUmFPV1kiLCJpYXQiOjE3MzY0OTk1NjQsIm93bmVySWQiOiJ0ZWFtX1A4MjhJSG04cUhpODdud1k5UWZXZVVvQiIsImF1ZCI6InNob3BpZnktYWRtaW4tODgzczRzc2lnLWdhcnljaGVucy1wcm9qZWN0cy52ZXJjZWwuYXBwIiwidXNlcm5hbWUiOiJnYXJ5cG90YXRvNjY2LWdtYWlsY29tIiwic3ViIjoic3NvLXByb3RlY3Rpb24ifQ.9ITE7Csc52dfZEpVo-bymUisIcaHUlLdmSmxDPWY7nM'
      },
      success: async (res) => {
        this.setData({
          sitterList: res.data.data
        })
      },
      fail: (err) => {
        console.error('請求失敗:', err);
      },
    });
  }
})
