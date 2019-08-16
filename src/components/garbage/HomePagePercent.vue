<template>
  <div>
    <el-row id="total" style="width: 1024px">
      <el-col>
        <div id="content">

          <Header></Header>

          <el-row>
            <el-col style="width: 100%">
              <div class="block">
                <span class="demonstration"></span>
                <el-carousel id="showBox">
                  <el-carousel-item v-for="item in this.image_list" :key="item.id">
                    <img id="currentImage" ref="imgHeight" :src="item.idView" class="banner_img"/>
                  </el-carousel-item>
                </el-carousel>
              </div>
            </el-col>
          </el-row>

          <el-row id="clock_in_record_word">
            <h3>
              打卡记录
            </h3>
          </el-row>


          <el-row id="attendance_rule_word">
            <h3>
              考勤规则
            </h3>
          </el-row>


          <el-row id="clock_in_record_small_word">
            <svg width="600" height="80" viewBox="0 0 600 80">
              <text font-family="'Helvetica Neue','PingFang SC','microsoft yahei'" fill="#BDBDBD" font-size="0.8em"
                    x="0"
                    y="1em">
                Punch-in Record
              </text>
            </svg>
          </el-row>


          <el-row id="attendance_rule_small_word">
            <svg width="600" height="80" viewBox="0 0 600 80">
              <text font-family="'Helvetica Neue','PingFang SC','microsoft yahei'" fill="#BDBDBD" font-size="0.8em"
                    x="0"
                    y="1em">
                Attendance Rule
              </text>
            </svg>
          </el-row>

          <el-row id="clock_in_time_word">
            <svg width="600" height="80" viewBox="0 0 600 80">
              <text font-family="'Helvetica Neue','PingFang SC','microsoft yahei'" fill="#FFFFFF" font-size="1.3em"
                    x="0"
                    y="1em">
                考勤时间
              </text>
            </svg>
          </el-row>

          <el-row id="personalize_rule_word">
            <svg width="600" height="80" viewBox="0 0 600 80">
              <text font-family="'Helvetica Neue','PingFang SC','microsoft yahei'" fill="#FFFFFF" font-size="1.3em"
                    x="0"
                    y="1em">
                个性化规则
              </text>
            </svg>
          </el-row>

          <el-row id="name_word">
            <svg width="600" height="80" viewBox="0 0 600 80">
              <text font-family="'Helvetica Neue','PingFang SC','microsoft yahei'" fill="#FFFFFF" font-size="0.9em" x="0"
                    y="1em">
                {{this.name}}
              </text>
            </svg>
          </el-row>

          <el-row id="position_word">
            <svg width="600" height="80" viewBox="0 0 600 80">
              <text font-family="'Helvetica Neue','PingFang SC','microsoft yahei'" fill="#FFFFFF" font-size="0.9em" x="0"
                    y="1em">
                {{this.position}}
              </text>
            </svg>
          </el-row>

          <el-row id="work_id_word">
            <svg width="600" height="80" viewBox="0 0 600 80">
              <text font-family="'Helvetica Neue','PingFang SC','microsoft yahei'" fill="#FFFFFF" font-size="0.9em" x="0"
                    y="1em">
                {{this.work_id}}
              </text>
            </svg>
          </el-row>

          <el-row id="work_start_word">
            <svg width="600" height="80" viewBox="0 0 600 80">
              <text font-family="'Helvetica Neue','PingFang SC','microsoft yahei'" fill="#FFFFFF" font-size="0.9em" x="0"
                    y="1em">
                {{this.work_start}}
              </text>
            </svg>
          </el-row>

          <el-row id="word_end_word">
            <svg width="600" height="80" viewBox="0 0 600 80">
              <text font-family="'Helvetica Neue','PingFang SC','microsoft yahei'" fill="#FFFFFF" font-size="0.9em" x="0"
                    y="1em">
                {{this.work_end}}
              </text>
            </svg>
          </el-row>

          <el-row id="clock_in_word">
            <svg width="600" height="80" viewBox="0 0 600 80">
              <text font-family="'Helvetica Neue','PingFang SC','microsoft yahei'" fill="#b0d647" font-size="1.1em"
                    x="0"
                    y="1em">
                {{this.clock_in}}
              </text>
            </svg>
          </el-row>

          <el-row id="clock_out_word">
            <svg width="600" height="80" viewBox="0 0 600 80">
              <text font-family="'Helvetica Neue','PingFang SC','microsoft yahei'" fill="#b0d647" font-size="1.1em"
                    x="0"
                    y="1em">
                {{this.clock_out}}
              </text>
            </svg>
          </el-row>


          <el-steps id="timeLine" :active="active" finish-status="success" align-center space="600px">
            <el-step title=""></el-step>
            <el-step title=""></el-step>
          </el-steps>


          <el-date-picker
            class="datePicker"
            v-model="selectDate"
            type="date"
            placeholder="选择日期"
            :picker-options="pickerOptions"
            v-show="showCalender"
            @change="reNewDate">
          </el-date-picker>

          <el-row id="bottom">
            <Bottom></Bottom>
          </el-row>
        </div>

        <canvas id="line" width="1440" height="800" @mousemove="touchmove" style="width: 100%">
          不支持Canvas
        </canvas>

        <img id="timeSchedule" ref="imgHeight" :src=this.clockInTimeUrl class="banner_img" />
        <img id="personalize" ref="imgHeight" :src=this.personUrl class="banner_img"/>
        <img id="calenderImage" ref="imgHeight" :src=this.calenderUrl class="banner_img"/>


      </el-col>
    </el-row>
  </div>
</template>

<script>
  import axios from 'axios'
  import Header from '../Header'
  import Bottom from "../Bottom";

  export default {
    name: "HomePage",
    components: {
      Bottom,
      Header
    },
    data() {
      return {

        image_list: [
          {id: 0, name: '详情', idView: require('../../assets/images/HomePage/bannner.png')},
          {id: 1, name: '详情', idView: require('../../assets/images/HomePage/bannner.png')},
          {id: 2, name: '推荐', idView: require('../../assets/images/HomePage/bannner.png')},
          {id: 3, name: '推荐', idView: require('../../assets/images/HomePage/bannner.png')}
        ],

        clockInTimeUrl: require('../../assets/images/HomePage/clockInTime.png'),
        personUrl: require('../../assets/images/HomePage/personliz.png'),
        calenderUrl: require('../../assets/images/HomePage/rili.png'),

        active: 0,
        selectDate: new Date(),
        showCalender: true,
        mouse_x: 0,
        mouse_y: 0,
        uid: "",
        name: "name",
        position: "position",
        work_id: "work_id",
        work_start: "正在获取信息",
        work_end: "正在获取信息",
        clock_in: "正在获取信息",
        clock_out: "正在获取信息",
        account: "",
        canvasWidth: 0,
        canvasHeight: 0,


        pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
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
      this.verify()
    },

    mounted() {
      this.verify();
      drawBackGround();


    },

    methods: {
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
        console.log(this.mouse_x + ":" + this.mouse_y);

        if (this.mouse_x > 1145 && this.mouse_x < 1566) {
          if (this.mouse_y > 166 && this.mouse_y < 514) {
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
            } else {
              // 获取失败
              alert(response.data.msg);
            }

          })
      },
      getUserClockInInfo: function () {
        let info = new URLSearchParams;
        let start = this.selectDate.getFullYear() + "-" + this.selectDate.getMonth() + "-" + this.selectDate.getDate();
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
                this.clock_in = "未打卡";
                this.active = 0;
              } else {
                this.clock_in = "上班卡:" + response.data.data.clockIn;
                this.active = 1;
              }
              if (response.data.data.clockOutStatus === "miss") {
                this.clock_out = "未打卡";
              } else {
                this.clock_out = "下班卡:" + response.data.data.clockOut;
                this.active = 2;
              }
            } else {
              // 获取失败
              this.work_start = "暂无数据";
              this.work_end = "暂无数据";
              this.clock_in = "暂无数据";
              this.clock_out = "暂无数据";
              this.active = 0;
            }

          })
      },
      reNewDate: function () {
        this.getUserClockInInfo();
      },
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
    lineContent.moveTo(270, 106);
    lineContent.lineTo(1170, 106);
    lineContent.stroke();
    lineContent.closePath();
    lineContent.beginPath();
    lineContent.strokeStyle = '#020202';
    lineContent.moveTo(270, 452);
    lineContent.lineTo(1170, 452);
    lineContent.stroke();
    lineContent.closePath();

    // 中间留空白
    lineContent.fillStyle = '#ffffff';
    lineContent.beginPath();
    lineContent.fillRect(599, 75, 243, 45);
    lineContent.closePath();
    lineContent.beginPath();
    lineContent.fillRect(599, 425, 243, 37);
    lineContent.closePath();

    // 画框
    lineContent.beginPath()
    lineContent.strokeStyle = '#020202';
    lineContent.rect(613, 76, 214, 45);
    lineContent.stroke();
    lineContent.closePath();
    lineContent.beginPath();
    lineContent.strokeStyle = '#020202';
    lineContent.rect(613, 425, 214, 45);
    lineContent.stroke();
    lineContent.closePath();


    // 框底开口
    lineContent.fillStyle = '#ffffff';
    lineContent.beginPath();
    lineContent.fillRect(857 * 0.75, 112 * 0.75, 206 * 0.75, 45);
    lineContent.closePath();
    lineContent.beginPath();
    lineContent.fillRect(857 * 0.75, 577 * 0.75, 206 * 0.75, 45);
    lineContent.closePath();

    // 画两个颜色矩形
    lineContent.fillStyle = '#b0d647';
    lineContent.beginPath();
    lineContent.fillRect(1150 * 0.75, 150, 309, 252);
    lineContent.closePath();
    lineContent.fillStyle = '#808080';
    lineContent.beginPath();
    lineContent.fillRect(270, 150, 594, 252);
    lineContent.closePath();

    // 画圆
    lineContent.beginPath();
    lineContent.fillStyle = '#b0d647';
    lineContent.arc(1150 * 0.75, 273, 45, 0, Math.PI * 2, true);
    lineContent.fill();
    lineContent.closePath();

    // 画两个长条矩形
    lineContent.fillStyle = '#b0d647';
    lineContent.beginPath();
    lineContent.fillRect(978 * 0.75, 646 * 0.75, 582 * 0.75, 70 * 0.75);
    lineContent.closePath();
    lineContent.fillStyle = '#b0d647';
    lineContent.beginPath();
    lineContent.fillRect(270, 646 * 0.75, 582 * 0.75, 70 * 0.75);
    lineContent.closePath();

    lineContent.beginPath();
    lineContent.strokeStyle = '#e6e6e6';
    lineContent.moveTo(270, 365 * 0.75);
    lineContent.lineTo(1092 * 0.75, 365 * 0.75);
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

  #total {
    position: absolute;
    left: 17.5%;
    top: 0;
  }

  #line {
    z-index: -3;
    position: absolute;
    top: 48vh;
    left: 0;
  }

  #timeSchedule {
    position: absolute;
    left: 18.73%;
    top: 96.8vh;
    width: 19.57vw;
  }

  #personalize {
    position: absolute;
    left: 50.9%;
    top: 96.8vh;
    width: 19.57vw;
  }

  #calenderImage {
    position: absolute;
    left: 67.3%;
    top: 68.0vh;
    width: 4vw;
  }

  #attendance_rule_word {
    position: absolute;
    left: 46.2%;
    top: 84.3vh;
    font-size: calc(80px - 4em);
    white-space: nowrap;
  }

  #clock_in_record_word {
    position: absolute;
    left: 46.2%;
    top: 52.7vh;
    font-size: calc(80px - 4em);
    white-space: nowrap;
  }

  #attendance_rule_small_word {
    position: absolute;
    left: 44.9%;
    top: 89.4vh;
    white-space: nowrap;
  }

  #clock_in_record_small_word {
    position: absolute;
    left: 44.9%;
    top: 58vh;
    white-space: nowrap;
  }

  #clock_in_time_word {
    position: absolute;
    left: 29.9%;
    top: 92.7vh;
  }

  #personalize_rule_word {
    position: absolute;
    left: 60.5%;
    top: 92.7vh;
  }

  #name_word {
    position: absolute;
    left: 23.9%;
    top: 63.9vh;
  }

  #position_word {
    position: absolute;
    left: 23.9%;
    top: 67.9vh;
  }

  #work_id_word {
    position: absolute;
    left: 40.9%;
    top: 67.9vh;
  }

  #work_start_word {
    position: absolute;
    left: 23.9%;
    top: 75.2vh;
  }

  #word_end_word {
    position: absolute;
    left: 40.9%;
    top: 75.2vh;
  }

  #clock_in_word {
    position: absolute;
    left: 23.9%;
    top: 79.9vh;
  }

  #clock_out_word {
    position: absolute;
    left: 40.9%;
    top: 79.9vh;
  }

  #timeLine {
    position: absolute;
    left: 14%;
    top: 71.3vh;
    width: 27vw;
  }

  .datePicker {
    position: absolute;
    left: 63%;
    top: 77.3vh;
    width: 9.8vw;
    height: 40px;
    z-index: 2;
  }

  #bottom {
    top: 52vh;
  }

  #currentImage {
    width: 100%;
  }

  #showBox {
    height: 80vh;
  }
</style>
