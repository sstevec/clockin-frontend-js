<template>
  <div>
    <el-row id="topBar" style="width: 100%">
      <svg width="150" height="80" viewBox="0 0 150 80" id="title">
        <text font-family="'Helvetica Neue','PingFang SC','microsoft yahei'" fill="#b0d647" font-size="1.7em" x="0"
              y="1em">
          {{this.$t('header.title')}}
        </text>
      </svg>
      <img id="userLogo" ref="imgHeight" :src=this.userLogoUrl class="banner_img"/>

      <el-col style="width:100%">
        <el-menu
          id="menu"
          :default-active="activeIndex2"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#b0d647"
          v-if="showAdvance">
          <el-menu-item index="1" class="menuSelection2" style="font-size: 1em;"><p>{{this.$t('header.home')}}</p></el-menu-item>
          <el-menu-item index="2" class="menuSelection2" style="font-size: 1em"><p>{{this.$t('header.apply')}}</p></el-menu-item>
          <el-menu-item index="3" class="menuSelection2" style="font-size: 1em"><p>{{this.$t('header.statistic')}}</p></el-menu-item>
        </el-menu>

        <el-menu
          id="menu2"
          :default-active="activeIndex2"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#b0d647"
          v-else="showAdvance">
          <el-menu-item index="1" class="menuSelection" style="font-size: 1em;"><p>{{this.$t('header.home')}}</p></el-menu-item>
          <el-menu-item index="2" class="menuSelection" style="font-size: 1em"><p>{{this.$t('header.apply')}}</p></el-menu-item>
          <el-menu-item index="3" class="menuSelection" style="font-size: 1em"><p>{{this.$t('header.statistic')}}</p></el-menu-item>
          <el-menu-item index="5" class="menuSelection" style="font-size: 1em" ><p>{{this.$t('header.advance')}}</p></el-menu-item>
        </el-menu>
      </el-col>

      <el-col id="topSelector">
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            <svg width="100" height="20" viewBox="0 0 100 20">
        <text font-family="'Helvetica Neue','PingFang SC','microsoft yahei'" fill="#FFFFFF" font-size="0.9em" x="0"
              y="1em">
          {{this.account}}
        </text>
      </svg>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="showPersonalInfo">{{this.$t('header.personInfo')}}</el-dropdown-item>
            <el-dropdown-item command="showChangePassword">{{this.$t('header.changePass')}}</el-dropdown-item>
            <el-dropdown-item divided>{{this.$t('header.help')}}</el-dropdown-item>
            <el-dropdown-item>{{this.$t('header.aboutUs')}}</el-dropdown-item>
            <el-dropdown-item command="logOut" divided>{{this.$t('header.signOut')}}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>

      <el-col id="lanSelector">
        <el-dropdown @command="handleCommand2">
          <span class="el-dropdown-link">
            <svg width="44" height="20" viewBox="0 0 44 20">
        <text font-family="'Helvetica Neue','PingFang SC','microsoft yahei'" fill="#FFFFFF" font-size="0.9em" x="0"
              y="1em">
          {{this.$t('header.lang')}}
        </text>
      </svg>
          </span>
          <el-dropdown-menu class="lanChoose" slot="dropdown">
            <el-dropdown-item command="chinese">中文</el-dropdown-item>
            <el-dropdown-item command="chineseComp" divided>繁體</el-dropdown-item>
            <el-dropdown-item command="english" divided>English</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>
    <!------------------------------------------------导航栏------------------------------------------------------->

    <el-row id="detailInfoTable" class="header">
      <el-dialog :title="$t('header.personInfo')" :visible.sync="showPersonalInfoShow" @close="disabled = true">

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

        <el-row id="formContent">
          <div v-for="item in detailInfoEditable">
            <el-row style="height: 53px">
              <el-input :disabled="disabled" v-model="item.value" maxlength="30" @blur="checkValid"
                        :placeholder="$t('header.pleaseEnter')"></el-input>
            </el-row>
          </div>
        </el-row>

        <div class="headerDialog" id="dialogButtons">
          <el-button icon="el-icon-edit" style="width:60px;height: 20px" @click="edit">{{this.$t('header.change')}}</el-button>
        </div>

        <el-row id="saveBut" class="saveButton">
          <el-button v-if="!disabled" style="width: 150px" @click="save">{{this.$t('header.saveChange')}}</el-button>
        </el-row>

        <el-row id="cancelBut" class="saveButton">
          <el-button v-if="!disabled" style="width: 150px" @click="cancel">{{this.$t('header.cancel')}}</el-button>
        </el-row>
      </el-dialog>
    </el-row>


    <el-row id="changePasswordTable" class="changePass">
      <el-dialog :title="$t('header.changePass')" :visible.sync="showChangePasswordShow" @close="clearChangePass">

        <svg id="oldPassInfo" width="120" height="80" viewBox="0 0 120 80">
          <text font-family="'Helvetica Neue','PingFang SC','microsoft yahei'" fill="#737470" font-size="13"
                x="0"
                y="1em">
            {{this.$t('header.pleaseCareUpperCase')}}
          </text>
        </svg>

        <svg id="strength" width="120" height="80" viewBox="0 0 120 80">
          <text font-family="'Helvetica Neue','PingFang SC','microsoft yahei'" fill="#737470" font-size="13"
                x="0"
                y="1em">
            {{this.$t('header.strength')}}
          </text>
        </svg>

        <svg id="newPassInfo" width="120" height="80" viewBox="0 0 120 80">
          <text font-family="'Helvetica Neue','PingFang SC','microsoft yahei'" fill="#737470" font-size="13"
                x="0"
                y="1em">
            {{this.$t('header.pleaseKeepThePassSame')}}
          </text>
        </svg>

        <el-row id="strengthBar">
          <el-progress :percentage="percentage" :color="customColors"></el-progress>
        </el-row>

        <el-row id="changePassLabel">
          <div v-for="item in passwordLabel">
            <el-row style="height: 90px;">
              <svg width="300" height="48" viewBox="0 0 300 48">
                <text font-family="'Helvetica Neue','PingFang SC','microsoft yahei'" fill="#737470" font-size="15"
                      x="0"
                      y="1em">
                  {{item.name}}
                </text>
              </svg>
            </el-row>
          </div>
        </el-row>

        <el-row id="changePass">
          <div v-for="item in passwordContent">
            <el-row style="height: 90px">
              <el-input v-model="item.value" :placeholder="$t('header.pleaseEnter')" maxlength="16" @blur="checkPassStrength"></el-input>
            </el-row>
          </div>
        </el-row>

        <el-row id="subBut" class="saveButton">
          <el-button style="width: 200px" @click="subChange">{{this.$t('header.saveChange')}}</el-button>
        </el-row>
      </el-dialog>
    </el-row>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: "Header",

    data() {
      return {
        showAdvance:true,
        activeIndex2: '',
        userLogoUrl: require('../assets/images/HomePage/bt_touxiang.png'),
        account: "",
        name: "name",
        position: "position",
        work_id: "work_id",
        uid: "",
        showPersonalInfoShow: false,
        showChangePasswordShow: false,
        detailInfo: [],
        detailInfoEditable: [],
        tel: "",
        email: "",
        disabled: true,
        passwordLabel: [
          {name: this.$t('header.oldPass')},
          {name: this.$t('header.newPass')},
          {name: this.$t('header.newPassAgain')},],
        passwordContent: [
          {value: ""},
          {value: ""},
          {value: ""},],
        percentage: 0,
        customColors: [
          {color: '#f56c6c', percentage: 20},
          {color: '#e6a23c', percentage: 40},
          {color: '#5cb87a', percentage: 60},
          {color: '#31fa14', percentage: 80}
        ],
      }
    },
    created() {

    },

    mounted() {
      let role = localStorage.getItem("role");
      if(role !== "user"){
       this.showAdvance = false;
      }
      this.verify();
      this.activeIndex();
      this.changeLan();
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
        if (key === "6") {
          this.$router.push("/aboutUs");
        }
      }, verify: function () {
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
              this.detailInfo = [];
              this.detailInfoEditable = [];
              this.name = response.data.data[0].name;
              this.position = response.data.data[0].position;
              this.work_id = response.data.data[0].work_id;
              this.account = response.data.data[0].account;
              this.tel = response.data.data[0].tel;
              this.email = response.data.data[0].email;
              this.detailInfo.push({name: this.$t('header.uid'), value: this.uid});
              this.detailInfo.push({name: this.$t('header.account'), value: this.account});
              this.detailInfo.push({name: this.$t('header.workID'), value: this.work_id});
              this.detailInfo.push({name: this.$t('header.position'), value: this.position});
              this.detailInfo.push({name: this.$t('header.tel')});
              this.detailInfo.push({name: this.$t('header.email')});
              this.detailInfoEditable.push({name: this.$t('header.tel'), value: this.tel});
              this.detailInfoEditable.push({name: this.$t('header.email'), value: this.email});
            } else {
              // 获取失败
              alert(this.$t('header.getLoginInfoFail'));
            }
          })
      },

      activeIndex: function () {
        let url = this.$route.path;
        if (url === "/") {
          this.activeIndex2 = "1";
        } else if (url === "/apply") {
          this.activeIndex2 = "2";
        } else if (url === "/statistic") {
          this.activeIndex2 = "3";
        } else if (url === "/advanceManagement") {
          this.activeIndex2 = "5";
        }
      },
      handleCommand(command) {
        if (command === "showPersonalInfo") {
          this.showPersonalInfoShow = true;
        } else if (command === "showChangePassword") {
          this.showChangePasswordShow = true;
        } else if (command === "logOut") {
          this.logout();
        }
      },
      handleCommand2(command) {
        if (command === "chinese") {
          localStorage.setItem("language","zh");
        } else if (command === "chineseComp") {
          localStorage.setItem("language","zhc");
        } else if (command === "english") {
          localStorage.setItem("language","en");
        }
        this.$router.push("/");
        this.$router.go(0);
      },
      edit: function () {
        this.disabled = false;
      },
      save: function () {
        if (/^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/.test(this.detailInfoEditable[1].value) == false) {
          alert(this.$t('header.pleaseEnterCorrectEmail'));
          return;
        }
        if (/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.detailInfoEditable[0].value) == false) {
          alert(this.$t('header.pleaseEnterCorrectPhoneNumber'));
          return;
        }

        let info = new URLSearchParams;
        info.append("formName", String("员工表"));
        info.append("info", JSON.stringify({tel: this.tel, email: this.email}));
        info.append("uid", String(this.uid));
        axios
          .post('/api/staff/changeRow', info)
          .then(response => {
            if (response.data.status === 200) {
              alert(this.$t('header.changeSuccess'));
              this.tel = this.detailInfoEditable[0].value;
              this.email = this.detailInfoEditable[1].value;
              this.showPersonalInfoShow = false;
            } else {
              // 获取失败
              alert(response.data.msg);
            }
          })
      },
      subChange: function () {
        if (this.passwordContent[0].value === "" || this.passwordContent[1].value === "" || this.passwordContent[2].value === "") {
          alert(this.$t('header.pleaseEnterAllInformation'));
          return;
        } else if (this.passwordContent[1].value !== this.passwordContent[2].value) {
          alert(this.$t('header.twoPasswordAreNotTheSame'));
          return;
        }
        let info = new URLSearchParams;
        info.append("account", String(this.account));
        info.append("oldPassword", String(this.passwordContent[0].value));
        info.append("newPassword", String(this.passwordContent[1].value));
        axios
          .post('/api/changePassword', info)
          .then(response => {
            if (response.data.status === 200) {
              alert(response.data.msg);
              this.$router.push("/login");
            } else {
              // 获取失败
              alert(response.data.msg);
            }

          })
      },
      checkPassStrength: function () {
        let newPassword = this.passwordContent[1].value;
        if (newPassword !== null && newPassword !== "") {
          if (/^[\x00-\xff]+$/.test(newPassword) == false) {
            alert(this.$t('header.containIllegalChar'));
            this.passwordContent[1].value = "";
            this.percentage = 0;
            return;
          }
          let len = newPassword.length;
          if (len > 16 || len < 6) {
            alert(this.$t('header.passLengthError'));
            this.passwordContent[1].value = "";
            this.percentage = 0;
            return;
          }
          let score = 30 * len / 16;
          for (let i = 0; i < len; i++) {
            let c = newPassword.charCodeAt(i);
            if (c >= 48 && c <= 57) {
              //数字
              score++;
            } else if (c >= 65 && c <= 90) {
              //大写字母
              score = score + 3;
            } else if ((c >= 97 && c <= 122)) {
              //小写字母
              score = score + 2.2;
            } else {
              score = score + 4;
            }
          }
          this.percentage = Number(score.toString().substring(0, 4));
        }
      },
      clearChangePass: function () {
        this.percentage = 0;
        this.passwordContent[0].value = "";
        this.passwordContent[1].value = "";
        this.passwordContent[2].value = "";
      },
      logout: function () {
        axios
          .get('/api/logout')
          .then(response => {
            if (response.data.status === 200) {
              alert(response.data.msg);
              this.$router.push(response.data.data);
            } else {
              // 获取失败
              alert(response.data.msg);
            }

          })
      },
      checkValid: function () {
        if (/^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/.test(this.detailInfoEditable[1].value) == false) {
          alert(this.$t('header.pleaseEnterCorrectEmail'));
          this.detailInfoEditable[1].value = "";
          return;
        }
        if (/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.detailInfoEditable[0].value) == false) {
          alert(this.$t('header.pleaseEnterCorrectPhoneNumber'));
          this.detailInfoEditable[0].value = "";
          return;
        }
      },
      cancel: function () {
        this.detailInfoEditable[0].value = this.tel;
        this.detailInfoEditable[1].value = this.email;
        this.showPersonalInfoShow = false;
      },
      changeLan:function () {
        this.$i18n.locale = localStorage.getItem("language");
      }
    }
  }

</script>

<style scoped>

  p {
    margin: 0.3vw;
  }

  .el-carousel__item h3 {
    color: #475669;
    opacity: 0.75;
    line-height: 60px;
    margin: 0;
  }

  #menu {
    /*float: top;*/
    height: 60px;
    margin: 0;
    border-bottom: 2px solid transparent;
  }

  .menuSelection {
    left: 28%;
    width: 11%;
    height: 60px;
  }
  .menuSelection2 {
    left: 28%;
    width: 14%;
    height: 60px;
  }

  #userLogo {
    position: absolute;
    left: 79%;
    top: 16px;
    width: 3%;
    z-index: 1;
  }


  #title {
    position: absolute;
    left: 5%;
    top: 15px;
    z-index: 1;
  }

  #topSelector {
    position: absolute;
    left: 83.5%;
    top: 25px;
    width: 120px;
    z-index: 2;
  }

  #lanSelector {
    position: absolute;
    left: 89.5%;
    top: 25px;
    width: 120px;
    z-index: 2;
  }

  #userIcon {
    position: absolute;
    left: 110px;
    top: 80px;
  }

  #formNameLabel {
    position: absolute;
    left: 170px;
    top: 90px;
  }

  #dialogButtons {
    position: absolute;
    left: 450px;
    top: 90px;
  }

  #formContentLabel {
    position: absolute;
    left: 110px;
    top: 147px;
    height: 300px;
  }

  #formContent {
    position: absolute;
    left: 152px;
    top: 344px;
    height: 300px;
    width: 200px;
  }

  #saveBut {
    position: absolute;
    left: 122px;
    top: 494px;
  }

  #cancelBut {
    position: absolute;
    left: 332px;
    top: 494px;
  }

  #changePassLabel {
    position: absolute;
    left: 110px;
    top: 87px;
    height: 300px;
  }

  #changePass {
    position: absolute;
    left: 110px;
    top: 111px;
    height: 300px;
  }

  #subBut {
    position: absolute;
    left: 200px;
    top: 371px;
  }

  #oldPassInfo {
    position: absolute;
    left: 340px;
    top: 131px;
  }

  #strength {
    position: absolute;
    left: 340px;
    top: 211px;
  }

  #strengthBar {
    position: absolute;
    left: 365px;
    top: 212px;
    width: 150px;
  }

  #newPassInfo {
    position: absolute;
    left: 340px;
    top: 311px;
  }
</style>

<style>
  .header .el-dialog {
    height: 600px !important;
    width: 600px !important;
  }

  .changePass .el-dialog {
    height: 470px !important;
    width: 600px !important;
  }

  .headerDialog .el-button {
    border: none !important;
    margin: 0 !important;
    padding: 0 !important;
  }

  .saveButton .el-button {
    background-color: #a7da38 !important;
  }

  .lanChoose .el-dropdown-menu__item{
    margin: 0!important;
  }
</style>

