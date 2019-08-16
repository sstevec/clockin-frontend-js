<template>
  <div>
    <el-row id="total">
      <el-col>
        <div id="content">

          <el-row id="searchLabel">
            <svg width="80" height="30" viewBox="0 0 80 30">
              <text font-family="'Helvetica Neue','PingFang SC','microsoft yahei'" fill="#737470" font-size="15"
                    x="0"
                    y="1em">
                {{$t('holidayManagement.timePeriod')}}
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
              @blur="getAllHoliday"
              style="width: 300px;">
            </el-date-picker>
          </el-row>

          <el-row id="searchLabel2">
            <svg width="80" height="30" viewBox="0 0 80 30">
              <text font-family="'Helvetica Neue','PingFang SC','microsoft yahei'" fill="#737470" font-size="15"
                    x="0"
                    y="1em">
                {{$t('departmentManagement.advanceSearch')}}
              </text>
            </svg>
          </el-row>

          <el-row id="searchInput2">
            <el-input
              :placeholder="$t('header.pleaseEnter')"
              v-model="blurSearchInfo"
              clearable
              @blur="getAllHoliday"
              maxlength="20">
            </el-input>
          </el-row>

          <el-row class="addBut" id="button1">
            <el-button style="width: 100px" @click="dialogFormVisible = true">
              <p style="margin: 0; color: #FFFFFF">{{$t('holidayManagement.addHoliday')}}</p>
            </el-button>
          </el-row>

          <el-row class="addBut" id="button2">
            <el-button style="width: 100px" @click="showManageDialog">
              <p style="margin: 0; color: #FFFFFF">{{$t('dayOffType.manageDayOffType')}}</p>
            </el-button>
          </el-row>

        </div>
      </el-col>
    </el-row>


    <el-row id="table" class="tab">
      <el-table
        border
        :data="holidayInfo"
        style="width: 100%">
        <div v-for="item in holidayLabel">
          <el-table-column
            sortable
            :show-overflow-tooltip="true"
            :label="item.name"
            :key="item.key"
            :prop="item.key"
          >
          </el-table-column>
        </div>


        <el-table-column
          :label="$t('departmentManagement.operation')"
          prop="type">
          <template slot-scope="scope">
            <div class="showDialogFather">
              <el-button @click="editInfo(scope.row.index)" icon="el-icon-edit" style="width:40px;height: 20px">
              </el-button>
              <span></span>
              <el-button @click="deleteHoliday(scope.row.index)" icon="el-icon-delete" style="width:40px;height: 20px">
              </el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>

      <el-row id="detailInfoTable" class="addHoliday">
        <el-dialog :title="$t('holidayManagement.addHoliday')" :visible.sync="dialogFormVisible">

          <svg id="addFormTimePickerLabel" width="120" height="80" viewBox="0 0 120 80">
            <text font-family="'Helvetica Neue','PingFang SC','microsoft yahei'" fill="#737470" font-size="15"
                  x="0"
                  y="1em">
              {{$t('holidayManagement.chooseTime')}}
            </text>
          </svg>

          <el-row id="addFormTimePicker">
            <el-date-picker
              v-model="detailInfo[0].value"
              type="daterange"
              :range-separator="$t('holidayManagement.to')"
              :start-placeholder="$t('statistic.startDate')"
              :end-placeholder="$t('statistic.endDate')"
              @blur="getAllHoliday"
              style="width: 270px;height: 40px">
            </el-date-picker>
          </el-row>

          <el-row id="formContentLabel">
            <svg width="300" height="57" viewBox="0 0 300 57">
              <text font-family="'Helvetica Neue','PingFang SC','microsoft yahei'" fill="#737470" font-size="15"
                    x="0"
                    y="1em">
                {{this.detailInfo[1].name}}
              </text>
            </svg>
          </el-row>

          <el-row id="formContent">
            <el-row style="height: 61px">
              <el-input
                :placeholder="$t('header.pleaseEnter')"
                v-model="detailInfo[1].value"
                clearable
                maxlength="20"
                style="width: 270px;">
              </el-input>
            </el-row>
          </el-row>

          <el-row id="formContentLabel2">
            <svg width="300" height="57" viewBox="0 0 300 57">
              <text font-family="'Helvetica Neue','PingFang SC','microsoft yahei'" fill="#737470" font-size="15"
                    x="0"
                    y="1em">
                {{this.detailInfo[2].name}}
              </text>
            </svg>
          </el-row>

          <el-row id="formContent2">
            <el-select v-model="detailInfo[2].value" multiple :placeholder="$t('ExtraWorkApply.pleaseSelect')">
              <el-option
                v-for="item in dayOffOptions"
                :key="item.dayOffType"
                :label="item.dayOffType"
                :value="item.dayOffType">
              </el-option>
            </el-select>
          </el-row>

          <div id="subInfoBut" class="but2">
            <el-button style="width: 150px" @click="addHoliday">{{$t('dayOffType.addHoliday')}}</el-button>
          </div>
        </el-dialog>
      </el-row>


      <el-row class="editHoliday">
        <el-dialog :title="$t('holidayManagement.changeHoliday')" :visible.sync="editVisible">

          <svg id="editFormTimePickerLabel" width="120" height="80" viewBox="0 0 120 80">
            <text font-family="'Helvetica Neue','PingFang SC','microsoft yahei'" fill="#737470" font-size="15"
                  x="0"
                  y="1em">
              {{$t('holidayManagement.pleaseSelectDate')}}
            </text>
          </svg>

          <el-row id="editFormTimePicker">
            <el-date-picker
              v-model="editDetail[0].value"
              type="date"
              :placeholder="$t('myApply.pleaseSelectDate')">
            </el-date-picker>
          </el-row>

          <el-row id="editFormContentLabel">
            <el-row>
              <svg width="300" height="57" viewBox="0 0 300 57">
                <text font-family="'Helvetica Neue','PingFang SC','microsoft yahei'" fill="#737470" font-size="15"
                      x="0"
                      y="1em">
                  {{this.editDetail[1].name}}
                </text>
              </svg>
            </el-row>
          </el-row>

          <el-row id="editFormContent">
            <el-row style="height: 61px">
              <el-input
                :placeholder="$t('header.pleaseEnter')"
                v-model="editDetail[1].value"
                clearable
                maxlength="20"
                style="width: 220px;">
              </el-input>
            </el-row>
          </el-row>

          <el-row id="editFormContentLabel2">
            <svg width="300" height="57" viewBox="0 0 300 57">
              <text font-family="'Helvetica Neue','PingFang SC','microsoft yahei'" fill="#737470" font-size="15"
                    x="0"
                    y="1em">
                {{this.editDetail[2].name}}
              </text>
            </svg>
          </el-row>

          <el-row id="editFormContent2">
            <el-select v-model="editDetail[2].value" multiple :placeholder="$t('ExtraWorkApply.pleaseSelect')">
              <el-option
                v-for="item in dayOffOptions"
                :key="item.dayOffType"
                :label="item.dayOffType"
                :value="item.dayOffType">
              </el-option>
            </el-select>
          </el-row>

          <div id="editSubInfoBut" class="but2">
            <el-button style="width: 150px" @click="confirmEdition">{{$t('login.confirm')}}</el-button>
          </div>
        </el-dialog>
      </el-row>

      <el-row id="choosePage">
        <el-pagination
          :current-page.sync="currentPageNum"
          :page-size="10"
          :total="total"
          @current-change="handlePageChange"
          layout="prev,next, jumper"
        >
        </el-pagination>
      </el-row>

      <el-row class="manageHolidayType">
        <el-dialog :title="$t('dayOffType.title')" :visible.sync="dayOffTypeVisible">

          <el-row id="dayOffTypeTable" class="tab" >
            <el-table
              border
              :data="dayOffOptions"
              height="500"
              style="width: 100%;">
              <div v-for="item in dayOffOptionsLabel">
                <el-table-column
                  sortable
                  :show-overflow-tooltip="true"
                  :label="item.name"
                  :key="item.key"
                  :prop="item.key"
                >
                </el-table-column>
              </div>

              <el-table-column
                :label="$t('departmentManagement.operation')"
                prop="type">
                <template slot-scope="scope">
                  <div class="showDialogFather">
                    <el-button @click="editDayOffType(scope.row.index)" icon="el-icon-edit" style="width:40px;height: 20px">
                    </el-button>
                    <span></span>
                    <el-button @click="deleteDayOffType(scope.row.index)" icon="el-icon-delete" style="width:40px;height: 20px">
                    </el-button>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </el-row>

          <div id="addDayOffTypeBut" class="but2">
            <el-button style="width: 150px" @click="openAdd">{{$t('dayOffType.addBut')}}</el-button>
          </div>
        </el-dialog>
      </el-row>

      <el-row class="editDayOffType">
        <el-dialog :title="$t('dayOffType.addBut')" :visible.sync="addDayOffTypeVisible">

          <svg id="addNumberLabel" width="120" height="80" viewBox="0 0 120 80">
            <text font-family="'Helvetica Neue','PingFang SC','microsoft yahei'" fill="#737470" font-size="15"
                  x="0"
                  y="1em">
              {{$t('dayOffType.dayOffTypeNumber')}}
            </text>
          </svg>

          <svg id="addDescriptionLabel" width="120" height="80" viewBox="0 0 120 80">
            <text font-family="'Helvetica Neue','PingFang SC','microsoft yahei'" fill="#737470" font-size="15"
                  x="0"
                  y="1em">
              {{$t('dayOffType.dayOffTypeDescription')}}
            </text>
          </svg>

          <el-row id="addDayOffTypeId">
            <el-input v-model="addDayOffDetail[0].value" :placeholder="$t('header.pleaseEnter')" maxlength="10"></el-input>
          </el-row>

          <el-row id="addDescription">
            <el-input v-model="addDayOffDetail[1].value" :placeholder="$t('header.pleaseEnter')" maxlength="100"></el-input>
          </el-row>

          <div id="addDayOffSubBut" class="but2">
            <el-button style="width: 150px" @click="addDayOff">{{$t('login.confirm')}}</el-button>
          </div>
        </el-dialog>
      </el-row>

      <el-row class="editDayOffType">
        <el-dialog :title="$t('dayOffType.editDayOffType')" :visible.sync="editDayOffTypeVisible">

          <svg id="editDayOffTypeIdLabel" width="120" height="80" viewBox="0 0 120 80">
            <text font-family="'Helvetica Neue','PingFang SC','microsoft yahei'" fill="#737470" font-size="15"
                  x="0"
                  y="1em">
              {{$t('dayOffType.dayOffTypeNumber')}}
            </text>
          </svg>

          <svg id="editDayOffTypeDescriptionLabel" width="120" height="80" viewBox="0 0 120 80">
            <text font-family="'Helvetica Neue','PingFang SC','microsoft yahei'" fill="#737470" font-size="15"
                  x="0"
                  y="1em">
              {{$t('dayOffType.dayOffTypeDescription')}}
            </text>
          </svg>

          <el-row id="editDayOffTypeId">
            <el-input v-model="editDayOffTypeDetail[0].value" :placeholder="$t('header.pleaseEnter')" maxlength="10"></el-input>
          </el-row>

          <el-row id="editDayOffTypeDescription">
            <el-input v-model="editDayOffTypeDetail[1].value" :placeholder="$t('header.pleaseEnter')" maxlength="100"></el-input>
          </el-row>

          <div id="editDayOffTypeSubBut" class="but2">
            <el-button style="width: 150px" @click="confirmEditDayOffType">{{$t('login.confirm')}}</el-button>
          </div>
        </el-dialog>
      </el-row>

    </el-row>
  </div>

</template>

<script>
  import axios from 'axios'
  const startDate = new Date();
  const endDate = new Date();
  export default {
    name: "HolidayManagement",

    components: {},
    data() {
      return {
        dayOffTypeVisible:false,
        addDayOffTypeVisible:false,
        editDayOffTypeVisible:false,
        total:0,
        currentPageNum:1,
        account: "",
        name: "name",
        position: "position",
        work_id: "work_id",
        uid: "",
        searchInfo: [startDate, new Date(endDate.setDate(endDate.getDate() + 7))],
        blurSearchInfo: "",
        holidayLabel: [
          {name: this.$t('holidayManagement.updatedTime'), value: "", key: "updated"},
          {name: this.$t('statistic.date'), value: "", key: "date"},
          {name: this.$t('holidayManagement.holidayName'), value: "", key: "name"},
          {name: this.$t('holidayManagement.dayOffTargets'), value: "", key: "dayOffTypes"},
          {name: this.$t('departmentManagement.createdTime'), value: "", key: "created"},
        ],
        holidayInfo: [],
        dialogFormVisible: false,
        editVisible: false,
        detailInfo: [
          {name: this.$t('statistic.date'), value: "", key: "date"},
          {name: this.$t('holidayManagement.holidayName'), value: "", key: "name"},
          {name: this.$t('holidayManagement.dayOffTargets'), value: "", key: "dayOffTypes"},
        ],
        editDetail: [
          {name: this.$t('statistic.date'), value: "", key: "date"},
          {name: this.$t('holidayManagement.holidayName'), value: "", key: "name"},
          {name: this.$t('holidayManagement.dayOffTargets'), value: "", key: "dayOffTypes"},
        ],
        dayOffOptions: [],
        dayOffOptionsLabel:[
          {name: this.$t('holidayManagement.updatedTime'), value: "", key: "updated"},
          {name: this.$t('dayOffType.offName'), value: "", key: "dayOffType"},
          {name: this.$t('dayOffType.dayOffTypeDescription'), value: "", key: "description"},
          {name: this.$t('departmentManagement.createdTime'), value: "", key: "created"},
        ],
        editId:"",
        addDayOffDetail:[{name:"dayOffTypeId",value:""},{name:"description",value:""}],
        editDayOffTypeDetail:[{name:"dayOffTypeId",value:""},{name:"description",value:""},{name:"id",value:""}],
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
              this.getAllHoliday();
              this.showManageDialog();
              this.dayOffTypeVisible = false;
            } else {
              // 获取失败
              alert(this.$t('header.getLoginInfoFail'));
            }

          })
      },
      handleDelete: function (index, rowData) {

      },
      getAllHoliday: function () {
        let pattern = /[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]/im;
        if (pattern.test(this.blurSearchInfo)) {
          alert( this.$t('holidayManagement.searchInfoContainIllegalChar'));
          this.blurSearchInfo = "";
          return;
        }
        this.holidayInfo = [];
        if (this.searchInfo === null || this.searchInfo === "" || this.searchInfo === []|| this.searchInfo.length === 0) {
          return;
        }
        let startYear = this.searchInfo[0].getFullYear();
        let startMonth = this.searchInfo[0].getMonth() + 1;
        let startDay = this.searchInfo[0].getDate();
        //console.log(startYear,startMonth,startDay,startHour,startMinute);
        let endYear = this.searchInfo[1].getFullYear();
        let endMonth = this.searchInfo[1].getMonth() + 1;
        let endDay = this.searchInfo[1].getDate();

        // 获取总页数
        let pageInfo = new URLSearchParams;
        pageInfo.append("startDate", String(startYear + "-" + startMonth + "-" + startDay));
        pageInfo.append("endDate", String(endYear + "-" + endMonth + "-" + endDay));
        pageInfo.append("searchInfo", String(this.blurSearchInfo));
        axios
          .post('/api/advance/countHoliday', pageInfo)
          .then(response => {
            if (response.data.status === 200) {
              // console.log(response.data.data)
              this.total = response.data.data
            } else {
              // 获取失败
              alert(this.$t('header.getPageNumberFail'));
            }
          });

        let info = new URLSearchParams;
        info.append("startDate", String(startYear + "-" + startMonth + "-" + startDay));
        info.append("endDate", String(endYear + "-" + endMonth + "-" + endDay));
        info.append("searchInfo", String(this.blurSearchInfo));
        info.append("pageNum", String(this.currentPageNum));
        info.append("pageMax", String("13"));
        axios
          .post('/api/advance/getHolidayByCond', info)
          .then(response => {
            if (response.data.status === 200) {
              // 获取成功
              let holidayInfo = response.data.data;
              let size = holidayInfo.length;
              for (let i = 0; i < size; i++) {
                holidayInfo[i].index = i;
                this.holidayInfo.push(holidayInfo[i]);
              }
            } else {
              // 获取失败
              alert( this.$t('holidayManagement.getHolidayFail'));
            }

          })
      },

      editInfo: function (index) {
        let dayOffInfo = this.holidayInfo[index];
        this.editDetail[0].value = dayOffInfo.date;
        this.editDetail[1].value = dayOffInfo.name;
        this.editDetail[2].value = dayOffInfo.dayOffTypes.split(",");
        this.editId = dayOffInfo.id;
        this.editVisible = true;
      },
      confirmEdition: function () {
        let size = this.editDetail.length;
        let data = {};
        for (let i = 0; i < size-1; i++) {
          data[this.editDetail[i].key] = this.editDetail[i].value
        }
        let offTarget = "";
        let offList = this.editDetail[size-1].value;
        let offTypeSize = offList.length;
        for(let i = 0; i<offTypeSize; i++){
          if(i === offTypeSize-1){
            offTarget = offTarget + offList[i];
          }else{
            offTarget = offTarget + offList[i]+",";
          }
        }
        data.day_off_types = offTarget;
        let info = new URLSearchParams;
        info.append("formName", String("holiday_form"));
        info.append("info", JSON.stringify(data));
        info.append("id", String(this.editId));
        axios
          .post('/api/general/row/change', info)
          .then(response => {
            if (response.data.status === 200) {
              alert( this.$t('holidayManagement.changeHolidaySuccess'));
              this.getAllHoliday();
            } else {
              // 获取失败
              alert( this.$t('holidayManagement.changeHolidayFail'));
            }
          })
      },
      addHoliday: function () {
        let holidayTime = this.detailInfo[0].value;
        if (holidayTime.length === 0) {
          alert( this.$t('holidayManagement.needHolidayTime'));
          return;
        }
        if(this.detailInfo[1].value === ""){
          alert( this.$t('holidayManagement.needHolidayName'));
          return;
        }
        if(this.detailInfo[2].value.length === 0){
          alert( this.$t('holidayManagement.needHolidayTarget'));
          return;
        }
        let startYear = holidayTime[0].getFullYear();
        let startMonth = holidayTime[0].getMonth() + 1;
        let startDay = holidayTime[0].getDate();
        //console.log(startYear,startMonth,startDay,startHour,startMinute);
        let endYear = holidayTime[1].getFullYear();
        let endMonth = holidayTime[1].getMonth() + 1;
        let endDay = holidayTime[1].getDate();

        let offTarget = "";
        let targetSize = this.detailInfo[2].value.length;
        for(let i = 0; i<targetSize; i++){
          if(i === targetSize -1 ){
            offTarget = offTarget + this.detailInfo[2].value[i];
          }else{
            offTarget = offTarget + this.detailInfo[2].value[i] + ",";
          }
        }

        let info = new URLSearchParams;
        info.append("startDate", String(startYear + "-" + startMonth + "-" + startDay));
        info.append("endDate", String(endYear + "-" + endMonth + "-" + endDay));
        info.append("name", String(this.detailInfo[1].value));
        info.append("dayOffTarget", String(offTarget));
        axios
          .post('/api/advance/addHoliday', info)
          .then(response => {
            if (response.data.status === 200) {
              // 获取成功
              alert( this.$t('holidayManagement.addHolidaySuccess'));
              this.getAllHoliday();
              this.detailInfo[0].value = "";
              this.detailInfo[1].value = "";
              this.detailInfo[2].value = "";
            } else {
              // 获取失败
              alert( this.$t('holidayManagement.addHolidayFail'));
            }

          });
        this.dialogFormVisible = false;
      },
      deleteHoliday: function (index) {
        this.$confirm( this.$t('holidayManagement.thisOperationWouldDeleteHoliday'),  this.$t('statistic.notice'), {
          confirmButtonText:  this.$t('login.confirm'),
          cancelButtonText:  this.$t('header.cancel'),
          type: 'warning'
        }).then(() => {
        let info = new URLSearchParams;
        info.append("formName", String("holiday_form"));
        info.append("id", String(this.holidayInfo[index].id));

        axios
          .post('/api/general/row/delete', info)
          .then(response => {
            if (response.data.status === 200) {
              // 获取成功
              alert( this.$t('holidayManagement.deleteHolidaySuccess'));
              this.getAllHoliday();
            } else {
              // 获取失败
              alert( this.$t('holidayManagement.deleteHolidayFail'));
            }

          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message:  this.$t('holidayManagement.deleteCanceled')
          });
        });
      },
      handlePageChange:function () {
        this.getAllHoliday();
      },
      showManageDialog:function(){
        this.dayOffOptions = [];
        axios
          .get('/api/advance/getDayOffOptions')
          .then(response => {
            if (response.data.status === 200) {
              // 获取成功
              let tempData = response.data.data;
              let size = tempData.length;
              for(let i = 0; i<size; i++){
                tempData[i].index = i;
                this.dayOffOptions.push(tempData[i])
              }
            } else {
              // 获取失败
              alert( this.$t('dayOffType.getDayOffOptionsFail'));
            }

          });
        this.dayOffTypeVisible = true;
      },
      editDayOffType:function (index) {
        this.editDayOffTypeDetail[0].value = this.dayOffOptions[index].dayOffType;
        this.editDayOffTypeDetail[1].value = this.dayOffOptions[index].description;
        this.editDayOffTypeDetail[2].value = this.dayOffOptions[index].id;
        this.editDayOffTypeVisible = true;
      },
      deleteDayOffType:function (index) {
        this.$confirm( this.$t('dayOffType.thisOperationWouldDeleteDayOffType'),  this.$t('statistic.notice'), {
          confirmButtonText:  this.$t('login.confirm'),
          cancelButtonText:  this.$t('header.cancel'),
          type: 'warning'
        }).then(() => {
          let info = new URLSearchParams;
          info.append("dayOffType", String(this.dayOffOptions[index].dayOffType));

          axios
            .post('/api/advance/deleteDayOffType', info)
            .then(response => {
              if (response.data.status === 200) {
                // 获取成功
                alert( this.$t('dayOffType.deleteDayOffTypeSuccess'));
                this.showManageDialog();
              } else {
                // 获取失败
                alert( this.$t('dayOffType.deleteDayOffTypeFail'));
              }

            });
        }).catch(() => {
          this.$message({
            type: 'info',
            message:  this.$t('holidayManagement.deleteCanceled')
          });
        });
      },
      addDayOff:function () {
        let pattern = /[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]/im;
        if (pattern.test(this.addDayOffDetail[0].value)) {
          alert( this.$t('dayOffType.containIllegalChar'));
          this.addDayOffDetail[0].value = "";
          return;
        }
        if(this.addDayOffDetail[0].value === null || this.addDayOffDetail[0].value === ""){
          alert(this.$t('dayOffType.pleaseEnterDayOffTypeName'));
          return;
        }
        let info = new URLSearchParams;
        info.append("dayOffType", String(this.addDayOffDetail[0].value));
        info.append("description", String(this.addDayOffDetail[1].value));

        axios
          .post('/api/advance/addDayOffType', info)
          .then(response => {
            if (response.data.status === 200) {
              // 获取成功
              alert( this.$t('dayOffType.addDayOffTypeSuccess'));
              this.showManageDialog();
              this.addDayOffTypeVisible = false;
            } else {
              // 获取失败
              alert( this.$t('dayOffType.addDayOffTypeFail'));
            }
          });
      },
      confirmEditDayOffType:function () {
        let pattern = /[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]/im;
        if (pattern.test(this.editDayOffTypeDetail[0].value)) {
          alert( this.$t('dayOffType.containIllegalChar'));
          this.editDayOffTypeDetail[0].value = "";
          return;
        }
        if(this.editDayOffTypeDetail[0].value === null || this.editDayOffTypeDetail[0].value === ""){
          alert(this.$t('dayOffType.pleaseEnterDayOffTypeName'));
          return;
        }
        let info = new URLSearchParams;
        info.append("dayOffType", String(this.editDayOffTypeDetail[0].value));
        info.append("description", String(this.editDayOffTypeDetail[1].value));
        info.append("id", String(this.editDayOffTypeDetail[2].value));
        axios
          .post('/api/advance/editDayOffType', info)
          .then(response => {
            if (response.data.status === 200) {
              // 获取成功
              alert( this.$t('dayOffType.editDayOffTypeSuccess'));
              this.showManageDialog();
              this.editDayOffTypeVisible = false;
            } else {
              // 获取失败
              alert( this.$t('dayOffType.editDayOffTypeFail'));
            }
          });
      },
      openAdd:function () {
        this.addDayOffDetail[0].value = "";
        this.addDayOffDetail[1].value = "";
        this.addDayOffTypeVisible = true;
      }
    }
  }

</script>

<style scoped>
  #choosePage{
    z-index: 5;
    position: absolute;
    left: 350px;
    top: 837px;
  }

  #total {
    height: 1000px;
  }

  #searchLabel {
    position: absolute;
    top: 30px;
    left: 20px;
  }

  #searchInput {
    position: absolute;
    top: 21px;
    left: 80px;
    width: 150px;
  }

  #searchLabel2 {
    position: absolute;
    top: 30px;
    left: 415px;
  }

  #searchInput2 {
    position: absolute;
    top: 21px;
    left: 490px;
    width: 200px;
  }

  #button1 {
    position: absolute;
    top: 21px;
    left: 825px;
  }

  #table {
    position: absolute;
    top: 90px;
    left: 0;
    width: 100%;
    height: 1000px;
  }

  #formContentLabel {
    position: absolute;
    left: 110px;
    top: 107px;
    height: 300px;
  }

  #formContent {
    position: absolute;
    left: 210px;
    top: 98px;
    height: 300px;
  }

  #detailInfoTable {
    height: 600px;
  }


  #subInfoBut {
    position: absolute;
    left: 197px;
    top: 324px;
  }

  #addFormTimePickerLabel {
    position: absolute;
    left: 90px;
    top: 90px;
  }

  #addFormTimePicker {
    position: absolute;
    left: 160px;
    top: 80px;
  }

  #formContentLabel {
    position: absolute;
    left: 90px;
    top: 149px;
  }

  #formContent {
    position: absolute;
    left: 160px;
    top: 139px;
  }

  #formContentLabel2 {
    position: absolute;
    left: 90px;
    top: 209px;
  }

  #formContent2 {
    position: absolute;
    left: 160px;
    top: 199px;
  }

  #addFormTimePickerLabel {
    position: absolute;
    left: 90px;
    top: 90px;
  }

  #editFormTimePickerLabel {
    position: absolute;
    left: 90px;
    top: 90px;
  }

  #editFormTimePicker {
    position: absolute;
    left: 160px;
    top: 80px;
  }

  #editFormContentLabel {
    position: absolute;
    left: 90px;
    top: 149px;
  }

  #editFormContent {
    position: absolute;
    left: 160px;
    top: 139px;
  }

  #editFormContentLabel2 {
    position: absolute;
    left: 90px;
    top: 209px;
  }

  #editFormContent2{
    position: absolute;
    left: 160px;
    top: 199px;
  }
  #editSubInfoBut {
    position: absolute;
    left: 183px;
    top: 284px;
  }

  #button2{
    position: absolute;
    top:21px;
    left:710px;
  }

  #addNumberLabel{
    position: absolute;
    top:80px;
    left:110px;
  }

  #addDescriptionLabel{
    position: absolute;
    top:140px;
    left:110px;
  }

  #addDayOffTypeId{
    position: absolute;
    top:70px;
    left:200px;
  }

  #addDescription{
    position: absolute;
    top:130px;
    left:200px;
  }

  #addDayOffSubBut{
    position: absolute;
    top:210px;
    left:195px;
  }

  #editDayOffTypeIdLabel{
    position: absolute;
    top:80px;
    left:110px;
  }

  #editDayOffTypeDescriptionLabel{
    position: absolute;
    top:140px;
    left:110px;
  }

  #editDayOffTypeId{
    position: absolute;
    top:70px;
    left:200px;
  }

  #editDayOffTypeDescription{
    position: absolute;
    top:130px;
    left:200px;
  }

  #editDayOffTypeSubBut{
    position: absolute;
    top:210px;
    left:195px;
  }

  #addDayOffTypeBut{
    position: absolute;
    top:590px;
    left:660px;
  }
</style>

<style>
  .addBut .el-button {
    background-color: #7eda65 !important;
  }

  .tab .el-table th {
    background-color: #dadad5 !important;
  }

  .showDialogFather .el-button {
    border: none !important;
    margin: 0 !important;
    padding: 0 !important;
  }

  .addHoliday .el-dialog {
    height: 410px !important;
    width: 530px !important;
  }

  .but .el-button:hover {
    background-color: #b2da1d !important;
  }

  .but2 .el-button {
    background-color: #a7da38 !important;
  }

  .editHoliday .el-dialog {
    height: 360px !important;
    width: 500px !important;
  }

  .manageHolidayType .el-dialog {
    height: 640px !important;
    width: 830px !important;
  }

  .editDayOffType .el-dialog {
    height: 300px !important;
    width: 530px !important;
  }
</style>
