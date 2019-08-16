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

          <el-row id="searchLabel2">
            <svg width="80" height="30" viewBox="0 0 80 30">
              <text font-family="'Helvetica Neue','PingFang SC','microsoft yahei'" fill="#737470" font-size="15"
                    x="0"
                    y="1em">
                {{$t('clockInManagement.chooseDepartment')}}
              </text>
            </svg>
          </el-row>

          <el-row id="searchInput2">
            <el-select v-model="departmentId" :placeholder="$t('ExtraWorkApply.pleaseSelect')" @change="getAllRecords">
              <el-option
                v-for="item in departmentOptions"
                :key="item.key"
                :label="item.name"
                :value="item.key">
              </el-option>
            </el-select>
          </el-row>

          <el-row class="outBut" id="button3">
            <el-button style="width: 100px">
              <p style="margin: 0; color: #FFFFFF">{{$t('statistic.fileOut')}}</p>
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
                min-width="240px"
              >
              </el-table-column>
            </div>

          </el-table>
        </el-row>

      </el-col>
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
    </el-row>
  </div>

</template>

<script>
  import axios from 'axios'

  const startDate = new Date();
  const endDate = new Date();
  export default {
    name: "ClockInManagement",

    components: {},
    data() {
      return {
        total:0,
        currentPageNum:1,
        account: "",
        name: "name",
        position: "position",
        work_id: "work_id",
        uid: "",
        searchInfo: [new Date(startDate.setDate(startDate.getDate() - 7)), endDate],
        records: [],
        showCheckedOptions: [
          {name: this.$t('clockInManagement.totalWorkHours'), value: "", key: "totalWorkHours"},
          {name: this.$t('clockInManagement.staffName'), value: "", key: "name"},
          {name: this.$t('clockInManagement.position'), value: "", key: "position"},
          {name: this.$t('clockInManagement.uid'), value: "", key: "uid"},
          {name: this.$t('clockInManagement.totalWorkDate'), value: "", key: "totalWorkDate"},
          {name: this.$t('clockInManagement.totalMissClock'), value: "", key: "totalMissClock"},
        ],
        allOptions: [
          {name: this.$t('clockInManagement.staffName'), value: "", key: "name"},
          {name: this.$t('clockInManagement.manager'), value: "", key: "manager"},
          {name: this.$t('clockInManagement.departmentId'), value: "", key: "departmentId"},
          {name: this.$t('clockInManagement.position'), value: "", key: "position"},
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
        departmentOptions:[],
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
          .get('/api/advanceVerify')
          .then(response => {
            if (response.data.status === 200) {
              // 登录过了，返回值为当前用户uid
              this.uid = response.data.data;
              // 开始加载用户界面信息
              this.getLoginInUserInfo();
              this.getAllRecords();
              this.getDepartmentOptions();
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
          .post('/api/clockInInfo/managerGetStatistic', info)
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
      getDepartmentOptions:function () {
        axios
          .get('/api/advance/getDepartmentOptions',)
          .then(response => {
            if (response.data.status === 200) {
              // 获取成功
              let dataList = response.data.data;
              let size = dataList.length;
              for (let i = 0; i < size; i++) {
                this.departmentOptions.push({name:dataList[i].name,key:dataList[i].department_id})
              }
              this.departmentOptions.push({name:this.$t('myApply.All'),key:"All"})
            } else {
              // 获取失败
              alert(this.$t('clockInManagement.getDepartmentOptionsFail'));
            }

          })
      },
      handlePageChange:function () {
        this.getAllRecords();
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

  #searchLabel2 {
    position: absolute;
    top: 170px;
    left: 649px;
  }

  #searchInput2 {
    position: absolute;
    top: 160px;
    left: 720px;
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

  .checkBox .el-scrollbar_bar .is-horizontal {
    /*display: none;*/
    height:0 !important
  }
</style>
