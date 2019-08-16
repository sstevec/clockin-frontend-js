<template>
  <div>
    <el-row id="total">
      <el-col>
        <div id="content">

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
              @blur="getAllUser"
              maxlength="20">
            </el-input>
          </el-row>

        </div>
      </el-col>
    </el-row>


    <el-row id="table" class="tab">
      <el-table
        border
        :data="userInfo"
        style="width: 100%">
        <div v-for="item in userLabel">
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
              <el-button @click="deleteUser(scope.row.uid)" icon="el-icon-delete" style="width:40px;height: 20px">
              </el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>

      <el-row class="editSystemUser">
        <el-dialog :title="$t('accountManagement.editUserInfo')" :visible.sync="editVisible">

          <svg id="editLabel" width="120" height="80" viewBox="0 0 120 80">
            <text font-family="'Helvetica Neue','PingFang SC','microsoft yahei'" fill="#737470" font-size="15"
                  x="0"
                  y="1em">
              {{this.$t('accountManagement.chooseRole')}}
            </text>
          </svg>


          <el-row id="editContent">
            <el-select v-model="editDetail[0].value" :placeholder="$t('ExtraWorkApply.pleaseSelect')">
              <el-option
                v-for="item in roleOptions"
                :key="item"
                :label="item"
                :value="item"
                style="height: auto">
                <span style="float: left">{{ item }}</span>
              </el-option>
            </el-select>
          </el-row>

          <el-row id="editLabel2">
            <el-row>
              <svg width="300" height="57" viewBox="0 0 300 57">
                <text font-family="'Helvetica Neue','PingFang SC','microsoft yahei'" fill="#737470" font-size="15"
                      x="0"
                      y="1em">
                  {{$t('accountManagement.enterNew')}}{{this.editDetail[1].name}}
                </text>
              </svg>
            </el-row>
          </el-row>

          <el-row id="editContent2">
            <el-row style="height: 61px">
              <el-input
                :placeholder="$t('accountManagement.nullMeanNoChange')"
                v-model="editDetail[1].value"
                clearable
                style="width: 200px;">
              </el-input>
            </el-row>
          </el-row>

          <div id="editSubInfoBut" class="but2">
            <el-button style="width: 150px" @click="confirmEdition">{{$t('login.confirm')}}</el-button>
          </div>
        </el-dialog>
      </el-row>

      <el-row id="choosePage">
        <el-pagination
          :current-page.sync="currentPageNum"
          :page-size="14"
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

  export default {
    name: "SystemUserManagement",

    components: {},
    data() {
      return {
        total:0,
        currentPageNum: 1,
        account: "",
        name: "name",
        position: "position",
        work_id: "work_id",
        uid: "",
        blurSearchInfo: "",
        userLabel: [
          {name: this.$t('accountManagement.role'), value: "", key: "roles"},
          //{name: "姓名", value: "", key: "name"},
          {name: this.$t('clockInManagement.uid'), value: "", key: "uid"},
          {name: this.$t('header.account'), value: "", key: "account"},
          {name: this.$t('staffManagement.password'), value: "", key: "password"},
          {name: this.$t('departmentManagement.createdTime'), value: "", key: "created"},
          {name: this.$t('holidayManagement.updatedTime'), value: "", key: "updated"},
          {name: this.$t('accountManagement.expiredTime'), value: "", key: "expired"},
        ],
        userInfo: [],
        editVisible: false,
        editDetail: [
          {name: this.$t('accountManagement.role'), value: "", key: "role"},
          {name: this.$t('staffManagement.password'), value: "", key: "password"},
        ],
        roleOptions: [],
        editAccount: "",
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
              this.getAllUser();
              this.getRoles();
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
      handleDelete: function (index, rowData) {

      },
      getAllUser: function () {
        let pattern = /[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]/im;
        if (pattern.test(this.blurSearchInfo)) {
          alert(this.$t('departmentManagement.illegalChar'));
          this.blurSearchInfo = "";
          return;
        }
        this.userInfo = [];

        let pageInfo = new URLSearchParams;
        pageInfo.append("info", String(this.blurSearchInfo));
        axios
          .post('/api/advance/countSystemUser', pageInfo)
          .then(response => {
            if (response.data.status === 200) {
              this.total = response.data.data;
            } else {
              // 获取失败
              alert(this.$t('header.getPageNumberFail'));
            }
          });

        let info = new URLSearchParams;
        info.append("info", String(this.blurSearchInfo));
        info.append("pageNum", String(this.currentPageNum));
        info.append("pageMax", String("14"));
        axios
          .post('/api/advance/getSystemUser', info)
          .then(response => {
            if (response.data.status === 200) {
              // 获取成功
              let userinfo = response.data.data;
              let size = userinfo.length;
              for (let i = 0; i < size; i++) {
                userinfo[i].index = i;
                this.userInfo.push(userinfo[i]);
              }
            } else {
              // 获取失败
              alert(this.$t('accountManagement.getSysUserFail'));
            }

          })
      },

      editInfo: function (index) {
        this.editDetail[0].value = this.userInfo[index].roles;
        this.editAccount = this.userInfo[index].account;
        this.editVisible = true;
      },
      confirmEdition: function () {
        if (this.editDetail[1].value !== "") {
          if (/^[\x00-\xff]+$/.test(this.editDetail[1].value) == false) {
            alert(this.$t('accountManagement.passwordContainIllegalChar'));
            this.editDetail[1].value = "";
            return;
          }
        }
        let info = new URLSearchParams;
        info.append("account", String(this.editAccount));
        info.append("role", String(this.editDetail[0].value));
        info.append("password", String(this.editDetail[1].value));
        axios
          .post('/api/advance/changeUserInfo', info)
          .then(response => {
            if (response.data.status === 200) {
              alert(this.$t('accountManagement.editAccountSuccess'));
              this.editVisible = false;
              this.getAllUser();
            } else {
              // 获取失败
              alert(this.$t('accountManagement.editAccountFail'));
            }
          })
      },
      deleteUser: function (uid) {
        this.$confirm(this.$t('staffManagement.thisOperationWouldDeleteTheStaff'), this.$t('statistic.notice'), {
          confirmButtonText: this.$t('login.confirm'),
          cancelButtonText: this.$t('header.cancel'),
          type: 'warning'
        }).then(() => {
          let info = new URLSearchParams;
          info.append("uid", String(uid));
          axios
            .post('/api/staff/deleteStaff', info)
            .then(response => {
              if (response.data.status === 200) {
                alert(this.$t('staffManagement.deleteStaffSuccess'));
                this.getAllUser();
              } else {
                // 获取失败
                alert(this.$t('staffManagement.deleteStaffFail'));
              }
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: this.$t('holidayManagement.deleteCanceled')
          });
        });
      },
      handlePageChange: function () {
        this.getAllUser();
      },
      getRoles:function () {
        this.roleOptions = [];
        axios
          .get('/api/advance/getRoleOptions')
          .then(response => {
            if (response.data.status === 200) {
              let temp = response.data.data;
              let size = temp.length;
              // console.log(temp)
              for(let i = 0; i<size; i++){
                this.roleOptions.push(temp[i]);
              }
            } else {
              // 获取失败
              alert(this.$t('accountManagement.getSysUserFail'));
            }
          })
      }
    }
  }

</script>

<style scoped>
  #choosePage {
    z-index: 5;
    position: absolute;
    left: 350px;
    top: 837px;
  }

  #total {
    height: 1000px;
  }

  #searchLabel2 {
    position: absolute;
    top: 30px;
    left: 5px;
  }

  #searchInput2 {
    position: absolute;
    top: 21px;
    left: 85px;
    width: 200px;
  }


  #table {
    position: absolute;
    top: 90px;
    left: 0;
    width: 100%;
    height: 1000px;
  }

  #editLabel {
    position: absolute;
    left: 110px;
    top: 80px;
  }

  #editLabel2 {
    position: absolute;
    left: 110px;
    top: 140px;
  }

  #editContent {
    position: absolute;
    left: 210px;
    top: 70px;
  }

  #editContent2 {
    position: absolute;
    left: 210px;
    top: 130px;
  }

  #editSubInfoBut {
    position: absolute;
    left: 197px;
    top: 204px;
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

  .editSystemUser .el-dialog {
    height: 270px !important;
    width: 530px !important;
  }

  .but .el-button:hover {
    background-color: #b2da1d !important;
  }

  .but2 .el-button {
    background-color: #a7da38 !important;
  }

</style>
