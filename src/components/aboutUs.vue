<template>
  <div>
    <el-row id="offSet">
      <el-row id="total">
        <el-col>
          <div id="content">
            <Header></Header>

              <p>我也不知道写点啥</p>

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
  import Header from '../components/Header'
  import Bottom from "../components/Bottom";
  export default {
    name: "aboutUs",
    components:{
      Bottom,
      Header
    },
    data(){
      return{
        account: "",
        name: "name",
        position: "position",
        work_id: "work_id",
        uid:"",
      }
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
</script>

<style scoped>
  #bottom {
    top:600px;
  }

  #offSet {
    min-width: 1140px;
    position: absolute;
    top: 0;
    padding-left: calc((100% - 1140px) / 2)
  }

  #total {
    width: 1140px;
  }

</style>
