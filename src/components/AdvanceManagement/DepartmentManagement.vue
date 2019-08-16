<template>
  <div>
    <el-row id="total">
      <el-col>
        <div id="content">

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
              @blur="getDepartmentInfo"
              maxlength="20">
            </el-input>
          </el-row>

          <el-row class="addBut" id="button1">
            <el-button style="width: 100px" @click="dialogFormVisible = true">
              <p style="margin: 0; color: #FFFFFF">{{$t('departmentManagement.addDepartment')}}</p>
            </el-button>
          </el-row>

          <el-row class="inBut" id="button2">
            <el-button style="width: 140px" @click="manageClockInRuleVisible = true">
              <p style="margin: 0; color: #FFFFFF">{{$t('departmentManagement.manageClockInRule')}}</p>
            </el-button>
          </el-row>

          <el-row class="outBut" id="button3">
            <el-button style="width: 140px" @click="manageExtraWorkRuleVisible = true">
              <p style="margin: 0; color: #FFFFFF">{{$t('departmentManagement.manageExtraWorkRule')}}</p>
            </el-button>
          </el-row>

          <el-row class="outBut" id="button4">
            <el-button style="width: 140px" @click="manageNoonBreakRuleVisible = true">
              <p style="margin: 0; color: #FFFFFF">{{$t('noonBreak.manageNoonBreakRule')}}</p>
            </el-button>
          </el-row>

        </div>
      </el-col>
    </el-row>


    <el-row id="table" class="tab">
      <el-table
        border
        :data="departmentInfo"
        style="width: 100%">

        <div v-for="item in departmentInfoLabel">
          <el-table-column
            sortable
            :show-overflow-tooltip="true"
            :label="item.value"
            :key="item.name"
            :prop="item.name"
          >
          </el-table-column>
        </div>


        <el-table-column
          :label="$t('departmentManagement.operation')"
          prop="type">
          <template slot-scope="scope">
            <div class="showDialogFather">
              <el-button @click="editInfo(scope.row.index)" icon="el-icon-edit" style="width: 40px;height: 20px;">
              </el-button>
              <span></span>
              <el-button @click="deleteDepartment(scope.row.index)" icon="el-icon-delete" style="width: 40px;height:20px">
              </el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>

      <el-row id="detailInfoTable" class="addDepartment">
        <el-dialog :title="$t('departmentManagement.addDepartment')" :visible.sync="dialogFormVisible">

          <svg id="selectClockInRule" width="120" height="80" viewBox="0 0 120 80">
            <text font-family="'Helvetica Neue','PingFang SC','microsoft yahei'" fill="#737470" font-size="15"
                  x="0"
                  y="1em">
              {{$t('departmentManagement.chooseWorkRule')}}
            </text>
          </svg>

          <svg id="selectExtraWorkRule" width="120" height="80" viewBox="0 0 120 80">
            <text font-family="'Helvetica Neue','PingFang SC','microsoft yahei'" fill="#737470" font-size="15"
                  x="0"
                  y="1em">
              {{$t('departmentManagement.chooseExtraWorkRule')}}
            </text>
          </svg>

          <svg id="selectNoonBreakRule" width="120" height="80" viewBox="0 0 120 80">
            <text font-family="'Helvetica Neue','PingFang SC','microsoft yahei'" fill="#737470" font-size="15"
                  x="0"
                  y="1em">
              {{$t('noonBreak.chooseNoonBreakRule')}}
            </text>
          </svg>

          <el-row id="noonBreakRuleSelector">
            <el-select v-model="selectNoonBreakRule" :placeholder="$t('ExtraWorkApply.pleaseSelect')">
              <el-option
                v-for="item in noonBreakRuleOption"
                :key="item.name"
                :label="item.name"
                :value="item.name"
                style="height: auto">
                <span style="float: left">{{ item.name }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
              </el-option>
            </el-select>
          </el-row>

          <el-row id="clockInRuleSelector">
            <el-select v-model="selectClockInRule" :placeholder="$t('ExtraWorkApply.pleaseSelect')">
              <el-option
                v-for="item in clockInRuleOption"
                :key="item.name"
                :label="item.name"
                :value="item.name"
                style="height: auto">
                <span style="float: left">{{ item.name }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
              </el-option>
            </el-select>
          </el-row>

          <el-row id="extraWorkRuleSelector">
            <el-select v-model="selectExtraWorkRule" :placeholder="$t('ExtraWorkApply.pleaseSelect')">
              <el-option
                v-for="item in extraWorkRuleOption"
                :key="item.name"
                :label="item.name"
                :value="item.name"
                style="height: auto">
                <span style="float: left">{{ item.name }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
              </el-option>
            </el-select>
          </el-row>

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

          <div id="subInfoBut" class="but2">
            <el-button style="width: 150px" @click="addDepartment">{{$t('departmentManagement.addDepartment')}}</el-button>
          </div>
        </el-dialog>
      </el-row>


      <el-row class="addDepartment">
        <el-dialog :title="$t('departmentManagement.changeDepartmentInfo')" :visible.sync="editVisible">

          <svg id="editSelectClockInRule" width="120" height="80" viewBox="0 0 120 80">
            <text font-family="'Helvetica Neue','PingFang SC','microsoft yahei'" fill="#737470" font-size="15"
                  x="0"
                  y="1em">
              {{$t('departmentManagement.chooseWorkRule')}}
            </text>
          </svg>

          <svg id="editSelectExtraWorkRule" width="120" height="80" viewBox="0 0 120 80">
            <text font-family="'Helvetica Neue','PingFang SC','microsoft yahei'" fill="#737470" font-size="15"
                  x="0"
                  y="1em">
              {{$t('departmentManagement.chooseExtraWorkRule')}}
            </text>
          </svg>

          <svg id="editNoonBreakRule" width="120" height="80" viewBox="0 0 120 80">
            <text font-family="'Helvetica Neue','PingFang SC','microsoft yahei'" fill="#737470" font-size="15"
                  x="0"
                  y="1em">
              {{$t('noonBreak.chooseNoonBreakRule')}}
            </text>
          </svg>

          <el-row id="editNoonBreakRuleSelector">
            <el-select v-model="editNoonBreakRule" :placeholder="$t('ExtraWorkApply.pleaseSelect')">
              <el-option
                v-for="item in noonBreakRuleOption"
                :key="item.name"
                :label="item.name"
                :value="item.name"
                style="height: auto">
                <span style="float: left">{{ item.name }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
              </el-option>
            </el-select>
          </el-row>

          <el-row id="editClockInRuleSelector">
            <el-select v-model="editClockInRule" :placeholder="$t('ExtraWorkApply.pleaseSelect')">
              <el-option
                v-for="item in clockInRuleOption"
                :key="item.name"
                :label="item.name"
                :value="item.name"
                style="height: auto">
                <span style="float: left">{{ item.name }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span></el-option>
            </el-select>
          </el-row>

          <el-row id="editExtraWorkRuleSelector">
            <el-select v-model="editExtraWorkRule" :placeholder="$t('ExtraWorkApply.pleaseSelect')">
              <el-option
                v-for="item in extraWorkRuleOption"
                :key="item.name"
                :label="item.name"
                :value="item.name"
                style="height: auto">
                <span style="float: left">{{ item.name }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
              </el-option>
            </el-select>
          </el-row>

          <el-row id="editFormContentLabel">
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

          <el-row id="editFormContent">
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
          </el-row>

          <div id="editSubInfoBut" class="but2">
            <el-button style="width: 150px" @click="confirmEdition">{{$t('login.confirm')}}</el-button>
          </div>
        </el-dialog>
      </el-row>


      <el-row class="manageClockInRule">
        <el-dialog :title="$t('departmentManagement.manageClockInRule')" :visible.sync="manageClockInRuleVisible">

          <el-row id="clockInRuleTable" class="tab" >
            <el-table
              border
              :data="clockInRuleInfo"
              height="500"
              style="width: 100%;">
              <div v-for="item in clockInRuleLabel">
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
                    <el-button @click="editClockIn(scope.row.index)" icon="el-icon-edit" style="width:40px;height: 20px">
                    </el-button>
                    <span></span>
                    <el-button @click="deleteClockIn(scope.row.index)" icon="el-icon-delete" style="width:40px;height: 20px">
                    </el-button>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </el-row>

          <div id="addClockInRuleBut" class="but2">
            <el-button style="width: 150px" @click="addClockInRuleDetailVisible = true">{{$t('departmentManagement.addClockInRule')}}</el-button>
          </div>
        </el-dialog>
      </el-row>

      <el-row class="editRule">
        <el-dialog :title="$t('departmentManagement.addClockInRule')" :visible.sync="addClockInRuleDetailVisible">

          <svg id="addClockInRuleIdLabel" width="120" height="80" viewBox="0 0 120 80">
            <text font-family="'Helvetica Neue','PingFang SC','microsoft yahei'" fill="#737470" font-size="15"
                  x="0"
                  y="1em">
              {{$t('departmentManagement.clockInRuleNumber')}}
            </text>
          </svg>

          <svg id="addClockInRuleStartLabel" width="120" height="80" viewBox="0 0 120 80">
            <text font-family="'Helvetica Neue','PingFang SC','microsoft yahei'" fill="#737470" font-size="15"
                  x="0"
                  y="1em">
              {{$t('departmentManagement.workStart')}}
            </text>
          </svg>

          <svg id="addClockInRuleEndLabel" width="120" height="80" viewBox="0 0 120 80">
            <text font-family="'Helvetica Neue','PingFang SC','microsoft yahei'" fill="#737470" font-size="15"
                  x="0"
                  y="1em">
              {{$t('departmentManagement.workEnd')}}
            </text>
          </svg>

          <el-row id="addClockInRuleId">
            <el-input v-model="addClockInRuleDetail[0].value" :placeholder="$t('header.pleaseEnter')" maxlength="10"></el-input>
          </el-row>

          <el-row id="addClockInRuleStart">
            <el-time-picker
              v-model="addClockInRuleDetail[1].value"
              :placeholder="$t('statistic.pleaseChooseTimePeriod')">
            </el-time-picker>
          </el-row>

          <el-row id="addClockInRuleEnd">
            <el-time-picker
              v-model="addClockInRuleDetail[2].value"
              :placeholder="$t('statistic.pleaseChooseTimePeriod')">
            </el-time-picker>
          </el-row>

          <div id="addClockInRuleSubBut" class="but2">
            <el-button style="width: 150px" @click="addClockIn">{{$t('login.confirm')}}</el-button>
          </div>
        </el-dialog>
      </el-row>

      <el-row class="editRule">
        <el-dialog :title="$t('departmentManagement.editClockInRule')" :visible.sync="editClockInRuleDetailVisible">

          <svg id="editClockInRuleIdLabel" width="120" height="80" viewBox="0 0 120 80">
            <text font-family="'Helvetica Neue','PingFang SC','microsoft yahei'" fill="#737470" font-size="15"
                  x="0"
                  y="1em">
              {{$t('departmentManagement.clockInRuleNumber')}}
            </text>
          </svg>

          <svg id="editClockInRuleStartLabel" width="120" height="80" viewBox="0 0 120 80">
            <text font-family="'Helvetica Neue','PingFang SC','microsoft yahei'" fill="#737470" font-size="15"
                  x="0"
                  y="1em">
              {{$t('departmentManagement.workStart')}}
            </text>
          </svg>

          <svg id="editClockInRuleEndLabel" width="120" height="80" viewBox="0 0 120 80">
            <text font-family="'Helvetica Neue','PingFang SC','microsoft yahei'" fill="#737470" font-size="15"
                  x="0"
                  y="1em">
              {{$t('departmentManagement.workEnd')}}
            </text>
          </svg>

          <el-row id="editClockInRuleId">
            <el-input v-model="editClockInRuleDetail[0].value" :placeholder="$t('header.pleaseEnter')" maxlength="10"></el-input>
          </el-row>

          <el-row id="editClockInRuleStart">
            <el-time-picker
              v-model="editClockInRuleDetail[1].value"
              :placeholder="$t('statistic.pleaseChooseTimePeriod')">
            </el-time-picker>
          </el-row>

          <el-row id="editClockInRuleEnd">
            <el-time-picker
              v-model="editClockInRuleDetail[2].value"
              :placeholder="$t('statistic.pleaseChooseTimePeriod')">
            </el-time-picker>
          </el-row>

          <div id="editClockInRuleSubBut" class="but2">
            <el-button style="width: 150px" @click="confirmEditClockInRule">{{$t('login.confirm')}}</el-button>
          </div>
        </el-dialog>
      </el-row>

      <el-row class="manageClockInRule">
        <el-dialog :title="$t('noonBreak.manageNoonBreakRule')" :visible.sync="manageNoonBreakRuleVisible">

          <el-row id="noonBreakRuleTable" class="tab" >
            <el-table
              border
              :data="noonBreakRuleInfo"
              height="500"
              style="width: 100%;">
              <div v-for="item in noonBreakRuleLabel">
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
                    <el-button @click="editNoonBreak(scope.row.index)" icon="el-icon-edit" style="width:40px;height: 20px">
                    </el-button>
                    <span></span>
                    <el-button @click="deleteNoonBreak(scope.row.index)" icon="el-icon-delete" style="width:40px;height: 20px">
                    </el-button>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </el-row>

          <div id="addNoonBreakRuleBut" class="but2">
            <el-button style="width: 150px" @click="addNoonBreakRuleDetailVisible = true">{{$t('noonBreak.addNoonBreakRule')}}</el-button>
          </div>
        </el-dialog>
      </el-row>

      <el-row class="editRule">
        <el-dialog :title="$t('noonBreak.addNoonBreakRule')" :visible.sync="addNoonBreakRuleDetailVisible">

          <svg id="addNoonBreakRuleIdLabel" width="120" height="80" viewBox="0 0 120 80">
            <text font-family="'Helvetica Neue','PingFang SC','microsoft yahei'" fill="#737470" font-size="15"
                  x="0"
                  y="1em">
              {{$t('noonBreak.noonBreakId')}}
            </text>
          </svg>

          <svg id="addNoonBreakRuleStartLabel" width="120" height="80" viewBox="0 0 120 80">
            <text font-family="'Helvetica Neue','PingFang SC','microsoft yahei'" fill="#737470" font-size="15"
                  x="0"
                  y="1em">
              {{$t('noonBreak.breakStart')}}
            </text>
          </svg>

          <svg id="addNoonBreakRuleEndLabel" width="120" height="80" viewBox="0 0 120 80">
            <text font-family="'Helvetica Neue','PingFang SC','microsoft yahei'" fill="#737470" font-size="15"
                  x="0"
                  y="1em">
              {{$t('noonBreak.breakEnd')}}
            </text>
          </svg>

          <el-row id="addNoonBreakRuleId">
            <el-input v-model="addNoonBreakRuleDetail[0].value" :placeholder="$t('header.pleaseEnter')" maxlength="10"></el-input>
          </el-row>

          <el-row id="addNoonBreakRuleStart">
            <el-time-picker
              v-model="addNoonBreakRuleDetail[1].value"
              :placeholder="$t('statistic.pleaseChooseTimePeriod')">
            </el-time-picker>
          </el-row>

          <el-row id="addNoonBreakRuleEnd">
            <el-time-picker
              v-model="addNoonBreakRuleDetail[2].value"
              :placeholder="$t('statistic.pleaseChooseTimePeriod')">
            </el-time-picker>
          </el-row>

          <div id="addNoonBreakRuleSubBut" class="but2">
            <el-button style="width: 150px" @click="addNoonBreak">{{$t('login.confirm')}}</el-button>
          </div>
        </el-dialog>
      </el-row>

      <el-row class="editRule">
        <el-dialog :title="$t('noonBreak.editNoonBreakRule')" :visible.sync="editNoonBreakRuleDetailVisible">

          <svg id="editNoonBreakRuleIdLabel" width="120" height="80" viewBox="0 0 120 80">
            <text font-family="'Helvetica Neue','PingFang SC','microsoft yahei'" fill="#737470" font-size="15"
                  x="0"
                  y="1em">
              {{$t('noonBreak.noonBreakId')}}
            </text>
          </svg>

          <svg id="editNoonBreakRuleStartLabel" width="120" height="80" viewBox="0 0 120 80">
            <text font-family="'Helvetica Neue','PingFang SC','microsoft yahei'" fill="#737470" font-size="15"
                  x="0"
                  y="1em">
              {{$t('noonBreak.breakStart')}}
            </text>
          </svg>

          <svg id="editNoonBreakRuleEndLabel" width="120" height="80" viewBox="0 0 120 80">
            <text font-family="'Helvetica Neue','PingFang SC','microsoft yahei'" fill="#737470" font-size="15"
                  x="0"
                  y="1em">
              {{$t('noonBreak.breakEnd')}}
            </text>
          </svg>

          <el-row id="editNoonBreakRuleId">
            <el-input v-model="editNoonBreakRuleDetail[0].value" :placeholder="$t('header.pleaseEnter')" maxlength="10"></el-input>
          </el-row>

          <el-row id="editNoonBreakRuleStart">
            <el-time-picker
              v-model="editNoonBreakRuleDetail[1].value"
              :placeholder="$t('statistic.pleaseChooseTimePeriod')">
            </el-time-picker>
          </el-row>

          <el-row id="editNoonBreakRuleEnd">
            <el-time-picker
              v-model="editNoonBreakRuleDetail[2].value"
              :placeholder="$t('statistic.pleaseChooseTimePeriod')">
            </el-time-picker>
          </el-row>

          <div id="editNoonBreakRuleSubBut" class="but2">
            <el-button style="width: 150px" @click="confirmEditNoonBreakRule">{{$t('login.confirm')}}</el-button>
          </div>
        </el-dialog>
      </el-row>

      <el-row class="manageClockInRule">
        <el-dialog :title="$t('departmentManagement.manageExtraWorkRule')" :visible.sync="manageExtraWorkRuleVisible">

          <el-row id="extraWorkRuleTable" class="tab">
            <el-table
              border
              height="500"
              :data="extraWorkRuleInfo"
              style="width: 100%">
              <div v-for="item in extraWorkRuleLabel">
                <el-table-column
                  sortable
                  :show-overflow-tooltip="true"
                  :label="item.name"
                  :key="item.key"
                  :prop="item.key"
                  width="150"
                >
                </el-table-column>
              </div>

              <el-table-column
                :label="$t('departmentManagement.operation')"
                prop="type"
              width="150">
                <template slot-scope="scope">
                  <div class="showDialogFather">
                    <el-button @click="editExtraWork(scope.row.index)" icon="el-icon-edit" style="width:40px;height: 20px">
                    </el-button>
                    <span></span>
                    <el-button @click="deleteExtraWork(scope.row.index)" icon="el-icon-delete" style="width:40px;height: 20px">
                    </el-button>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </el-row>

          <div id="addExtraWorkRuleBut" class="but2">
            <el-button style="width: 150px" @click="addExtraWorkRuleDetailVisible = true">{{$t('departmentManagement.addExtraWorkRule')}}</el-button>
          </div>
        </el-dialog>
      </el-row>

      <el-row class="editRule">
        <el-dialog :title="$t('departmentManagement.addExtraWorkRule')" :visible.sync="addExtraWorkRuleDetailVisible">

          <svg id="addExtraWorkRuleIdLabel" width="120" height="80" viewBox="0 0 120 80">
            <text font-family="'Helvetica Neue','PingFang SC','microsoft yahei'" fill="#737470" font-size="15"
                  x="0"
                  y="1em">
              {{$t('departmentManagement.extraWorkRuleNumber')}}
            </text>
          </svg>

          <svg id="addExtraWorkRuleStartLabel" width="120" height="80" viewBox="0 0 120 80">
            <text font-family="'Helvetica Neue','PingFang SC','microsoft yahei'" fill="#737470" font-size="15"
                  x="0"
                  y="1em">
              {{$t('departmentManagement.extraWorkStart')}}
            </text>
          </svg>

          <svg id="addExtraWorkRuleEndLabel" width="120" height="80" viewBox="0 0 120 80">
            <text font-family="'Helvetica Neue','PingFang SC','microsoft yahei'" fill="#737470" font-size="15"
                  x="0"
                  y="1em">
              {{$t('departmentManagement.extraWorkEnd')}}
            </text>
          </svg>

          <svg id="addExtraWorkRuleMinLabel" width="120" height="80" viewBox="0 0 120 80">
            <text font-family="'Helvetica Neue','PingFang SC','microsoft yahei'" fill="#737470" font-size="15"
                  x="0"
                  y="1em">
              {{$t('departmentManagement.minWorkTime')}}
            </text>
          </svg>

          <el-row id="addExtraWorkRuleId">
            <el-input v-model="addExtraWorkRuleDetail[0].value" :placeholder="$t('header.pleaseEnter')" maxlength="10"></el-input>
          </el-row>

          <el-row id="addExtraWorkRuleStart">
            <el-time-picker
              v-model="addExtraWorkRuleDetail[1].value"
              :placeholder="$t('statistic.pleaseChooseTimePeriod')">
            </el-time-picker>
          </el-row>

          <el-row id="addExtraWorkRuleEnd">
            <el-time-picker
              v-model="addExtraWorkRuleDetail[2].value"
              :placeholder="$t('statistic.pleaseChooseTimePeriod')">
            </el-time-picker>
          </el-row>

          <el-row id="addExtraWorkRuleMin">
            <el-input v-model="addExtraWorkRuleDetail[3].value" :placeholder="$t('header.pleaseEnter')" maxlength="2"></el-input>
          </el-row>

          <div id="addExtraWorkRuleSubBut" class="but2">
            <el-button style="width: 150px" @click="addExtraWork">{{$t('login.confirm')}}</el-button>
          </div>
        </el-dialog>
      </el-row>

      <el-row class="editRule">
        <el-dialog :title="$t('departmentManagement.editExtraWorkRule')" :visible.sync="editExtraWorkRuleDetailVisible">

          <svg id="editExtraWorkRuleIdLabel" width="120" height="80" viewBox="0 0 120 80">
            <text font-family="'Helvetica Neue','PingFang SC','microsoft yahei'" fill="#737470" font-size="15"
                  x="0"
                  y="1em">
              {{$t('departmentManagement.extraWorkRuleNumber')}}
            </text>
          </svg>

          <svg id="editExtraWorkRuleStartLabel" width="120" height="80" viewBox="0 0 120 80">
            <text font-family="'Helvetica Neue','PingFang SC','microsoft yahei'" fill="#737470" font-size="15"
                  x="0"
                  y="1em">
              {{$t('departmentManagement.extraWorkStart')}}
            </text>
          </svg>

          <svg id="editExtraWorkRuleEndLabel" width="120" height="80" viewBox="0 0 120 80">
            <text font-family="'Helvetica Neue','PingFang SC','microsoft yahei'" fill="#737470" font-size="15"
                  x="0"
                  y="1em">
              {{$t('departmentManagement.extraWorkEnd')}}
            </text>
          </svg>

          <svg id="editExtraWorkRuleMinLabel" width="120" height="80" viewBox="0 0 120 80">
            <text font-family="'Helvetica Neue','PingFang SC','microsoft yahei'" fill="#737470" font-size="15"
                  x="0"
                  y="1em">
              {{$t('departmentManagement.minWorkTime')}}
            </text>
          </svg>

          <el-row id="editExtraWorkRuleId">
            <el-input v-model="editExtraWorkRuleDetail[0].value" :placeholder="$t('header.pleaseEnter')" maxlength="10"></el-input>
          </el-row>

          <el-row id="editExtraWorkRuleStart">
            <el-time-picker
              v-model="editExtraWorkRuleDetail[1].value"
              :placeholder="$t('statistic.pleaseChooseTimePeriod')">
            </el-time-picker>
          </el-row>

          <el-row id="editExtraWorkRuleEnd">
            <el-time-picker
              v-model="editExtraWorkRuleDetail[2].value"
              :placeholder="$t('statistic.pleaseChooseTimePeriod')">
            </el-time-picker>
          </el-row>

          <el-row id="editExtraWorkRuleMin">
            <el-input v-model="editExtraWorkRuleDetail[3].value" :placeholder="$t('header.pleaseEnter')" maxlength="2"></el-input>
          </el-row>

          <div id="editExtraWorkRuleSubBut" class="but2">
            <el-button style="width: 150px" @click="confirmEditExtraWorkRule">{{$t('login.confirm')}}</el-button>
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
    name: "DepartmentManagement",

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
        searchInfo: "",
        departmentInfoLabel: [
          {name: "created", value: this.$t('departmentManagement.createdTime')},
          {name: "department_id", value: this.$t('departmentManagement.department_id')},
          {name: "tel", value: this.$t('departmentManagement.tel')},
          {name: "charger_name", value: this.$t('departmentManagement.charger_name')},
          {name: "staffing", value: this.$t('departmentManagement.staffing')},],
        departmentInfo: [],
        dialogFormVisible: false,
        editVisible: false,
        detailInfo: [
          {name: this.$t('departmentManagement.department_id'), value: "", key: "department_id"},
          {name: this.$t('departmentManagement.departmentName'), value: "", key: "name"},
          {name: this.$t('departmentManagement.tel'), value: "", key: "tel"},
          {name: this.$t('departmentManagement.workPlace'), value: "", key: "work_place"},
          {name: this.$t('departmentManagement.charger'), value: "", key: "charger_name"},
        ],
        editDetail: [
          {name: this.$t('departmentManagement.department_id'), value: "", key: "department_id"},
          {name: this.$t('departmentManagement.departmentName'), value: "", key: "name"},
          {name: this.$t('departmentManagement.tel'), value: "", key: "tel"},
          {name: this.$t('departmentManagement.workPlace'), value: "", key: "work_place"},
          {name: this.$t('departmentManagement.charger'), value: "", key: "charger_name"},
        ],
        acquireList: ["id", "department_id", "name", "tel", "work_place", "charger_name", "charger_uid",
          "work_time_schedule_id", "extra_work_time_schedule_id", "staffing",  "created", "noon_break_id",],
        selectClockInRule: "",
        selectExtraWorkRule: "",
        selectNoonBreakRule:"",
        editClockInRule: "",
        editExtraWorkRule: "",
        editNoonBreakRule:"",
        editId: "",
        clockInRuleOption: [],
        extraWorkRuleOption: [],
        noonBreakRuleOption:[],

        manageClockInRuleVisible: false,
        clockInRuleInfo: [],
        clockInRuleLabel: [
          {name: this.$t('departmentManagement.lastUpdate'), value: "", key: "updated"},
          {name: this.$t('departmentManagement.scheduleId'), value: "", key: "workTimeScheduleId"},
          {name: this.$t('departmentManagement.workStart'), value: "", key: "startWork"},
          {name: this.$t('departmentManagement.workEnd'), value: "", key: "endWork"},
          {name: this.$t('departmentManagement.createdTime'), value: "", key: "created"},
        ],
        addClockInRuleDetailVisible: false,
        addClockInRuleDetail: [
          {name: this.$t('departmentManagement.scheduleId'), value: "", key: "workTimeScheduleId"},
          {name: this.$t('departmentManagement.workStart'), value: "", key: "startWork"},
          {name: this.$t('departmentManagement.workEnd'), value: "", key: "endWork"},
        ],
        editClockInRuleDetailVisible: false,
        editClockInRuleDetail: [
          {name: this.$t('departmentManagement.scheduleId'), value: "", key: "workTimeScheduleId"},
          {name: this.$t('departmentManagement.workStart'), value: "", key: "startWork"},
          {name: this.$t('departmentManagement.workEnd'), value: "", key: "endWork"},
        ],
        currentEditClockInRuleId: "",

        manageNoonBreakRuleVisible: false,
        noonBreakRuleInfo: [],
        noonBreakRuleLabel: [
          {name: this.$t('departmentManagement.lastUpdate'), value: "", key: "updated"},
          {name: this.$t('departmentManagement.scheduleId'), value: "", key: "noonBreakId"},
          {name: this.$t('noonBreak.breakStart'), value: "", key: "startTime"},
          {name: this.$t('noonBreak.breakEnd'), value: "", key: "endTime"},
          {name: this.$t('departmentManagement.createdTime'), value: "", key: "created"},
        ],
        addNoonBreakRuleDetailVisible: false,
        addNoonBreakRuleDetail: [
          {name: this.$t('departmentManagement.scheduleId'), value: "", key: "noonBreakId"},
          {name: this.$t('noonBreak.breakStart'), value: "", key: "startTime"},
          {name: this.$t('noonBreak.breakEnd'), value: "", key: "endTime"},
        ],
        editNoonBreakRuleDetailVisible: false,
        editNoonBreakRuleDetail: [
          {name: this.$t('departmentManagement.scheduleId'), value: "", key: "noonBreakId"},
          {name: this.$t('noonBreak.breakStart'), value: "", key: "startTime"},
          {name: this.$t('noonBreak.breakEnd'), value: "", key: "endTime"},
        ],
        currentEditNoonBreakRuleId: "",


        manageExtraWorkRuleVisible: false,
        extraWorkRuleInfo: [],
        extraWorkRuleLabel: [
          {name: this.$t('departmentManagement.lastUpdate'), value: "", key: "updated"},
          {name: this.$t('departmentManagement.scheduleId'), value: "", key: "extraWorkTimeScheduleId"},
          {name: this.$t('departmentManagement.extraWorkStart'), value: "", key: "startWork"},
          {name: this.$t('departmentManagement.extraWorkEnd'), value: "", key: "endWork"},
          {name: this.$t('departmentManagement.minWorkTime'), value: "", key: "minimumWorkTime"},
          {name: this.$t('departmentManagement.createdTime'), value: "", key: "created"},
        ],
        addExtraWorkRuleDetailVisible: false,
        addExtraWorkRuleDetail: [
          {name: this.$t('departmentManagement.scheduleId'), value: "", key: "extraWorkTimeScheduleId"},
          {name: this.$t('departmentManagement.extraWorkStart'), value: "", key: "startWork"},
          {name: this.$t('departmentManagement.extraWorkEnd'), value: "", key: "endWork"},
          {name: this.$t('departmentManagement.minWorkTime'), value: "", key: "minimumWorkTime"},
        ],
        editExtraWorkRuleDetailVisible: false,
        editExtraWorkRuleDetail: [
          {name: this.$t('departmentManagement.scheduleId'), value: "", key: "extraWorkTimeScheduleId"},
          {name: this.$t('departmentManagement.extraWorkStart'), value: "", key: "startWork"},
          {name: this.$t('departmentManagement.extraWorkEnd'), value: "", key: "endWork"},
          {name: this.$t('departmentManagement.minWorkTime'), value: "", key: "minimumWorkTime"},
        ],
        currentEditExtraWorkRuleId: "",

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
              this.getDepartmentInfo();
              this.showClockInRule();
              this.showExtraWorkRule();
              this.showNoonBreakRule();
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
      getDepartmentInfo: function () {
        let pattern = /[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]/im;
        if (pattern.test(this.searchInfo)) {
          alert(this.$t('departmentManagement.illegalChar'));
          this.searchInfo = "";
          return;
        }
        this.departmentInfo = [];
        let size = this.acquireList.length;
        let data = "id";
        for (let i = 1; i < size; i++) {
          data = data + "," + this.acquireList[i];
        }
        let cond = "";
        let searchType = "";
        if (this.searchInfo === "") {
          cond = "id,>,-1";
          searchType = "0";
        } else {
          searchType = "2";
          for (let i = 1; i < size; i++) {
            if (i === size - 1) {
              if (this.acquireList[i] === "created") {
                cond = cond.substring(0, cond.length - 1);
                continue;
              }
              cond = cond + this.acquireList[i] + ",," + this.searchInfo;
            } else {
              if (this.acquireList[i] === "created") {
                continue;
              }
              cond = cond + this.acquireList[i] + ",," + this.searchInfo + ",";
            }
          }
        }
        axios
          .get('/api/advance/updateStaffing')
          .then(response => {
            if (response.data.status === 200) {

              // 获取总页数
              let pageInfo = new URLSearchParams;
              pageInfo.append("cond", String(cond));
              pageInfo.append("searchType", String(searchType));
              axios
                .post('/api/advance/countDepartment', pageInfo)
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
              info.append("targetColumns", String(data));
              info.append("formName", String("department"));
              info.append("cond", String(cond));
              info.append("searchType", String(searchType));
              info.append("separate", String("OR"));
              info.append("pageNum", String(this.currentPageNum));
              info.append("pageMax", String(14));

              axios
                .post('/api/general/row/get', info)
                .then(response => {
                  if (response.data.status === 200) {
                    let dataList = response.data.data;
                    let size = dataList.length;
                    for (let i = 0; i < size; i++) {
                      dataList[i].index = i;
                      this.departmentInfo.push(dataList[i]);
                    }
                  } else {
                    // 获取失败
                    alert(this.$t('departmentManagement.getDepartmentInfoFail'));
                  }
                })
            } else {
              // 获取失败
              alert(this.$t('departmentManagement.renewStaffFail'));
            }
          });
      },

      editInfo: function (index) {
        let departmentData = this.departmentInfo[index];
        let size = this.editDetail.length;
        for (let i = 0; i < size; i++) {
          this.editDetail[i].value = departmentData[this.editDetail[i].key];
        }
        this.editClockInRule = departmentData.work_time_schedule_id;
        this.editExtraWorkRule = departmentData.extra_work_time_schedule_id;
        this.editNoonBreakRule = departmentData.noon_break_id;
        this.editId = departmentData.id;
        this.editVisible = true;
      },
      confirmEdition: function () {
        let size = this.editDetail.length;
        let data = {};
        for (let i = 0; i < size; i++) {
          data[this.editDetail[i].key] = this.editDetail[i].value
        }
        data.work_time_schedule_id = this.editClockInRule;
        data.extra_work_time_schedule_id = this.editExtraWorkRule;
        data.noon_break_id = this.editNoonBreakRule;
        let info = new URLSearchParams;
        info.append("id", String(this.editId));
        info.append("info", JSON.stringify(data));
        axios
          .post('/api/advance/changeDepartment', info)
          .then(response => {
            if (response.data.status === 200) {
              alert(this.$t('departmentManagement.changeDepartmentSuccess'));
              this.editVisible = false;
              this.getDepartmentInfo();
            } else {
              // 获取失败
              alert(this.$t('departmentManagement.changeDepartmentFail'));
            }
          })
      },
      addDepartment: function () {
        let detail = this.detailInfo;
        if (/^1(3|4|5|6|7|8|9)\d{9}$/.test(detail[2].value) == false) {
          alert(this.$t('header.pleaseEnterCorrectPhoneNumber'));
          return;
        }

        let info = new URLSearchParams;
        info.append("departmentId", String(detail[0].value));
        info.append("name", String(detail[1].value));
        info.append("tel", String(detail[2].value));
        info.append("workPlace", String(detail[3].value));
        info.append("chargerName", String(detail[4].value));
        info.append("workTimeScheduleId", String(this.selectClockInRule));
        info.append("extraWorkTimeScheduleId", String(this.selectExtraWorkRule));
        info.append("noonBreakId", String(this.selectNoonBreakRule));

        axios
          .post('/api/advance/addDepartment', info)
          .then(response => {
            if (response.data.status === 200) {
              alert(this.$t('departmentManagement.addDepartmentSuccess'));
              this.dialogFormVisible = false;
              this.getDepartmentInfo();
            } else {
              // 获取失败
              alert(this.$t('departmentManagement.addDepartmentFail'));
            }
          });
      },
      deleteDepartment: function (index) {
        this.$confirm(this.$t('departmentManagement.thisOperationWouldDeleteThisDepartment'), this.$t('statistic.notice'), {
          confirmButtonText: this.$t('login.confirm'),
          cancelButtonText: this.$t('header.cancel'),
          type: 'warning'
        }).then(() => {
          let detail = this.departmentInfo[index];
          let info = new URLSearchParams;
          info.append("departmentId", String(detail.department_id));
          info.append("name", String(detail.name));

          axios
            .post('/api/advance/deleteDepartment', info)
            .then(response => {
              if (response.data.status === 200) {
                alert(this.$t('departmentManagement.deleteDepartmentSuccess'));
                this.getDepartmentInfo();
              } else {
                // 获取失败
                alert(this.$t('departmentManagement.deleteDepartmentFail'));
              }
            });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: this.$t('departmentManagement.deleteCanceled')
          });
        });
      },

      showClockInRule: function () {
        this.clockInRuleInfo = [];
        this.clockInRuleOption = [];
        axios
          .get('/api/advance/getAllClockInRule')
          .then(response => {
            if (response.data.status === 200) {
              let dataList = response.data.data;
              let size = dataList.length;
              for (let i = 0; i < size; i++) {
                dataList[i].index = i;
                this.clockInRuleInfo.push(dataList[i]);
                this.clockInRuleOption.push({
                  name: dataList[i].workTimeScheduleId,
                  value: dataList[i].startWork + "-" + dataList[i].endWork
                })
              }
            } else {
              // 获取失败
              alert(this.$t('departmentManagement.getClockInRuleFail'));
            }
          });
      },
      addClockIn: function () {
        if (this.addClockInRuleDetail[0].value === "" || this.addClockInRuleDetail[0].value == null) {
          alert(this.$t('departmentManagement.pleaseEnterClockInRuleName'));
          return;
        }

        let startTime = this.addClockInRuleDetail[1].value;
        let endTime = this.addClockInRuleDetail[2].value;
        if (startTime !== "" && endTime !== "" && startTime !== null && endTime !== null) {
          let startHour = startTime.getHours();
          let startMinute = startTime.getMinutes();
          //console.log(startYear,startMonth,startDay,startHour,startMinute);
          let endHour = endTime.getHours();
          let endMinute = endTime.getMinutes();
          if (endHour + endMinute / 60 < startHour + startMinute / 60) {
            alert(this.$t('departmentManagement.illegalTimePeriod'));
            return;
          }
          let info = new URLSearchParams;
          info.append("newScheduleId", String(this.addClockInRuleDetail[0].value));
          info.append("newStart", String(startHour + ":" + startMinute));
          info.append("newEnd", String(endHour + ":" + endMinute));

          axios
            .post('/api/advance/addClockInSchedule', info)
            .then(response => {
              if (response.data.status === 200) {
                alert(this.$t('departmentManagement.addClockInRuleSuccess'));
                this.showClockInRule();
                this.addClockInRuleDetailVisible = false;
                this.addClockInRuleDetail[0].value = "";
                this.addClockInRuleDetail[1].value = "";
                this.addClockInRuleDetail[2].value = "";
              } else {
                // 获取失败
                alert(this.$t('departmentManagement.addClockInRuleFail'));
              }
            });
        } else {
          alert(this.$t('departmentManagement.pleaseChooseClockInTime'));
          return;
        }
      },
      editClockIn: function (index) {
        let detail = this.clockInRuleInfo[index];
        this.editClockInRuleDetail[0].value = detail.workTimeScheduleId;
        this.editClockInRuleDetail[1].value = new Date(2019, 1, 1, detail.startWork.split(":")[0], detail.startWork.split(":")[1]);
        this.editClockInRuleDetail[2].value = new Date(2019, 1, 1, detail.endWork.split(":")[0], detail.endWork.split(":")[1]);
        this.currentEditClockInRuleId = detail.workTimeScheduleId;
        this.editClockInRuleDetailVisible = true;
      },
      confirmEditClockInRule: function () {
        if (this.editClockInRuleDetail[0].value === "" || this.editClockInRuleDetail[0].value == null) {
          alert(this.$t('departmentManagement.pleaseEnterClockInRuleName'));
          return;
        }

        let startTime = this.editClockInRuleDetail[1].value;
        let endTime = this.editClockInRuleDetail[2].value;
        if (startTime !== "" && endTime !== "" && startTime !== null && endTime !== null) {
          let startHour = startTime.getHours();
          let startMinute = startTime.getMinutes();
          //console.log(startYear,startMonth,startDay,startHour,startMinute);
          let endHour = endTime.getHours();
          let endMinute = endTime.getMinutes();
          if (endHour + endMinute / 60 < startHour + startMinute / 60) {
            alert(this.$t('departmentManagement.illegalTimePeriod'));
            return;
          }
          let info = new URLSearchParams;
          info.append("oldId", String(this.currentEditClockInRuleId));
          info.append("newScheduleId", String(this.editClockInRuleDetail[0].value));
          info.append("newStart", String(startHour + ":" + startMinute));
          info.append("newEnd", String(endHour + ":" + endMinute));

          axios
            .post('/api/advance/changeClockInSchedule', info)
            .then(response => {
              if (response.data.status === 200) {
                alert(this.$t('departmentManagement.editClockInRuleSuccess'));
                this.showClockInRule();
                this.editClockInRuleDetailVisible  =false;
              } else {
                // 获取失败
                alert(this.$t('departmentManagement.editClockInRuleFail'));
              }
            });
        } else {
          alert(this.$t('departmentManagement.pleaseChooseClockInTime'));
          return;
        }
      },
      deleteClockIn: function (index) {
        this.$confirm(this.$t('departmentManagement.thisOperationWouldDeleteThisRule'), this.$t('statistic.notice'), {
          confirmButtonText: this.$t('login.confirm'),
          cancelButtonText: this.$t('header.cancel'),
          type: 'warning'
        }).then(() => {
          let info = new URLSearchParams;
          info.append("workTimeId", String(this.clockInRuleInfo[index].workTimeScheduleId));
          axios
            .post('/api/advance/deleteClockInSchedule', info)
            .then(response => {
              if (response.data.status === 200) {
                alert(this.$t('departmentManagement.deleteClockInRuleSuccess'));
                this.showClockInRule();
              } else {
                // 获取失败
                alert(this.$t('departmentManagement.deleteClockInRuleFail'));
              }
            });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: this.$t('departmentManagement.deleteCanceled')
          });
        });
      },

      showNoonBreakRule: function () {
        this.noonBreakRuleInfo = [];
        this.noonBreakRuleOption = [];
        axios
          .get('/api/advance/getAllNoonBreakRule')
          .then(response => {
            if (response.data.status === 200) {
              let dataList = response.data.data;
              let size = dataList.length;
              for (let i = 0; i < size; i++) {
                dataList[i].index = i;
                this.noonBreakRuleInfo.push(dataList[i]);
                this.noonBreakRuleOption.push({
                  name: dataList[i].noonBreakId,
                  value: dataList[i].startTime + "-" + dataList[i].endTime
                })
              }
            } else {
              // 获取失败
              alert(this.$t('noonBreak.getNoonBreakRuleFail'));
            }
          });
      },
      addNoonBreak: function () {
        if (this.addNoonBreakRuleDetail[0].value === "" || this.addNoonBreakRuleDetail[0].value == null) {
          alert(this.$t('noonBreak.pleaseEnterNoonBreakRuleName'));
          return;
        }

        let startTime = this.addNoonBreakRuleDetail[1].value;
        let endTime = this.addNoonBreakRuleDetail[2].value;
        if (startTime !== "" && endTime !== "" && startTime !== null && endTime !== null) {
          let startHour = startTime.getHours();
          let startMinute = startTime.getMinutes();
          //console.log(startYear,startMonth,startDay,startHour,startMinute);
          let endHour = endTime.getHours();
          let endMinute = endTime.getMinutes();
          if (endHour + endMinute / 60 < startHour + startMinute / 60) {
            alert(this.$t('departmentManagement.illegalTimePeriod'));
            return;
          }
          let info = new URLSearchParams;
          info.append("newScheduleId", String(this.addNoonBreakRuleDetail[0].value));
          info.append("newStart", String(startHour + ":" + startMinute));
          info.append("newEnd", String(endHour + ":" + endMinute));

          axios
            .post('/api/advance/addNoonBreakSchedule', info)
            .then(response => {
              if (response.data.status === 200) {
                alert(this.$t('noonBreak.addNoonBreakRuleSuccess'));
                this.showNoonBreakRule();
                this.addNoonBreakRuleDetailVisible = false;
                this.addNoonBreakRuleDetail[0].value = "";
                this.addNoonBreakRuleDetail[1].value = "";
                this.addNoonBreakRuleDetail[2].value = "";
              } else {
                // 获取失败
                alert(this.$t('noonBreak.addNoonBreakRuleFail'));
              }
            });
        } else {
          alert(this.$t('noonBreak.pleaseChooseNoonBreakTime'));
          return;
        }
      },
      editNoonBreak: function (index) {
        let detail = this.noonBreakRuleInfo[index];
        this.editNoonBreakRuleDetail[0].value = detail.noonBreakId;
        this.editNoonBreakRuleDetail[1].value = new Date(2019, 1, 1, detail.startTime.split(":")[0], detail.startTime.split(":")[1]);
        this.editNoonBreakRuleDetail[2].value = new Date(2019, 1, 1, detail.endTime.split(":")[0], detail.endTime.split(":")[1]);
        this.currentEditNoonBreakRuleId = detail.noonBreakId;
        this.editNoonBreakRuleDetailVisible = true;
      },
      confirmEditNoonBreakRule: function () {
        if (this.editNoonBreakRuleDetail[0].value === "" || this.editNoonBreakRuleDetail[0].value == null) {
          alert(this.$t('noonBreak.pleaseEnterNoonBreakRuleName'));
          return;
        }

        let startTime = this.editNoonBreakRuleDetail[1].value;
        let endTime = this.editNoonBreakRuleDetail[2].value;
        if (startTime !== "" && endTime !== "" && startTime !== null && endTime !== null) {
          let startHour = startTime.getHours();
          let startMinute = startTime.getMinutes();
          //console.log(startYear,startMonth,startDay,startHour,startMinute);
          let endHour = endTime.getHours();
          let endMinute = endTime.getMinutes();
          if (endHour + endMinute / 60 < startHour + startMinute / 60) {
            alert(this.$t('departmentManagement.illegalTimePeriod'));
            return;
          }
          let info = new URLSearchParams;
          info.append("oldId", String(this.currentEditNoonBreakRuleId));
          info.append("newScheduleId", String(this.editNoonBreakRuleDetail[0].value));
          info.append("newStart", String(startHour + ":" + startMinute));
          info.append("newEnd", String(endHour + ":" + endMinute));

          axios
            .post('/api/advance/changeNoonBreakSchedule', info)
            .then(response => {
              if (response.data.status === 200) {
                alert(this.$t('noonBreak.editNoonBreakRuleSuccess'));
                this.showNoonBreakRule();
                this.editNoonBreakRuleDetailVisible  =false;
              } else {
                // 获取失败
                alert(this.$t('noonBreak.editNoonBreakRuleFail'));
              }
            });
        } else {
          alert(this.$t('noonBreak.pleaseChooseNoonBreakTime'));
          return;
        }
      },
      deleteNoonBreak: function (index) {
        this.$confirm(this.$t('departmentManagement.thisOperationWouldDeleteThisRule'), this.$t('statistic.notice'), {
          confirmButtonText: this.$t('login.confirm'),
          cancelButtonText: this.$t('header.cancel'),
          type: 'warning'
        }).then(() => {
          let info = new URLSearchParams;
          info.append("noonBreakId", String(this.noonBreakRuleInfo[index].noonBreakId));
          axios
            .post('/api/advance/deleteNoonBreakSchedule', info)
            .then(response => {
              if (response.data.status === 200) {
                alert(this.$t('noonBreak.deleteNoonBreakRuleSuccess'));
                this.showNoonBreakRule();
              } else {
                // 获取失败
                alert(this.$t('noonBreak.deleteNoonBreakRuleFail'));
              }
            });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: this.$t('departmentManagement.deleteCanceled')
          });
        });
      },

      showExtraWorkRule: function () {
        this.extraWorkRuleInfo = [];
        this.extraWorkRuleOption = [];
        axios
          .get('/api/advance/getAllExtraWorkRule')
          .then(response => {
            if (response.data.status === 200) {
              let dataList = response.data.data;
              let size = dataList.length;
              for (let i = 0; i < size; i++) {
                dataList[i].index = i;
                this.extraWorkRuleInfo.push(dataList[i]);
                this.extraWorkRuleOption.push({
                  name: dataList[i].extraWorkTimeScheduleId,
                  value: dataList[i].startWork + "-" + dataList[i].endWork
                });
              }
            } else {
              // 获取失败
              alert(this.$t('departmentManagement.getExtraWorkRuleFail'));
            }
          });
      },
      addExtraWork: function () {
        if (this.addExtraWorkRuleDetail[0].value === "" || this.addExtraWorkRuleDetail[0].value == null) {
          alert(this.$t('departmentManagement.pleaseEnterExtraWorkRuleName'));
          return;
        }
        if (this.addExtraWorkRuleDetail[3].value === "" || this.addExtraWorkRuleDetail[3].value == null) {
          alert(this.$t('departmentManagement.pleaseEnterMinWorkTime'));
          return;
        }
        // 验证最小时间为数字
        if (/^\d+(\.\d+)?$/.test(this.addExtraWorkRuleDetail[3].value) == false) {
          alert(this.$t('departmentManagement.pleaseEnterNumber'));
          return;
        }
        let startTime = this.addExtraWorkRuleDetail[1].value;
        let endTime = this.addExtraWorkRuleDetail[2].value;
        if (startTime !== "" && endTime !== "" && startTime !== null && endTime !== null) {
          let startHour = startTime.getHours();
          let startMinute = startTime.getMinutes();
          //console.log(startYear,startMonth,startDay,startHour,startMinute);
          let endHour = endTime.getHours();
          let endMinute = endTime.getMinutes();
          if (endHour + endMinute / 60 < startHour + startMinute / 60) {
            alert(this.$t('departmentManagement.illegalTimePeriod'));
            return;
          }
          let info = new URLSearchParams;
          info.append("newScheduleId", String(this.addExtraWorkRuleDetail[0].value));
          info.append("newStart", String(startHour + ":" + startMinute));
          info.append("newEnd", String(endHour + ":" + endMinute));
          info.append("minimumWorkTime", String(this.addExtraWorkRuleDetail[3].value));

          axios
            .post('/api/advance/addExtraWorkSchedule', info)
            .then(response => {
              if (response.data.status === 200) {
                alert(this.$t('departmentManagement.addExtraWorkRuleSuccess'));
                this.showExtraWorkRule();
                this.addExtraWorkRuleDetailVisible = false;
                this.addExtraWorkRuleDetail[0].value= "";
                this.addExtraWorkRuleDetail[1].value= "";
                this.addExtraWorkRuleDetail[2].value= "";
                this.addExtraWorkRuleDetail[3].value= "";
              } else {
                // 获取失败
                alert(this.$t('departmentManagement.addExtraWorkRuleFail'));
              }
            });
        } else {
          alert(this.$t('departmentManagement.pleaseChooseExtraWorkTime'));
          return;
        }
      },
      editExtraWork: function (index) {
        let detail = this.extraWorkRuleInfo[index];
        this.editExtraWorkRuleDetail[0].value = detail.extraWorkTimeScheduleId;
        this.editExtraWorkRuleDetail[1].value = new Date(2019, 1, 1, detail.startWork.split(":")[0], detail.startWork.split(":")[1]);
        this.editExtraWorkRuleDetail[2].value = new Date(2019, 1, 1, detail.endWork.split(":")[0], detail.endWork.split(":")[1]);
        this.editExtraWorkRuleDetail[3].value = detail.minimumWorkTime;
        this.currentEditExtraWorkRuleId = detail.extraWorkTimeScheduleId;
        this.editExtraWorkRuleDetailVisible = true;
      },
      confirmEditExtraWorkRule: function () {
        if (this.editExtraWorkRuleDetail[0].value === "" || this.editExtraWorkRuleDetail[0].value == null) {
          alert(this.$t('departmentManagement.pleaseEnterExtraWorkRuleName'));
          return;
        }
        if (this.editExtraWorkRuleDetail[3].value === "" || this.editExtraWorkRuleDetail[3].value == null) {
          alert(this.$t('departmentManagement.pleaseEnterMinWorkTime'));
          return;
        }
        if (/^\d+(\.\d+)?$/.test(this.editExtraWorkRuleDetail[3].value) == false) {
          alert(this.$t('departmentManagement.pleaseEnterNumber'));
          return;
        }
        let startTime = this.editExtraWorkRuleDetail[1].value;
        let endTime = this.editExtraWorkRuleDetail[2].value;
        if (startTime !== "" && endTime !== "" && startTime !== null && endTime !== null) {
          let startHour = startTime.getHours();
          let startMinute = startTime.getMinutes();
          //console.log(startYear,startMonth,startDay,startHour,startMinute);
          let endHour = endTime.getHours();
          let endMinute = endTime.getMinutes();
          if (endHour + endMinute / 60 < startHour + startMinute / 60) {
            alert(this.$t('departmentManagement.illegalTimePeriod'));
            return;
          }
          let info = new URLSearchParams;
          info.append("oldId", String(this.currentEditExtraWorkRuleId));
          info.append("newScheduleId", String(this.editExtraWorkRuleDetail[0].value));
          info.append("newStart", String(startHour + ":" + startMinute));
          info.append("newEnd", String(endHour + ":" + endMinute));
          info.append("minimumWorkTime", String(this.editExtraWorkRuleDetail[3].value));

          axios
            .post('/api/advance/changeExtraWorkSchedule', info)
            .then(response => {
              if (response.data.status === 200) {
                alert(this.$t('departmentManagement.changeExtraWorkRuleSuccess'));
                this.showExtraWorkRule();
                this.editExtraWorkRuleDetailVisible  =false;
              } else {
                // 获取失败
                alert(this.$t('departmentManagement.changeExtraWorkRuleFail'));
              }
            });
        } else {
          alert(this.$t('departmentManagement.pleaseChooseExtraWorkTime'));
          return;
        }
      },
      deleteExtraWork: function (index) {
        this.$confirm(this.$t('departmentManagement.thisOperationWouldDeleteThisRule'), this.$t('statistic.notice'), {
          confirmButtonText: this.$t('login.confirm'),
          cancelButtonText: this.$t('header.cancel'),
          type: 'warning'
        }).then(() => {
          let info = new URLSearchParams;
          info.append("workTimeId", String(this.extraWorkRuleInfo[index].extraWorkTimeScheduleId));
          axios
            .post('/api/advance/deleteExtraWorkSchedule', info)
            .then(response => {
              if (response.data.status === 200) {
                alert(this.$t('departmentManagement.deleteExtraWorkRuleSuccess'));
                this.showExtraWorkRule();
              } else {
                // 获取失败
                alert(this.$t('departmentManagement.deleteExtraWorkRuleFail'));
              }
            });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: this.$t('departmentManagement.deleteCanceled')
          });
        });
      },
      handlePageChange: function () {
        this.getDepartmentInfo();
      }
    }
  }

</script>

<style scoped>
  #choosePage {
    z-index: 5;
    position: absolute;
    left: 350px;
    top: 830px;
  }

  #total {
    height: 1000px;
  }

  #searchLabel {
    position: absolute;
    top: 30px;
    left: 20px;
  }

  #searchInput {
    position: absolute;
    top: 21px;
    left: 100px;
    width: 200px;
  }

  #button1 {
    position: absolute;
    top: 21px;
    left: 365px;
  }

  #button2 {
    position: absolute;
    top: 21px;
    left: 630px;
  }

  #button3 {
    position: absolute;
    top: 21px;
    left: 780px;
  }

  #button4 {
    position: absolute;
    top: 21px;
    left: 478px;
  }

  #table {
    position: absolute;
    top: 90px;
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


  #subInfoBut {
    position: absolute;
    left: 197px;
    top: 594px;
  }

  #selectClockInRule {
    position: absolute;
    left: 110px;
    top: 414px;
  }

  #selectNoonBreakRule {
    position: absolute;
    left: 110px;
    top: 534px;
  }

  #selectExtraWorkRule {
    position: absolute;
    left: 110px;
    top: 474px;
  }

  #noonBreakRuleSelector {
    position: absolute;
    left: 210px;
    top: 524px;
  }

  #clockInRuleSelector {
    position: absolute;
    left: 210px;
    top: 404px;
  }

  #extraWorkRuleSelector {
    position: absolute;
    left: 210px;
    top: 464px;
  }

  #editFormContentLabel {
    position: absolute;
    left: 110px;
    top: 107px;
    height: 300px;
  }

  #editFormContent {
    position: absolute;
    left: 210px;
    top: 98px;
    height: 300px;
  }

  #editSubInfoBut {
    position: absolute;
    left: 197px;
    top: 594px;
  }

  #editSelectClockInRule {
    position: absolute;
    left: 110px;
    top: 414px;
  }

  #editSelectExtraWorkRule {
    position: absolute;
    left: 110px;
    top: 474px;
  }

  #editNoonBreakRule {
    position: absolute;
    left: 110px;
    top: 534px;
  }

  #editNoonBreakRuleSelector {
    position: absolute;
    left: 210px;
    top: 524px;
  }

  #editClockInRuleSelector {
    position: absolute;
    left: 210px;
    top: 404px;
  }

  #editExtraWorkRuleSelector {
    position: absolute;
    left: 210px;
    top: 464px;
  }

  #clockInRuleTable {
    position: absolute;
    top: 70px;
    left: 20px;
    width: 790px;
    height: 500px;
  }

  #addClockInRuleBut {
    position: absolute;
    top: 580px;
    left: 660px;
  }


  #addClockInRuleIdLabel {
    position: absolute;
    left: 100px;
    top: 87px;
  }

  #addClockInRuleId {
    position: absolute;
    left: 203px;
    top: 77px;
  }

  #addClockInRuleStartLabel {
    position: absolute;
    left: 100px;
    top: 137px;
  }

  #addClockInRuleStart {
    position: absolute;
    left: 203px;
    top: 127px;
  }

  #addClockInRuleEndLabel {
    position: absolute;
    left: 100px;
    top: 187px;
  }

  #addClockInRuleEnd {
    position: absolute;
    left: 203px;
    top: 177px;
  }

  #addClockInRuleSubBut {
    position: absolute;
    left: 190px;
    top: 327px;
  }

  #editClockInRuleIdLabel {
    position: absolute;
    left: 100px;
    top: 87px;
  }

  #editClockInRuleId {
    position: absolute;
    left: 203px;
    top: 77px;
  }

  #editClockInRuleStartLabel {
    position: absolute;
    left: 100px;
    top: 137px;
  }

  #editClockInRuleStart {
    position: absolute;
    left: 203px;
    top: 127px;
  }

  #editClockInRuleEndLabel {
    position: absolute;
    left: 100px;
    top: 187px;
  }

  #editClockInRuleEnd {
    position: absolute;
    left: 203px;
    top: 177px;
  }

  #editClockInRuleSubBut {
    position: absolute;
    left: 190px;
    top: 327px;
  }

  #extraWorkRuleTable {
    position: absolute;
    top: 70px;
    left: 20px;
    width: 790px;
    height: 500px;
  }


  #noonBreakRuleTable {
    position: absolute;
    top: 70px;
    left: 20px;
    width: 790px;
    height: 500px;
  }

  #addNoonBreakRuleBut {
    position: absolute;
    top: 580px;
    left: 660px;
  }


  #addNoonBreakRuleIdLabel {
    position: absolute;
    left: 100px;
    top: 87px;
  }

  #addNoonBreakRuleId {
    position: absolute;
    left: 203px;
    top: 77px;
  }

  #addNoonBreakRuleStartLabel {
    position: absolute;
    left: 100px;
    top: 137px;
  }

  #addNoonBreakRuleStart {
    position: absolute;
    left: 203px;
    top: 127px;
  }

  #addNoonBreakRuleEndLabel {
    position: absolute;
    left: 100px;
    top: 187px;
  }

  #addNoonBreakRuleEnd {
    position: absolute;
    left: 203px;
    top: 177px;
  }

  #addNoonBreakRuleSubBut {
    position: absolute;
    left: 190px;
    top: 327px;
  }

  #editNoonBreakRuleIdLabel {
    position: absolute;
    left: 100px;
    top: 87px;
  }

  #editNoonBreakRuleId {
    position: absolute;
    left: 203px;
    top: 77px;
  }

  #editNoonBreakRuleStartLabel {
    position: absolute;
    left: 100px;
    top: 137px;
  }

  #editNoonBreakRuleStart {
    position: absolute;
    left: 203px;
    top: 127px;
  }

  #editNoonBreakRuleEndLabel {
    position: absolute;
    left: 100px;
    top: 187px;
  }

  #editNoonBreakRuleEnd {
    position: absolute;
    left: 203px;
    top: 177px;
  }

  #editNoonBreakRuleSubBut {
    position: absolute;
    left: 190px;
    top: 327px;
  }




  #addExtraWorkRuleBut {
    position: absolute;
    top: 580px;
    left: 660px;
  }

  #addExtraWorkRuleIdLabel {
    position: absolute;
    left: 100px;
    top: 87px;
  }

  #addExtraWorkRuleId {
    position: absolute;
    left: 203px;
    top: 77px;
  }

  #addExtraWorkRuleStartLabel {
    position: absolute;
    left: 100px;
    top: 137px;
  }

  #addExtraWorkRuleStart {
    position: absolute;
    left: 203px;
    top: 127px;
  }

  #addExtraWorkRuleEndLabel {
    position: absolute;
    left: 100px;
    top: 187px;
  }

  #addExtraWorkRuleEnd {
    position: absolute;
    left: 203px;
    top: 177px;
  }

  #addExtraWorkRuleMinLabel {
    position: absolute;
    left: 100px;
    top: 237px;
  }

  #addExtraWorkRuleMin {
    position: absolute;
    left: 203px;
    top: 227px;
  }

  #addExtraWorkRuleSubBut {
    position: absolute;
    left: 190px;
    top: 327px;
  }

  #editExtraWorkRuleIdLabel {
    position: absolute;
    left: 100px;
    top: 87px;
  }

  #editExtraWorkRuleId {
    position: absolute;
    left: 203px;
    top: 77px;
  }

  #editExtraWorkRuleStartLabel {
    position: absolute;
    left: 100px;
    top: 137px;
  }

  #editExtraWorkRuleStart {
    position: absolute;
    left: 203px;
    top: 127px;
  }

  #editExtraWorkRuleEndLabel {
    position: absolute;
    left: 100px;
    top: 187px;
  }

  #editExtraWorkRuleEnd {
    position: absolute;
    left: 203px;
    top: 177px;
  }

  #editExtraWorkRuleMinLabel {
    position: absolute;
    left: 100px;
    top: 237px;
  }

  #editExtraWorkRuleMin {
    position: absolute;
    left: 203px;
    top: 227px;
  }

  #editExtraWorkRuleSubBut {
    position: absolute;
    left: 190px;
    top: 327px;
  }
</style>

<style>
  .addBut .el-button {
    background-color: #a4da85 !important;
  }

  .inBut .el-button {
    background-color: #dac881 !important;
  }

  .outBut .el-button {
    background-color: #aadad4 !important;
  }

  .tab .el-table th {
    background-color: #dadad5 !important;
  }

  .showDialogFather .el-button {
    border: none !important;
    margin: 0 !important;
    padding: 0 !important;
  }

  .addDepartment .el-dialog {
    height: 670px !important;
    width: 530px !important;
  }

  .editRule .el-dialog {
    height: 440px !important;
    width: 530px !important;
  }

  .manageClockInRule .el-dialog {
    height: 640px !important;
    width: 830px !important;
  }

  .but .el-button:hover {
    background-color: #b2da1d !important;
  }

  .but2 .el-button {
    background-color: #a7da38 !important;
  }

</style>
