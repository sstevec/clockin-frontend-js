<template>
  <div>
    <el-row id="total">
      <el-col>
        <div id="content">

          <el-row id="checkOptions" class="checkBox">
            <el-scrollbar style="height: 100%;overflow-x: hidden;">
              <el-checkbox-group
                v-model="checkedOptions"
                style="width: 850px;float: top"
                @change="handleSelect">
                <el-checkbox style="width: 70px;float: left;padding: 0;height: 30px" v-for="item in allOptions"
                             :label="item.name" :key="item.name">
                  <svg width="70" height="16" viewBox="0 0 70 16">
                    <text font-family="'Helvetica Neue','PingFang SC','microsoft yahei'" fill="#737470" font-size="13"
                          x="0"
                          y="1em">
                      {{item.value}}
                    </text>
                  </svg>
                </el-checkbox>
              </el-checkbox-group>
            </el-scrollbar>
          </el-row>


          <el-row id="searchLabel">
            <svg width="80" height="30" viewBox="0 0 80 30">
              <text font-family="'Helvetica Neue','PingFang SC','microsoft yahei'" fill="#737470" font-size="15"
                    x="0"
                    y="1em">
                {{$t('departmentManagement.advanceSearch')}}
              </text>
            </svg>
          </el-row>

          <el-row id="searchInput">
            <el-input
              :placeholder="$t('header.pleaseEnter')"
              v-model="searchInfo"
              clearable
              @blur="handleSelect"
              maxlength="20">
            </el-input>
          </el-row>

          <el-row class="addBut" id="button1">
            <el-button style="width: 100px" @click="dialogFormVisible = true">
              <p style="margin: 0; color: #FFFFFF">{{$t('staffManagement.addStaff')}}</p>
            </el-button>
          </el-row>

          <el-row class="inBut" id="button2">
            <el-button style="width: 100px" @click="loadUploadInfo">
              <p style="margin: 0; color: #FFFFFF">{{$t('staffManagement.upload')}}</p>
            </el-button>
          </el-row>

          <el-row class="outBut" id="button3">
            <el-button style="width: 100px" @click="downloadFile">
              <p style="margin: 0; color: #FFFFFF">{{$t('statistic.fileOut')}}</p>
            </el-button>
          </el-row>

        </div>
      </el-col>
    </el-row>


    <el-row id="table" class="tab">
      <el-table
        border
        :data="workerInfo"
        style="width: 100%">
        <el-table-column
          :label="$t('clockInManagement.uid')"
          width="120"
          sortable>
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.uid}}</span>
          </template>
        </el-table-column>

        <el-table-column
          :label="$t('clockInManagement.staffName')"
          width="150"
          sortable>
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.name}}</span>
          </template>
        </el-table-column>

        <div v-for="item in showCheckedOptions">
          <el-table-column
            sortable
            :show-overflow-tooltip="true"
            :label="item.value"
            :key="item.name"
            :prop="item.name"
            min-width="120"
          >
          </el-table-column>
        </div>


        <el-table-column
          :label="$t('departmentManagement.operation')"
          prop="type"
          min-width="150">
          <template slot-scope="scope">
            <div class="showDialogFather">
              <el-button @click="editInfo(scope.row.index)" icon="el-icon-edit" style="width:40px;height: 20px">
              </el-button>
              <span>  </span>
              <el-button @click="advanceEditInfo(scope.row.index)" icon="el-icon-setting"
                         style="width:40px;height: 20px">
              </el-button>
              <span>  </span>
              <el-button @click="deleteUser(scope.row.uid)" icon="el-icon-delete" style="width:40px;height: 20px">
              </el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>

      <el-row id="detailInfoTable" class="addWorkers">
        <el-dialog :title="$t('staffManagement.addStaff')" :visible.sync="dialogFormVisible" @close="clear">

          <svg id="uploadLabel" width="120" height="80" viewBox="0 0 120 80">
            <text font-family="'Helvetica Neue','PingFang SC','microsoft yahei'" fill="#000000" font-size="18"
                  x="0"
                  y="1em">
              {{$t('staffManagement.uploadPicture')}}
            </text>
          </svg>

          <el-row id="formContentLabel">
            <div v-for="item in detailInfo">
              <el-row>
                <svg width="300" height="57" viewBox="0 0 300 57">
                  <text font-family="'Helvetica Neue','PingFang SC','microsoft yahei'" fill="#737470" font-size="15"
                        x="0"
                        y="1em">
                    {{item.name}}
                  </text>
                </svg>
              </el-row>
            </div>
          </el-row>

          <el-row id="formContent">
            <div v-for="item in detailInfo">
              <el-row style="height: 61px">
                <el-input
                  :placeholder="$t('header.pleaseEnter')"
                  v-model="item.value"
                  clearable
                  style="width: 200px;"
                  maxlength="30">
                </el-input>
              </el-row>
            </div>
          </el-row>

          <el-row id="addStaffLabel1">
            <svg width="300" height="57" viewBox="0 0 300 57">
              <text font-family="'Helvetica Neue','PingFang SC','microsoft yahei'" fill="#737470" font-size="15"
                    x="0"
                    y="1em">
                {{this.detailInfo2[0].name}}
              </text>
            </svg>

          </el-row>

          <el-row id="addStaffContent1">
            <el-tag
              v-for="tag in detailInfo2[0].value"
              :key="tag.name"
              closable
              :disable-transitions="false"
              @close="handleClose2(tag)">
              {{tag.name}}
            </el-tag>
            <el-button class="button-new-tag" size="small" @click="addTag1">+ {{$t('staffManagement.addReviewer')}}</el-button>
          </el-row>

          <el-row id="addStaffLabel2">
            <svg width="300" height="57" viewBox="0 0 300 57">
              <text font-family="'Helvetica Neue','PingFang SC','microsoft yahei'" fill="#737470" font-size="15"
                    x="0"
                    y="1em">
                {{this.detailInfo2[1].name}}
              </text>
            </svg>

          </el-row>

          <el-row id="addStaffContent2">
            <el-select v-model="detailInfo2[1].value" :placeholder="$t('ExtraWorkApply.pleaseSelect')">
              <el-option
                v-for="item in dayOffTypes"
                :key="item.dayOffType"
                :label="item.dayOffType"
                :value="item.dayOffType">
              </el-option>
            </el-select>
          </el-row>

          <el-row id="addStaffLabel3">
            <svg width="300" height="57" viewBox="0 0 300 57">
              <text font-family="'Helvetica Neue','PingFang SC','microsoft yahei'" fill="#737470" font-size="15"
                    x="0"
                    y="1em">
                {{this.detailInfo2[2].name}}
              </text>
            </svg>

          </el-row>

          <el-row id="addStaffContent3">
            <el-select v-model="detailInfo2[2].value" :placeholder="$t('ExtraWorkApply.pleaseSelect')">
              <el-option
                v-for="item in departmentList"
                :key="item.department_id"
                :label="item.name"
                :value="item.department_id">
              </el-option>
            </el-select>
          </el-row>

          <div id="subInfoBut" class="but2">
            <el-button style="width: 150px" @click="addWorker">{{$t('staffManagement.addStaff')}}</el-button>
          </div>
          <div id="addImageBut">
            <el-upload
              class="avatar-uploader"
              :action="uploadAddress()"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="imageUrl" :src="imageUrl" style="width: 100%; height: 100%" class="avatar">
              <i id="uploadIcon" v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>

        </el-dialog>
      </el-row>


      <el-row id="editInfoTable" class="editWorker">
        <el-dialog :title="$t('staffManagement.editStaffInfo')" :visible.sync="editVisible">

          <svg id="userNameLabel" width="120" height="80" viewBox="0 0 120 80">
            <text font-family="'Helvetica Neue','PingFang SC','microsoft yahei'" fill="#737470" font-size="15"
                  x="0"
                  y="1em">
              {{$t('clockInManagement.staffName')}} : {{this.editName}}
            </text>
          </svg>

          <el-row id="editLabel">
            <div v-for="item in editDetail">
              <el-row>
                <svg width="300" height="57" viewBox="0 0 300 57">
                  <text font-family="'Helvetica Neue','PingFang SC','microsoft yahei'" fill="#737470" font-size="15"
                        x="0"
                        y="1em">
                    {{item.name}}
                  </text>
                </svg>
              </el-row>
            </div>
          </el-row>



          <el-row id="editContent">
            <div v-for="item in editDetail">
              <el-row style="height: 61px">
                <el-input
                  :placeholder="$t('header.pleaseEnter')"
                  v-model="item.value"
                  clearable
                  style="width: 200px;"
                  maxlength="30">
                </el-input>
              </el-row>
            </div>

            <el-row id="editConfirm" class="but2">
              <el-button style="width: 150px" @click="confirmEdition">{{$t('login.confirm')}}</el-button>
            </el-row>
          </el-row>

        </el-dialog>
      </el-row>


      <el-row class="advanceEdit">
        <el-dialog :title="$t('staffManagement.advanceSetting')" :visible.sync="advanceEditVisible" @close="clear">

          <svg id="advanceUserNameLabel" width="120" height="80" viewBox="0 0 120 80">
            <text font-family="'Helvetica Neue','PingFang SC','microsoft yahei'" fill="#737470" font-size="15"
                  x="0"
                  y="1em">
              {{$t('clockInManagement.staffName')}} : {{this.advanceEditDetail[0].value}}
            </text>
          </svg>

          <el-row id="advanceEditLabel1">
            <svg width="300" height="57" viewBox="0 0 300 57">
              <text font-family="'Helvetica Neue','PingFang SC','microsoft yahei'" fill="#737470" font-size="15"
                    x="0"
                    y="1em">
                {{this.advanceEditDetail[1].name}}
              </text>
            </svg>

          </el-row>

          <el-row id="advanceEditContent1">
            <el-tag
              v-for="tag in advanceEditDetail[1].value"
              :key="tag.name"
              closable
              :disable-transitions="false"
              @close="handleClose(tag)">
              {{tag.name}}
            </el-tag>
            <el-button class="button-new-tag" size="small" @click="addTag2">+ {{this.$t('staffManagement.addReviewer')}}</el-button>
          </el-row>

          <el-row id="advanceEditLabel2">
            <svg width="300" height="57" viewBox="0 0 300 57">
              <text font-family="'Helvetica Neue','PingFang SC','microsoft yahei'" fill="#737470" font-size="15"
                    x="0"
                    y="1em">
                {{this.advanceEditDetail[2].name}}
              </text>
            </svg>

          </el-row>

          <el-row id="advanceEditContent2">
            <el-select v-model="advanceEditDetail[2].value" :placeholder="$t('ExtraWorkApply.pleaseSelect')">
              <el-option
                v-for="item in dayOffTypes"
                :key="item.dayOffType"
                :label="item.dayOffType"
                :value="item.dayOffType">
              </el-option>
            </el-select>
          </el-row>

          <el-row id="advanceEditLabel3">
            <svg width="300" height="57" viewBox="0 0 300 57">
              <text font-family="'Helvetica Neue','PingFang SC','microsoft yahei'" fill="#737470" font-size="15"
                    x="0"
                    y="1em">
                {{this.advanceEditDetail[3].name}}
              </text>
            </svg>
          </el-row>

          <el-row id="advanceEditContent3">
            <el-upload
              class="avatar-uploader"
              :action="uploadAddress()"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="imageUrl" :src="imageUrl" style="width: 100%; height: 100%" class="avatar">
              <i v-else id="uploadImage" class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-row>

          <div id="advanceEditConfirm" class="but2">
            <el-button style="width: 150px" @click="confirmAdvanceEdition">{{$t('login.confirm')}}</el-button>
          </div>

        </el-dialog>
      </el-row>

      <el-row class="reviewerPick">
        <el-dialog :title="$t('staffManagement.chooseReviewer')" :visible.sync="reviewerPickerVisible" @close="clearTree">
          <el-row style="height: 300px">
            <el-scrollbar style="height: 100%;overflow-x: hidden;">
              <el-tree
                :props="reviewerInfo"
                :load="loadNode"
                node-key="nodeCount"
                ref="tree"
                lazy
                show-checkbox
                @check="handleNodeClick">
              </el-tree>
            </el-scrollbar>
          </el-row>
          <el-row id="confirmReviewer" class="saveButton">
            <el-button style="width: 150px" @click="reviewerPickerVisible = false">{{$t('login.confirm')}}</el-button>
          </el-row>
        </el-dialog>
      </el-row>

      <el-row class="uploadExcel">
        <el-dialog :title="$t('staffManagement.upload')" :visible.sync="uploadVisible" @close="clearUploadFile">

          <el-row id="uploadExcelLabel2">
            <svg width="300" height="57" viewBox="0 0 300 57">
              <text font-family="'Helvetica Neue','PingFang SC','microsoft yahei'" fill="#737470" font-size="15"
                    x="0"
                    y="1em">
                {{this.uploadDetailInfo[0].name}}
              </text>
            </svg>
          </el-row>

          <el-row id="uploadExcelContent1">
            <el-upload
              class="upload-demo"
              drag
              :action="uploadAddress()"
              :before-upload="uploadExcel"
              :show-file-list='false'>
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">{{this.uploadDetailInfo[2].value}}</div>
            </el-upload>
          </el-row>

          <el-row id="uploadExcelContent2">
            <el-select v-model="uploadDetailInfo[0].value" :placeholder="$t('ExtraWorkApply.pleaseSelect')">
              <el-option
                v-for="item in existForms"
                :key="item.key"
                :label="item.name"
                :value="item.value">
              </el-option>
            </el-select>
          </el-row>

          <div id="uploadConfirm" class="but2">
            <el-button style="width: 100px" @click="confirmUploadExcel">{{$t('login.confirm')}}</el-button>
          </div>
        </el-dialog>
      </el-row>

      <el-row class="download">
        <el-dialog :title="$t('staffManagement.chooseOutNumber')" :visible.sync="downloadVisible">
          <el-row id="downloadLabel1">
            <svg width="300" height="37" viewBox="0 0 300 37">
              <text font-family="'Helvetica Neue','PingFang SC','microsoft yahei'" fill="#737470" font-size="15"
                    x="0"
                    y="1em">
                {{$t('staffManagement.startPoint')}}
              </text>
            </svg>
          </el-row>

          <el-input-number id="downloadContent1" v-model="start" :min="1"></el-input-number>

          <el-row id="downloadLabel2">
            <svg width="300" height="37" viewBox="0 0 300 37">
              <text font-family="'Helvetica Neue','PingFang SC','microsoft yahei'" fill="#737470" font-size="15"
                    x="0"
                    y="1em">
                {{$t('staffManagement.outNumber')}}
              </text>
            </svg>
          </el-row>

          <el-input-number id="downloadContent2" v-model="num" :min="1" ></el-input-number>

          <div id="confirmDownload" class="but2">
            <el-button style="width: 180px" @click="confirmDownload">{{$t('login.confirm')}}</el-button>
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
  import Header from '../Header'
  import Bottom from "../Bottom";

  export default {
    name: "StaffManagement",

    components: {
      Bottom,
      Header
    },
    data() {
      return {
        total:0,
        currentPageNum: 1,
        account: "",
        name: "name",
        position: "position",
        work_id: "work_id",
        uid: "",
        searchInfo: "",
        originalInfo: [],
        workerInfo: [],
        showCheckedOptions: [],
        dialogFormVisible: false,
        editVisible: false,
        allOptions: [],
        checkedOptions: ["account"],
        detailInfo: [
          {name: this.$t('clockInManagement.staffName'), value: "", key: "name"},
          {name: this.$t('header.account'), value: "", key: "account"},
          {name: this.$t('staffManagement.password'), value: "", key: "password"},
          {name: this.$t('header.tel'), value: "", key: "tel"},
          {name: this.$t('header.email'), value: "", key: "email"},
          {name: this.$t('staffManagement.manager'), value: "", key: "manager"},
          {name: this.$t('header.position'), value: "", key: "position"},
          {name: this.$t('header.workID'), value: "", key: "work_id"},
          {name: this.$t('departmentManagement.workPlace'), value: "", key: "work_place"},
          {name: this.$t('staffManagement.changeDayOffTime'), value: "", key: "change_day_off"},
          {name: this.$t('staffManagement.annualDayOffTime'), value: "", key: "annual_day_off"},
        ],
        detailInfo2: [
          {name: this.$t('changeDayOffApply.reviewer'), value: "", key: "reviewers"},
          {name: this.$t('staffManagement.holidayType'), value: "", key: "day_off_type"},
          {name: this.$t('staffManagement.department'), value: "", key: "department_id"},
        ],
        imageUrl: '',
        editName: "",
        editDetail: [],
        editUid: "",
        advanceEditVisible: false,
        advanceEditDetail: [
          {name: this.$t('clockInManagement.staffName'), value: "", key: "name"},
          {name: this.$t('changeDayOffApply.reviewer'), value: [], key: "reviewers"},
          {name: this.$t('staffManagement.holidayType'), value: "", key: "day_off_type"},
          {name: this.$t('staffManagement.image'), value: "", key: "image"},
        ],
        dayOffTypes: [],
        reviewerPickerVisible: false,
        reviewerInfo: {
          label: 'name',
          children: 'children'
        },
        reviewerList: [],
        reviewerFor: "",
        nodeCount: "0",
        filePath: "",
        uploadVisible: false,
        uploadDetailInfo: [
          {name: this.$t('staffManagement.defaultForm'), value: "", key: "formName"},
          {name: this.$t('staffManagement.uploadPath'), value: "", key: "filePath"},
          {name: this.$t('staffManagement.successSign'), value: this.$t('staffManagement.uploadMethod'), key: "placeHolder"},
        ],
        existForms: [],
        downloadVisible: false,
        start: "",
        num: "",
        departmentList: [],
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
              this.getAllOptions();
              this.getDepartmentList();
              this.getDayOffOptions();
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
      handleSelect: function () {
        let pattern = /[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]/im;
        if (pattern.test(this.searchInfo)) {
          alert(this.$t('departmentManagement.illegalChar'));
          this.searchInfo = "";
          return;
        }
        this.showCheckedOptions = [];
        let columnName = "name,reviewers,day_off_type,";
        let cond = "";
        let allOptionSize = this.allOptions.length;
        let selectedSize = this.checkedOptions.length;
        for (let i = 0; i < selectedSize; i++) {
          for (let j = 0; j < allOptionSize; j++) {
            if (this.allOptions[j].name === this.checkedOptions[i]) {
              this.showCheckedOptions.push({name: this.allOptions[j].name, value: this.allOptions[j].value});
              break;
            }
          }
          if (this.checkedOptions[i] === "name" || this.checkedOptions[i] === "reviewers" ||
            this.checkedOptions[i] === "day_off_type") {
            continue;
          }
          if (i === selectedSize - 1) {
            columnName = columnName + this.checkedOptions[i];
          } else {
            columnName = columnName + this.checkedOptions[i] + ",";
          }
        }
        if (selectedSize > 0) {
          let data = "";
          let searchType = "";
          if (this.searchInfo !== "") {
            for (let i = 0; i < selectedSize; i++) {
              // 拼接条件
              if (i === selectedSize - 1) {
                if (this.checkedOptions[i] === "expired") {
                  cond = cond.substring(0, cond.length - 1);
                  continue;
                }
                cond = cond + this.checkedOptions[i] + ",," + this.searchInfo;
              } else {
                if (this.checkedOptions[i] === "expired") {
                  continue;
                }
                cond = cond + this.checkedOptions[i] + ",," + this.searchInfo + ",";
              }
            }
            searchType = "2";
            if (cond === "") {
              cond = "uid,>,0";
              searchType = "0";
            }
          } else {
            // 搜索全部
            cond = "uid,>,0";
            searchType = "0";
          }

          // 取得总页数
          let pageInfo = new URLSearchParams;
          pageInfo.append("targetColumn", String("count(0)"));
          pageInfo.append("conditions", String(cond));
          pageInfo.append("searchType", String(searchType));
          pageInfo.append("separate", String("OR"));
          pageInfo.append("pageNum", String(1));
          pageInfo.append("pageMax", String("10000"));
          axios
            .post('/api/staff/getRow2', pageInfo)
            .then(response => {
                if (response.data.status === 200) {
                  let paramName = "count(0)";
                  this.total = response.data.data[0][paramName];

                } else {
                  // 获取失败
                  alert(this.$t('header.getPageNumberFail'));
                }
            });


          let info = new URLSearchParams;
          info.append("targetColumn", String(columnName));
          info.append("conditions", String(cond));
          info.append("searchType", String(searchType));
          info.append("separate", String("OR"));
          info.append("pageNum", String(this.currentPageNum));
          info.append("pageMax", String("14"));
          axios
            .post('/api/staff/getRow2', info)
            .then(response => {
              if (response.data.status === 200) {
                let data = response.data.data;
                this.originalInfo = JSON.parse(JSON.stringify(response.data.data));
                let dataSize = data.length;
                this.workerInfo = [];
          for (let i = 0; i < dataSize; i++) {
            data[i].index = i;
            if (data[i].expired !== null && typeof(data[i].expired) != "undefined") {
              let date = new Date(data[i].expired);
              data[i].expired = date.getFullYear()+" - "+(date.getMonth()+1)+" - "+date.getDate();
            }
            this.workerInfo.push(data[i]);
          }
        } else {
          // 获取失败
          alert(this.$t('staffManagement.getStaffInfoFail'));
        }
      })
        } else {
          this.workerInfo = [];
        }
      },
      handleDelete: function (index, rowData) {

      },
      getAllOptions: function () {
        axios
          .get('/api/staff/getColumn')
          .then(response => {
            if (response.data.status === 200) {
              let options = response.data.data;
              // console.log(options);
              let size = options.length;
              for (let i = 0; i < size; i++) {
                if (options[i].name === "name") {
                  continue;
                }
                this.allOptions.push({name: options[i].name, value: options[i].value})
              }
              this.handleSelect();
            } else {
              // 获取失败
              alert(this.$t('staffManagement.getAllOptionsFail'));
            }

          })
      },
      addWorker: function () {
        let size = this.detailInfo.length;
        let data = {};
        for (let i = 0; i < size; i++) {
          data[this.detailInfo[i].key] = this.detailInfo[i].value;
        }
        // 对放假时间做判断
        if (/^\d+(\.\d+)?$/.test(data.change_day_off) == false) {
          alert(this.$t('staffManagement.inputNumberAtChange'));
          return;
        }
        if (/^\d+(\.\d+)?$/.test(data.annual_day_off) == false) {
          alert(this.$t('staffManagement.inputNumberAtChange'));
          return;
        }
        if (/^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/.test(data.email) == false) {
          alert(this.$t('header.pleaseEnterCorrectEmail'));
          return;
        }
        if (/^1(3|4|5|6|7|8|9)\d{9}$/.test(data.tel) == false) {
          alert(this.$t('staffManagement.pleaseEnterCorrectPhoneNumber'));
          return;
        }
        let size2 = this.detailInfo2.length;
        for (let i = 0; i < size2; i++) {
          if (this.detailInfo2[i].key === "reviewers") {
            let reviewList = "";
            let reviewNum = this.detailInfo2[i].value.length;
            for (let j = 0; j < reviewNum; j++) {
              if (j === reviewNum - 1) {
                reviewList = reviewList + this.detailInfo2[i].value[j].uid
              } else {
                reviewList = reviewList + this.detailInfo2[i].value[j].uid + ",";
              }
            }
            data.reviewers = reviewList;
            if (reviewList == null || reviewList === "") {
              alert(this.$t('staffManagement.reviewerCanNotBeEmpty'));
              return;
            }
            continue;
          }
          data[this.detailInfo2[i].key] = this.detailInfo2[i].value;
        }
        data.file_path = this.filePath;

        let info = new URLSearchParams;
        info.append("info", JSON.stringify(data));
        axios
          .post('/api/addStaff', info)
          .then(response => {
            if (response.data.status === 200) {
              alert(this.$t('staffManagement.addStaffSuccess'));
              this.dialogFormVisible = false;
              this.handleSelect();
              this.clearAddInput();
            } else {
              // 获取失败
              alert(this.$t('staffManagement.addStaffFail'));
            }
          });
      },
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
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
        axios
          .post('/api/staff/upload', fd)
          .then(response => {
            if (response.data.status === 200) {
              alert(this.$t('staffManagement.uploadFileSuccess'));
              this.filePath = response.data.data;
            } else {
              // 获取失败
              alert(this.$t('staffManagement.uploadFileFail'));
            }
          })
      },
      editInfo: function (index) {
        this.editUid = this.workerInfo[index].uid;
        this.editName = this.workerInfo[index].name;
        let size = this.showCheckedOptions.length;
        this.editDetail = [];
        for (let i = 0; i < size; i++) {
          if (this.showCheckedOptions[i].name === "reviewers") {
            this.$notify({
              title: this.$t('statistic.notice'),
              message: this.$t('staffManagement.pleaseSetReviewerInAdvanceSetting'),
              duration: 0
            });
            continue;
          }
          if (this.showCheckedOptions[i].name === "day_off_type") {
            this.$notify({
              title: this.$t('statistic.notice'),
              message: this.$t('staffManagement.pleaseSetDayOffTypeInAdvanceSetting'),
              duration: 0
            });
            continue;
          }
          if (this.showCheckedOptions[i].name === "expired") {
            this.$notify({
              title: this.$t('statistic.notice'),
              message: this.$t('staffManagement.canNotChangeExpired'),
              duration: 5000
            });
            continue;
          }
          this.editDetail.push({
            name: this.showCheckedOptions[i].value,
            key: this.showCheckedOptions[i].name,
            value: this.workerInfo[index][this.showCheckedOptions[i].name]
          })
        }
        this.editVisible = true;
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
                this.handleSelect()
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
      confirmEdition: function () {
        let size = this.editDetail.length;
        let data = {};
        for (let i = 0; i < size; i++) {
          if (this.editDetail[i].value === null || this.editDetail[i].value === "") {
            alert(this.$t('staffManagement.contentCanNotBeEmpty'));
            return;
          }
          data[this.editDetail[i].key] = this.editDetail[i].value;
          if (this.editDetail[i].key === "change_day_off") {
            if (/^\d+(\.\d+)?$/.test(data.change_day_off) == false) {
              alert(this.$t('staffManagement.inputNumberAtChange'));
              return;
            }
          }
          if (this.editDetail[i].key === "annual_day_off") {
            if (/^\d+(\.\d+)?$/.test(data.annual_day_off) == false) {
              alert(this.$t('staffManagement.inputNumberAtAnnual'));
              return;
            }
          }
          if (this.editDetail[i].key === "email") {
            if (/^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/.test(data.email) == false) {
              alert(this.$t('header.pleaseEnterCorrectEmail'));
              return;
            }
          }
          if (this.editDetail[i].key === "tel") {
            if (/^1(3|4|5|6|7|8|9)\d{9}$/.test(data.tel) == false) {
              alert(this.$t('staffManagement.pleaseEnterCorrectPhoneNumber'));
              return;
            }
          }
        }
        let info = new URLSearchParams;
        info.append("info", JSON.stringify(data));
        info.append("uid", String(this.editUid));
        axios
          .post('/api/staff/editStaff', info)
          .then(response => {
            if (response.data.status === 200) {
              alert(this.$t('staffManagement.editStaffSuccess'));
              this.handleSelect();
              this.editVisible = false;
            } else {
              // 获取失败
              alert(this.$t('staffManagement.editStaffFail'));
            }
          })
      },
      advanceEditInfo: function (index) {
        this.filePath = "";
        this.editUid = this.workerInfo[index].uid;
        this.editName = this.workerInfo[index].name;

        this.advanceEditDetail[0].value = this.originalInfo[index].name;
        this.advanceEditDetail[2].value = this.originalInfo[index].day_off_type;
        let reviewer = this.originalInfo[index].reviewers.split(",");
        let reviewerUid = this.originalInfo[index].reviewerUid.split(",");
        let size = reviewer.length;
        this.advanceEditDetail[1].value = [];
        for (let i = 0; i < size; i++) {
          this.advanceEditDetail[1].value.push({name: reviewer[i], uid: reviewerUid[i]});
        }
        this.advanceEditVisible = true;
      },
      confirmAdvanceEdition: function () {
        let data = {};
        data.filePath = this.filePath;
        let reviewList = "";
        let reviewNum = this.advanceEditDetail[1].value.length;
        for (let j = 0; j < reviewNum; j++) {
          if (j === reviewNum - 1) {
            reviewList = reviewList + this.advanceEditDetail[1].value[j].uid
          } else {
            reviewList = reviewList + this.advanceEditDetail[1].value[j].uid + ",";
          }
        }
        data.reviewers = reviewList;
        if (reviewList == null || reviewList === "") {
          alert(this.$t('staffManagement.reviewerCanNotBeEmpty'));
          return;
        }
        data.day_off_type = this.advanceEditDetail[2].value;
        let info = new URLSearchParams;
        info.append("info", JSON.stringify(data));
        info.append("uid", String(this.editUid));
        axios
          .post('/api/staff/advanceChangeRow', info)
          .then(response => {
            if (response.data.status === 200) {
              alert(this.$t('staffManagement.editStaffSuccess'));
              this.advanceEditVisible = false;
              this.handleSelect();
            } else {
              // 获取失败
              alert(this.$t('staffManagement.editStaffFail'));
            }
          })
      },
      handleClose(tag) {
        this.advanceEditDetail[1].value.splice(this.advanceEditDetail[1].value.indexOf(tag), 1);
      },
      handleClose2(tag) {
        this.detailInfo2[0].value.splice(this.detailInfo2[0].value.indexOf(tag), 1);
      },
      addTag1: function () {
        // 添加员工
        this.reviewerFor = 1;
        this.reviewerPickerVisible = true;
      },
      addTag2: function () {
        this.reviewerFor = 2;
        this.reviewerPickerVisible = true;
      },
      loadNode: function (node, resolve) {
        if (node.level === 0) {
          // 获取所有的部门
          let tempNode = [];
          let info = new URLSearchParams;
          info.append("targetColumns", String("name,department_id"));
          info.append("formName", String("department"));
          info.append("cond", String("1,=,1"));
          info.append("searchType", String("0"));
          info.append("separate", String("AND"));
          info.append("pageNum", String("1"));
          info.append("pageMax", String(1000));

          axios
            .post('/api/general/row/get', info)
            .then(response => {
              if (response.data.status === 200) {
                let dataList = response.data.data;
                let size = dataList.length;
                for (let i = 0; i < size; i++) {
                  dataList[i].disabled = true;
                  dataList[i].nodeCount = this.nodeCount;
                  this.nodeCount = String(Number(this.nodeCount) + 1);
                  tempNode.push(dataList[i]);
                }
                return resolve(tempNode);
              } else {
                // 获取失败
                alert(this.$t('staffManagement.getNodeFail'));
              }
            })
        } else if (node.level === 1) {
          console.log(node.data.department_id);
          let tempNode = [];
          let info = new URLSearchParams;
          info.append("targetColumns", String("name,uid"));
          info.append("formName", String("workers"));
          info.append("cond", String("department_id,=," + node.data.department_id));
          info.append("searchType", String("0"));
          info.append("separate", String("AND"));
          info.append("pageNum", String("1"));
          info.append("pageMax", String(1000));

          axios
            .post('/api/general/row/get', info)
            .then(response => {
              if (response.data.status === 200) {
                let dataList = response.data.data;
                let size = dataList.length;
                for (let i = 0; i < size; i++) {
                  dataList[i].isLeaf = true;
                  dataList[i].nodeCount = dataList[i].uid;
                  tempNode.push(dataList[i]);
                }
                return resolve(tempNode);
              } else {
                // 获取失败
                alert(this.$t('staffManagement.getNodeFail'));
              }
            })
        } else {
          return resolve([]);
        }
      },
      handleNodeClick() {
        this.reviewerList = [];
        let tempList = this.$refs.tree.getCheckedNodes();
        let size = tempList.length;
        for (let i = 0; i < size; i++) {
          if (typeof (tempList[i].uid) !== "undefined") {
            this.reviewerList.push({name: tempList[i].name, uid: tempList[i].uid})
          }
        }
        if (this.reviewerFor === 1) {
          this.detailInfo2[0].value = this.reviewerList;
        } else if (this.reviewerFor === 2) {
          this.advanceEditDetail[1].value = this.reviewerList;
        }
        // console.log(this.reviewerList);
      },
      clearTree: function () {
        this.$refs.tree.setCheckedKeys([]);
      },
      uploadAddress: function () {
        return '/api/staff/uselessAction'
      },
      clear: function () {
        this.filePath = "";
        this.imageUrl = "";
      },
      loadUploadInfo: function () {
        this.existForms = [];
        axios
          .get('/api/staff/getForm')
          .then(response => {
            if (response.data.status === 200) {
              let dataList = response.data.data;
              let size = dataList.length;
              for (let i = 0; i < size; i++) {
                this.existForms.push({name: dataList[i], value: dataList[i], key: dataList[i]})
              }
            } else {
              // 获取失败
              alert(this.$t('staffManagement.getDefaultFormFail'));
            }
          });
        this.uploadVisible = true;
      },
      uploadExcel(file) {
        const isLt5M = file.size / 1024 / 1024 < 5;
        let name = file.name;
        let type = name.substr(name.lastIndexOf("."));
        if (type !== ".xls") {
          this.$message.error(this.$t('staffManagement.uploadFileCanOnlyBeXLS'));
          return;
        }
        if (!isLt5M) {
          this.$message.error(this.$t('staffManagement.uploadFileCanNotExceed5'));
          return;
        }
        let fd = new FormData();
        fd.append('file', file);
        axios
          .post('/api/staff/uploadStaffInfo', fd)
          .then(response => {
            if (response.data.status === 200) {
              alert(this.$t('staffManagement. uploadFileSuccess'));
              this.uploadDetailInfo[1].value = response.data.data;
              this.uploadDetailInfo[2].value = file.name;
            } else {
              // 获取失败
              alert(this.$t('staffManagement.uploadFileFail'));
            }
          })
      },
      clearUploadFile: function () {
        this.uploadDetailInfo[0].value = "";
        this.uploadDetailInfo[1].value = "";
        this.uploadDetailInfo[2].value = this.$t('staffManagement.uploadMethod');
      },
      confirmUploadExcel: function () {

        let info = new URLSearchParams;
        info.append("filePath", String(this.uploadDetailInfo[1].value));
        info.append("formName", String(this.uploadDetailInfo[0].value));

        axios
          .post('/api/staff/inFile', info)
          .then(response => {
            if (response.data.status === 200) {
              alert(this.$t('staffManagement.inFileSuccess'))
            } else {
              // 获取失败
              alert(this.$t('staffManagement.inFileFail'));
            }
          })
      },
      downloadFile: function () {
        this.start = 1;
        this.num = 1;
        this.downloadVisible = true;
      },
      confirmDownload: function () {
        let columnName = "name";
        let cond = "";
        let selectedSize = this.checkedOptions.length;
        for (let i = 0; i < selectedSize; i++) {
          columnName = columnName + "," + this.checkedOptions[i];
        }
        if (selectedSize > 0) {
          let searchType = "";
          if (this.searchInfo !== "") {
            for (let i = 0; i < selectedSize; i++) {
              // 拼接条件
              if (i === selectedSize - 1) {
                cond = cond + this.checkedOptions[i] + ",," + this.searchInfo;
              } else {
                cond = cond + this.checkedOptions[i] + ",," + this.searchInfo + ",";
              }
            }
            searchType = "2";
          } else {
            // 搜索全部
            cond = "uid,>,0";
            searchType = "0";
          }
          let info = new URLSearchParams;
          info.append("targetColumn", String(columnName));
          info.append("cond", String(cond));
          info.append("searchType", String(searchType));
          info.append("separate", String("OR"));
          info.append("start", String(this.start - 1));
          info.append("pageMax", String(this.num));
          axios
            .post('/api/staff/outFile', info)
            .then(response => {
              if (response.data.status === 200) {
                alert(this.$t('staffManagement.outFileSuccess'));

                let info = new URLSearchParams;
                info.append("filePath", String(response.data.data));

                axios
                  .post('/api/general/download', info,{responseType:'arraybuffer'})
                  .then(response => {
                    let url = window.URL.createObjectURL(new Blob([response.data],{type:"application/vnd.ms-excel"}));
                    let link = document.createElement('a');
                    link.style.display = 'none';
                    link.href = url;
                    // 获取文件名
                    // download 属性定义了下载链接的地址而不是跳转路径
                    link.setAttribute('download', "staff.xls");
                    document.body.appendChild(link);
                    link.click();
                  })

              } else {
                // 获取失败
                alert(this.$t('staffManagement.outFileFail'));
              }
            })
        } else {
          alert(this.$t('staffManagement.selectOneBeforeDownload'));
          return;
        }
      },
      getDepartmentList: function () {
        let info = new URLSearchParams;
        info.append("targetColumns", String("name,department_id"));
        info.append("formName", String("department"));
        info.append("cond", String("1,=,1"));
        info.append("searchType", String(0));
        info.append("separate", String("OR"));
        info.append("pageNum", String(1));
        info.append("pageMax", String(1000));

        axios
          .post('/api/general/row/get', info)
          .then(response => {
            if (response.data.status === 200) {
              let dataList = response.data.data;
              let size = dataList.length;
              for (let i = 0; i < size; i++) {
                let temp = {};
                temp.name = dataList[i].name;
                temp.key = dataList[i].department_id;
                this.departmentList.push(dataList[i]);
              }
              // console.log(this.departmentList)
            } else {
              // 获取失败
              alert(this.$t('staffManagement.getDepartmentListFail'));
            }
          })
      },
      handlePageChange: function () {
        this.handleSelect();
      },
      clearAddInput: function () {
        let size = this.detailInfo.length;
        for (let i = 0; i < size; i++) {
          this.detailInfo[i].value = "";
        }
        let size2 = this.detailInfo2.length;
        for (let i = 0; i < size2; i++) {
          this.detailInfo2[i].value = "";
        }
      },
      getDayOffOptions:function () {
        this.dayOffTypes = [];
        axios
          .get('/api/advance/getDayOffOptions')
          .then(response => {
            if (response.data.status === 200) {
              // 获取成功
              let tempData = response.data.data;
              let size = tempData.length;
              for(let i = 0; i<size; i++){
                tempData[i].index = i;
                this.dayOffTypes.push(tempData[i])
              }
            } else {
              // 获取失败
              alert( this.$t('dayOffType.getDayOffOptionsFail'));
            }

          });
      }
    }
  }

</script>

<style scoped>
  #uploadIcon{
    position: absolute;
    left: 88px;
    top: 82px;
  }

  #uploadImage{
    position: absolute;
    left: 88px;
    top: 82px;
  }

  #choosePage {
    z-index: 5;
    position: absolute;
    left: 350px;
    top: 787px;
  }

  #total {
    height: 1000px;
  }

  #searchLabel {
    position: absolute;
    top: 110px;
    left: 20px;
  }

  #searchInput {
    position: absolute;
    top: 100px;
    left: 100px;
    width: 200px;
  }

  #button1 {
    position: absolute;
    top: 100px;
    left: 590px;
  }

  #button2 {
    position: absolute;
    top: 100px;
    left: 710px;
  }

  #button3 {
    position: absolute;
    top: 100px;
    left: 830px;
  }

  #table {
    position: absolute;
    top: 150px;
    left: 0;
    width: 100%;
    height: 1000px;
  }

  #formContentLabel {
    position: absolute;
    left: 110px;
    top: 107px;
    height: 300px;
  }

  #formContent {
    position: absolute;
    left: 210px;
    top: 98px;
    height: 300px;
  }

  #detailInfoTable {
    height: 600px;
  }


  #checkOptions {
    position: absolute;
    left: 20px;
    top: 20px;
    width: 900px;
    height: 70px;
  }

  #addImageBut {
    position: absolute;
    left: 540px;
    top: 145px;
  }

  #addStaffLabel1 {
    position: absolute;
    left: 540px;
    top: 385px;
  }

  #addStaffContent1 {
    position: absolute;
    left: 540px;
    top: 425px;
  }

  #addStaffLabel2 {
    position: absolute;
    left: 540px;
    top: 615px;
  }

  #addStaffContent2 {
    position: absolute;
    left: 540px;
    top: 655px;
  }

  #subInfoBut {
    position: absolute;
    left: 590px;
    top: 769px;
  }

  #uploadLabel {
    position: absolute;
    left: 540px;
    top: 95px;
  }

  #editLabel {
    position: absolute;
    left: 100px;
    top: 135px;
  }

  #userNameLabel {
    position: absolute;
    left: 100px;
    top: 75px;
  }

  #editContent {
    position: relative;
    left: 40px;
    top: 41px;
  }

  #editConfirm {
    height: 100px;
    position: relative;
    left: -30px;
    top: 11px;
  }

  #advanceUserNameLabel {
    position: absolute;
    left: 110px;
    top: 85px;
  }

  #advanceEditLabel3 {
    position: absolute;
    left: 110px;
    top: 145px;
  }

  #advanceEditContent3 {
    position: absolute;
    left: 110px;
    top: 195px;
  }

  #advanceEditLabel1 {
    position: absolute;
    left: 400px;
    top: 85px;
  }

  #advanceEditContent1 {
    position: absolute;
    left: 400px;
    top: 125px;

  }

  #advanceEditLabel2 {
    position: absolute;
    left: 400px;
    top: 315px;
  }

  #advanceEditContent2 {
    position: absolute;
    left: 400px;
    top: 355px;
  }

  #advanceEditConfirm {
    position: absolute;
    left: 280px;
    top: 430px;
  }

  #uploadExcelLabel2 {
    position: absolute;
    left: 88px;
    top: 275px;
  }

  #uploadExcelContent1 {
    position: absolute;
    left: 88px;
    top: 80px;
  }

  #uploadExcelContent2 {
    position: absolute;
    left: 88px;
    top: 300px;
  }

  #uploadConfirm {
    position: absolute;
    left: 348px;
    top: 300px;
  }

  #downloadLabel1 {
    position: absolute;
    left: 77px;
    top: 60px;
  }

  #downloadLabel2 {
    position: absolute;
    left: 77px;
    top: 145px;
  }

  #downloadContent1 {
    position: absolute;
    left: 77px;
    top: 90px;
  }

  #downloadContent2 {
    position: absolute;
    left: 77px;
    top: 170px;
  }

  #confirmDownload {
    position: absolute;
    left: 77px;
    top: 235px;
  }

  #addStaffLabel3 {
    position: absolute;
    left: 110px;
    top: 782px;
  }

  #addStaffContent3 {
    position: absolute;
    left: 210px;
    top: 772px;
  }

  #confirmReviewer {
    position: absolute;
    left: 525px;
    top: 424px;
  }
</style>

<style>
  .addBut .el-button {
    background-color: #70bbda !important;
  }

  .inBut .el-button {
    background-color: #a8da8c !important;
  }

  .outBut .el-button {
    background-color: #dad68b !important;
  }

  .tab .el-table th {
    background-color: #dadad5 !important;
  }

  .showDialogFather .el-button {
    border: none !important;
    margin: 0 !important;
    padding: 0 !important;
  }

  .addWorkers .el-dialog {
    height: 880px !important;
    width: 840px !important;
  }

  .uploadExcel .el-dialog {
    height: 400px !important;
    width: 530px !important;
  }

  .download .el-dialog {
    height: 300px !important;
    width: 330px !important;
  }

  .el-scrollbar__wrap {
    overflow-x: hidden;
  }

  .checkBox .el-checkbox__input.is-checked .el-checkbox__inner {
    background-color: #5daf34 !important;
    border: #5daf34;
  }

  .checkBox .el-checkbox__inner:hover {
    background-color: #adc46a;
    border: #5daf34;
  }

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

  .but .el-button:hover {
    background-color: #b2da1d !important;
  }

  .but2 .el-button {
    background-color: #a7da38 !important;
  }

  .editWorker .el-dialog {
    min-height: 280px !important;
    height: auto !important;
    width: 500px !important;
  }

  .advanceEdit .el-dialog {
    height: 500px !important;
    width: 700px !important;
  }

  .reviewerPick .el-dialog {
    height: 500px !important;
    width: 700px !important;
  }

  .el-tag + .el-tag {
    margin-left: 10px;
  }
</style>
