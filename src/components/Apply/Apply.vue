<template>
  <div>
    <el-row id="offSet">
    <el-row id="total">
      <el-col>
        <div id="content">
          <Header></Header>


          <el-row id="selectorHead" class="selectorPanelAll">
            <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick" >
              <el-tab-pane id="firstPanel" class="selectorPanel" :label="$t('apply.myApply')" name="fourth"><MyApply></MyApply></el-tab-pane>
              <el-tab-pane class="selectorPanel" :label="$t('apply.makeUpApply')" name="first"><MakeUpApply></MakeUpApply></el-tab-pane>
              <el-tab-pane class="selectorPanel" :label="$t('apply.changeDayOffApply')" name="second"><ChangeDayOffApply></ChangeDayOffApply></el-tab-pane>
              <el-tab-pane class="selectorPanel" :label="$t('apply.ExtraWorkApply')" name="third"><ExtraWorkApply></ExtraWorkApply></el-tab-pane>
              <el-tab-pane class="selectorPanel" :label="$t('apply.reviewApply')" name="fifth"><ReviewApply></ReviewApply></el-tab-pane>
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
  import MakeUpApply from "../Apply/MakeUpApply";
  import ChangeDayOffApply from "../Apply/ChangeDayOffApply";
  import ExtraWorkApply from "../Apply/ExtraWorkApply";
  import MyApply from "../Apply/MyApply"
  import ReviewApply from "../Apply/ReviewApply"

  export default {
    name: "apply",

    components: {
      Bottom,
      Header,
      MakeUpApply,
      ChangeDayOffApply,
      ExtraWorkApply,
      MyApply,
      ReviewApply
    },
    data() {
      return {
        account: "",
        name: "name",
        position: "position",
        work_id: "work_id",
        uid: "",
        activeName: 'fourth'
      }
    },
    created() {

    },

    mounted() {
      this.verify();
    },
    methods: {
      handleClick(tab, event) {

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
  #bottom {
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

  #selectorHead{
    width: 1140px;
  }

  .selectorPanel{
    width:80px;

  }

  #firstPanel{

  }
</style>

<style>
  .el-tabs__item.is-active{
    color: #5daf34 !important;
  }

  .el-tabs__item:hover{
    color: #5daf34 !important;
  }
</style>
