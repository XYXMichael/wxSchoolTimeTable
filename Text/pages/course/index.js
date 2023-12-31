import{
  getNowWeek
}from'../../utils/util'
import{
  getCourseListRequest
}from'../../api/main.js'
const courseCacheKey = "courses"
const courseColorCacheKey = "courseColor"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nowWeek:1,
    totalWeek:20,
    showSwitchWeek:false,
    weekDayCount:7,
    startDate:'2023/02/20',
    weekIndexText:['一','二','三','四','五','六','日'],
    nowMonth:1,
    courseList:[],
    colorList:[
      "#725e82",
      "#00CCFF",
      "#660099",
      "#66CCCC",
      "#993366",
      "#9999CC",
      "#e4c6d0",
      "#FF6633",
      "#FFFF00",
      "#FF66FF",
      "#666699",
      "#0033CC",
    ],
    courseColor:{},
    weekCalendar:[1,2,3,4,5,6,7],
    firstEntry:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const{
      windowWidth
    } = wx.getSystemInfoSync()
    this.setData({
      windowWidth
    })
    this.getWeekDates()
    this.getNowWeek()
    this.getData()
    this.getTodayDate()
  },
  selectWeek(){
    this.setData({
      showSwitchWeek:true
    })
  },
  switchWeek(e){
    const week = e.currentTarget.dataset.week
    this.setData({
      showSwitchWeek:false
    })
    this.switchWeekFn(week)
  },
  switchWeekFn(week){
    this.setData({
      nowWeek:week
    })
    this.getWeekDates()
  },
  hideSwitchWeek(){
    this.setData({
      showSwitchWeek:false
    })
  },
  getWeekDates(){
    const startDate = new Date(this.data.startDate)
    const addTime = (this.data.nowWeek-1)*7*24*60*60*1000
    const firstDate = startDate.getTime() + addTime
    const{
      month:nowMonth
    } = this.getdateObject(new Date(firstDate))
    const weekCalendar = []
    for(let i=0;i<this.data.weekDayCount;i++){
      const date = new Date(firstDate + i*24*60*60*1000)
      const{day} = this.getdateObject(date)
      weekCalendar.push(day)
    }
    this.setData({
      nowMonth,
      weekCalendar
    })
  },
  getdateObject(date = new Date()){
    const year = date.getFullYear();
    const month = date.getMonth()+1;
    const day = date.getDate()
    return {
      year,
      month,
      day
    }
  },
  getNowWeek(){
    const nowWeek = getNowWeek(this.data.startDate,this.data.totalWeek)
    this.setData({
      nowWeek
    })
    this.getWeekDates()
  },
  getData(){
    const cache = wx.getStorageSync(courseCacheKey)
    const courseColorCache = wx.getStorageSync(courseColorCacheKey)
    if(cache){
      this.setData({
        courseList:cache,
      })
      if(!courseColorCache){
        this.buildCourseColor()
      }else{
        this.setData({
          courseColor:courseColorCache
        })
      }
      return
    }
    this.updateFn(true)
  },
  update(){
    this.updateFn()
  },
  updateFn(firstEntry = false){
    const that = this
    getCourseListRequest().then(res=>{
      that.setData({
        courseList:res.data
      })
      that.buildCourseColor()
      if(!firstEntry){
        wx.showToast({
          title:'更新成功',
          icon:'success'
        })
      }
      wx.setStorageSync(courseCacheKey, res.data)
    })
  },
  swiperSwitchWeek(e){
    if(e.detail.source == ''){
      this.setData({
        firstEntry:false
      })
      return 
    }
    const index = e.detail.current
    this.switchWeekFn(index+1)
  },
  buildCourseColor(){
    const courseColor = {}
    let colorIndex = 0;
    this.data.courseList.map(item => {
      if(courseColor[item.name] === undefined){
        courseColor[item.name] = this.data.colorList[colorIndex]
        colorIndex++
      }
    })
    wx.setStorageSync(courseColorCacheKey, courseColor)
    this.setData({
      courseColor
    })
  },
  getTodayDate(){
    const{
      month:todayMonth,
      day:todayDay
    } = this.getdateObject()
    this.setData({
      todayMonth,
      todayDay
    })
  },
  navCourseDetail(e){
    const index = e.currentTarget.dataset.index
    wx.navigateTo({
      url: `/pages/course-detail/index?info=${JSON.stringify(this.data.courseList[index])}`,
    })
  }
})