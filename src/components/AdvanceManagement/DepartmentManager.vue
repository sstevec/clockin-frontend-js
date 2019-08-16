<template>
  <div>
    <el-row id="total">
      <el-col>
        <div id="content">

          <el-row id="checkOptions" class="checkBox">
            <el-scrollbar style="height: 100%;">
              <el-checkbox-group
                v-model="checkedOptions"
                :min="1"
                style="width: 900px;float: top"
                @change="handleSelect">
                <el-checkbox style="width: 190px;float: left;padding: 0;height: 30px" v-for="item in allOptions"
                             :label="item.key" :key="item.key">
                  <svg width="190" height="16" viewBox="0 0 190 16">
                    <text font-family="'Helvetica Neue','PingFang SC','microsoft yahei'" fill="#737470" font-size="13"
                          x="0"
                          y="1em">
                      {{item.name}}
                    </text>
                  </svg>
                </el-checkbox>
              </el-checkbox-group>
            </el-scrollbar>
          </el-row>

          <el-row id="searchLabel">
            <svg width="80" height="30" viewBox="0 0 80 30">
              <text font-family="'Helvetica Neue','PingFang SC','microsoft yahei'" fill="#737470" font-size="15"
                    x="0"
                    y="1em">
                {{$t('statistic.chooseTimePeriod')}}
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

          <el-row id="searchInput2" class="greenBut">
            <el-button style="width: 200px" @click="editDepartmentVisible = true">{{$t('advanceManagement.departmentManagement')}}</el-button>
          </el-row>

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
                  min-width="240px"
                >
                </el-table-column>
              </div>

            </el-table>
          </el-row>

          <el-row id="choosePage">
            <el-pagination
              :current-page.sync="currentPageNum"
              :page-size="12"
              :total="total"
              @current-change="handlePageChange"
              layout="prev, next, jumper"
            >
            </el-pagination>
          </el-row>

          <el-row class="managerDepartmentManage">
            <el-dialog :title="$t('advanceManagement.departmentManagement')" :visible.sync="editDepartmentVisible">

              <svg id="editSelectClockInRule" width="120" height="80" viewBox="0 0 120 80">
                <text font-family="'Helvetica Neue','PingFang SC','microsoft yahei'" fill="#737470" font-size="15"
                      x="0"
                      y="1em">
                  {{$t('departmentManagement.chooseWorkRule')}}
                </text>
              </svg>

              <svg id="editSelectExtraWorkRule" width="120" height="80" viewBox="0 0 120 80">
                <text font-family="'Helvetica Neue','PingFang SC','microsoft yahei'" fill="#737470" font-size="15"
                      x="0"
                      y="1em">
                  {{$t('departmentManagement.chooseExtraWorkRule')}}
                </text>
              </svg>

              <svg id="editSelectNoonBreakRule" width="120" height="80" viewBox="0 0 120 80">
                <text font-family="'Helvetica Neue','PingFang SC','microsoft yahei'" fill="#737470" font-size="15"
                      x="0"
                      y="1em">
                  {{$t('noonBreak.chooseNoonBreakRule')}}
                </text>
              </svg>

              <el-row id="editNoonBreakRuleSelector">
                <el-select v-model="editNoonBreakRule" :placeholder="$t('ExtraWorkApply.pleaseSelect')">
                  <el-option
                    v-for="item in noonBreakRuleOption"
                    :key="item.name"
                    :label="item.name"
                    :value="item.name"
                    style="height: auto">
                    <span style="float: left">{{ item.name }}</span>
                    <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span></el-option>
                </el-select>
              </el-row>

              <el-row id="editClockInRuleSelector">
                <el-select v-model="editClockInRule" :placeholder="$t('ExtraWorkApply.pleaseSelect')">
                  <el-option
                    v-for="item in clockInRuleOption"
                    :key="item.name"
                    :label="item.name"
                    :value="item.name"
                    style="height: auto">
                    <span style="float: left">{{ item.name }}</span>
                    <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span></el-option>
                </el-select>
              </el-row>

              <el-row id="editExtraWorkRuleSelector">
                <el-select v-model="editExtraWorkRule" :placeholder="$t('ExtraWorkApply.pleaseSelect')">
                  <el-option
                    v-for="item in extraWorkRuleOption"
                    :key="item.name"
                    :label="item.name"
                    :value="item.name"
                    style="height: auto">
                    <span style="float: left">{{ item.name }}</span>
                    <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
                  </el-option>
                </el-select>
              </el-row>

              <div id="subInfoBut" class="greenBut">
                <el-button style="width: 150px" @click="confirmEdition">{{$t('login.confirm')}}</el-button>
              </div>
            </el-dialog>
          </el-row>

        </div>
      </el-col>
    </el-row>
  </div>

</template>

<script>
  import axios from 'axios'
  const startDate = new Date();
  const endDate = new Date();

  export default {
    name: "DepartmentManager",

    components: {},
    data() {
      return {
        uid:"",
        department:"",

        editDepartmentVisible:false,
        editExtraWorkRule:"",
        editClockInRule:"",
        editNoonBreakRule:"",
        clockInRuleOption:[],
        extraWorkRuleOption:[],
        noonBreakRuleOption:[],
        editId:"",
        chargerName:"",

        total:0,
        currentPageNum:1,
        searchInfo: [new Date(startDate.setDate(startDate.getDate() - 7)), endDate],
        records: [],

        allOptionsStaff: [],
        checkedStaffOptions:[],

        showCheckedOptions: [
          {name: this.$t('clockInManagement.totalWorkHours'), value: "", key: "totalWorkHours"},
          {name: this.$t('clockInManagement.staffName'), value: "", key: "name"},
          {name: this.$t('clockInManagement.position'), value: "", key: "position"},
          {name: this.$t('clockInManagement.uid'), value: "", key: "uid"},
          {name: this.$t('clockInManagement.totalWorkDate'), value: "", key: "totalWorkDate"},
          {name: this.$t('clockInManagement.totalMissClock'), value: "", key: "totalMissClock"},
        ],
        allOptions: [
          {name: this.$t('clockInManagement.uid'), value: "", key: "uid"},
          {name: this.$t('clockInManagement.totalWorkDate'), value: "", key: "totalWorkDate"},
          {name: this.$t('clockInManagement.totalMissClock'), value: "", key: "totalMissClock"},
          {name: this.$t('clockInManagement.totalLate'), value: "", key: "totalLate"},
          {name: this.$t('clockInManagement.totalEarly'), value: "", key: "totalEarly"},
          {name: this.$t('clockInManagement.totalSupposeWorkHour'), value: "", key: "totalSupposeWorkHour"},
          {name: this.$t('clockInManagement.totalWorkHours'), value: "", key: "totalWorkHours"},
          {name: this.$t('clockInManagement.totalExtraWorkHour'), value: "", key: "totalExtraWorkHour"},
          {name: this.$t('clockInManagement.totalChangeDayOff'), value: "", key: "totalChangeDayOff"},
          {name: this.$t('clockInManagement.totalAnnualDayOff'), value: "", key: "totalAnnualDayOff"},
          {name: this.$t('clockInManagement.totalMissHour'), value: "", key: "totalMissHour"},
          {name: this.$t('clockInManagement.totalCountedExtraWork'), value: "", key: "totalCountedExtraWork"},
          {name: this.$t('clockInManagement.totalExchangeMoneyHour'), value: "", key: "totalExchangeMoneyHour"},
          {name: this.$t('clockInManagement.totalExchangeChangeDayOffHour'), value: "", key: "totalExchangeChangeDayOffHour"},
          {name: this.$t('clockInManagement.totalExchangeHolidayMoneyHour'), value: "", key: "totalExchangeHolidayMoneyHour"},
          {name: this.$t('clockInManagement.missInTotal'), value: "", key: "missInTotal"},
          {name: this.$t('clockInManagement.lateInTotal'), value: "", key: "lateInTotal"},
          {name: this.$t('clockInManagement.totalWorkInSuppose'), value: "", key: "totalWorkInSuppose"},
          {name: this.$t('clockInManagement.changeInSuppose'), value: "", key: "changeInSuppose"},
          {name: this.$t('clockInManagement.missInSuppose'), value: "", key: "missInSuppose"},
          {name: this.$t('clockInManagement.moneyInExtra'), value: "", key: "moneyInExtra"},
          {name: this.$t('clockInManagement.holidayMoneyInExtra'), value: "", key: "holidayMoneyInExtra"},
          {name: this.$t('clockInManagement.changeInExtra'), value: "", key: "changeInExtra"},
        ],
        checkedOptions: ["name", "position", "uid", "totalWorkDate", "totalMissClock", "totalWorkHours"],
        departmentId:"All",
      }
    },

    mounted() {
      this.verify();
    },
    methods: {
      verify: function () {
        axios
          .get('/api/advanceVerify')
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
              this.department = response.data.data[0].department_id;
              this.departmentId = this.department;

              this.getAllOptions();
              this.getAllRecords();
              this.getDepartmentRules();
              this.showExtraWorkRule();
              this.showClockInRule();
              this.showNoonBreakRule();
            } else {
              // 获取失败
              alert(this.$t('header.getLoginInfoFail'));
            }

          })
      },
      handleSelect: function () {
        this.showCheckedOptions = [];
        this.checkedStaffOptions = [];
        let selectedSize = this.checkedOptions.length;
        let allSize = this.allOptions.length;
        for (let i = 0; i < selectedSize; i++) {
          for (let j = 0; j < allSize; j++) {
            if (this.checkedOptions[i] === this.allOptions[j].key) {
              this.showCheckedOptions.push(this.allOptions[j]);
            }
          }
        }

        // let allSize2 = this.allOptionsStaff.length;
        // for (let i = 0; i < selectedSize; i++) {
        //   for (let j = 0; j < allSize2; j++) {
        //     if (this.checkedOptions[i] === this.allOptionsStaff[j].key) {
        //       this.checkedStaffOptions.push(this.allOptions[j]);
        //     }
        //   }
        // }
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

        // 获取总记录数
        let pageInfo = new URLSearchParams;
        pageInfo.append("departmentId", String(this.departmentId));
        axios
          .post('/api/clockInInfo/managerCountStatistic', pageInfo)
          .then(response => {
            if (response.data.status === 200) {
              this.total = response.data.data;
            } else {
              // 获取失败
              alert(this.$t('header.getPageNumberFail'));
            }
          })


        let info = new URLSearchParams;
        info.append("departmentId", String(this.departmentId));
        info.append("startDate", String(startYear + "-" + startMonth + "-" + startDay));
        info.append("endDate", String(endYear + "-" + endMonth + "-" + endDay));
        info.append("pageNum", String(this.currentPageNum));
        info.append("pageMax", String("12"));

        axios
          .post('/api/clockInInfo/DepartmentManagerGetStatistic', info)
          .then(response => {
            if (response.data.status === 200) {
              // console.log(response.data.data)
              let dataList = response.data.data;
              let size = dataList.length;
              for (let i = 0; i < size; i++) {
                this.records.push(dataList[i]);
              }
            } else {
              // 获取失败
              alert(this.$t('clockInManagement.getManagerStatisticFail'));
            }
          })
      },
      getAllOptions: function () {
        axios
          .get('/api/staff/getColumn')
          .then(response => {
            if (response.data.status === 200) {
              let options = response.data.data;
              // console.log(options);
              let size = options.length;
              for (let i = 0; i < size; i++) {
                this.allOptions.push({key: options[i].name, name: options[i].value, value:""});
                // this.allOptionsStaff.push({key: options[i].name, name: options[i].value, value:""});
              }
            } else {
              // 获取失败
              alert(this.$t('staffManagement.getAllOptionsFail'));
            }

          })
      },
      handlePageChange:function () {
        this.getAllRecords();
      },
      confirmEdition:function () {
        let data = {};
        data.work_time_schedule_id = this.editClockInRule;
        data.extra_work_time_schedule_id = this.editExtraWorkRule;
        data.charger_name = this.chargerName;
        let info = new URLSearchParams;
        info.append("id", String(this.editId));
        info.append("info", JSON.stringify(data));
        axios
          .post('/api/advance/changeDepartment', info)
          .then(response => {
            if (response.data.status === 200) {
              alert(this.$t('departmentManagement.changeDepartmentSuccess'));
              this.editDepartmentVisible = false;
              this.getDepartmentRules();
            } else {
              // 获取失败
              alert(this.$t('departmentManagement.changeDepartmentFail'));
            }
          })
      },
      showClockInRule: function () {
        this.clockInRuleOption = [];
        axios
          .get('/api/advance/getAllClockInRule')
          .then(response => {
            if (response.data.status === 200) {
              let dataList = response.data.data;
              let size = dataList.length;
              for (let i = 0; i < size; i++) {
                dataList[i].index = i;
                this.clockInRuleOption.push({
                  name: dataList[i].workTimeScheduleId,
                  value: dataList[i].startWork + "-" + dataList[i].endWork
                })
              }
            } else {
              // 获取失败
              alert(this.$t('departmentManagement.getClockInRuleFail'));
            }
          });
      },
      showExtraWorkRule: function () {
        this.extraWorkRuleOption = [];
        axios
          .get('/api/advance/getAllExtraWorkRule')
          .then(response => {
            if (response.data.status === 200) {
              let dataList = response.data.data;
              let size = dataList.length;
              for (let i = 0; i < size; i++) {
                dataList[i].index = i;
                this.extraWorkRuleOption.push({
                  name: dataList[i].extraWorkTimeScheduleId,
                  value: dataList[i].startWork + "-" + dataList[i].endWork
                });
              }
            } else {
              // 获取失败
              alert(this.$t('departmentManagement.getExtraWorkRuleFail'));
            }
          });
      },
      showNoonBreakRule: function () {
        this.noonBreakRuleOption = [];
        axios
          .get('/api/advance/getAllNoonBreakRule')
          .then(response => {
            if (response.data.status === 200) {
              let dataList = response.data.data;
              let size = dataList.length;
              for (let i = 0; i < size; i++) {
                dataList[i].index = i;
                this.noonBreakRuleOption.push({
                  name: dataList[i].noonBreakId,
                  value: dataList[i].startTime + "-" + dataList[i].endTime
                })
              }
            } else {
              // 获取失败
              alert(this.$t('noonBreak.getNoonBreakRuleFail'));
            }
          });
      },
      getDepartmentRules:function () {
        let info = new URLSearchParams;
        info.append("targetColumns", String("work_time_schedule_id,extra_work_time_schedule_id,id,charger_name,noon_break_id"));
        info.append("formName", String("department"));
        info.append("cond", String("department_id,=,"+this.department));
        info.append("searchType", String("0"));
        info.append("separate", String("AND"));
        info.append("pageNum", String("1"));
        info.append("pageMax", String(10));

        axios
          .post('/api/general/row/get', info)
          .then(response => {
            if (response.data.status === 200) {
              let dataList = response.data.data;
              this.editClockInRule = dataList[0].work_time_schedule_id;
              this.editExtraWorkRule = dataList[0].extra_work_time_schedule_id;
              this.editNoonBreakRule = dataList[0].noon_break_id;
              this.editId = dataList[0].id;
              this.chargerName =dataList[0].charger_name;
            } else {
              // 获取失败
              alert(this.$t('departmentManagement.getDepartmentInfoFail'));
            }
          })
      }
    }
  }

</script>

<style scoped>

  #choosePage{
    z-index: 5;
    position: absolute;
    left: 350px;
    top: 937px;
  }

  #total {
    height: 1000px
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

  #table {
    position: absolute;
    top: 220px;
    width: 935px;
    height: 700px;
    padding: 2px;
  }

  #checkOptions {
    position: absolute;
    left: 20px;
    top: 20px;
    width: 900px;
    height: 120px;
  }

  #searchInput2 {
    position: absolute;
    top: 160px;
    left: 720px;
    width: 200px;
  }

  #editSelectClockInRule {
    position: absolute;
    left: 90px;
    top: 94px;
  }

  #editSelectExtraWorkRule {
    position: absolute;
    left: 90px;
    top: 154px;
  }

  #editClockInRuleSelector {
    position: absolute;
    left: 190px;
    top: 84px;
  }

  #editExtraWorkRuleSelector {
    position: absolute;
    left: 190px;
    top: 144px;
  }

  #editSelectNoonBreakRule{
    position: absolute;
    left: 90px;
    top: 214px;
  }

  #editNoonBreakRuleSelector {
    position: absolute;
    left: 190px;
    top: 204px;
  }

  #subInfoBut{
    position: absolute;
    left: 175px;
    top: 284px;
  }
</style>

<style>
  .greenBut .el-button {
    background-color: #b3da4f !important;
  }

  .greenBut .el-button:hover {
    background-color: #b3da4f !important;
    color: aliceblue;
  }

  .managerDepartmentManage .el-dialog {
    height: 360px !important;
    width: 500px !important;
  }

  .checkBox .el-checkbox__input.is-checked .el-checkbox__inner {
    background-color: #5daf34 !important;
    border: #5daf34;
  }

  .el-scrollbar__wrap {
    overflow-x: hidden;
  }

  .checkBox .el-checkbox__inner:hover {
    background-color: #adc46a;
    border: #5daf34;
  }

</style>
