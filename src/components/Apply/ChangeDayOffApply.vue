<template>
  <div>
    <el-row id="contextArea">
      <el-col>
        <div>

          <el-row id="nameLabel">
            <svg width="300" height="80" viewBox="0 0 300 80">
              <text font-family="'Helvetica Neue','PingFang SC','microsoft yahei'" fill="#737470" font-size="18"
                    x="0"
                    y="1em">
                {{this.$t('changeDayOffApply.name')}}
              </text>
            </svg>
          </el-row>

          <el-row id="departmentLabel">
            <svg width="300" height="80" viewBox="0 0 300 80">
              <text font-family="'Helvetica Neue','PingFang SC','microsoft yahei'" fill="#737470" font-size="18"
                    x="0"
                    y="1em">
                {{this.$t('changeDayOffApply.department')}}
              </text>
            </svg>
          </el-row>


          <el-row id="positionLabel">
            <svg width="300" height="80" viewBox="0 0 300 80">
              <text font-family="'Helvetica Neue','PingFang SC','microsoft yahei'" fill="#737470" font-size="18"
                    x="0"
                    y="1em">
                {{this.$t('changeDayOffApply.position')}}
              </text>
            </svg>
          </el-row>

          <el-row id="timeLabel">
            <svg width="120" height="80" viewBox="0 0 120 80">
              <text font-family="'Helvetica Neue','PingFang SC','microsoft yahei'" fill="#737470" font-size="18"
                    x="0"
                    y="1em">
                {{this.$t('changeDayOffApply.dayOffType')}}
              </text>
            </svg>
          </el-row>

          <el-row id="startTimeLabel">
            <svg width="120" height="80" viewBox="0 0 120 80">
              <text font-family="'Helvetica Neue','PingFang SC','microsoft yahei'" fill="#737470" font-size="18"
                    x="0"
                    y="1em">
                {{this.$t('changeDayOffApply.offStart')}}
              </text>
            </svg>
          </el-row>

          <el-row id="endTimeLabel">
            <svg width="120" height="80" viewBox="0 0 120 80">
              <text font-family="'Helvetica Neue','PingFang SC','microsoft yahei'" fill="#737470" font-size="18"
                    x="0"
                    y="1em">
                {{this.$t('changeDayOffApply.offEnd')}}
              </text>
            </svg>
          </el-row>

          <el-row id="reasonLabel">
            <svg width="120" height="80" viewBox="0 0 120 80">
              <text font-family="'Helvetica Neue','PingFang SC','microsoft yahei'" fill="#737470" font-size="18"
                    x="0"
                    y="1em">
                {{this.$t('changeDayOffApply.offReason')}}
              </text>
            </svg>
          </el-row>

          <el-row id="name">
            <svg width="300" height="80" viewBox="0 0 300 80">
              <text font-family="'Helvetica Neue','PingFang SC','microsoft yahei'" fill="#000000" font-size="18"
                    x="0"
                    y="1em">
                {{this.name}}
              </text>
            </svg>
          </el-row>

          <el-row id="department">
            <svg width="300" height="80" viewBox="0 0 300 80">
              <text font-family="'Helvetica Neue','PingFang SC','microsoft yahei'" fill="#000000" font-size="18"
                    x="0"
                    y="1em">
                {{this.department}}
              </text>
            </svg>
          </el-row>

          <el-row id="position">
            <svg width="300" height="80" viewBox="0 0 300 80">
              <text font-family="'Helvetica Neue','PingFang SC','microsoft yahei'" fill="#000000" font-size="18"
                    x="0"
                    y="1em">
                {{this.position}}
              </text>
            </svg>
          </el-row>

          <el-row id="startTimeSelector">
            <el-date-picker
              v-model="startTime"
              type="datetime"
              :placeholder="$t('changeDayOffApply.pickDateAndTime')"
              @change="countOffTime">
            </el-date-picker>
          </el-row>

          <el-row id="endTimeSelector">
            <el-date-picker
              v-model="endTime"
              type="datetime"
              :placeholder="$t('changeDayOffApply.pickDateAndTime')"
              @change="countOffTime">
            </el-date-picker>
          </el-row>

          <el-row id="description">
            <el-input
              type="textarea"
              :autosize="{ minRows: 4, maxRows:8}"
              maxlength="120"
              resize="none"
              :placeholder="$t('header.pleaseEnter')"
              v-model="dayOffReason">
            </el-input>
          </el-row>

          <el-row id="timeSelector">
            <el-select v-model="selectType" :placeholder="$t('changeDayOffApply.pickOffType')" @change="checkRemainTime" style="width: 220px;">
              <el-option
                v-for="(item, index) in dayOffType"
                :key="index"
                :label="item.offName"
                :value="item.type">
                <span style="float: left">{{ item.offName }}</span>
              </el-option>
            </el-select>
          </el-row>

          <el-row id="remainTime">
            <svg width="200" height="50" viewBox="0 0 200 50">
              <text font-family="'Helvetica Neue','PingFang SC','microsoft yahei'" fill="#737470" font-size="15"
                    x="0"
                    y="1em">
                {{this.remainTime}}
              </text>
            </svg>
          </el-row>

          <el-row id="offTimeCount">
            <svg width="200" height="50" viewBox="0 0 200 50">
              <text font-family="'Helvetica Neue','PingFang SC','microsoft yahei'" fill="#737470" font-size="15"
                    x="0"
                    y="1em">
                {{this.offTimeCount}}
              </text>
            </svg>
          </el-row>

          <el-row id="process">
            <svg width="120" height="80" viewBox="0 0 120 80">
              <text font-family="'Helvetica Neue','PingFang SC','microsoft yahei'" fill="#000000" font-size="18"
                    x="0"
                    y="1em">
                {{this.$t('changeDayOffApply.reviewProcess')}}
              </text>
            </svg>
          </el-row>

          <el-row id="processLine">
            <el-timeline>
              <el-timeline-item
                v-for="(activity, index) in reviewerPoint"
                :key="index"
                style="height: 80px">
                {{activity.content}}
              </el-timeline-item>
            </el-timeline>
          </el-row>


          <el-row id="reviewerName">
            <div v-for="(activity, index) in reviewerPoint" style="height: 100px">
              <el-row>
                <svg width="120" height="80" viewBox="0 0 120 80">
                  <text font-family="'Helvetica Neue','PingFang SC','microsoft yahei'" fill="#000000" font-size="15"
                        x="0"
                        y="1em">
                    {{activity.name}}
                  </text>
                </svg>
              </el-row>
            </div>
          </el-row>

          <el-row id="reviewerIcon">
            <div v-for="(activity, index) in reviewerPoint" style="height: 97px">
              <el-row>
                <el-avatar style="background-color: #81af53" icon="el-icon-user-solid"></el-avatar>
              </el-row>
            </div>
          </el-row>

          <el-row id="subBut" class="makeUpSub">
            <el-button @click.prevent="submitInfo" style="width: 200px">
              <p style="margin: 0; color: #FFFFFF">{{this.$t('changeDayOffApply.submitApply')}}</p>
            </el-button>
          </el-row>

        </div>
      </el-col>
    </el-row>
  </div>

</template>

<script>
  import axios from 'axios'
  import Header from '../Header'
  import Bottom from "../Bottom";

  export default {
    name: "ChangeDayOffApply",

    components: {
      Bottom,
      Header
    },
    data() {
      return {
        account: "",
        name: "name",
        position: "position",
        work_id: "work_id",
        uid: "",
        department: "department",
        dayOffReason: "",
        dayOffType: [
          {
            offName: this.$t('changeDayOffApply.changeDayOff'),
            type: "ChangeDayOff"
          },
          {
            offName: this.$t('changeDayOffApply.annualDayOff'),
            type: "AnnualDayOff"
          },
          {
            offName: this.$t('changeDayOffApply.dayOff'),
            type: "DayOff"
          }],
        selectType: '',
        reviewerPoint: [],
        startTime: "",
        endTime: "",
        changeDayOffRemain: "",
        annualDayOffRemain: "",
        remainTime: "",
        offTimeCount: "",
        offTimeLength: "",
        RemainHour: "",
        reviewerUid: "",
      }
    },
    created() {

    },

    mounted() {
      this.verify();
    },
    methods: {
      verify: function () {
        axios
          .get('/api/shiroVerify')
          .then(response => {
            if (response.data.status === 200) {
              // 登录过了，返回值为当前用户uid
              this.uid = response.data.data;
              // 开始加载用户界面信息
              this.getLoginInUserInfo();
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
              this.department = response.data.data[0].department_name;
              this.changeDayOffRemain = response.data.data[0].change_day_off;
              this.annualDayOffRemain = response.data.data[0].annual_day_off;

              this.reviewerUid = response.data.data[0].reviewers;
              this.getReviewerName();
            } else {
              // 获取失败
              alert(this.$t('header.getLoginInfoFail'));
            }

          })
      },
      submitInfo: function () {
        if (this.selectType === "") {
          alert(this.$t('changeDayOffApply.needToChooseDayOffType'));
          return;
        }
        if (this.offTimeLength === "") {
          alert(this.$t('changeDayOffApply.needToChooseDayOffTime'));
          return;
        }
        if (this.remainHour < this.offTimeLength) {
          alert(this.$t('changeDayOffApply.youDoNotHaveEnoughTime'));
          return;
        }
        if(this.offTimeLength <= 0){
          alert(this.$t('changeDayOffApply.invalidDayOffTime'));
          return;
        }
        let detail = "";
        if (this.startTime !== "" && this.endTime !== "" && this.startTime !== null && this.endTime !== null) {
          let startYear = this.startTime.getFullYear();
          let startMonth = this.startTime.getMonth() + 1;
          let startDay = this.startTime.getDate();
          let startHour = this.startTime.getHours();
          let startMinute = this.startTime.getMinutes();
          //console.log(startYear,startMonth,startDay,startHour,startMinute);
          let endYear = this.endTime.getFullYear();
          let endMonth = this.endTime.getMonth() + 1;
          let endDay = this.endTime.getDate();
          let endHour = this.endTime.getHours();
          let endMinute = this.endTime.getMinutes();

          detail = startYear + "-" + startMonth + "-" + startDay + "," + endYear + "-" + endMonth + "-" + endDay + "," + startHour + ":" + startMinute + "," +
            endHour + ":" + endMinute + "," + this.name + "," + this.selectType;
        } else {
          alert(this.$t('changeDayOffApply.needToChooseDayOffTime'));
          return;
        }

        let info = new URLSearchParams;
        info.append("uid", String(this.uid));
        info.append("applicationType", String("DayOff"));
        info.append("applicationDetail", String(detail));
        info.append("applicationDescription", String(this.dayOffReason));
        axios
          .post('/api/apply/addApplication', info)
          .then(response => {
            if (response.data.status === 200) {
              // 获取成功
              //console.log(response.data.data);
              alert(this.$t('changeDayOffApply.addApplicationSuccess'));
              this.$router.go(0);
            } else {
              // 获取失败
              alert(this.$t('changeDayOffApply.addApplicationFail'));
            }

          })
      },
      checkRemainTime: function () {
        if (this.selectType === "ChangeDayOff") {
          this.remainTime = this.$t('changeDayOffApply.changeDayOffRemain') + this.changeDayOffRemain + this.$t('changeDayOffApply.hour');
          this.remainHour = this.changeDayOffRemain;
        } else if (this.selectType === "AnnualDayOff") {
          this.remainTime = this.$t('changeDayOffApply.annualDayOffRemain') + this.annualDayOffRemain + this.$t('changeDayOffApply.hour');
          this.remainHour = this.annualDayOffRemain;
        } else {
          this.remainTime = "";
          this.remainHour = 1000;
        }
        this.countOffTime();
      },
      countOffTime: function () {
        if (this.selectType === "") {
          return;
        }
        if (this.startTime !== "" && this.endTime !== "" && this.startTime !== null && this.endTime !== null) {
          let startYear = this.startTime.getFullYear();
          let startMonth = this.startTime.getMonth() + 1;
          let startDay = this.startTime.getDate();
          let startHour = this.startTime.getHours();
          let startMinute = this.startTime.getMinutes();
          //console.log(startYear,startMonth,startDay,startHour,startMinute);
          let endYear = this.endTime.getFullYear();
          let endMonth = this.endTime.getMonth() + 1;
          let endDay = this.endTime.getDate();
          let endHour = this.endTime.getHours();
          let endMinute = this.endTime.getMinutes();

          let info = new URLSearchParams;
          info.append("uid", String(this.uid));
          info.append("startDate", String(startYear + "-" + startMonth + "-" + startDay));
          info.append("startTime", String(startHour + ":" + startMinute));
          info.append("endDate", String(endYear + "-" + endMonth + "-" + endDay));
          info.append("endTime", String(endHour + ":" + endMinute));
          info.append("offType", String(this.selectType));

          axios
            .post('/api/apply/calculateOffTime', info)
            .then(response => {
              if (response.data.status === 200) {
                // 获取成功
                this.offTimeLength = response.data.data;
                this.offTimeCount = this.$t('changeDayOffApply.totalOffHour') + this.offTimeLength.toString().substring(0, 4) + this.$t('changeDayOffApply.hour');

              } else {
                // 获取失败
                alert(this.$t('changeDayOffApply.calculateOffTimeFail'));
              }

            })
        } else {
          this.offTimeCount = "";
          this.offTimeLength = "";
        }
      },
      getReviewerName: function () {
        let info = new URLSearchParams;
        info.append("reviewers", String(this.reviewerUid));
        axios
          .post('/api/apply/getReviewerName', info)
          .then(response => {
            if (response.data.status === 200) {
              // 获取成功
              let tempName = response.data.data;
              let nameNum = tempName.length;
              for (let i = 0; i < nameNum; i++) {
                let tempPoint = {};
                tempPoint.content = this.$t('changeDayOffApply.reviewer') + (i + 1);
                tempPoint.name = tempName[i].name;
                this.reviewerPoint.push(tempPoint);
              }
            } else {
              // 获取失败
              alert(this.$t('changeDayOffApply.getReviewerNameFail'));
            }

          })
      }

    }

  }

</script>

<style scoped>
  #name {
    position: absolute;
    left: 365px;
    top: 50px;
  }

  #department {
    position: absolute;
    left: 365px;
    top: 110px;
  }

  #position {
    position: absolute;
    left: 365px;
    top: 170px;
  }

  #nameLabel {
    position: absolute;
    left: 235px;
    top: 50px;
  }

  #departmentLabel {
    position: absolute;
    left: 235px;
    top: 110px;
  }

  #positionLabel {
    position: absolute;
    left: 235px;
    top: 170px;
  }

  #timeLabel {
    position: absolute;
    left: 235px;
    top: 230px;
  }

  #remainTime {
    position: absolute;
    left: 590px;
    top: 243px;
  }

  #startTimeLabel {
    position: absolute;
    left: 235px;
    top: 300px;
  }

  #endTimeLabel {
    position: absolute;
    left: 235px;
    top: 370px;
  }

  #reasonLabel {
    position: absolute;
    left: 235px;
    top: 440px;
  }

  #contextArea {
    height: 1200px;
  }

  #startTimeSelector {
    position: absolute;
    left: 365px;
    top: 295px;
    width: 200px;
  }

  #endTimeSelector {
    position: absolute;
    left: 365px;
    top: 365px;
    width: 200px;
  }

  #offTimeCount {
    position: absolute;
    left: 605px;
    top: 382px;
    width: 200px;
  }

  #description {
    position: absolute;
    left: 365px;
    top: 440px;
    width: 500px;
  }

  #timeSelector {
    position: absolute;
    left: 365px;
    top: 225px;
    width: 200px;
  }

  #process {
    position: absolute;
    left: 235px;
    top: 600px;
  }

  #processLine {
    position: absolute;
    left: 235px;
    top: 660px;
    width: 200px;
    height: 400px;
  }

  #reviewerName {
    position: absolute;
    left: 755px;
    top: 655px;
    width: 200px;
    height: 400px;
  }

  #reviewerIcon {
    position: absolute;
    left: 645px;
    top: 650px;
    width: 200px;
    height: 400px;
  }

  #subBut {
    position: absolute;
    left: 445px;
    top: 1100px;
  }
</style>

<style>
  .makeUpSub .el-button {
    background-color: #a7da38 !important;
  }

  .makeUpSub .el-button:hover {
    background-color: #b2da1d !important;
  }
</style>
