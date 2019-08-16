<template>
  <div>
    <el-col id="total" :span="16" :offset="4">
      <div id="content">

        <el-row id="topBar" style="width: 1920px">
          <svg width="300" height="80" viewBox="0 0 300 80" id="title">
            <text font-family="'Helvetica Neue','PingFang SC','microsoft yahei'" fill="#b0d647" font-size="40" x="0"
                  y="1em">
              考勤打卡
            </text>
          </svg>
          <img id="userLogo" ref="imgHeight" :src=this.userLogoUrl class="banner_img"/>
          <svg width="600" height="80" viewBox="0 0 600 80" id="userAccountWord">
            <text font-family="'Helvetica Neue','PingFang SC','microsoft yahei'" fill="#FFFFFF" font-size="25" x="0"
                  y="1em">
              {{this.account}}
            </text>
          </svg>
          <el-col :span="24">
            <el-menu
              id="menu"
              :default-active="activeIndex2"
              class="el-menu-demo"
              mode="horizontal"
              @select="handleSelect"
              background-color="#545c64"
              text-color="#fff"
              active-text-color="#b0d647">
              <el-menu-item index="1" class="menuSelection" style="font-size: 25px;"><p>首页</p></el-menu-item>
              <el-menu-item index="2" class="menuSelection" style="font-size: 25px"><p>申请</p></el-menu-item>
              <el-menu-item index="3" class="menuSelection" style="font-size: 25px"><p>统计</p></el-menu-item>
              <el-menu-item index="5" class="menuSelection" style="font-size: 25px"><p>高级管理</p></el-menu-item>
            </el-menu>
          </el-col>
        </el-row>
        <!------------------------------------------------导航栏------------------------------------------------------->






        <!-------------------------------------------------底部-------------------------------------------------------->
        <el-row id="bottom" type="flex">
          <el-col :offset="8">
            <li>
              <router-link to="/" class="linker">首页</router-link>
            </li>
          </el-col>
          <el-col>
            <li>
              <router-link to="/apply" class="linker">申请</router-link>
            </li>
          </el-col>
          <el-col>
            <li>
              <router-link to="/statistic" class="linker">统计</router-link>
            </li>
          </el-col>
          <el-col>
            <li>
              <router-link to="/advanceManagement" class="linker">高级管理</router-link>
            </li>
          </el-col>
        </el-row>
      </div>
      <canvas id="line" width="1920" height="1450">
        不支持Canvas
      </canvas>
    </el-col>
  </div>
</template>

<script>
  import axios from 'axios'
    export default {
        name: "companyInfo",

      data(){
        return{
          activeIndex2: '4',
          userLogoUrl: require('../../assets/images/HomePage/bt_touxiang.png'),
          account: "",
          name: "name",
          position: "position",
          work_id: "work_id",
        }
      },
      created() {
        this.verify()
      },

      mounted() {
        drawBackGround();
        this.verify();

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
          if (key === "4") {
            this.$router.push("/companyInfo");
          }
          if (key === "5") {
            this.$router.push("/advanceManagement");
          }
        },verify: function () {
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
              } else {
                // 获取失败
                alert(response.data.msg);
              }

            })
        },
      }
    }

  function drawBackGround() {
    let linec = document.getElementById("line");
    let lineContent = linec.getContext("2d");

    lineContent.clearRect(0, 0, lineContent.width, lineContent.height);

    // 画底部
    lineContent.fillStyle = '#32434D';
    lineContent.beginPath();
    lineContent.fillRect(0, 1270, 1920, 150);
    lineContent.closePath();
    lineContent.fillStyle = '#111828';
    lineContent.beginPath();
    lineContent.fillRect(0, 1420, 1920, 30);
    lineContent.closePath();

    // 画底部分割线
    lineContent.beginPath();
    lineContent.strokeStyle = '#ffffff';
    lineContent.moveTo(670, 1330);
    lineContent.lineTo(670, 1370);
    lineContent.stroke();
    lineContent.closePath();
    lineContent.beginPath();
    lineContent.strokeStyle = '#ffffff';
    lineContent.moveTo(870, 1330);
    lineContent.lineTo(870, 1370);
    lineContent.stroke();
    lineContent.closePath();
    lineContent.beginPath();
    lineContent.strokeStyle = '#ffffff';
    lineContent.moveTo(1050, 1330);
    lineContent.lineTo(1050, 1370);
    lineContent.stroke();
    lineContent.closePath();
    lineContent.beginPath();
    lineContent.strokeStyle = '#ffffff';
    lineContent.moveTo(1245, 1330);
    lineContent.lineTo(1245, 1370);
    lineContent.stroke();
    lineContent.closePath();
  }
</script>

<style scoped>
  #total {
    position: absolute;
    top: 0;
  }

  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  #menu {
    float: top;
    line-height: 60px;
    height: 110px;
    margin: 0;
    border-bottom: 2px solid transparent;
  }

  .menuSelection {
    left: 480px;
    width: 180px;
    height: 110px;
  }

  #line {
    z-index: -3;
    position: absolute;
    left: 0;
    top:710px;
  }
  #bottom {
    position: absolute;
    left: 0px;
    top: 2042px;
    width: 1420px;
  }

  .linker {
    font-size: 25px;
    color: aliceblue;
    text-decoration: none;
  }

  #userLogo {
    position: absolute;
    left: 1510px;
    top: 32px;
    z-index: 1;
  }

  #userAccountWord {
    position: absolute;
    left: 1580px;
    top: 40px;
    z-index: 1;
  }

  #title {
    position: absolute;
    left: 180px;
    top: 30px;
    z-index: 1;
  }
</style>
<!--lineContent.moveTo(pageWidth/5.69, pageHeight/7.11);-->
<!--lineContent.lineTo(pageWidth/1.313, pageHeight/7.11);-->
<!--lineContent.stroke();-->
<!--lineContent.closePath();-->
<!--lineContent.beginPath();-->
<!--lineContent.strokeStyle = '#020202';-->
<!--lineContent.moveTo(pageWidth/5.69, pageHeight/1.668);-->
<!--lineContent.lineTo(pageWidth/1.313, pageHeight/1.668);-->
