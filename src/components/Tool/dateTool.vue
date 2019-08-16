<template>
  <div class="date-tools" @click="cancelSelect" @mouseleave="cancelSelect">
    <div class="textBut2">
      <el-button id="left" type="text" icon="el-icon-arrow-left" @click="subMonth()"></el-button>
      <el-button id="mid" type="text" class="date-middle" @click="selectYM()">
        <svg width="82" height="20" viewBox="0 0 82 20">
          <text font-family="'Helvetica Neue','PingFang SC','microsoft yahei'" fill="#FFFFFF" font-size="15"
                x="0"
                y="1em" style="padding-left: 12px">
            {{panelYear}}年{{panelMonth+1}}月
          </text>
        </svg>
      </el-button>
      <el-button id="right" type="text" icon="el-icon-arrow-right" @click="addMonth()"></el-button>
    </div>
    <div id="week" class="date-weeks">
      <svg width="40" height="20" viewBox="0 0 40 20">
        <text font-family="'Helvetica Neue','PingFang SC','microsoft yahei'" fill="#FFFFFF" font-size="15"
              x="0"
              y="1em" style="padding-left: 12px">
          日
        </text>
      </svg>
      <svg width="43" height="20" viewBox="0 0 43 20">
        <text font-family="'Helvetica Neue','PingFang SC','microsoft yahei'" fill="#FFFFFF" font-size="15"
              x="0"
              y="1em" style="padding-left: 12px">
          一
        </text>
      </svg>
      <svg width="40" height="20" viewBox="0 0 40 20">
        <text font-family="'Helvetica Neue','PingFang SC','microsoft yahei'" fill="#FFFFFF" font-size="15"
              x="0"
              y="1em" style="padding-left: 12px">
          二
        </text>
      </svg>
      <svg width="42" height="20" viewBox="0 0 42 20">
        <text font-family="'Helvetica Neue','PingFang SC','microsoft yahei'" fill="#FFFFFF" font-size="15"
              x="0"
              y="1em" style="padding-left: 12px">
          三
        </text>
      </svg>
      <svg width="42" height="20" viewBox="0 0 42 20">
        <text font-family="'Helvetica Neue','PingFang SC','microsoft yahei'" fill="#FFFFFF" font-size="15"
              x="0"
              y="1em" style="padding-left: 12px">
          四
        </text>
      </svg>
      <svg width="41" height="20" viewBox="0 0 41 20">
        <text font-family="'Helvetica Neue','PingFang SC','microsoft yahei'" fill="#FFFFFF" font-size="15"
              x="0"
              y="1em" style="padding-left: 12px">
          五
        </text>
      </svg>
      <svg width="40" height="20" viewBox="0 0 40 20">
        <text font-family="'Helvetica Neue','PingFang SC','microsoft yahei'" fill="#FFFFFF" font-size="15"
              x="0"
              y="1em" style="padding-left: 12px">
          六
        </text>
      </svg>
    </div>
    <div id="dates">
      <template v-for="(day,index) in dayFullList">
        <el-button-group type="text" style="width: 42px;height: 35px;">
          <svg v-if="(trainDateFullList.includes(day))" width="32" height="20" viewBox="0 0 32 20">
            <text font-family="'Helvetica Neue','PingFang SC','microsoft yahei'" fill="#54ff67" font-size="15"
                  x="0"
                  y="1em" style="padding-left: 12px">
              {{day}}
            </text>
          </svg>
          <svg v-else width="32" height="20" viewBox="0 0 32 20">
            <text font-family="'Helvetica Neue','PingFang SC','microsoft yahei'" fill="#FFFFFF" font-size="15"
                  x="0"
                  y="1em">
              {{day}}
            </text>
          </svg>
        </el-button-group>
      </template>
    </div>
    <!-- 年月下拉框 -->
    <div class="drop-down-ym" v-if="showDropDownYM" @mousemove="touchmove" @mouseleave="allowCancelC">
      <div class="drop-down-y">
        <p> 选择年份 </p>
        <div class="textBut" v-for="(item,index) in yearList" v-bind:key="index">
          <el-button @click="selectY(item)" style="width: 80px;height: 30px">
            <el-row>
              {{item}}
            </el-row>
          </el-button>
        </div>
      </div>
      <div class="drop-down-m">
        <p> 选择月份 </p>
        <div class="textBut" v-for="(item,index) in monthList" v-bind:key="index">
          <el-button @click="selectM(item-1)" style="width: 80px;height: 30px">
            <el-row>
              {{item}}
            </el-row>
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default ({
    props: ['dateToolsKey', 'trainDateList', 'trainDateFullList'],
    data() {
      return {
        yearList: [],
        monthList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        weekList: [],
        dayList: [],//所有的天数列表，前面空位补0
        dayFullList: [],//所有的天数列表，前面空位补0
        panelYear: '',//仪表盘显示的年
        panelMonth: '',//仪表盘显示的月（从0开始）
        panelDay: '',//仪表盘显示的天（从1开始）
        firstDay: '',//每月第一天
        lastDay: '',//每月最后一天也即每月多少天
        firstDayisWhat: '',//第一天星期几0-6（星期日到星期六）
        showDropDownYM: false,
        mouse_x:"",
        mouse_y:"",
        allowCancel:false,
        firstDayOfMonth:"",
      }
    },
    filters: {
      filterDay(value) {
        return parseInt(value.slice(-2));
      }
    },
    methods: {
      allowCancelC:function(){
        let self = this;
        self.allowCancel = true;
      },
      cancelSelect:function(){
        let self = this;
        if(self.allowCancel){
          self.showDropDownYM =false;
          self.allowCancel = false;
        }
      },
      touchmove(e) {
        let self = this;
        self.mouse_x = e.offsetX;
        self.mouse_y = e.offsetY;
      },
      initYear: function () {
        let self = this;
        for (let i = 1990; i <= 2099; i++) {
          self.yearList.push(i);
          if (i === 2099) {
            this.dateInit();
          }
        }
      },
      dateInit(year = (new Date()).getFullYear(), month = (new Date()).getMonth()) {
        let self = this;
        let y = year;
        let m = month;
        self.panelYear = year;
        self.panelMonth = month;
        self.firstDay = (new Date(y, m, 1)).getDate();//每月第一天
        self.sendDateToFather((new Date(y, m, 1)));
        self.lastDay = (new Date(y, m + 1, 0)).getDate();//每月最后一天也即每月多少天
        self.firstDayisWhat = (new Date(y, m, 1)).getDay();//第一天星期几0-6（星期日到星期六）
        let beginTmp = new Array(self.firstDayisWhat).fill(0);//初始化长度为3的数组并填充0
        let lastTmp = [];//初始化长度为当月天数的数组并填充为0-30或0-31
        let lastFullTmp = [];//初始化完整的月的每天格式为年月日20180627
        for (let i = 1; i <= self.lastDay; i++) {
          lastTmp.push(i);
          lastFullTmp.push('' + self.panelYear + self.addPreZero(self.panelMonth + 1) + self.addPreZero(i));
        }

        self.dayFullList = [];
        // 加上头
        let start = (new Date(y, m, 1)).getDay();
        if (start !== 0) {
          for (let i = 0; i < start; i++) {
            self.dayFullList.push("");
          }
        }
        //加中间
        let end = (new Date(y, m + 1, 0)).getDate();
        for (let i = 1; i <= end; i++) {
          self.dayFullList.push(i+"");
        }
        // 加结尾
        let endWeek = (new Date(y, m + 1, 0)).getDay();
        if (endWeek !== 6) {
          for (let i = 6; i > endWeek; i--) {
            self.dayFullList.push("");
          }
        }
      },
      sendDateToFather:function(date){
        this.$emit("getFirstDay",date)
      },
      subMonth() {
        let self = this;
        if (self.panelMonth > 0) {
          self.panelMonth--;
        } else {
          if (self.panelYear > 1990) {
            self.panelMonth = 11;
            self.panelYear--;
          }
        }
      },
      addMonth() {
        let self = this;
        if (self.panelMonth < 11) {
          self.panelMonth++;
        }else{
          if(self.panelYear<2099){
            self.panelMonth = 0;
            self.panelYear++;
          }
        }
      },
      getCurrentDay(currentDay) {
        this.panelDay = currentDay;
      },
      selectYM() {
        let self = this;
        self.showDropDownYM = true;
      },
      selectY(year) {
        let self = this;
        self.panelYear = year;
      },
      selectM(month) {
        let self = this;
        self.panelMonth = month;
        self.showDropDownYM = false;
      },
      addPreZero(num) {//小于9的需要添加0前缀
        return (num > 9) ? num : ('0' + num);
      },
      removePreZero(num) {//小于9的需要去除0前缀
        return parseInt(num);
      }
    },
    watch: {
      panelMonth(newVal, oldVal) {//检测月份变化
        this.dateInit(this.panelYear, this.panelMonth);
      },
      panelYear(newVal, oldVal) {//检测年份变化
        this.dateInit(this.panelYear, this.panelMonth);
      },
      panelDay(newVal, oldVal) {//检测具体日期变化
        this.$emit('topDateEvent' + this.dateToolsKey, newVal);
      }
    },
    mounted() {
      this.initYear();
    },

  })
</script>

<style scoped>
  #dates {
    position: absolute;
    left: 15px;
    top: 85px;
  }

  #week {
    position: absolute;
    left: 22px;
    top: 55px;
  }

  #left {
    position: absolute;
    left: 22px;
    top: 19px;
  }

  #right {
    position: absolute;
    left: 272px;
    top: 19px;
  }

  #mid {
    position: absolute;
    left: 122px;
    top: 19px;
  }

  button {
    background-color: #fff;
    cursor: pointer;
  }

  .date-btn, .date-middle {
    color: #333 !important;
  }

  .date-tools {
    position: relative;
    /* margin-top:80px; */
    display: inline-block;
    width: 310px;
    height: 278px;
    overflow: hidden;
    border: 1px solid #eee;
  }

  .date-btn {
    width: 34px;
    height: 34px;
    border-radius: 50%;
  }

  .date-btn:hover {
    color: #fff;
    background-color: #0A81E5;
    opacity: 0.6;
  }

  .date-years {
    margin: 14px 20px 0 20px;
    display: flex;
    justify-content: space-between;
  }

  .date-weeks {
    display: flex;
    justify-content: space-between;
  }

  .date-weeks span {
    display: inline-block;
    width: 44px;
    height: 34px;
    line-height: 34px;
    text-align: center;
  }

  .date-days {
    /* margin-top:14px; */
  }

  .date-days button {
    display: inline-block;
    width: 44px;
    height: 36px;
    background-color: #fff;
  }

  .date-days a {
    color: #000;
    display: inline-block;
    width: 34px;
    height: 34px;
    line-height: 34px;
    border-radius: 50%;
    text-align: center;
  }

  .date-days a.active {
    cursor: pointer;
    color: #fff;
    background-color: #0A81E5;
  }

  .date-days a:hover {
    color: #fff;
    background-color: #0A81E5;
    opacity: 0.6;
  }

  .drop-down-ym {
    position: absolute;
    top: 0;
    left: 50px;
    width: 210px;
    height: 278px;
    background-color: rgba(255, 255, 255, 0.8);
    display: flex;
    justify-content: space-between;
  }

  .drop-down-y, .drop-down-m {
    width: 155px;
    height: 278px;
    overflow: auto;
    padding: 5px;
    display: block;
    /* display: flex;
    flex-direction:column; */
  }

  .drop-down-y::-webkit-scrollbar, .drop-down-m::-webkit-scrollbar {
    display: none;
  }

</style>

<style>
  .textBut .el-button {
    border: none !important;
    margin: 0 !important;
    padding: 0 !important;
    background: none;
  }

  .textBut .el-button:hover {
    margin: 0 !important;
    padding: 0 !important;
    color: #ecfff0;
    background-color: #0A81E5;
  }

  .textBut2 .el-button {
    border: none !important;
    margin: 0 !important;
    padding: 0 !important;
    background: none;
  }
</style>
