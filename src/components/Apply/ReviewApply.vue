<template>
  <div>
    <el-row id="total">
      <el-col>
        <div id="content">

          <el-row id="titleLabel">
            <svg width="120" height="80" viewBox="0 0 120 80">
              <text font-family="'Helvetica Neue','PingFang SC','microsoft yahei'" fill="#737470" font-size="15"
                    x="0"
                    y="1em">
                {{this.$t('myApply.applyType')}}
              </text>
            </svg>
          </el-row>

          <el-row id="applySearchSelector">
            <el-select v-model="selectType" :placeholder="$t('ExtraWorkApply.pleaseSelect')" @change="getApplicationRecord">
              <el-option
                v-for="(item, index) in applyTypes"
                :key="index"
                :label="item.name"
                :value="item.type">
                <span style="float: left">{{ item.name }}</span>
              </el-option>
            </el-select>
          </el-row>

          <el-row class="but2" id="Rebutton1">
            <el-button @click.prevent="changeClass('1')" style="width: 95px">
              <p style="margin: 0; color: #FFFFFF">{{this.$t('myApply.All')}}</p>
            </el-button>
          </el-row>

          <el-row class="but" id="Rebutton2">
            <el-button @click.prevent="changeClass('2')" style="width: 95px">
              <p style="margin: 0; color: #FFFFFF">{{this.$t('myApply.unRead')}}</p>
            </el-button>
          </el-row>

          <el-row class="but" id="Rebutton3">
            <el-button @click.prevent="changeClass('3')" style="width: 95px">
              <p style="margin: 0; color: #FFFFFF">{{this.$t('myApply.pending')}}</p>
            </el-button>
          </el-row>

          <el-row class="but" id="Rebutton4">
            <el-button @click.prevent="changeClass('4')" style="width: 95px">
              <p style="margin: 0; color: #FFFFFF">{{this.$t('myApply.approved')}}</p>
            </el-button>
          </el-row>

          <el-row class="but" id="Rebutton5">
            <el-button @click.prevent="changeClass('5')" style="width: 95px">
              <p style="margin: 0; color: #FFFFFF">{{this.$t('myApply.denied')}}</p>
            </el-button>
          </el-row>

          <el-row class="but" id="Rebutton6">
            <el-button @click.prevent="changeClass('6')" style="width: 95px">
              <p style="margin: 0; color: #FFFFFF">{{this.$t('myApply.rollBacked')}}</p>
            </el-button>
          </el-row>
        </div>
      </el-col>
    </el-row>


    <el-row id="table" class="tab">
      <el-table
        border
        :data="applyRecord"
        style="width: 100%">
        <el-table-column
          :label="$t('myApply.applyType')"
          width="200"
          prop="type">
          <template slot-scope="scope">
            <div class="showDialogFather">
              <el-button @click="showDialog(scope.row.index)">{{ scope.row.type }}</el-button>
            </div>
          </template>
        </el-table-column>

        <el-table-column
          :label="$t('myApply.applyOverview')"
          width="450">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>{{ scope.row.makeUpTime}}</p>
              <p>{{ scope.row.extraWorkDate }}</p>
              <p>{{ scope.row.extraWorkStart }}</p>
              <p>{{ scope.row.extraWorkEnd }}</p>
              <p>{{ scope.row.extraWorkRewardType }}</p>
              <p>{{ scope.row.rollBackType }}</p>
              <p>{{ scope.row.dayOffStart }}</p>
              <p>{{ scope.row.dayOffEnd }}</p>
              <p>{{ scope.row.dayOffType }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{$t('myApply.judgeOverview')}}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>


        <el-table-column
          :label="$t('myApply.applyTime')"
          width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.created }}</span>
          </template>
        </el-table-column>


        <el-table-column
          :label="$t('myApply.lastUpdate')"
          width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.updated }}</span>
          </template>
        </el-table-column>

        <el-table-column
          :label="$t('myApply.applyStatus')">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.status }}</span>
          </template>
        </el-table-column>
      </el-table>
    </el-row>

      <el-row id="detailInfoTable" class="reviewApply">
        <el-dialog :title="$t('myApply.detailInfo')" :visible.sync="dialogFormVisible">

          <el-row id="userIcon">
            <el-avatar style="background-color: #81af53" icon="el-icon-user-solid"></el-avatar>
          </el-row>

          <svg id="formNameLabel" width="120" height="80" viewBox="0 0 120 80">
            <text font-family="'Helvetica Neue','PingFang SC','microsoft yahei'" fill="#737470" font-size="15"
                  x="0"
                  y="1em">
              {{this.applyName}}
            </text>
          </svg>

          <svg id="applicationIdLabel" width="240" height="80" viewBox="0 0 240 80">
            <text font-family="'Helvetica Neue','PingFang SC','microsoft yahei'" fill="#737470" font-size="15"
                  x="0"
                  y="1em">
              {{this.$t('myApply.applyNumber')}} : {{this.currentFormApplicationId}}
            </text>
          </svg>

          <el-row id="formContentLabel">
            <div v-for="item in detailInfo">
              <el-row>
                <svg width="300" height="48" viewBox="0 0 300 48">
                  <text font-family="'Helvetica Neue','PingFang SC','microsoft yahei'" fill="#737470" font-size="15"
                        x="0"
                        y="1em">
                    {{item.name}} : {{item.value}}
                  </text>
                </svg>
              </el-row>
            </div>
          </el-row>

          <el-row id="processLabel">
            <svg width="120" height="80" viewBox="0 0 120 80">
              <text font-family="'Helvetica Neue','PingFang SC','microsoft yahei'" fill="#000000" font-size="15"
                    x="0"
                    y="1em">
                {{this.$t('changeDayOffApply.reviewProcess')}}
              </text>
            </svg>
          </el-row>

          <el-row id="processLine">
            <el-steps :active="currentActive" finish-status="success">
              <div style="width: 80px" v-for="item in reviewProcess">
                <el-step title="" :description="item.name">{{item.status}}</el-step>
              </div>
            </el-steps>
          </el-row>

          <div >
            <div class="agreeButton" id="agreeButtons">
              <el-button style="width: 100px" @click="reviewApplication('1')">{{this.$t('reviewApply.agree')}}</el-button>
            </div>
            <div class="refuseButton" id="refuseButtons">
              <el-button style="width: 100px" @click="reviewApplication('2')">{{this.$t('reviewApply.refuse')}}</el-button>
            </div>
          </div>

          <canvas id="backGroundLayer2" width="1920" height="1080" style="width: 100%;height: 50%">
            {{this.$t('header.doNotSupportCanvas')}}
          </canvas>
        </el-dialog>


      </el-row>
      <el-row id="choosePage2">
      <el-pagination
        :current-page.sync="currentPageNum"
        :page-size="14"
        :total="total"
        @current-change="handlePageChange"
        layout="prev, next, jumper"
      >
      </el-pagination>
    </el-row>


  </div>

</template>

<script>
  import axios from 'axios'
  import Header from '../Header'
  import Bottom from "../Bottom";

  export default {
    name: "ReviewApply",

    components: {
      Bottom,
      Header
    },
    data() {
      return {
        total:0,
        currentPageNum: 1,
        account: "",
        name: "name",
        position: "position",
        work_id: "work_id",
        uid: "",
        applyTypes: [
          {name: this.$t('apply.changeDayOffApply'), type: "DayOff"},
          {name: this.$t('apply.ExtraWorkApply'), type: "ExtraWork"},
          {name: this.$t('apply.makeUpApply'), type: "MakeUp"},
          {name: this.$t('apply.rollBackApply'), type: "RollBack"},
          {name: this.$t('myApply.All'), type: "All"}],
        selectType: "All",
        applyRecord: [],
        selectStatus: "All",
        detailInfo: [],
        dialogFormVisible: false,
        currentFormApplicationId: "",
        currentStatus: "",
        currentType: "",
        reviewProcess: [],
        currentActive: 0,
        rollBackReason: "",
        applyName:"",
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
              this.getApplicationRecord();
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
      changeClass: function (val) {
        document.getElementById("Rebutton1").className = "but";
        document.getElementById("Rebutton2").className = "but";
        document.getElementById("Rebutton3").className = "but";
        document.getElementById("Rebutton4").className = "but";
        document.getElementById("Rebutton5").className = "but";
        document.getElementById("Rebutton6").className = "but";
        if (val === "1") {
          document.getElementById("Rebutton1").className = "but2";
          this.selectStatus = "All";
          this.getApplicationRecord();
        } else if (val === "2") {
          document.getElementById("Rebutton2").className = "but2";
          this.selectStatus = "UnRead";
          this.getApplicationRecord();
        } else if (val === "3") {
          document.getElementById("Rebutton3").className = "but2";
          this.selectStatus = "Pending";
          this.getApplicationRecord();
        } else if (val === "4") {
          document.getElementById("Rebutton4").className = "but2";
          this.selectStatus = "Success";
          this.getApplicationRecord();
        } else if (val === "5") {
          document.getElementById("Rebutton5").className = "but2";
          this.selectStatus = "Fail";
          this.getApplicationRecord();
        } else if (val === "6") {
          document.getElementById("Rebutton6").className = "but2";
          this.selectStatus = "RollBacked";
          this.getApplicationRecord();
        }
      },
      handleEdit: function (index, rowData) {
        console.log(index, rowData)
      },
      handleDelete: function (index, rowData) {

      },
      getApplicationRecord: function () {
        this.applyRecord.length = 0;
        let status = "-999";
        if (this.selectStatus === "All") {
          status = -1;
        } else if (this.selectStatus === "UnRead") {
          status = 0;
        } else if (this.selectStatus === "Success") {
          status = 1;
        } else if (this.selectStatus === "Fail") {
          status = 2;
        } else if (this.selectStatus === "RollBacked") {
          status = 3;
        } else if (this.selectStatus === "Pending") {
          status = 4;
        }

        // 获取总页数
        let pageInfo = new URLSearchParams;
        pageInfo.append("reviewerUid", String(this.uid));
        pageInfo.append("status", String(status));
        pageInfo.append("type", String(this.selectType));
        axios
          .post('/api/apply/reviewerCountApplication', pageInfo)
          .then(response => {
            if (response.data.status === 200) {
              let paramName = "count(0)";
              this.total = response.data.data[0][paramName];
            } else {
              // 获取失败
              alert(this.$t('header.getPageNumberFail'));
            }
          });

        let info = new URLSearchParams;
        info.append("reviewerUid", String(this.uid));
        info.append("status", String(status));
        info.append("type", String(this.selectType));
        info.append("pageNum", String(this.currentPageNum));
        info.append("pageMax", String("14"));

        axios
          .post('/api/apply/reviewerGetApplication', info)
          .then(response => {
            if (response.data.status === 200) {
              // 获取成功
              let records = response.data.data;
              let recordsLength = records.length;
              for (let i = 0; i < recordsLength; i++) {
                // 全装进去
                let tempRecord = {};
                // 根据不同的申请拆分细节
                let detail = records[i].application_detail.split(",");
                tempRecord.index = i;
                tempRecord.name = records[i].name;
                tempRecord.applicationId = records[i].application_id;
                tempRecord.description = records[i].application_description;
                if (records[i].application_type === "MakeUp") {
                  tempRecord.type = this.$t('apply.makeUpApply');
                  tempRecord.makeUpTime = this.$t('makeUpApply.makeUpTime')+" : " + detail[0];
                  if (detail[1] === "IN") {
                    tempRecord.makeUpTime = tempRecord.makeUpTime + this.$t('HomePage.clockIn');
                  } else {
                    tempRecord.makeUpTime = tempRecord.makeUpTime + this.$t('HomePage.clockOut');
                  }
                } else if (records[i].application_type === "RollBack") {
                  tempRecord.type = this.$t('apply.rollBackApply');;
                  tempRecord.rollBackId = this.$t('myApply.rollBacksApplyNumber')+" : " + detail[0];
                  if (detail[1] === "MakeUp") {
                    tempRecord.rollBackType = this.$t('myApply.rollBacksApplyType')+ " : " + this.$t('apply.makeUpApply');
                  } else if (detail[1] === "DayOff") {
                    tempRecord.rollBackType = this.$t('myApply.rollBacksApplyType')+ " : " + this.$t('apply.changeDayOffApply');
                  } else if (detail[1] === "ExtraWork") {
                    tempRecord.rollBackType = this.$t('myApply.rollBacksApplyType')+ " : " + this.$t('apply.ExtraWorkApply');
                  }
                } else if (records[i].application_type === "DayOff") {
                  tempRecord.type = this.$t('apply.changeDayOffApply');
                  tempRecord.dayOffStart = this.$t('myApply.offStart') + " : " + detail[0] + "   " + detail[2];
                  tempRecord.dayOffEnd = this.$t('myApply.offEnd') + " : " + detail[1] + "   " + detail[3];
                  if (detail[5] === "ChangeDayOff") {
                    tempRecord.dayOffType = this.$t('myApply.offType') + " : " + this.$t('changeDayOffApply.changeDayOff');
                  } else if (detail[5] === "AnnualDayOff") {
                    tempRecord.dayOffType = this.$t('myApply.offType') + " : " + this.$t('changeDayOffApply.annualDayOff');
                  } else if (detail[5] === "DayOff") {
                    tempRecord.dayOffType = this.$t('myApply.offType') + " : " + this.$t('changeDayOffApply.dayOff');
                  }
                } else if (records[i].application_type === "ExtraWork") {
                  tempRecord.type = this.$t('apply.ExtraWorkApply');
                  tempRecord.extraWorkDate = this.$t('ExtraWorkApply.extraWorkDate') + " : " + detail[0];
                  tempRecord.extraWorkStart = this.$t('myApply.extraWorkStart') + " : " + detail[1];
                  tempRecord.extraWorkEnd = this.$t('myApply.extraWorkEnd') + " : " + detail[2];
                  tempRecord.extraWorkRewardType = this.$t('ExtraWorkApply.rewardType') + " : ";
                  if (detail[3] === "ChangeDayOff") {
                    tempRecord.extraWorkRewardType = tempRecord.extraWorkRewardType + this.$t('changeDayOffApply.changeDayOff');
                  } else if (detail[3] === "Money") {
                    tempRecord.extraWorkRewardType = tempRecord.extraWorkRewardType + this.$t('ExtraWorkApply.money');
                  } else if (detail[3] === "HolidayMoney") {
                    tempRecord.extraWorkRewardType = tempRecord.extraWorkRewardType + this.$t('ExtraWorkApply.holidayMoney');
                  }
                }


                tempRecord.created = records[i].created;
                tempRecord.updated = records[i].updated;

                let status = records[i].status;
                if (status === "0") {
                  status = 0;
                  tempRecord.status = this.$t('myApply.unRead')
                } else if (status === "1") {
                  tempRecord.status = this.$t('myApply.approved')
                } else if (status === "2") {
                  tempRecord.status = this.$t('myApply.denied')
                } else if (status === "3") {
                  tempRecord.status = this.$t('myApply.rollBacked')
                } else if (status === "4") {
                  tempRecord.status = this.$t('myApply.pending')
                }
                this.applyRecord.push(tempRecord);
              }
              if (this.applyRecord.length === 0) {
                this.applyRecord = [];
              }
            } else {
              // 获取失败
              alert(this.$t('myApply.getRecordFail'));
            }

          })
      },
      showDialog: function (index) {
        // 获取记录
        let tempRecord = this.applyRecord[index];
        // 清除原记录
        this.detailInfo.length = 0;
        this.reviewProcess.length = 0;
        this.detailInfo = [];
        this.currentActive = 0;
        this.applyName = tempRecord.name;
        this.currentStatus = tempRecord.status;
        this.currentFormApplicationId = tempRecord.applicationId;
        this.getReviewList();
        // 添加新纪录
        if (tempRecord.type === this.$t('apply.changeDayOffApply')) {
          let startArray = tempRecord.dayOffStart.split(":");
          let endArray = tempRecord.dayOffEnd.split(":");
          let typeArray = tempRecord.dayOffType.split(":");
          let start = {value: startArray[1] + ":" + startArray[2], name: startArray[0]};
          let end = {value: endArray[1] + ":" + endArray[2], name: endArray[0]};
          let type = {value: typeArray[1], name: typeArray[0]};
          let description = {name: this.$t('changeDayOffApply.offReason'), value: tempRecord.description};
          this.detailInfo.push(start);
          this.detailInfo.push(end);
          this.detailInfo.push(type);
          this.detailInfo.push(description);
        } else if (tempRecord.type === this.$t('apply.ExtraWorkApply')) {
          let dateArray = tempRecord.extraWorkDate.split(":");
          let startArray = tempRecord.extraWorkStart.split(":");
          let endArray = tempRecord.extraWorkEnd.split(":");
          let typeArray = tempRecord.extraWorkRewardType.split(":");
          let date = {value: dateArray[1], name: dateArray[0]};
          let start = {value: startArray[1]+":"+startArray[2], name: startArray[0]};
          let end = {value: endArray[1]+":"+endArray[2], name: endArray[0]};
          let type = {value: typeArray[1], name: typeArray[0]};
          let description = {name: this.$t('ExtraWorkApply.workReason'), value: tempRecord.description};
          this.detailInfo.push(date);
          this.detailInfo.push(start);
          this.detailInfo.push(end);
          this.detailInfo.push(type);
          this.detailInfo.push(description);
        } else if (tempRecord.type === this.$t('apply.makeUpApply')) {
          let startArray = tempRecord.makeUpTime.split(":");
          let start = {value: startArray[1], name: startArray[0]};
          let description = {name: this.$t('makeUpApply.makeUpReason'), value: tempRecord.description};
          this.detailInfo.push(start);
          this.detailInfo.push(description);
        } else if (tempRecord.type === this.$t('apply.rollBackApply')) {
          let idArray = tempRecord.rollBackId.split(":");
          let typeArray = tempRecord.rollBackType.split(":");
          let id = {value: idArray[1], name: idArray[0]};
          let type = {value: typeArray[1], name: typeArray[0]};
          let description = {name: this.$t('myApply.rollBackReason'), value: tempRecord.description};
          this.detailInfo.push(id);
          this.detailInfo.push(type);
          this.detailInfo.push(description);
        }

        this.dialogFormVisible = true;
      },
      getReviewList: function () {
        let info = new URLSearchParams;
        info.append("applicationId", String(this.currentFormApplicationId));
        axios
          .post('/api/apply/getReviewProcess', info)
          .then(response => {
            if (response.data.status === 200) {
              // 获取成功
              let tempProcess = response.data.data;
              let nameNum = tempProcess.length;
              for (let i = 0; i < nameNum; i++) {
                let tempPoint = {};
                tempPoint.status = tempProcess[i].status;
                tempPoint.name = tempProcess[i].name;
                this.reviewProcess.push(tempPoint);
                if (tempPoint.status === "已同意") {
                  this.currentActive++;
                }
              }
              this.drawDialogLine();
            } else {
              // 获取失败
              alert(this.$t('myApply.getReviewProcessFail'));
            }

          })
      },
      drawDialogLine: function () {
        let back2 = document.getElementById("backGroundLayer2");
        let backC2 = back2.getContext("2d");

        let num = this.reviewProcess.length;
        backC2.clearRect(0,0,1920,1080);
        backC2.beginPath();
        backC2.strokeStyle = '#090909';
        backC2.lineWidth = 2;
        backC2.moveTo(380, 840);
        if (num === 2) {
          backC2.lineTo(630, 840);
        } else if (num === 3) {
          backC2.lineTo(860, 840);
        } else if (num === 4) {
          backC2.lineTo(1130, 840);
        } else if (num === 5) {
          backC2.lineTo(1400, 840);
        }
        backC2.stroke();
        backC2.closePath();
      },
      reviewApplication:function(targetVal){
        // targetStatus 0 代表未审核, 1 代表同意, 2 代表不同意
        let info = new URLSearchParams;
        info.append("reviewerUid", String(this.uid));
        info.append("applicationId", String(this.currentFormApplicationId));
        info.append("targetStatus", String(targetVal));
        //console.log(this.uid,this.currentFormApplicationId,targetVal);
        axios
          .post('/api/apply/makeDecision', info)
          .then(response => {
            if (response.data.status === 200) {
              alert(this.$t('reviewApply.reviewSuccess'));
              this.getApplicationRecord();
            } else {
              // 获取失败
              alert(this.$t('reviewApply.reviewFail'));
            }
          })
      },
      handlePageChange:function () {
        this.getApplicationRecord();
      }
    }
  }

</script>

<style scoped>
  #total {
    height: 1000px;
  }

  #titleLabel {
    position: absolute;
    top: 30px;
    left: 80px;
  }

  #applySearchSelector {
    position: absolute;
    top: 20px;
    left: 180px;
    width: 200px;
  }

  #Rebutton1 {
    position: absolute;
    top: 20px;
    left: 500px;
  }

  #Rebutton2 {
    position: absolute;
    top: 20px;
    left: 605px;
  }

  #Rebutton3 {
    position: absolute;
    top: 20px;
    left: 710px;
  }

  #Rebutton4 {
    position: absolute;
    top: 20px;
    left: 815px;
  }

  #Rebutton5 {
    position: absolute;
    top: 20px;
    left: 920px;
  }

  #Rebutton6 {
    position: absolute;
    top: 20px;
    left: 1025px;
  }

  #table {
    position: absolute;
    top: 110px;
    left: 0;
    width: 100%;
    height: 1000px;
  }

  #formNameLabel {
    position: absolute;
    left: 170px;
    top: 90px;
  }

  #formContentLabel {
    position: absolute;
    left: 110px;
    top: 187px;
    height: 300px;
  }

  #userIcon {
    position: absolute;
    left: 110px;
    top: 80px;
  }

  #applicationIdLabel {
    position: absolute;
    left: 110px;
    top: 140px;
  }

  #processLine {
    position: absolute;
    left: 80px;
    top: 490px;
    width: 380px;
  }

  #backGroundLayer2 {
    position: absolute;
    left: 0;
    top: 250px;
    z-index: 0;
  }

  #processLabel {
    position: absolute;
    left: 110px;
    top: 450px;
  }


  #agreeButtons {
    position: absolute;
    left: 300px;
    top: 570px;
    width: 100px;
  }

  #refuseButtons {
    position: absolute;
    left: 420px;
    top: 570px;
    width: 100px;
  }

  #choosePage2{
    z-index: 5;
    position: absolute;
    left: 470px;
    top: 967px;
  }
</style>

<style>
  .reviewApply .el-dialog {
    height: 650px !important;
    width: 600px !important;
  }

  .agreeButton .el-button {
    background-color: #c6ffcc;
  }

  .refuseButton .el-button {
    background-color: #ffc3c1;
  }
</style>
