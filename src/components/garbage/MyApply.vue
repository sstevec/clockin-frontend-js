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
                申请类型
              </text>
            </svg>
          </el-row>

          <el-row id="applySearchSelector">
            <el-select v-model="selectType" placeholder="请选择" @change="getApplicationRecord">
              <el-option
                v-for="(item, index) in applyTypes"
                :key="index"
                :label="item.name"
                :value="item.type">
                <span style="float: left">{{ item.name }}</span>
              </el-option>
            </el-select>
          </el-row>

          <el-row class="but2" id="button1">
            <el-button @click.prevent="changeClass('1')" style="width: 80px">
              <p style="margin: 0; color: #FFFFFF">全部</p>
            </el-button>
          </el-row>

          <el-row class="but" id="button2">
            <el-button @click.prevent="changeClass('2')" style="width: 80px">
              <p style="margin: 0; color: #FFFFFF">待审批</p>
            </el-button>
          </el-row>

          <el-row class="but" id="button3">
            <el-button @click.prevent="changeClass('3')" style="width: 80px">
              <p style="margin: 0; color: #FFFFFF">审批中</p>
            </el-button>
          </el-row>

          <el-row class="but" id="button4">
            <el-button @click.prevent="changeClass('4')" style="width: 80px">
              <p style="margin: 0; color: #FFFFFF">已通过</p>
            </el-button>
          </el-row>

          <el-row class="but" id="button5">
            <el-button @click.prevent="changeClass('5')" style="width: 80px">
              <p style="margin: 0; color: #FFFFFF">已拒绝</p>
            </el-button>
          </el-row>

          <el-row class="but" id="button6">
            <el-button @click.prevent="changeClass('6')" style="width: 80px">
              <p style="margin: 0; color: #FFFFFF">已撤销</p>
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
          label="申请类型"
          width="200"
          prop="type">
          <template slot-scope="scope">
            <div class="showDialogFather">
              <el-button @click="showDialog(scope.row.index)">{{ scope.row.type }}</el-button>
            </div>
          </template>
        </el-table-column>

        <el-table-column
          label="申请摘要"
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
                <el-tag size="medium">审批概览</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>


        <el-table-column
          label="申请时间"
          width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.created }}</span>
          </template>
        </el-table-column>


        <el-table-column
          label="最后一次更新"
          width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.updated }}</span>
          </template>
        </el-table-column>

        <el-table-column
          label="状态">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.status }}</span>
          </template>
        </el-table-column>
      </el-table>

      <el-row id="detailInfoTable" class="myApply">
        <el-dialog title="详细信息" :visible.sync="dialogFormVisible">

          <el-row id="userIcon">
            <el-avatar style="background-color: #81af53" icon="el-icon-user-solid"></el-avatar>
          </el-row>

          <svg id="formNameLabel" width="120" height="80" viewBox="0 0 120 80">
            <text font-family="'Helvetica Neue','PingFang SC','microsoft yahei'" fill="#737470" font-size="15"
                  x="0"
                  y="1em">
              {{this.name}}
            </text>
          </svg>

          <svg id="applicationIdLabel" width="240" height="80" viewBox="0 0 240 80">
            <text font-family="'Helvetica Neue','PingFang SC','microsoft yahei'" fill="#737470" font-size="15"
                  x="0"
                  y="1em">
              申请编号 : {{this.currentFormApplicationId}}
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
                审批流程
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

          <div class="dialogBut" id="dialogButtons">
            <el-button style="width: 50px" @click="dialogFormVisible = false">修改</el-button>
            <el-button style="width: 50px" @click="applyRollBack">撤销</el-button>
          </div>

          <canvas id="backGroundLayer" width="1920" height="1080" style="width: 100%;height: 50%">
            不支持canvas动画
          </canvas>
        </el-dialog>

      </el-row>
    </el-row>

  </div>

</template>

<script>
  import axios from 'axios'
  import Header from '../Header'
  import Bottom from "../Bottom";

  export default {
    name: "MyApply",

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
        applyTypes: [
          {name: "请假申请", type: "DayOff"},
          {name: "加班申请", type: "ExtraWork"},
          {name: "补卡申请", type: "MakeUp"},
          {name: "撤销申请", type: "RollBack"},
          {name: "全部", type: "All"}],
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
              alert(response.data.msg);
            }

          })
      },
      changeClass: function (val) {
        document.getElementById("button1").className = "but";
        document.getElementById("button2").className = "but";
        document.getElementById("button3").className = "but";
        document.getElementById("button4").className = "but";
        document.getElementById("button5").className = "but";
        document.getElementById("button6").className = "but";
        if (val === "1") {
          document.getElementById("button1").className = "but2";
          this.selectStatus = "All";
          this.getApplicationRecord();
        } else if (val === "2") {
          document.getElementById("button2").className = "but2";
          this.selectStatus = "UnRead";
          this.getApplicationRecord();
        } else if (val === "3") {
          document.getElementById("button3").className = "but2";
          this.selectStatus = "Pending";
          this.getApplicationRecord();
        } else if (val === "4") {
          document.getElementById("button4").className = "but2";
          this.selectStatus = "Success";
          this.getApplicationRecord();
        } else if (val === "5") {
          document.getElementById("button5").className = "but2";
          this.selectStatus = "Fail";
          this.getApplicationRecord();
        } else if (val === "6") {
          document.getElementById("button6").className = "but2";
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

        let info = new URLSearchParams;
        info.append("uid", String(this.uid));
        info.append("status", String(status));
        info.append("type", String(this.selectType));
        info.append("pageNum", String("1"));
        info.append("pageMax", String("10"));

        axios
          .post('/api/apply/userGetApplication', info)
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
                tempRecord.applicationId = records[i].application_id;
                tempRecord.description = records[i].application_description;
                if (records[i].application_type === "MakeUp") {
                  tempRecord.type = "补卡申请";
                  tempRecord.makeUpTime = "补卡时间 : " + detail[0];
                  if (detail[1] === "IN") {
                    tempRecord.makeUpTime = tempRecord.makeUpTime + "上班卡";
                  } else {
                    tempRecord.makeUpTime = tempRecord.makeUpTime + "下班卡";
                  }
                } else if (records[i].application_type === "RollBack") {
                  tempRecord.type = "撤销申请";
                  tempRecord.rollBackId = "撤销的申请编号 : " + detail[0];
                  if (detail[1] === "MakeUp") {
                    tempRecord.rollBackType = "撤销申请的类型 : 补卡申请";
                  } else if (detail[1] === "DayOff") {
                    tempRecord.rollBackType = "撤销申请的类型 : 假期申请";
                  } else if (detail[1] === "ExtraWork") {
                    tempRecord.rollBackType = "撤销申请的类型 : 加班申请";
                  }
                } else if (records[i].application_type === "DayOff") {
                  tempRecord.type = "假期申请";
                  tempRecord.dayOffStart = "假期开始 : " + detail[0] + "   " + detail[2];
                  tempRecord.dayOffEnd = "假期结束 : " + detail[1] + "   " + detail[3];
                  if (detail[5] === "ChangeDayOff") {
                    tempRecord.dayOffType = "假期类型 : 调休";
                  } else if (detail[5] === "AnnualDayOff") {
                    tempRecord.dayOffType = "假期类型 : 年假";
                  } else if (detail[5] === "DayOff") {
                    tempRecord.dayOffType = "假期类型 : 事假";
                  }
                } else if (records[i].application_type === "ExtraWork") {
                  tempRecord.type = "加班申请";
                  tempRecord.extraWorkDate = "加班日期 : " + detail[0];
                  tempRecord.extraWorkStart = "加班开始 : " + detail[1];
                  tempRecord.extraWorkEnd = "加班结束 : " + detail[2];
                  tempRecord.extraWorkRewardType = "结算方式 : ";
                  if (detail[3] === "ChangeDayOff") {
                    tempRecord.extraWorkRewardType = tempRecord.extraWorkRewardType + "调休";
                  } else if (detail[3] === "Money") {
                    tempRecord.extraWorkRewardType = tempRecord.extraWorkRewardType + "加班费";
                  } else if (detail[3] === "HolidayMoney") {
                    tempRecord.extraWorkRewardType = tempRecord.extraWorkRewardType + "加班费(法定假日)";
                  }
                }


                tempRecord.created = records[i].created;
                tempRecord.updated = records[i].updated;

                let status = records[i].status;
                if (status === "0") {
                  status = 0;
                  tempRecord.status = "待审批"
                } else if (status === "1") {
                  tempRecord.status = "已通过"
                } else if (status === "2") {
                  tempRecord.status = "已拒绝"
                } else if (status === "3") {
                  tempRecord.status = "已撤销"
                } else if (status === "4") {
                  tempRecord.status = "正在审批"
                }
                this.applyRecord.push(tempRecord);
              }
              if (this.applyRecord.length === 0) {
                this.applyRecord = [];
              }
            } else {
              // 获取失败
              alert(response.data.msg);
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

        this.currentStatus = tempRecord.status;
        this.currentFormApplicationId = tempRecord.applicationId;
        this.getReviewList();
        // 添加新纪录
        if (tempRecord.type === "假期申请") {
          let startArray = tempRecord.dayOffStart.split(":");
          let endArray = tempRecord.dayOffEnd.split(":");
          let typeArray = tempRecord.dayOffType.split(":");
          let start = {value: startArray[1] + ":" + startArray[2], name: startArray[0]};
          let end = {value: endArray[1] + ":" + endArray[2], name: endArray[0]};
          let type = {value: typeArray[1], name: typeArray[0]};
          let description = {name: "请假原因", value: tempRecord.description};
          this.detailInfo.push(start);
          this.detailInfo.push(end);
          this.detailInfo.push(type);
          this.detailInfo.push(description);
        } else if (tempRecord.type === "加班申请") {
          let dateArray = tempRecord.extraWorkDate.split(":");
          let startArray = tempRecord.extraWorkStart.split(":");
          let endArray = tempRecord.extraWorkEnd.split(":");
          let typeArray = tempRecord.extraWorkRewardType.split(":");
          let date = {value: dateArray[1], name: dateArray[0]};
          let start = {value: startArray[1] + ":" + startArray[2], name: startArray[0]};
          let end = {value: endArray[1] + ":" + endArray[2], name: endArray[0]};
          let type = {value: typeArray[1], name: typeArray[0]};
          let description = {name: "加班原因", value: tempRecord.description};
          this.detailInfo.push(date);
          this.detailInfo.push(start);
          this.detailInfo.push(end);
          this.detailInfo.push(type);
          this.detailInfo.push(description);
        } else if (tempRecord.type === "补卡申请") {
          let startArray = tempRecord.makeUpTime.split(":");
          let start = {value: startArray[1], name: startArray[0]};
          let description = {name: "补卡原因", value: tempRecord.description};
          this.detailInfo.push(start);
          this.detailInfo.push(description);
        } else if (tempRecord.type === "撤销申请") {
          let idArray = tempRecord.rollBackId.split(":");
          let typeArray = tempRecord.rollBackType.split(":");
          let id = {value: idArray[1], name: idArray[0]};
          let type = {value: typeArray[1], name: typeArray[0]};
          let description = {name: "撤销原因", value: tempRecord.description};
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
              alert(response.data.msg);
            }

          })
      },
      drawDialogLine: function () {
        let back = document.getElementById("backGroundLayer");
        let backC = back.getContext("2d");

        let num = this.reviewProcess.length;
        backC.beginPath();
        backC.strokeStyle = '#090909';
        backC.lineWidth = 2;
        backC.moveTo(380, 905);
        backC.lineTo(380 + 115 * num, 905);
        backC.stroke();
        backC.closePath();
      },
      applyRollBack: function () {
        if (this.currentStatus === "已撤销") {
          alert("已撤销的申请无法再次撤销");
          return;
        }
        this.$confirm('此操作将撤销该申请, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 输入原因
          this.$prompt('请输入撤销原因', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
          }).then(({value}) => {
            // 判断是否为待审批状态
            this.rollBackReason = value;
            if (this.currentStatus === "待审批") {
              // 直接执行删除
              this.rollBack();
            } else {
              // 最后确认是否执行删除
              this.$confirm('申请已开始审批无法直接撤销, 继续执行撤销操作将会提交撤销申请, 是否继续执行?', '提示', {
                confirmButtonText: '继续执行',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                this.rollBack();
              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '已取消撤销'
                });
              });
            }
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '取消输入'
            });
          });

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消撤销操作'
          });
        });
      },
      rollBack: function () {
        let info = new URLSearchParams;
        info.append("applicationId", String(this.currentFormApplicationId));
        info.append("uid", String(this.uid));
        info.append("applicationDescription", String(this.rollBackReason));
        axios
          .post('/api/apply/deleteApplication', info)
          .then(response => {
            if (response.data.status === 200) {
              alert(response.data.msg);
            } else {
              // 获取失败
              alert(response.data.msg);
            }

          })
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
    top: 50px;
    left: 80px;
  }

  #applySearchSelector {
    position: absolute;
    top: 40px;
    left: 180px;
    width: 200px;
  }

  #button1 {
    position: absolute;
    top: 40px;
    left: 510px;
  }

  #button2 {
    position: absolute;
    top: 40px;
    left: 600px;
  }

  #button3 {
    position: absolute;
    top: 40px;
    left: 690px;
  }

  #button4 {
    position: absolute;
    top: 40px;
    left: 780px;
  }

  #button5 {
    position: absolute;
    top: 40px;
    left: 870px;
  }

  #button6 {
    position: absolute;
    top: 40px;
    left: 960px;
  }

  #table {
    position: absolute;
    top: 150px;
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

  #detailInfoTable {
    height: 600px;
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

  #backGroundLayer {
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

  .dialogBut {
    z-index: 2;
  }

  #dialogButtons {
    position: absolute;
    left: 450px;
    top: 90px;
  }
</style>

<style>
  .but .el-button {
    background-color: #dadad5 !important;
  }

  .but .el-button:hover {
    background-color: #b2da1d !important;
  }

  .but2 .el-button {
    background-color: #a7da38 !important;
  }

  .tab .el-table th {
    background-color: #dadad5 !important;
  }

  .showDialogFather .el-button {
    border: none !important;
    margin: 0 !important;
    padding: 0 !important;
  }

  .myApply .el-dialog {
    height: 600px !important;
    width: 600px !important;
  }

  .dialogBut .el-button {
    border: none !important;
    margin: 0 !important;
    padding: 0 !important;
  }
</style>
