<template>
  <div>
    <el-row id="offSet">
      <el-col id="total" :span="16" :offset="4">
        <div id="content" @keydown.enter="postlogin">
          <el-row>
            <el-col id="accountInput">
              <input
                type="text"
                class="input1"
                :placeholder="$t('login.pleaseEnterAccount')"
                v-model="account">
              </input>
            </el-col>
          </el-row>
          <el-row>
            <el-col id="passwordInput">
              <input
                type="password"
                class="input1"
                :placeholder="$t('login.pleaseEnterPassword')"
                v-model="password"
                show-password>
              </input>
            </el-col>
          </el-row>

          <el-row>
            <el-button round id="loginButton" @click="postlogin">
              <svg width="80" height="30" viewBox="0 0 80 30" id="loginButtonWord">
                <text font-family="'Helvetica Neue','PingFang SC','microsoft yahei'" fill="#FFFFFF" font-size="15" x="0"
                      y="1em">
                  {{this.$t('login.signIn')}}
                </text>
              </svg>
            </el-button>
          </el-row>

          <el-row>
            <svg width="180" height="50" viewBox="0 0 180 50" id="title">
              <text font-family="'Helvetica Neue','PingFang SC','microsoft yahei'" fill="#b5da47" font-size="35" x="0"
                    y="1em">
                {{this.$t('login.title')}}
              </text>
            </svg>
          </el-row>

          <el-row id="forgetPassword" class="showDialogFather">
            <el-button @click="findPassVisible = true">
              <svg width="60" height="18" viewBox="0 0 60 18">
                <text font-family="'Helvetica Neue','PingFang SC','microsoft yahei'" fill="#b5da47" font-size="14" x="0"
                      y="1em">
                  {{this.$t('login.forgetPassword')}}
                </text>
              </svg>
            </el-button>
          </el-row>

          <el-row>
            <el-checkbox id="rememberAccount" v-model="remember">{{this.$t('login.rememberAccount')}}</el-checkbox>
          </el-row>


        </div>
        <img id="personImage" width="750px" :src=this.personUrl class="banner_img"/>
      </el-col>

      <el-row class="forgetPass">
        <el-dialog :title="$t('login.findPassword')" :visible.sync="findPassVisible" @close="clearPassInfo">
          <el-row id="forgetLabel1">
            <svg width="300" height="37" viewBox="0 0 300 37">
              <text font-family="'Helvetica Neue','PingFang SC','microsoft yahei'" fill="#737470" font-size="15"
                    x="0"
                    y="1em">
                {{this.$t('login.pleaseEnterAccount')}}
              </text>
            </svg>
          </el-row>

          <el-row id="forgetContent1">
          <el-input  v-model="forgetAccount" :disabled="getCodeDisabled" placeholder="请输入内容"></el-input>
          </el-row>
          <el-row id="forgetLabel2">
            <svg width="300" height="37" viewBox="0 0 300 37">
              <text font-family="'Helvetica Neue','PingFang SC','microsoft yahei'" fill="#737470" font-size="15"
                    x="0"
                    y="1em">
                {{this.$t('login.pleaseEnterVerifyCode')}}
              </text>
            </svg>
          </el-row>

          <el-row id="forgetContent2">
            <el-input v-model="inputCode" :disabled="confirmCodeDisabled" :placeholder="$t('header.pleaseEnter')"></el-input>
          </el-row>

          <div id="getCode" class="but2">
            <el-button style="width: 120px" :disabled="getCodeDisabled" @click="getVerifyCode">{{this.$t('login.getVerifyCode')}}</el-button>
          </div>

          <div id="subCode" class="but2">
            <el-button style="width: 120px" :disabled="confirmCodeDisabled" @click="confirmVerifyCode">{{this.$t('login.confirm')}}</el-button>
          </div>
        </el-dialog>
      </el-row>
    </el-row>

    <canvas id="backGroundLayer2" width="1920" height="1080" style="width: 100%;height: 100%; min-width: 1180px; min-height: 720px">
      {{this.$t('header.doNotSupportCanvas')}}
    </canvas>
    <canvas id="particleLayer" width="1920" height="1080" style="width: 100%;height: 100%; min-width: 1180px; min-height: 720px" @mousemove="touchmove">
      {{this.$t('header.doNotSupportCanvas')}}
    </canvas>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: "Login",

    data() {
      return {
        message: '',
        timer: null,
        particalList: [],
        partNum: 60,
        radius: 1,
        lineRadius: 75 * 75,
        moveSpeed: 2.5,
        mouse_x: 0,
        mouse_y: 0,
        account: "",
        password: "",
        remember: false,
        personUrl: require('../assets/images/Login/beijing.png'),
        backGroundUrl: require('../assets/images/Login/di.png'),
        findPassVisible: false,
        verifyCode: "",
        forgetAccount: "",
        inputCode: "",
        getCodeDisabled: false,
        confirmCodeDisabled: true,
        uid:"",
      }
    },

    mounted() {
      let myc = document.getElementById("particleLayer");
      for (let i = 0; i < this.partNum; i++) {
        let tempPart = {
          x: Math.random() * myc.width,
          y: Math.random() * myc.height,
          // move speed
          ax: Math.random() * this.moveSpeed + 1,
          ay: Math.random() * this.moveSpeed + 1,
        };
        this.particalList.push(tempPart);
      }

      this.start();
      this.drawBackGround();
    },

    created() {
      clearInterval(this.timer);
      this.timer = null;
    },

    destroyed() {
      clearInterval(this.timer);
      this.timer = null;
    },

    methods: {

      touchmove(e) {
        this.mouse_x = e.offsetX / pageWidth * 1920;
        this.mouse_y = e.offsetY / pageHeight * 1080;
        //console.log(this.mouse_x+"  "+this.mouse_y)
      },

      drawBackGround: function () {
        let back2 = document.getElementById("backGroundLayer2");
        let backC2 = back2.getContext("2d");
        backC2.fillStyle = '#71a71c';
        backC2.beginPath();
        backC2.fillRect(0, 0, 1920, 1080);
        backC2.closePath();

        backC2.save();
        backC2.scale(1.2, 1.5);
        // draw circle which will be stretched into an oval
        backC2.beginPath();
        backC2.fillStyle = '#80bf1d';
        backC2.arc(100, 80, 350, 0, 2 * Math.PI, false);
        backC2.fill();
        backC2.restore();

        backC2.save();
        backC2.scale(1.7, 1.5);
        // draw circle which will be stretched into an oval
        backC2.beginPath();
        backC2.fillStyle = '#80bf1d';
        backC2.arc(1000, 800, 350, 0, 2 * Math.PI, false);
        backC2.fill();
        backC2.restore();

      },

      start: function (val) {
        if (this.timer == null) {
          this.timer = setInterval(() => {
            this.drawPoint();
          }, 1000 / 50)
        }

      },

      drawPoint: function () {
        let myc = document.getElementById("particleLayer");
        let ctx = myc.getContext("2d");

        //1. 先把画布清空

        ctx.clearRect(0, 0, myc.width, myc.height);
        // 画所有的元素
        for (let i = 0; i < this.partNum; i++) {
          //console.log(this.particalList[i].x);
          //创建一张新的玻璃纸
          ctx.beginPath();
          ctx.strokeStyle = '#ffffff';
          ctx.arc(this.particalList[i].x, this.particalList[i].y, this.radius, 0, Math.PI * 2, true);
          ctx.stroke();
          ctx.closePath();
        }

        // draw line between particle
        for (let i = 0; i < this.partNum; i++) {
          for (let j = i + 1; j < this.partNum; j++) {
            let x_dis = (this.particalList[i].x - this.particalList[j].x) * (this.particalList[i].x - this.particalList[j].x);
            let y_dis = (this.particalList[i].y - this.particalList[j].y) * (this.particalList[i].y - this.particalList[j].y);
            if (x_dis + y_dis <= this.lineRadius) {
              ctx.beginPath();
              ctx.strokeStyle = '#ffffff';
              ctx.moveTo(this.particalList[i].x, this.particalList[i].y);
              ctx.lineTo(this.particalList[j].x, this.particalList[j].y);
              ctx.stroke();
              ctx.closePath();
            }
          }


          let x_dis = (this.particalList[i].x - this.mouse_x) * (this.particalList[i].x - this.mouse_x);
          let y_dis = (this.particalList[i].y - this.mouse_y) * (this.particalList[i].y - this.mouse_y);
          if (x_dis + y_dis <= this.lineRadius) {
            ctx.beginPath();
            ctx.strokeStyle = '#ffffff';
            ctx.moveTo(this.particalList[i].x, this.particalList[i].y);
            ctx.lineTo(this.mouse_x, this.mouse_y);
            ctx.stroke();
            ctx.closePath();
          }
        }

        // move
        for (let i = 0; i < this.partNum; i++) {
          this.particalList[i].x = this.particalList[i].x + this.particalList[i].ax;
          this.particalList[i].y = this.particalList[i].y + this.particalList[i].ay;
          if (this.particalList[i].x <= 0 || this.particalList[i].x >= myc.width) {
            this.particalList[i].ax = this.particalList[i].ax * (-1);
          }
          if (this.particalList[i].y <= 0 || this.particalList[i].y >= myc.height) {
            this.particalList[i].ay = this.particalList[i].ay * (-1);
          }
        }

      },


      postlogin: function () {
        let info = new URLSearchParams;
        info.append("account", String(this.account));
        info.append("password", String(this.password));
        axios
          .post('/api/login', info)
          .then(response => {
            // 展示这个主界面上的操作内容，否则是隐藏状态的
            if (response.data.ok) {
              this.verify();
            } else {
              alert(this.$t('login.loginInFail'));
            }
          })
          .catch(function (error) { // 请求失败处理
            console.log(error);
          })

      },
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
              this.account = response.data.data[0].account;
              this.getLoginInUserRole();
            } else {
              // 获取失败
              alert(this.$t('header.getLoginInfoFail'));
            }
          })
      },
      getLoginInUserRole: function () {
        let info = new URLSearchParams;
        info.append("account", String(this.account));
        axios
          .post('/api/clockInInfo/getLoginUserRole', info)
          .then(response => {
            if (response.data.status === 200) {
              localStorage.setItem("role",response.data.data)
              this.$router.push("/");
            } else {
              // 获取失败
              alert(this.$t('header.getLoginInfoFail'));
            }
          })
      },
      clearPassInfo: function () {
        this.verifyCode = "";
        this.forgetAccount = "";
        this.inputCode = "";
        this.confirmCodeDisabled = true;
        this.getCodeDisabled = false;
      },
      getVerifyCode:function () {
        if(this.forgetAccount !== null && this.forgetAccount !== ""){

          let info = new URLSearchParams;
          info.append("account", String(this.forgetAccount));
          axios
            .post('/getVerifyCode', info)
            .then(response => {
              if (response.data.status === 200) {
                alert(response.data.msg);
                this.verifyCode = response.data.data;
                this.getCodeDisabled = true;
                this.confirmCodeDisabled = false;
              } else {
                // 获取失败
                alert(response.data.msg);
              }
            })
        }else{
          alert(this.$t('login.pleaseEnterAccount'));
          return;
        }
      },
      confirmVerifyCode:function () {
        if(this.inputCode === this.verifyCode){
          // 重置密码
          let info = new URLSearchParams;
          info.append("account", String(this.forgetAccount));
          axios
            .post('/reSetPassword', info)
            .then(response => {
              if (response.data.status === 200) {
                alert(response.data.msg);
                this.clearPassInfo();
              } else {
                // 获取失败
                alert(response.data.msg);
              }
            })
        }else{
          alert(this.$t('login.verifyCodeIsWrongPleaseReTakeOne'));
          this.clearPassInfo();
        }
      }

    },
  }
  var pageWidth = window.innerWidth
    || document.documentElement.clientWidth
    || document.body.clientWidth;
  var pageHeight = window.innerHeight
    || document.documentElement.clientHeight
    || document.body.clientHeight;

  window.onresize = function () {
    pageWidth = window.innerWidth
      || document.documentElement.clientWidth
      || document.body.clientWidth;

    pageHeight = window.innerHeight
      || document.documentElement.clientHeight
      || document.body.clientHeight;

    //页面进行刷新
    //drawBackGround();
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
    position: absolute;
    top: 0;
  }

  #particleLayer {
    position: absolute;
    z-index: -5;
    top: 0;
    left: 0;
  }

  #backGroundLayer2 {
    position: absolute;
    z-index: -6;
    left: 0;
    top: 0;
  }

  #accountInput {
    position: absolute;
    top: 300px;
    left: 510px;
    width: 210px;
    height: 30px;
  }

  #passwordInput {
    position: absolute;
    top: 350px;
    left: 510px;
    width: 210px;
    height: 30px;
  }

  #loginButton {
    position: absolute;
    top: 450px;
    left: 545px;
    width: 120px;
    height: 30px;
    background-color: #b0d647;
  }

  #loginButtonWord {
    position: absolute;
    top: 5px;
    left: 45px;
    z-index: 1;
  }

  #rememberAccount {
    position: absolute;
    top: 405px;
    left: 510px;
    color: #b0d647;
  }

  #title {
    position: absolute;
    top: 225px;
    left: 516px;
  }

  #forgetPassword {
    position: absolute;
    top: 405px;
    left: 645px;
    color: #b0d647;
  }

  #personImage {
    position: absolute;
    top: 105px;
    left: 0;
    z-index: -4;
  }

  input {
    border: none;
    outline: none;
    border-bottom: #c0c0c0 1px solid;
    width: 180px;
    height: 30px;
  }

  input:focus {
    border: none;
    outline: none;
    border-bottom: #b0d647 1px solid;
    width: 180px;
    height: 30px;
  }

  /* WebKit browsers */
  input::-webkit-input-placeholder {
    color: #C0C0C0;
    font-size: 14px;
  }

  /* Mozilla Firefox 4 to 18 */
  input:-moz-placeholder {
    color: #C0C0C0;
    opacity: 1;
    font-size: 14px;
  }

  /* Mozilla Firefox 19+ */
  input::-moz-placeholder {
    color: #C0C0C0;
    opacity: 1;
    font-size: 14px;
  }

  /* Internet Explorer 10+ */
  input:-ms-input-placeholder {
    color: #C0C0C0;
    font-size: 14px;
  }

  #forgetLabel1 {
    position: absolute;
    top: 60px;
    left: 60px;
  }

  #forgetLabel2 {
    position: absolute;
    top: 150px;
    left: 60px;
  }

  #forgetContent1 {
    position: absolute;
    top: 90px;
    left: 60px;
  }

  #forgetContent2 {
    position: absolute;
    top: 180px;
    left: 60px;
  }

  #getCode{
    position: absolute;
    top: 90px;
    left: 290px;
  }

  #subCode{
    position: absolute;
    top: 180px;
    left: 290px;
  }
</style>

<style>
  .forgetPass .el-dialog {
    height: 270px !important;
    width: 468px !important;
  }

  .showDialogFather .el-button {
    border: none !important;
    margin: 0 !important;
    padding: 0 !important;
  }

  .but2 .el-button {
    background-color: #a7da38 !important;
  }
</style>
