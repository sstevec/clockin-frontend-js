<template>
  <div>
    <el-row id="offSet">
      <el-row id="total">
        <el-col>
          <div id="content">
            <Header></Header>

            <el-row id="leftTab" class="leftPanel">
              <el-tabs tab-position=left style="height: 1000px;">
                <el-tab-pane class="leftSelectorPanel" v-if="!showManager" :label="$t('advanceManagement.userManagement')">
                  <StaffManagement></StaffManagement>
                </el-tab-pane>
                <el-tab-pane class="leftSelectorPanel" v-if="!showManager" :label="$t('advanceManagement.departmentManagement')">
                  <DepartmentManagement></DepartmentManagement>
                </el-tab-pane>
                <el-tab-pane class="leftSelectorPanel" v-if="!showManager" :label="$t('advanceManagement.clockInManagement')">
                  <ClockInManagement></ClockInManagement>
                </el-tab-pane>
                <el-tab-pane class="leftSelectorPanel" v-if="!showManager" :label="$t('advanceManagement.holidayManagement')">
                  <HolidayManagement></HolidayManagement>
                </el-tab-pane>
                <el-tab-pane class="leftSelectorPanel" v-if="!showManager" :label="$t('advanceManagement.accountManagement')">
                  <SystemUserManagement></SystemUserManagement>
                </el-tab-pane>
                <el-tab-pane class="leftSelectorPanel" v-if="!showManager" :label="$t('advanceManagement.HomePageManagement')">
                  <HomePageManagement></HomePageManagement>
                </el-tab-pane>
                <el-tab-pane class="leftSelectorPanel" v-if="showManager" :label="$t('advanceManagement.DepartmentManager')">
                  <DepartmentManager></DepartmentManager>
                </el-tab-pane>
              </el-tabs>
            </el-row>


            <el-row id="bottom">
              <Bottom></Bottom>
            </el-row>
          </div>
        </el-col>
      </el-row>
    </el-row>
  </div>
</template>

<script>
  import axios from 'axios'
  import Header from '../Header'
  import Bottom from "../Bottom";
  import StaffManagement from "../AdvanceManagement/StaffManagement"
  import DepartmentManagement from "../AdvanceManagement/DepartmentManagement"
  import ClockInManagement from "../AdvanceManagement/ClockInManagement"
  import HolidayManagement from "../AdvanceManagement/HolidayManagement"
  import SystemUserManagement from "../AdvanceManagement/SystemUserManagement"
  import HomePageManagement from "../AdvanceManagement/HomePageManagement";
  import DepartmentManager from "../AdvanceManagement/DepartmentManager";

  export default {
    name: "advanceManagement",
    components: {
      SystemUserManagement,
      HolidayManagement,
      ClockInManagement,
      DepartmentManagement,
      Bottom,
      Header,
      StaffManagement,
      HomePageManagement,
      DepartmentManager
    },
    data() {
      return {
        account: "",
        name: "name",
        position: "position",
        work_id: "work_id",
        uid: "",
        showManager:true,
      }
    },
    created() {

    },

    mounted() {
      let role = localStorage.getItem("role");
      if(role === "admin"){
        this.showManager = false;
      }
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
            } else {
              // 获取失败
              alert(this.$t('header.getLoginInfoFail'));
            }

          })
      },
    }
  }


</script>

<style scoped>
  #total {
    width: 1140px;
  }

  #offSet {
    min-width: 1140px;
    position: absolute;
    top: 0;
    padding-left: calc((100% - 1140px) / 2)
  }

  #bottom {
    top: 1000px;
  }

  #leftTab {
    position: absolute;
    height: 1000px;
    width: 1140px;
  }

  .leftSelectorPanel {
    width: 200px;
  }
</style>

<style>
  .leftPanel .el-tabs__item {
    width: 200px !important;
    text-align: center !important;
  }

  .leftPanel .el-tabs__item:hover {
    color: #8dc52c;
  }

  .leftPanel .el-tabs__item.is-active {
    color: #f8fff7;
    background-color: #8dc52c;
  }

  .leftPanel .el-tabs__active-bar.is-left {
    background-color: #8dc52c;
  }
</style>
