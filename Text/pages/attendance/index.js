// pages/attendance/index.js
import{
  getAttendanceListRequest
}from '../../api/main.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    termIndex:0,
    MytermName:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getData()
  },
  getData(){
    getAttendanceListRequest().then(res=>{
      this.setData({
        list:res.data,
      })
      const that = this
      for(var i=0;i<that.data.list.length;i++){
        that.data.MytermName.push(that.data.list[i].termName)
      }
    })
  },
  changeTerm(e){
    const termIndex = e.detail.value
    this.setData({
      termIndex
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})