<template>
  <div>
    <!-------------------------------------------------底部-------------------------------------------------------->
    <el-row id="bottomLink2" type="flex" v-if="showAdvance">
      <el-col>
        <li>
          <router-link to="/" class="linker">{{this.$t('header.home')}}</router-link>
        </li>
      </el-col>
      <el-col>
        <li>
          <router-link to="/apply" class="linker">{{this.$t('header.apply')}}</router-link>
        </li>
      </el-col>
      <el-col>
        <li>
          <router-link to="/statistic" class="linker">{{this.$t('header.statistic')}}</router-link>
        </li>
      </el-col>
    </el-row>

    <el-row id="bottomLink" type="flex" v-else="showAdvance">
      <el-col>
        <li>
          <router-link to="/" class="linker">{{this.$t('header.home')}}</router-link>
        </li>
      </el-col>
      <el-col>
        <li>
          <router-link to="/apply" class="linker">{{this.$t('header.apply')}}</router-link>
        </li>
      </el-col>
      <el-col>
        <li>
          <router-link to="/statistic" class="linker">{{this.$t('header.statistic')}}</router-link>
        </li>
      </el-col>
      <el-col>
        <li>
          <router-link to="/advanceManagement" class="linker">{{this.$t('header.advance')}}</router-link>
        </li>
      </el-col>
    </el-row>
    <canvas id="bottomC" width="1920" height="200" style="width: 100%">
      {{this.$t('header.doNotSupportCanvas')}}
    </canvas>
  </div>
</template>

<script>

  export default {
    name: "Bottom",

    data() {
      return {
        screenWidth: 0,
        showAdvance: true,
        account: "",
        uid: "",
      }
    },
    mounted() {
      let role = localStorage.getItem("role");
      if (role !== "user") {
        this.showAdvance = false;
      }
      this.getScreenWidth();
    },
    methods: {
      getScreenWidth: function () {
        this.screenWidth = window.innerWidth
          || document.documentElement.clientWidth
          || document.body.clientWidth;
        this.drawBackGround();
      },
      drawBackGround: function () {
        let botc = document.getElementById("bottomC");
        let lineContent = botc.getContext("2d");

        lineContent.clearRect(0, 0, lineContent.width, lineContent.height);


        let width = this.screenWidth;
        // 画底部
        lineContent.fillStyle = '#32434D';
        lineContent.beginPath();
        lineContent.fillRect(0, 0, 1920, 150);
        lineContent.closePath();
        lineContent.fillStyle = '#111828';
        lineContent.beginPath();
        lineContent.fillRect(0, 150, 1920, 50);
        lineContent.closePath();

        if (this.showAdvance) {
// 画底部分割线
          lineContent.beginPath();
          lineContent.strokeStyle = '#ffffff';
          lineContent.moveTo(810, 30);
          lineContent.lineTo(810, 70);
          lineContent.stroke();
          lineContent.closePath();
          lineContent.beginPath();
          lineContent.strokeStyle = '#ffffff';
          lineContent.moveTo(1120, 30);
          lineContent.lineTo(1120, 70);
          lineContent.stroke();
          lineContent.closePath();
          lineContent.beginPath();
        } else {
          // 画底部分割线
          lineContent.beginPath();
          lineContent.strokeStyle = '#ffffff';
          lineContent.moveTo(720, 30);
          lineContent.lineTo(720, 70);
          lineContent.stroke();
          lineContent.closePath();
          lineContent.beginPath();
          lineContent.strokeStyle = '#ffffff';
          lineContent.moveTo(960, 30);
          lineContent.lineTo(960, 70);
          lineContent.stroke();
          lineContent.closePath();
          lineContent.beginPath();
          lineContent.strokeStyle = '#ffffff';
          lineContent.moveTo(1180, 30);
          lineContent.lineTo(1180, 70);
          lineContent.stroke();
          lineContent.closePath();
          lineContent.beginPath();
        }
      }
    }
  }


</script>

<style scoped>
  #bottomC {
    z-index: -3;
    position: absolute;
    top: 0;
    left: 0;
  }

  #bottomLink {
    position: absolute;
    left: 24%;
    top: 16px;
    width: 50%;
  }

  #bottomLink2 {
    position: absolute;
    left: 24%;
    top: 16px;
    width: 50%;
  }

  .linker {
    font-size: 1em;
    color: aliceblue;
    text-decoration: none;
  }
</style>
