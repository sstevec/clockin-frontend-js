<template>
  <div>
    <div id="minWidth">
      <el-row id="offSet">
        <el-row id="total">
          <el-col>
            <div id="content">
              <el-row>
                <Header></Header>

                <el-row>
                  <el-col>
                    <div class="block">
                      <span class="demonstration"></span>
                      <el-carousel height="450px">
                        <el-carousel-item v-for="item in this.image_list" :key="item.id">
                          <img ref="imgHeight" :src="item.idView" class="banner_img" style="width: 100%; height: 100%"/>
                        </el-carousel-item>
                      </el-carousel>
                    </div>
                  </el-col>
                </el-row>

                <el-row id="clock_in_record_word">
                  <h3>
                    {{this.$t('HomePage.clockInRecord')}}
                  </h3>
                </el-row>


                <el-row id="attendance_rule_word">
                  <h3>
                    {{this.$t('HomePage.attendanceRule')}}
                  </h3>
                </el-row>


                <el-row id="clock_in_record_small_word">
                  <svg width="120" height="80" viewBox="0 0 120 80">
                    <text font-family="'Helvetica Neue','PingFang SC','microsoft yahei'" fill="#BDBDBD" font-size="13"
                          x="0"
                          y="1em">
                      Punch-in Record
                    </text>
                  </svg>
                </el-row>


                <el-row id="attendance_rule_small_word">
                  <svg width="120" height="80" viewBox="0 0 120 80">
                    <text font-family="'Helvetica Neue','PingFang SC','microsoft yahei'" fill="#BDBDBD" font-size="13"
                          x="0"
                          y="1em">
                      Attendance Rule
                    </text>
                  </svg>
                </el-row>

                <el-row id="clock_in_time_word">
                  <svg width="120" height="80" viewBox="0 0 120 80">
                    <text font-family="'Helvetica Neue','PingFang SC','microsoft yahei'" fill="#FFFFFF" font-size="24"
                          x="0"
                          y="1em">
                      {{this.$t('HomePage.clockInTime')}}
                    </text>
                  </svg>
                </el-row>

                <el-row id="personalize_rule_word">
                  <svg width="140" height="80" viewBox="0 0 140 80">
                    <text font-family="'Helvetica Neue','PingFang SC','microsoft yahei'" fill="#FFFFFF" font-size="24"
                          x="0"
                          y="1em">
                      {{this.$t('HomePage.personalizeRule')}}
                    </text>
                  </svg>
                </el-row>

                <el-row id="name_word">
                  <svg width="100" height="80" viewBox="0 0 100 80">
                    <text font-family="'Helvetica Neue','PingFang SC','microsoft yahei'" fill="#FFFFFF" font-size="17"
                          x="0"
                          y="1em">
                      {{this.name}}
                    </text>
                  </svg>
                </el-row>

                <el-row id="position_word">
                  <svg width="100" height="80" viewBox="0 0 100 80">
                    <text font-family="'Helvetica Neue','PingFang SC','microsoft yahei'" fill="#FFFFFF" font-size="17"
                          x="0"
                          y="1em">
                      {{this.position}}
                    </text>
                  </svg>
                </el-row>

                <el-row id="work_id_word">
                  <svg width="100" height="80" viewBox="0 0 100 80">
                    <text font-family="'Helvetica Neue','PingFang SC','microsoft yahei'" fill="#FFFFFF" font-size="17"
                          x="0"
                          y="1em">
                      {{this.work_id}}
                    </text>
                  </svg>
                </el-row>

                <el-row id="work_start_word">
                  <svg width="100" height="80" viewBox="0 0 100 80">
                    <text font-family="'Helvetica Neue','PingFang SC','microsoft yahei'" fill="#FFFFFF" font-size="17"
                          x="0"
                          y="1em">
                      {{this.work_start}}
                    </text>
                  </svg>
                </el-row>

                <el-row id="word_end_word">
                  <svg width="100" height="80" viewBox="0 0 100 80">
                    <text font-family="'Helvetica Neue','PingFang SC','microsoft yahei'" fill="#FFFFFF" font-size="17"
                          x="0"
                          y="1em">
                      {{this.work_end}}
                    </text>
                  </svg>
                </el-row>

                <el-row id="clock_in_word">
                  <svg width="120" height="80" viewBox="0 0 120 80">
                    <text font-family="'Helvetica Neue','PingFang SC','microsoft yahei'" fill="#b0d647" font-size="19"
                          x="0"
                          y="1em">
                      {{this.clock_in}}
                    </text>
                  </svg>
                </el-row>

                <el-row id="clock_out_word">
                  <svg width="120" height="80" viewBox="0 0 120 80">
                    <text font-family="'Helvetica Neue','PingFang SC','microsoft yahei'" fill="#b0d647" font-size="19"
                          x="0"
                          y="1em">
                      {{this.clock_out}}
                    </text>
                  </svg>
                </el-row>

                <el-row id="timeLine">
                  <el-col>
                    <el-steps :active="active" finish-status="success" align-center space="1000px">
                      <el-step title=""></el-step>
                      <el-step title=""></el-step>
                    </el-steps>
                  </el-col>
                </el-row>

                <el-row id="myDatePicker">
                  <el-date-picker
                    v-model="selectDate"
                    style="width: 135px;"
                    type="date"
                    :placeholder="$t('HomePage.pleaseChooseDate')"
                    :picker-options="pickerOptions"
                    v-show="showCalender"
                    @change="reNewDate">
                  </el-date-picker>
                </el-row>
              </el-row>

              <el-row>
                <dateTool
                  id="myCalender"
                  :dateToolsKey="2"
                  :trainDateFullList="holidayList"
                  ref="topDateTools"
                  v-on:getFirstDay="listenToChild"
                ></dateTool>
              </el-row>
              <el-row id="bottom">
                <Bottom></Bottom>
              </el-row>
            </div>

            <canvas id="line" width="1920" height="1450" style="width: 100%" @mousemove="touchmove">
              {{this.$t('header.doNotSupportCanvas')}}
            </canvas>
            <el-row type="flex"  >
              <el-row id="timeSchedule" style="width: 346px;height: 300px">
              <img  ref="imgHeight" :src=this.clockInTimeUrl class="banner_img" style="width: 100%;height: 100%"/>
            </el-row>
              <el-row id="personalize" style="width: 346px;height: 300px" >
              <img  ref="imgHeight" :src=this.personUrl class="banner_img" style="width: 100%;height: 100%"/>
            </el-row>
              <img id="calenderImage" ref="imgHeight" :src=this.calenderUrl class="banner_img" style="width: 66px"/>
            </el-row>


          </el-col>
        </el-row>
      </el-row>
    </div>
  </div>

</template>

<script>
  import axios from 'axios'
  import Header from '../components/Header'
  import Bottom from "../components/Bottom";
  import dateTool from "../components/Tool/dateTool"

  export default {
    name: "HomePage",
    components: {
      Bottom,
      Header,
      dateTool
    },
    data() {
      return {

        image_list: [
          {id: 0, name: '详情', idView: require('../assets/images/HomePage/bannner.png')},
          {id: 1, name: '详情', idView: require('../assets/images/HomePage/bannner.png')},
          {id: 2, name: '推荐', idView: require('../assets/images/HomePage/bannner.png')},
          {id: 3, name: '推荐', idView: require('../assets/images/HomePage/bannner.png')},
        ],

        clockInTimeUrl: require('../assets/images/HomePage/clockInTime.png'),
        personUrl: require('../assets/images/HomePage/personliz.png'),
        calenderUrl: require('../assets/images/HomePage/rili.png'),

        active: 0,
        selectDate: new Date(),
        showCalender: true,
        mouse_x: 0,
        mouse_y: 0,
        uid: "",
        name: "name",
        position: "position",
        work_id: "work_id",
        work_start: this.$t('HomePage.loading'),
        work_end: this.$t('HomePage.loading'),
        clock_in: this.$t('HomePage.loading'),
        clock_out: this.$t('HomePage.loading'),
        account: "",
        holidayList: [],
        firstDate: "",

        pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
          shortcuts: [{
            text: this.$t('HomePage.today'),
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: this.$t('HomePage.yesterday'),
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: this.$t('HomePage.aWeekAgo'),
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },


      };
    },

    created() {
    },

    mounted() {
      drawBackGround();
      this.verify();

    },

    methods: {
      listenToChild: function (data) {
        if (this.uid !== "") {
          this.getHolidayInfo(data);
        }
      },
      handleSelect(key, keyPath) {
        if (key === "1") {
          this.$router.push("/");
        }
        if (key === "2") {
          this.$router.push("/apply");
        }
        if (key === "3") {
          this.$router.push("/statistic");
        }
        if (key === "5") {
          this.$router.push("/advanceManagement");
        }
      },
      touchmove(e) {
        this.mouse_x = e.offsetX;
        this.mouse_y = e.offsetY;
        // console.log(this.mouse_x+" " +this.mouse_y);
        if (this.mouse_x > 684 && this.mouse_x < 923) {
          if (this.mouse_y > 122 && this.mouse_y < 314) {
            this.showCalender = true;
          } else {
            this.showCalender = false;
          }
        } else {
          this.showCalender = false;
        }
      },
      verify: function () {
        axios
          .get('/api/shiroVerify')
          .then(response => {
            if (response.data.status === 200) {
              // 登录过了，返回值为当前用户uid
              this.uid = response.data.data;
              // 开始加载用户界面信息
              this.getLoginInUserInfo();
              this.getUserClockInInfo();
            } else {
              // 没有登录，返回值为登陆界面路径
              this.$router.push(response.data.data);
            }

          })
          .catch(function (error) { // 请求失败处理
            console.log(error);
          })
      },
      getLoginInUserInfo: function () {
        let info = new URLSearchParams;
        info.append("uid", String(this.uid));
        axios
          .post('/api/clockInInfo/getLoginUserInfo', info)
          .then(response => {
            if (response.data.status === 200) {
              // 获取成功
              this.name = response.data.data[0].name;
              this.position = response.data.data[0].position;
              this.work_id = response.data.data[0].work_id;
              this.account = response.data.data[0].account;
              this.getAllImageUrl();
              this.getHolidayInfo(new Date());
            } else {
              // 获取失败
              alert(this.$t('header.getLoginInfoFail'));
            }

          })
      },
      getUserClockInInfo: function () {
        if (this.selectDate === null) {
          return;
        }
        let info = new URLSearchParams;
        let start = this.selectDate.getFullYear() + "-" + (this.selectDate.getMonth() + 1) + "-" + this.selectDate.getDate();
        // 获取的月份总是需要加1
        info.append("uid", String(this.uid));
        info.append("start", String(start));
        axios
          .post('/api/clockInInfo/getUserClockInInfo', info)
          .then(response => {
            if (response.data.status === 200) {
              // 获取成功
              this.work_start = response.data.data.startWork;
              this.work_end = response.data.data.endWork;
              if (response.data.data.clockInStatus === "miss") {
                this.clock_in = this.$t('HomePage.noRecord');
                this.active = 0;
              } else {
                this.clock_in = this.$t('HomePage.clockIn') + " : " + response.data.data.clockIn;
                this.active = 1;
              }
              if (response.data.data.clockOutStatus === "miss") {
                this.clock_out = this.$t('HomePage.noRecord');
              } else {
                this.clock_out = this.$t('HomePage.clockOut') + " : " + response.data.data.clockOut;
                this.active = 2;
              }
            } else {
              // 获取失败
              this.work_start = this.$t('HomePage.noInfo');
              this.work_end = this.$t('HomePage.noInfo');
              this.clock_in = this.$t('HomePage.noInfo');
              this.clock_out = this.$t('HomePage.noInfo');
              this.active = 0;
              // console.log(response.data.msg);
            }

          })
      },
      reNewDate: function () {
        this.getUserClockInInfo();
      },
      getAllImageUrl: function () {
        axios
          .get('/api/general/getAllHomePageImage')
          .then(response => {
            if (response.data.status === 200) {
              let temp = response.data.data;
              for (let i = 1; i < 5; i++) {
                if (temp[i] !== null && temp[i] !== "") {
                  this.image_list[i - 1].idView = "data:image/jpg;base64," + temp[i];
                }
              }
              if (temp[5] !== null && temp[5] !== "") {
                this.clockInTimeUrl = "data:image/jpg;base64," + temp[5];
              }
              if (temp[6] !== null && temp[6] !== "") {
                this.personUrl = "data:image/jpg;base64," + temp[6];
              }
            } else {
              // 获取失败
              alert(this.$t('HomePageManagement.getImageFail'));
            }
          })
      },
      getHolidayInfo: function (date) {
        this.holidayList = [];
        let today = date;
        let month = today.getMonth();
        let year = today.getFullYear();
        let first = (new Date(year, month, 1)).getDate();//每月第一天
        let last = (new Date(year, month + 1, 0)).getDate();//每月最后一天也即每月多少天
        let start = year + "-" + (month + 1) + "-" + first;
        let end = year + "-" + (month + 1) + "-" + last;

        let info = new URLSearchParams;
        // 获取的月份总是需要加1
        info.append("uid", String(this.uid));
        info.append("start", String(start));
        info.append("end", String(end));
        axios
          .post('/api/clockInInfo/getHolidayInfo', info)
          .then(response => {
            if (response.data.status === 200) {
              let holidays = response.data.data;
              let size = holidays.length;
              for (let i = 0; i < size; i++) {
                this.holidayList.push(holidays[i]);
              }
            } else {
              console.log("error")
              alert(this.$t('header.getLoginInfoFail'));
            }
          })
      }
    }

  }
  var pageWidth = window.innerWidth
    || document.documentElement.clientWidth
    || document.body.clientWidth;
  var pageHeight = window.innerHeight
    || document.documentElement.clientHeight
    || document.body.clientHeight;

  function drawBackGround() {
    let linec = document.getElementById("line");
    let lineContent = linec.getContext("2d");

    lineContent.clearRect(0, 0, lineContent.width, lineContent.height);
    // 画线
    lineContent.beginPath();
    lineContent.strokeStyle = '#020202';
    lineContent.lineWidth = 2;
    lineContent.moveTo(360, 141);
    lineContent.lineTo(1560, 141);
    lineContent.stroke();
    lineContent.closePath();
    lineContent.beginPath();
    lineContent.strokeStyle = '#020202';
    lineContent.moveTo(360, 633);
    lineContent.lineTo(1560, 633);
    lineContent.stroke();
    lineContent.closePath();

    // 中间留空白
    lineContent.fillStyle = '#ffffff';
    lineContent.beginPath();
    lineContent.fillRect(798, 102, 324, 60);
    lineContent.closePath();
    lineContent.beginPath();
    lineContent.fillRect(798, 597, 324, 50);
    lineContent.closePath();

    // 画框
    lineContent.beginPath()
    lineContent.strokeStyle = '#020202';
    lineContent.rect(817, 102, 286, 62);
    lineContent.stroke();
    lineContent.closePath();
    lineContent.beginPath();
    lineContent.strokeStyle = '#020202';
    lineContent.rect(817, 597, 286, 62);
    lineContent.stroke();
    lineContent.closePath();


    // 框底开口
    lineContent.fillStyle = '#ffffff';
    lineContent.beginPath();
    lineContent.fillRect(857, 112, 206, 60);
    lineContent.closePath();
    lineContent.beginPath();
    lineContent.fillRect(857, 607, 206, 60);
    lineContent.closePath();

    // 画两个颜色矩形
    lineContent.fillStyle = '#b0d647';
    lineContent.beginPath();
    lineContent.fillRect(1150, 201, 412, 336);
    lineContent.closePath();
    lineContent.fillStyle = '#808080';
    lineContent.beginPath();
    lineContent.fillRect(360, 201, 791, 336);
    lineContent.closePath();

    // 画圆
    lineContent.beginPath();
    lineContent.fillStyle = '#b0d647';
    lineContent.arc(1150, 364, 58, 0, Math.PI * 2, true);
    lineContent.fill();
    lineContent.closePath();

    // 画两个长条矩形
    lineContent.fillStyle = '#b0d647';
    lineContent.beginPath();
    lineContent.fillRect(978, 706, 582, 70);
    lineContent.closePath();
    lineContent.fillStyle = '#b0d647';
    lineContent.beginPath();
    lineContent.fillRect(360, 706, 582, 70);
    lineContent.closePath();

    lineContent.beginPath();
    lineContent.strokeStyle = '#e6e6e6';
    lineContent.moveTo(360, 365);
    lineContent.lineTo(1092, 365);
    lineContent.stroke();
    lineContent.closePath();

  }

  // 监听页面大小变化
  window.onresize = function () {
    pageWidth = window.innerWidth
      || document.documentElement.clientWidth
      || document.body.clientWidth;

    pageHeight = window.innerHeight
      || document.documentElement.clientHeight
      || document.body.clientHeight;

    //页面进行刷新
    //drawBackGround();
  }
</script>

<style scoped>

  #offSet {
    min-width: 1140px;
    position: absolute;
    top: 0;
    padding-left: calc((100% - 1140px) / 2)
  }

  #total {
    width: 1140px;
  }

  #line {
    z-index: -3;
    position: absolute;
    left: 0;
  }

  #timeSchedule {
    position: absolute;
    left: 214px;
    top: 460px;
  }

  #personalize {
    position: absolute;
    left: 581px;
    top: 460px;
  }

  #calenderImage {
    position: absolute;
    left: 769px;
    top: 170px;
  }

  #attendance_rule_word {
    position: absolute;
    left: 519px;
    top: 840px;
    font-size: 22px;
    white-space: nowrap;
  }

  #clock_in_record_word {
    position: absolute;
    left: 519px;
    top: 546px;
    font-size: 22px;
    white-space: nowrap;
  }

  #attendance_rule_small_word {
    position: absolute;
    left: 519px;
    top: 896px;
    white-space: nowrap;
  }

  #clock_in_record_small_word {
    position: absolute;
    left: 519px;
    top: 602px;
    white-space: nowrap;
  }

  #clock_in_time_word {
    position: absolute;
    left: 340px;
    top: 939px;
  }

  #personalize_rule_word {
    position: absolute;
    left: 692px;
    top: 939px;
  }

  #name_word {
    position: absolute;
    left: 273px;
    top: 650px;
  }

  #position_word {
    position: absolute;
    left: 273px;
    top: 690px;
  }

  #work_id_word {
    position: absolute;
    left: 489px;
    top: 690px;
  }

  #work_start_word {
    position: absolute;
    left: 273px;
    top: 750px;
  }

  #word_end_word {
    position: absolute;
    left: 489px;
    top: 750px;
  }

  #clock_in_word {
    position: absolute;
    left: 273px;
    top: 790px;
  }

  #clock_out_word {
    position: absolute;
    left: 489px;
    top: 790px;
  }

  #timeLine {
    position: absolute;
    left: 172px;
    top: 717px;
    width: 455px;
  }

  #myDatePicker {
    position: absolute;
    left: 735px;
    top: 762px;
  }

  #bottom {
    top: 800px;
  }

  #minWidth {
    width: 100%;
    min-width: 1140px;
  }

  #myCalender {
    position: absolute;
    top: 465px;
    left: 230px;
    z-index: 5;
  }

</style>
<style>
  .el-select-dropdown .el-scrollbar .el-scrollbar__wrap {
    overflow: scroll;
  }

  .el-scrollbar__wrap {
    overflow-x: hidden;
    overflow-y: auto;
  }
</style>
