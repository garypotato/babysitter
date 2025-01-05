Page({
  data: {
    sitterList: []
  },
  onLoad: function () {
    this.setData({
      sitterList: require('../../data/sitter').sitterList
    })
  }
})
