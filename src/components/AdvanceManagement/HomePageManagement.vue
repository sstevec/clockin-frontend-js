<template>
  <div>
    <el-row id="total">
      <el-col>
        <div id="content">

          <el-row id="imageList">
            <el-scrollbar style="height: 100%">
            <div style="height: 300px;" v-for="(item,index) in imageList" v-bind:key="item.key">
              <el-row >
                <el-row>
                  <svg width="300" height="57" viewBox="0 0 300 57">
                    <text font-family="'Helvetica Neue','PingFang SC','microsoft yahei'" fill="#737470" font-size="15"
                          x="0"
                          y="1em">
                      {{item.name}}
                    </text>
                  </svg>
                </el-row>

                <el-upload
                  class="avatar-uploader"
                  :action="uploadAddress()"
                  ref="upload"
                  :show-file-list="false"
                  @click.native="uploadData.index = index"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload">
                  <img v-if="item.imageExist" :src="item.url" style="width: 100%; height: 100%" class="avatar">
                  <i v-else id="uploadImage" class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-row>
            </div>
            </el-scrollbar>
          </el-row>


        </div>
      </el-col>
    </el-row>
  </div>

</template>

<script>
  import axios from 'axios'

  export default {
    name: "HomePageManagement",

    components: {},
    data() {
      return {
        uploadData:{index:""},
        dialogImageUrl: "",
        dialogVisible: false,
        imageList: [
          {name: this.$t('HomePageManagement.firstImage'), url: "", imageExist: false, key: "1"},
          {name: this.$t('HomePageManagement.secondImage'), url: "", imageExist: false, key: "2"},
          {name: this.$t('HomePageManagement.thirdImage'), url: "", imageExist: false, key: "3"},
          {name: this.$t('HomePageManagement.fourthImage'), url: "", imageExist: false, key: "4"},
          {name: this.$t('HomePageManagement.clockInRuleImage'), url: "", imageExist: false, key: "5"},
          {name: this.$t('HomePageManagement.personalizeImage'), url: "", imageExist: false, key: "6"},
        ],
      }
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
              this.getAllImageUrl();
            } else {
              // 没有登录，返回值为登陆界面路径
              this.$router.push(response.data.data);
            }

          })
          .catch(function (error) { // 请求失败处理
            console.log(error);
          })
      },
      uploadAddress: function () {
        return '/api/staff/uselessAction'
      },
      handleAvatarSuccess() {

      },
      beforeAvatarUpload(file) {
        let index = this.uploadData.index;
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 10;

        if (!isJPG) {
          this.$message.error(this.$t('staffManagement.uploadImageCanOnlyBeJPG'));
          return;
        }
        if (!isLt2M) {
          this.$message.error(this.$t('staffManagement.uploadSizeCanNotExceed10'));
          return;
        }
        let fd = new FormData();
        fd.append('file', file);
        fd.append('index',String(index));
        axios
          .post('/api/staff/uploadHomePageImage', fd)
          .then(response => {
            if (response.data.status === 200) {
              alert(this.$t('staffManagement.uploadFileSuccess'));
              this.getAllImageUrl();
            } else {
              // 获取失败
              alert(this.$t('staffManagement.uploadFileFail'));
            }
          })
      },
      getAllImageUrl:function () {
        axios
          .get('/api/general/getAllHomePageImage')
          .then(response => {
            if (response.data.status === 200) {
             let temp = response.data.data;
             for(let i = 1; i<7; i++){
               if(temp[i] !== null && temp[i] !==""){
                 this.imageList[i-1].url = "data:image/jpg;base64,"+temp[i];
                 this.imageList[i-1].imageExist = true;
               }
             }
            } else {
              // 获取失败
              alert(this.$t('HomePageManagement.getImageFail'));
            }
          })
      },
    }
  }

</script>

<style scoped>

  #imageList {
    position: absolute;
    top: 20px;
    left: 20px;
    height: 900px;
    width: 900px;
  }

  #total {
    height: 1000px;
  }

  #uploadImage {
    position: absolute;
    left: 88px;
    top: 82px;
  }

</style>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    width: 200px;
    height: 200px;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
  }

</style>
