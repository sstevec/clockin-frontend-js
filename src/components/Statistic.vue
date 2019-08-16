<template>
  <div>
    <el-row id="offSet">
      <el-row id="total">
        <el-col>
          <div id="content">
            <Header></Header>

            <el-row id="checkOptions" class="checkBox">
<!--              <el-scrollbar style="height: 100%; overflow-x: hidden; ">-->
                <el-checkbox-group
                  v-model="checkedOptions"
                  :min="1"
                  style="width: 1100px;float: top"
                  @change="handleSelect">
                  <el-checkbox style="width: 120px;float: left;padding: 0;height: 30px" v-for="item in allOptions"
                               :label="item.key" :key="item.key">
                    <svg width="120" height="16" viewBox="0 0 120 16">
                      <text font-family="'Helvetica Neue','PingFang SC','microsoft yahei'" fill="#737470" font-size="13"
                            x="0"
                            y="1em">
                        {{item.name}}
                      </text>
                    </svg>
                  </el-checkbox>
                </el-checkbox-group>
<!--              </el-scrollbar>-->
            </el-row>


            <el-row id="searchLabel">
              <svg width="80" height="30" viewBox="0 0 80 30">
                <text font-family="'Helvetica Neue','PingFang SC','microsoft yahei'" fill="#737470" font-size="15"
                      x="0"
                      y="1em">
                  {{this.$t('statistic.chooseTimePeriod')}}
                </text>
              </svg>
            </el-row>

            <el-row id="searchInput">
              <el-date-picker
                v-model="searchInfo"
                type="daterange"
                :range-separator="$t('statistic.to')"
                :start-placeholder="$t('statistic.startDate')"
                :end-placeholder="$t('statistic.endDate')"
                @blur="getAllRecords">
              </el-date-picker>
            </el-row>

            <el-row class="outBut" id="button3">
              <el-button style="width: 100px" @click="downloadClockInRecord">
                <p style="margin: 0; color: #FFFFFF">{{this.$t('statistic.fileOut')}}</p>
              </el-button>
            </el-row>

          </div>


          <el-row id="table" class="tab">
            <el-table
              border
              :data="records"
              style="width: 100%">

              <div v-for="item in showCheckedOptions">
                <el-table-column
                  sortable
                  :show-overflow-tooltip="true"
                  :label="item.name"
                  :key="item.key"
                  :prop="item.key"
                  min-width="150px"
                >
                </el-table-column>
              </div>

            </el-table>
          </el-row>

          <el-row id="generalStatistic">
            <div v-for="item in generalStatistic">
              <svg width="320" height="25" viewBox="0 0 320 25">
                <text font-family="'Helvetica Neue','PingFang SC','microsoft yahei'" fill="#737470" font-size="15"
                      x="0"
                      y="1em">
                  {{item.name}} : {{item.value}}
                </text>
              </svg>
            </div>
          </el-row>
          <el-progress id="missInTotal" type="circle" :percentage="missInTotal" :color="colors1"></el-progress>
          <el-progress id="lateInTotal" type="circle" :percentage="lateInTotal" :color="colors1"></el-progress>
          <el-progress id="totalWorkInSuppose" type="circle" :percentage="totalWorkInSuppose"
                       :color="colors2"></el-progress>
          <el-progress id="changeInSuppose" type="circle" :percentage="changeInSuppose" :color="colors1"></el-progress>
          <el-progress id="missInSuppose" type="circle" :percentage="missInSuppose" :color="colors1"></el-progress>
          <el-progress id="moneyInExtra" type="circle" :percentage="moneyInExtra" :color="colors2"></el-progress>
          <el-progress id="holidayMoneyInExtra" type="circle" :percentage="holidayMoneyInExtra"
                       :color="colors2"></el-progress>
          <el-progress id="changeInExtra" type="circle" :percentage="changeInExtra" :color="colors2"></el-progress>

          <el-row id="missInTotalLabel">
            <svg width="180" height="30" viewBox="0 0 180 30">
              <text font-family="'Helvetica Neue','PingFang SC','microsoft yahei'" fill="#737470" font-size="15"
                    x="0"
                    y="1em">
                {{this.$t('statistic.missCardPercent')}}
              </text>
            </svg>
          </el-row>

          <el-row id="lateInTotalLabel">
            <svg width="180" height="30" viewBox="0 0 180 30">
              <text font-family="'Helvetica Neue','PingFang SC','microsoft yahei'" fill="#737470" font-size="15"
                    x="0"
                    y="1em">
                {{this.$t('statistic.earlyOrLate')}}
              </text>
            </svg>
          </el-row>

          <el-row id="totalWorkInSupposeLabel">
            <svg width="180" height="30" viewBox="0 0 180 30">
              <text font-family="'Helvetica Neue','PingFang SC','microsoft yahei'" fill="#737470" font-size="15"
                    x="0"
                    y="1em">
                {{this.$t('statistic.workHourPercent')}}
              </text>
            </svg>
          </el-row>

          <el-row id="changeInSupposeLabel">
            <svg width="180" height="30" viewBox="0 0 180 30">
              <text font-family="'Helvetica Neue','PingFang SC','microsoft yahei'" fill="#737470" font-size="15"
                    x="0"
                    y="1em">
                {{this.$t('statistic.dayOffPercent')}}
              </text>
            </svg>
          </el-row>

          <el-row id="missInSupposeLabel">
            <svg width="180" height="30" viewBox="0 0 180 30">
              <text font-family="'Helvetica Neue','PingFang SC','microsoft yahei'" fill="#737470" font-size="15"
                    x="0"
                    y="1em">
                {{this.$t('statistic.missHourPercent')}}
              </text>
            </svg>
          </el-row>

          <el-row id="moneyInExtraLabel">
            <svg width="180" height="30" viewBox="0 0 180 30">
              <text font-family="'Helvetica Neue','PingFang SC','microsoft yahei'" fill="#737470" font-size="15"
                    x="0"
                    y="1em">
                {{this.$t('statistic.rewardMoneyPercent')}}
              </text>
            </svg>
          </el-row>

          <el-row id="holidayMoneyInExtraLabel">
            <svg width="180" height="30" viewBox="0 0 180 30">
              <text font-family="'Helvetica Neue','PingFang SC','microsoft yahei'" fill="#737470" font-size="15"
                    x="0"
                    y="1em">
                {{this.$t('statistic.rewardHolidayMoneyPercent')}}
              </text>
            </svg>
          </el-row>

          <el-row id="changeInExtraLabel">
            <svg width="180" height="30" viewBox="0 0 180 30">
              <text font-family="'Helvetica Neue','PingFang SC','microsoft yahei'" fill="#737470" font-size="15"
                    x="0"
                    y="1em">
                {{this.$t('statistic.rewardDayOffHourPercent')}}
              </text>
            </svg>
          </el-row>

          <el-row id="bottom">
            <Bottom></Bottom>
          </el-row>
        </el-col>


        <el-row id="choosePage">
          <el-pagination
            :current-page.sync="currentPageNum"
            :page-size="10"
            :total="total"
            @current-change="handlePageChange"
            layout="prev, next, jumper"
          >
          </el-pagination>
        </el-row>
      </el-row>
    </el-row>
  </div>

</template>

<script>
  import axios from 'axios'
  import Header from '../components/Header'
  import Bottom from "../components/Bottom";
  const startDate = new Date();
  const endDate = new Date();
  export default {
    name: "Statistic",

    components: {
      Bottom,
      Header
    },
    data() {
      return {
        currentPageNum: 1,
        account: "",
        name: "name",
        position: "position",
        work_id: "work_id",
        uid: "",
        searchInfo: [new Date(startDate.setDate(startDate.getDate() - 7)), endDate],
        records: [],
        showCheckedOptions: [
          {name: this.$t('statistic.workHour'), value: "", key: "workHour"},
          {name: this.$t('statistic.date'), value: "", key: "date"},
          {name: this.$t('HomePage.clockIn'), value: "", key: "clockIn"},
          {name: this.$t('HomePage.clockOut'), value: "", key: "clockOut"},
          {name: this.$t('statistic.workStart'), value: "", key: "workStart"},
          {name: this.$t('statistic.workEnd'), value: "", key: "workEnd"},
        ],
        allOptions: [
          {name: this.$t('statistic.workHour'), value: "", key: "workHour"},
          {name: this.$t('statistic.extraWorkHour'), value: "", key: "extraWorkHour"},
          {name: this.$t('statistic.missHour'), value: "", key: "missHour"},
          {name: this.$t('statistic.isEarly'), value: "", key: "earlyLeave"},
          {name: this.$t('statistic.isLate'), value: "", key: "late"},
          {name: this.$t('HomePage.clockIn'), value: "", key: "clockIn"},
          {name: this.$t('HomePage.clockOut'), value: "", key: "clockOut"},
          {name: this.$t('statistic.workStart'), value: "", key: "workStart"},
          {name: this.$t('statistic.workEnd'), value: "", key: "workEnd"},
          {name: this.$t('statistic.changeDayOffHour'), value: "", key: "changDayOff"},
          {name: this.$t('statistic.annualDayOffHour'), value: "", key: "annualDayOff"},
          {name: this.$t('statistic.date'), value: "", key: "date"},
          {name: this.$t('statistic.isMissClockIn'), value: "", key: "missClockIn"},
          {name: this.$t('statistic.isMissClockOut'), value: "", key: "missClockOut"}],
        checkedOptions: ["date", "workStart", "clockIn", "workEnd", "clockOut", "workHour"],
        generalStatistic: [
          {name: this.$t('statistic.workDate'), value: "", key: "totalWorkDate"},
          {name: this.$t('statistic.totalMiss'), value: "", key: "totalMissClock"},
          {name: this.$t('statistic.totalLate'), value: "", key: "totalLate"},
          {name: this.$t('statistic.totalEarly'), value: "", key: "totalEarly"},
          {name: this.$t('statistic.supposeWorkHour'), value: "", key: "totalSupposeWorkHour"},
          {name: this.$t('statistic.actualWorkHour'), value: "", key: "totalWorkHours"},
          {name: this.$t('statistic.totalExtraWorkHourNotRewarded'), value: "", key: "totalExtraWorkHour"},
          {name: this.$t('statistic.totalChangeDayOffHour'), value: "", key: "totalChangeDayOff"},
          {name: this.$t('statistic.totalAnnualDayOffHour'), value: "", key: "totalAnnualDayOff"},
          {name: this.$t('statistic.totalMissHour'), value: "", key: "totalMissHour"},
          {name: this.$t('statistic.totalExtraWorkHour'), value: "", key: "totalCountedExtraWork"},
          {name: this.$t('statistic.totalRewardMoneyHour'), value: "", key: "totalExchangeMoneyHour"},
          {name: this.$t('statistic.totalRewardHolidayMoneyHour'), value: "", key: "totalExchangeChangeDayOffHour"},
          {name: this.$t('statistic.totalRewardChangeDayOffHour'), value: "", key: "totalExchangeHolidayMoneyHour"},
        ],
        missInTotal: 0,
        lateInTotal: 0,
        totalWorkInSuppose: 0,
        changeInSuppose: 0,
        missInSuppose: 0,
        moneyInExtra: 0,
        holidayMoneyInExtra: 0,
        changeInExtra: 0,
        colors2: [
          {color: '#f54e56', percentage: 20},
          {color: '#e6a23c', percentage: 40},
          {color: '#dfcc7e', percentage: 60},
          {color: '#eefaad', percentage: 80},
          {color: '#7cd379', percentage: 100}
        ],
        colors1: [
          {color: '#7cd379', percentage: 20},
          {color: '#e5e688', percentage: 40},
          {color: '#ffee70', percentage: 60},
          {color: '#faa56d', percentage: 80},
          {color: '#d35d63', percentage: 100}
        ],
        total:0,
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
              this.getAllRecords();
            } else {
              // 获取失败
              alert(this.$t('header.getLoginInfoFail'));
            }

          })
      },
      handleSelect: function () {
        this.showCheckedOptions = [];
        let selectedSize = this.checkedOptions.length;
        let allSize = this.allOptions.length;
        for (let i = 0; i < selectedSize; i++) {
          for (let j = 0; j < allSize; j++) {
            if (this.checkedOptions[i] === this.allOptions[j].key) {
              this.showCheckedOptions.push(this.allOptions[j]);
            }
          }
        }
      },
      handleDelete: function (index, rowData) {

      },
      getAllRecords: function () {
        if (this.searchInfo.length === 0) {
          return;
        }
        let startYear = this.searchInfo[0].getFullYear();
        let startMonth = this.searchInfo[0].getMonth() + 1;
        let startDay = this.searchInfo[0].getDate();
        //console.log(startYear,startMonth,startDay,startHour,startMinute);
        let endYear = this.searchInfo[1].getFullYear();
        let endMonth = this.searchInfo[1].getMonth() + 1;
        let endDay = this.searchInfo[1].getDate();
        this.records = [];

        // 获取总页数
        let pageInfo = new URLSearchParams;
        pageInfo.append("uid", String(this.uid));
        pageInfo.append("start", String(startYear + "-" + startMonth + "-" + startDay));
        pageInfo.append("end", String(endYear + "-" + endMonth + "-" + endDay));
        axios
          .post('/api/clockInInfo/countUserStatisticRecord', pageInfo)
          .then(response => {
            if (response.data.status === 200) {
              this.total = response.data.data;
              console.log(this.total);
            } else {
              // 获取失败
              alert(this.$t('header.getPageNumberFail'));
            }
          });

        let info = new URLSearchParams;
        info.append("uid", String(this.uid));
        info.append("startDate", String(startYear + "-" + startMonth + "-" + startDay));
        info.append("endDate", String(endYear + "-" + endMonth + "-" + endDay));
        info.append("pageNum", String(this.currentPageNum));
        info.append("pageMax", String("10"));
        axios
          .post('/api/clockInInfo/getStatistic', info)
          .then(response => {
            if (response.data.status === 200) {
              // console.log(response.data.data)
              let dataList = response.data.data;
              let size = dataList.length;
              let num = this.generalStatistic.length;
              let tempStatistic = dataList[0];
              for (let i = 0; i < num; i++) {
                this.generalStatistic[i].value = tempStatistic[this.generalStatistic[i].key];
              }
              for (let i = 1; i < size; i++) {
                this.records.push(dataList[i]);
              }
              if ((Number(this.generalStatistic[0].value.split(" ")[0]) * 2) > 0) {
                this.missInTotal = Number((this.generalStatistic[1].value.split(" ")[0] / (Number(this.generalStatistic[0].value.split(" ")[0]) * 2) * 100).toString().substring(0, 4));
                this.lateInTotal = Number(((Number(this.generalStatistic[2].value.split(" ")[0]) + Number(this.generalStatistic[3].value.split(" ")[0])) / (Number(this.generalStatistic[0].value.split(" ")[0]) * 2) * 100).toString().substring(0, 4));
              } else {
                this.missInTotal = 0;
                this.lateInTotal = 0;
              }
              if (Number(this.generalStatistic[4].value.split(" ")[0]) > 0) {
                this.totalWorkInSuppose = Number((this.generalStatistic[5].value.split(" ")[0] / Number(this.generalStatistic[4].value.split(" ")[0]) * 100).toString().substring(0, 4));
                this.changeInSuppose = Number(((Number(this.generalStatistic[7].value.split(" ")[0]) + Number(this.generalStatistic[8].value.split(" ")[0])) / Number(this.generalStatistic[4].value.split(" ")[0]) * 100).toString().substring(0, 4));
                this.missInSuppose = Number((this.generalStatistic[9].value.split(" ")[0] / (Number(this.generalStatistic[4].value.split(" ")[0])) * 100).toString().substring(0, 4));
              } else {
                this.totalWorkInSuppose = 0;
                this.changeInSuppose = 0;
                this.missInSuppose = 0;
              }
              if (Number(this.generalStatistic[10].value.split(" ")[0]) > 0) {
                this.moneyInExtra = Number((this.generalStatistic[11].value.split(" ")[0] / (Number(this.generalStatistic[10].value.split(" ")[0])) * 100).toString().substring(0, 4));
                this.holidayMoneyInExtra = Number((this.generalStatistic[12].value.split(" ")[0] / (Number(this.generalStatistic[10].value.split(" ")[0])) * 100).toString().substring(0, 4));
                this.changeInExtra = Number((this.generalStatistic[13].value.split(" ")[0] / (Number(this.generalStatistic[10].value.split(" ")[0])) * 100).toString().substring(0, 4));
              } else {
                this.moneyInExtra = 0;
                this.holidayMoneyInExtra = 0;
                this.changeInExtra = 0;
              }
            } else {
              // 获取失败
              alert(this.$t('statistic.getStatisticFail'));
            }
          })
      },
      downloadClockInRecord: function () {
        this.$confirm(this.$t('statistic.doYouWantToOutCurrentRecord'), this.$t('statistic.notice'), {
          confirmButtonText: this.$t('login.confirm'),
          cancelButtonText: this.$t('header.cancel'),
          type: 'warning'
        }).then(() => {
          let selectedSize = this.checkedOptions.length;
          if (selectedSize > 0) {
            if (this.searchInfo.length === 0) {
              alert(this.$t('statistic.pleaseChooseTimePeriod'));
              return;
            }
            let columnName = {};
            let size = this.allOptions.length;
            for (let i = 0; i < size; i++) {
              columnName[this.allOptions[i].key] = this.allOptions[i].name;
            }
            let startYear = this.searchInfo[0].getFullYear();
            let startMonth = this.searchInfo[0].getMonth() + 1;
            let startDay = this.searchInfo[0].getDate();
            //console.log(startYear,startMonth,startDay,startHour,startMinute);
            let endYear = this.searchInfo[1].getFullYear();
            let endMonth = this.searchInfo[1].getMonth() + 1;
            let endDay = this.searchInfo[1].getDate();
            let info = new URLSearchParams;
            info.append("uid", String(this.uid));
            info.append("startDate", String(startYear + "-" + startMonth + "-" + startDay));
            info.append("endDate", String(endYear + "-" + endMonth + "-" + endDay));
            info.append("info", JSON.stringify(columnName));

            axios
              .post('/api/clockInInfo/outFile', info)
              .then(response => {
                if (response.data.status === 200) {
                  alert(this.$t('statistic.startDownload'));

                  let info = new URLSearchParams;
                  info.append("filePath", String(response.data.data));

                  axios
                    .post('/api/general/download', info,{responseType:'arraybuffer'})
                    .then(response => {
                      let url = window.URL.createObjectURL(new Blob([response.data],{type:"application/vnd.ms-excel"}));
                      let link = document.createElement('a');
                      link.style.display = 'none';
                      link.href = url;
                      // 获取文件名
                      // download 属性定义了下载链接的地址而不是跳转路径
                      link.setAttribute('download', "clockInInfo.xls");
                      document.body.appendChild(link);
                      link.click();
                    })

                } else {
                  // 获取失败
                  alert(this.$t('statistic.outFail'));
                }
              })
          } else {
            alert(this.$t('statistic.pleaseChooseAtLeastOneCategoryBeforeDownload'));
            return;
          }

        }).catch(() => {
          this.$message({
            type: 'info',
            message: this.$t('statistic.haveCanceled')
          });
        });
      },
      handlePageChange: function () {
        this.getAllRecords()
      }
    }
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

  #bottom {
    top: 1420px;
  }

  #searchLabel {
    position: absolute;
    top: 170px;
    left: 20px;
  }

  #searchInput {
    position: absolute;
    top: 160px;
    left: 110px;
    width: 200px;
  }

  #button3 {
    position: absolute;
    top: 160px;
    left: 1035px;
  }

  #table {
    position: absolute;
    top: 220px;
    width: 1140px;
    height: 700px;
    padding: 2px;
  }

  #checkOptions {
    position: absolute;
    left: 20px;
    top: 90px;
    width: 1100px;
    height: 70px;
  }

  #generalStatistic {
    position: absolute;
    left: 20px;
    top: 980px;
  }

  #missInTotal {
    position: absolute;
    left: 400px;
    top: 970px;
  }

  #lateInTotal {
    position: absolute;
    left: 590px;
    top: 970px;
  }

  #totalWorkInSuppose {
    position: absolute;
    left: 780px;
    top: 970px;
  }

  #changeInSuppose {
    position: absolute;
    left: 970px;
    top: 970px;
  }

  #missInSuppose {
    position: absolute;
    left: 400px;
    top: 1180px;
  }

  #moneyInExtra {
    position: absolute;
    left: 590px;
    top: 1180px;
  }

  #holidayMoneyInExtra {
    position: absolute;
    left: 780px;
    top: 1180px;
  }

  #changeInExtra {
    position: absolute;
    left: 970px;
    top: 1180px;
  }

  #missInTotalLabel {
    position: absolute;
    left: 433px;
    top: 1105px;
  }

  #lateInTotalLabel {
    position: absolute;
    left: 606px;
    top: 1105px;
  }

  #totalWorkInSupposeLabel {
    position: absolute;
    left: 796px;
    top: 1105px;
  }

  #changeInSupposeLabel {
    position: absolute;
    left: 987px;
    top: 1105px;
  }

  #missInSupposeLabel {
    position: absolute;
    left: 417px;
    top: 1315px;
  }

  #moneyInExtraLabel {
    position: absolute;
    left: 593px;
    top: 1315px;
  }

  #holidayMoneyInExtraLabel {
    position: absolute;
    left: 764px;
    top: 1315px;
  }

  #changeInExtraLabel {
    position: absolute;
    left: 967px;
    top: 1315px;
  }

  #choosePage {
    z-index: 5;
    position: absolute;
    left: 470px;
    top: 807px;
  }
</style>

<style>
  .outBut .el-button {
    background-color: #95da88 !important;
  }

  .tab .el-table th {
    background-color: #dadad5 !important;
  }

  .el-scrollbar__wrap {
    overflow-x: hidden;
  }

  .checkBox .el-checkbox__input.is-checked .el-checkbox__inner {
    background-color: #5daf34 !important;
    border: #5daf34;
  }

  .checkBox .el-checkbox__inner:hover {
    background-color: #adc46a;
    border: #5daf34;
  }


</style>
