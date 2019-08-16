<template>
  <div>
    <el-row id="total">
      <el-col>
        <div id="content">

          <el-row id="titleLabel">
            <svg width="120" height="80" viewBox="0 0 120 80">
              <text font-family="'Helvetica Neue','PingFang SC','microsoft yahei'" fill="#737470" font-size="15"
                    x="0"
                    y="1em">
                {{this.$t('myApply.applyType')}}
              </text>
            </svg>
          </el-row>

          <el-row id="applySearchSelector">
            <el-select v-model="selectType" :placeholder="$t('ExtraWorkApply.pleaseSelect')" @change="getApplicationRecord">
              <el-option
                v-for="(item, index) in applyTypes"
                :key="index"
                :label="item.name"
                :value="item.type">
                <span style="float: left">{{ item.name }}</span>
              </el-option>
            </el-select>
          </el-row>

          <el-row class="but2" id="button1">
            <el-button @click.prevent="changeClass('1')" style="width: 95px">
              <p style="margin: 0; color: #FFFFFF">{{this.$t('myApply.All')}}</p>
            </el-button>
          </el-row>

          <el-row class="but" id="button2">
            <el-button @click.prevent="changeClass('2')" style="width: 95px">
              <p style="margin: 0; color: #FFFFFF">{{this.$t('myApply.unRead')}}</p>
            </el-button>
          </el-row>

          <el-row class="but" id="button3">
            <el-button @click.prevent="changeClass('3')" style="width: 95px">
              <p style="margin: 0; color: #FFFFFF">{{this.$t('myApply.pending')}}</p>
            </el-button>
          </el-row>

          <el-row class="but" id="button4">
            <el-button @click.prevent="changeClass('4')" style="width: 95px">
              <p style="margin: 0; color: #FFFFFF">{{this.$t('myApply.approved')}}</p>
            </el-button>
          </el-row>

          <el-row class="but" id="button5">
            <el-button @click.prevent="changeClass('5')" style="width: 95px">
              <p style="margin: 0; color: #FFFFFF">{{this.$t('myApply.denied')}}</p>
            </el-button>
          </el-row>

          <el-row class="but" id="button6">
            <el-button @click.prevent="changeClass('6')" style="width: 95px">
              <p style="margin: 0; color: #FFFFFF">{{this.$t('myApply.rollBacked')}}</p>
            </el-button>
          </el-row>
        </div>
      </el-col>
    </el-row>


    <el-row id="table" class="tab">
      <el-table
        border
        :data="applyRecord"
        style="width: 100%">
        <el-table-column
          :label="$t('myApply.applyType')"
          width="200"
          prop="type">
          <template slot-scope="scope">
            <div class="showDialogFather">
              <el-button @click="showDialog(scope.row.index)">{{ scope.row.type }}</el-button>
            </div>
          </template>
        </el-table-column>

        <el-table-column
          :label="$t('myApply.applyOverview')"
          width="450">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>{{ scope.row.makeUpTime}}</p>
              <p>{{ scope.row.extraWorkDate }}</p>
              <p>{{ scope.row.extraWorkStart }}</p>
              <p>{{ scope.row.extraWorkEnd }}</p>
              <p>{{ scope.row.extraWorkRewardType }}</p>
              <p>{{ scope.row.rollBackType }}</p>
              <p>{{ scope.row.dayOffStart }}</p>
              <p>{{ scope.row.dayOffEnd }}</p>
              <p>{{ scope.row.dayOffType }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{$t('myApply.judgeOverview')}}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>


        <el-table-column
          :label="$t('myApply.applyTime')"
          width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.created }}</span>
          </template>
        </el-table-column>


        <el-table-column
          :label="$t('myApply.lastUpdate')"
          width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.updated }}</span>
          </template>
        </el-table-column>

        <el-table-column
          :label="$t('myApply.applyStatus')">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.status }}</span>
          </template>
        </el-table-column>
      </el-table>

      <el-row class="myApply">
        <el-dialog :title="$t('myApply.detailInfo')" :visible.sync="makeUpDialogFormVisible" @close="editDisabled = true">

          <el-row id="userIcon1">
            <el-avatar style="background-color: #81af53" icon="el-icon-user-solid"></el-avatar>
          </el-row>

          <svg id="formNameLabel1" width="120" height="80" viewBox="0 0 120 80">
            <text font-family="'Helvetica Neue','PingFang SC','microsoft yahei'" fill="#737470" font-size="15"
                  x="0"
                  y="1em">
              {{this.name}}
            </text>
          </svg>

          <svg id="applicationIdLabel1" width="240" height="80" viewBox="0 0 240 80">
            <text font-family="'Helvetica Neue','PingFang SC','microsoft yahei'" fill="#737470" font-size="15"
                  x="0"
                  y="1em">
              {{this.$t('myApply.applyNumber')}} : {{this.currentFormApplicationId}}
            </text>
          </svg>

          <el-row id="formContentLabel11">
            <el-row>
              <svg width="300" height="48" viewBox="0 0 300 48">
                <text font-family="'Helvetica Neue','PingFang SC','microsoft yahei'" fill="#737470" font-size="15"
                      x="0"
                      y="1em">
                  {{makeUpDetailInfo[0].name}}
                </text>
              </svg>
            </el-row>
          </el-row>

          <el-row id="formContent11">
            <el-date-picker
              v-model="makeUpDetailInfo[0].value"
              type="date"
              :placeholder="$t('myApply.pleaseSelectDate')"
              :disabled="editDisabled">
            </el-date-picker>
          </el-row>

          <el-row id="formContentLabel12">
            <el-row>
              <svg width="300" height="48" viewBox="0 0 300 48">
                <text font-family="'Helvetica Neue','PingFang SC','microsoft yahei'" fill="#737470" font-size="15"
                      x="0"
                      y="1em">
                  {{makeUpDetailInfo[1].name}}
                </text>
              </svg>
            </el-row>
          </el-row>

          <el-row id="formContent12">
            <el-select v-model="makeUpDetailInfo[1].value" :placeholder="$t('ExtraWorkApply.pleaseSelect')" class="dialogBut">
              <el-option
                v-for="item in makeUpOptions"
                :key="item.key"
                :label="item.name"
                :value="item.value"
                :disabled="editDisabled"
              >
              </el-option>
            </el-select>
          </el-row>

          <el-row id="formContentLabel13">
            <el-row>
              <svg width="300" height="48" viewBox="0 0 300 48">
                <text font-family="'Helvetica Neue','PingFang SC','microsoft yahei'" fill="#737470" font-size="15"
                      x="0"
                      y="1em">
                  {{makeUpDetailInfo[2].name}}
                </text>
              </svg>
            </el-row>
          </el-row>

          <el-row id="formContent13">
            <el-row style="height: 52px">
              <el-input v-model="makeUpDetailInfo[2].value" :disabled="editDisabled" :placeholder="$t('header.pleaseEnter')"
                        class="dialogBut" maxlength="120"></el-input>
            </el-row>
          </el-row>

          <el-row id="processLabel1">
            <svg width="120" height="80" viewBox="0 0 120 80">
              <text font-family="'Helvetica Neue','PingFang SC','microsoft yahei'" fill="#000000" font-size="15"
                    x="0"
                    y="1em">
                {{this.$t('changeDayOffApply.reviewProcess')}}
              </text>
            </svg>
          </el-row>

          <el-row id="processLine1">
            <el-steps :active="currentActive" finish-status="success">
              <div style="width: 80px" v-for="item in reviewProcess">
                <el-step title="" :description="item.name">{{item.status}}</el-step>
              </div>
            </el-steps>
          </el-row>

          <div class="dialogBut" id="dialogButtons1">
            <el-button style="width: 50px" @click="editDisabled = false">{{this.$t('header.change')}}</el-button>
            <el-button style="width: 50px" @click="applyRollBack">{{this.$t('myApply.rollBack')}}</el-button>
          </div>

          <div id="subInfoBut1" class="but2">
            <el-button style="width: 150px" :disabled="editDisabled" @click="confirmEdition">{{this.$t('myApply.confirmChange')}}</el-button>
          </div>

          <canvas id="backGroundLayer1" width="1920" height="1080" style="width: 100%;height: 50%">
            {{this.$t('header.doNotSupportCanvas')}}
          </canvas>
        </el-dialog>
      </el-row>


      <el-row class="myApply">
        <el-dialog :title="$t('myApply.detailInfo')" :visible.sync="dayOffDialogFormVisible" @close="editDisabled = true">

          <el-row id="userIcon2">
            <el-avatar style="background-color: #81af53" icon="el-icon-user-solid"></el-avatar>
          </el-row>

          <svg id="formNameLabel2" width="120" height="80" viewBox="0 0 120 80">
            <text font-family="'Helvetica Neue','PingFang SC','microsoft yahei'" fill="#737470" font-size="15"
                  x="0"
                  y="1em">
              {{this.name}}
            </text>
          </svg>

          <svg id="applicationIdLabel2" width="240" height="80" viewBox="0 0 240 80">
            <text font-family="'Helvetica Neue','PingFang SC','microsoft yahei'" fill="#737470" font-size="15"
                  x="0"
                  y="1em">
              {{this.$t('myApply.applyNumber')}} : {{this.currentFormApplicationId}}
            </text>
          </svg>

          <el-row id="formContentLabel21">
            <el-row>
              <svg width="300" height="48" viewBox="0 0 300 48">
                <text font-family="'Helvetica Neue','PingFang SC','microsoft yahei'" fill="#737470" font-size="15"
                      x="0"
                      y="1em">
                  {{dayOffDetailInfo[0].name}}
                </text>
              </svg>
            </el-row>
          </el-row>

          <el-row id="formContent21">
            <el-date-picker
              v-model="dayOffDetailInfo[0].value"
              type="datetime"
              :placeholder="$t('myApply.pleaseSelectDate')"
              :disabled="editDisabled"
              @blur="countOffTime">
            </el-date-picker>
          </el-row>

          <el-row id="formContentLabel22">
            <el-row>
              <svg width="300" height="48" viewBox="0 0 300 48">
                <text font-family="'Helvetica Neue','PingFang SC','microsoft yahei'" fill="#737470" font-size="15"
                      x="0"
                      y="1em">
                  {{dayOffDetailInfo[1].name}}
                </text>
              </svg>
            </el-row>
          </el-row>

          <el-row id="formContent22">
            <el-date-picker
              v-model="dayOffDetailInfo[1].value"
              type="datetime"
              :placeholder="$t('myApply.pleaseSelectDate')"
              :disabled="editDisabled"
              @blur="countOffTime">
            </el-date-picker>
          </el-row>

          <el-row id="formContentLabel23">
            <el-row>
              <svg width="300" height="48" viewBox="0 0 300 48">
                <text font-family="'Helvetica Neue','PingFang SC','microsoft yahei'" fill="#737470" font-size="15"
                      x="0"
                      y="1em">
                  {{dayOffDetailInfo[2].name}}
                </text>
              </svg>
            </el-row>
          </el-row>

          <el-row id="formContent23">
            <el-select v-model="dayOffDetailInfo[2].value" :placeholder="$t('ExtraWorkApply.pleaseSelect')" class="dialogBut"
                       @change="checkRemainTime">
              <el-option
                v-for="item in dayOffOptions"
                :key="item.key"
                :label="item.name"
                :value="item.value"
                :disabled="editDisabled"
              >
              </el-option>
            </el-select>
          </el-row>

          <el-row id="formContentLabel24">
            <el-row>
              <svg width="300" height="48" viewBox="0 0 300 48">
                <text font-family="'Helvetica Neue','PingFang SC','microsoft yahei'" fill="#737470" font-size="15"
                      x="0"
                      y="1em">
                  {{dayOffDetailInfo[3].name}}
                </text>
              </svg>
            </el-row>
          </el-row>

          <el-row id="formContent24">
            <el-row style="height: 52px">
              <el-input v-model="dayOffDetailInfo[3].value" :disabled="editDisabled" maxlength="120" :placeholder="$t('header.pleaseEnter')"
                        class="dialogBut"></el-input>
            </el-row>
          </el-row>

          <el-row id="processLabel2">
            <svg width="120" height="80" viewBox="0 0 120 80">
              <text font-family="'Helvetica Neue','PingFang SC','microsoft yahei'" fill="#000000" font-size="15"
                    x="0"
                    y="1em">
                {{this.$t('changeDayOffApply.reviewProcess')}}
              </text>
            </svg>
          </el-row>

          <el-row id="processLine2">
            <el-steps :active="currentActive" finish-status="success">
              <div style="width: 80px" v-for="item in reviewProcess">
                <el-step title="" :description="item.name">{{item.status}}</el-step>
              </div>
            </el-steps>
          </el-row>

          <div class="dialogBut" id="dialogButtons2">
            <el-button style="width: 50px" @click="editDisabled = false">{{this.$t('header.change')}}</el-button>
            <el-button style="width: 50px" @click="applyRollBack">{{this.$t('myApply.rollBack')}}</el-button>
          </div>

          <div id="subInfoBut2" class="but2">
            <el-button style="width: 150px" :disabled="editDisabled" @click="confirmEdition">{{this.$t('myApply.confirmChange')}}</el-button>
          </div>

          <canvas id="backGroundLayer2" width="1920" height="1080" style="width: 100%;height: 50%">
            {{this.$t('header.doNotSupportCanvas')}}
          </canvas>
        </el-dialog>
      </el-row>


      <el-row class="myApply">
        <el-dialog :title="$t('myApply.detailInfo')" :visible.sync="extraWorkDialogFormVisible" @close="editDisabled = true">

          <el-row id="userIcon3">
            <el-avatar style="background-color: #81af53" icon="el-icon-user-solid"></el-avatar>
          </el-row>

          <svg id="formNameLabel3" width="120" height="80" viewBox="0 0 120 80">
            <text font-family="'Helvetica Neue','PingFang SC','microsoft yahei'" fill="#737470" font-size="15"
                  x="0"
                  y="1em">
              {{this.name}}
            </text>
          </svg>

          <svg id="applicationIdLabel3" width="240" height="80" viewBox="0 0 240 80">
            <text font-family="'Helvetica Neue','PingFang SC','microsoft yahei'" fill="#737470" font-size="15"
                  x="0"
                  y="1em">
              {{this.$t('myApply.applyNumber')}} : {{this.currentFormApplicationId}}
            </text>
          </svg>

          <el-row id="formContentLabel31">
            <el-row>
              <svg width="300" height="48" viewBox="0 0 300 48">
                <text font-family="'Helvetica Neue','PingFang SC','microsoft yahei'" fill="#737470" font-size="15"
                      x="0"
                      y="1em">
                  {{extraWorkDetailInfo[0].name}}
                </text>
              </svg>
            </el-row>
          </el-row>

          <el-row id="formContent31">
            <el-date-picker
              v-model="extraWorkDetailInfo[0].value"
              type="date"
              :placeholder="$t('myApply.pleaseSelectDate')"
              :disabled="editDisabled">
            </el-date-picker>
          </el-row>

          <el-row id="formContentLabel32">
            <el-row>
              <svg width="300" height="48" viewBox="0 0 300 48">
                <text font-family="'Helvetica Neue','PingFang SC','microsoft yahei'" fill="#737470" font-size="15"
                      x="0"
                      y="1em">
                  {{extraWorkDetailInfo[1].name}}
                </text>
              </svg>
            </el-row>
          </el-row>

          <el-row id="formContent32" class="dialogBut">
            <el-time-picker
              v-model="extraWorkDetailInfo[1].value"
              range-separator="至"
              :placeholder="$t('statistic.pleaseChooseTimePeriod')"
              :disabled="editDisabled"
              @blur="countWorkTime">
            </el-time-picker>
          </el-row>

          <el-row id="formContentLabel33">
            <el-row>
              <svg width="300" height="48" viewBox="0 0 300 48">
                <text font-family="'Helvetica Neue','PingFang SC','microsoft yahei'" fill="#737470" font-size="15"
                      x="0"
                      y="1em">
                  {{extraWorkDetailInfo[2].name}}
                </text>
              </svg>
            </el-row>
          </el-row>

          <el-row id="formContent33" class="dialogBut">
            <el-time-picker
              v-model="extraWorkDetailInfo[2].value"
              range-separator="至"
              :placeholder="$t('statistic.pleaseChooseTimePeriod')"
              :disabled="editDisabled"
              @blur="countWorkTime">
            </el-time-picker>
          </el-row>

          <el-row id="formContentLabel34">
            <el-row>
              <svg width="300" height="48" viewBox="0 0 300 48">
                <text font-family="'Helvetica Neue','PingFang SC','microsoft yahei'" fill="#737470" font-size="15"
                      x="0"
                      y="1em">
                  {{extraWorkDetailInfo[3].name}}
                </text>
              </svg>
            </el-row>
          </el-row>

          <el-row id="formContent34">
            <el-select v-model="extraWorkDetailInfo[3].value" :placeholder="$t('ExtraWorkApply.pleaseSelect')" class="dialogBut">
              <el-option
                v-for="item in extraWorkRewardOptions"
                :key="item.key"
                :label="item.name"
                :value="item.value"
                :disabled="editDisabled">
              </el-option>
            </el-select>
          </el-row>

          <el-row id="formContentLabel35">
            <el-row>
              <svg width="300" height="48" viewBox="0 0 300 48">
                <text font-family="'Helvetica Neue','PingFang SC','microsoft yahei'" fill="#737470" font-size="15"
                      x="0"
                      y="1em">
                  {{extraWorkDetailInfo[4].name}}
                </text>
              </svg>
            </el-row>
          </el-row>

          <el-row id="formContent35">
            <el-row style="height: 52px">
              <el-input v-model="extraWorkDetailInfo[4].value" :disabled="editDisabled" maxlength="120"
                        :placeholder="$t('header.pleaseEnter')"
                        class="dialogBut"></el-input>
            </el-row>
          </el-row>

          <el-row id="processLabel3">
            <svg width="120" height="80" viewBox="0 0 120 80">
              <text font-family="'Helvetica Neue','PingFang SC','microsoft yahei'" fill="#000000" font-size="15"
                    x="0"
                    y="1em">
                {{this.$t('changeDayOffApply.reviewProcess')}}
              </text>
            </svg>
          </el-row>

          <el-row id="processLine3">
            <el-steps :active="currentActive" finish-status="success">
              <div style="width: 80px" v-for="item in reviewProcess">
                <el-step title="" :description="item.name">{{item.status}}</el-step>
              </div>
            </el-steps>
          </el-row>

          <div class="dialogBut" id="dialogButtons3">
            <el-button style="width: 50px" @click="editDisabled = false">{{this.$t('header.change')}}</el-button>
            <el-button style="width: 50px" @click="applyRollBack">{{this.$t('myApply.rollBack')}}</el-button>
          </div>

          <div id="subInfoBut3" class="but2">
            <el-button style="width: 150px" :disabled="editDisabled" @click="confirmEdition">{{this.$t('myApply.confirmChange')}}</el-button>
          </div>

          <canvas id="backGroundLayer3" width="1920" height="1080" style="width: 100%;height: 50%">
            {{this.$t('header.doNotSupportCanvas')}}
          </canvas>
        </el-dialog>
      </el-row>


      <el-row class="myApply">
        <el-dialog :title="$t('myApply.detailInfo')" :visible.sync="rollBackDialogFormVisible" @close="editDisabled = true">

          <el-row id="userIcon4">
            <el-avatar style="background-color: #81af53" icon="el-icon-user-solid"></el-avatar>
          </el-row>

          <svg id="formNameLabel4" width="120" height="80" viewBox="0 0 120 80">
            <text font-family="'Helvetica Neue','PingFang SC','microsoft yahei'" fill="#737470" font-size="15"
                  x="0"
                  y="1em">
              {{this.name}}
            </text>
          </svg>

          <svg id="applicationIdLabel4" width="240" height="80" viewBox="0 0 240 80">
            <text font-family="'Helvetica Neue','PingFang SC','microsoft yahei'" fill="#737470" font-size="15"
                  x="0"
                  y="1em">
              {{this.$t('myApply.applyNumber')}} : {{this.currentFormApplicationId}}
            </text>
          </svg>


          <el-row id="processLabel4">
            <svg width="120" height="80" viewBox="0 0 120 80">
              <text font-family="'Helvetica Neue','PingFang SC','microsoft yahei'" fill="#000000" font-size="15"
                    x="0"
                    y="1em">
                {{this.$t('changeDayOffApply.reviewProcess')}}
              </text>
            </svg>
          </el-row>

          <el-row id="formContentLabel41">
            <el-row>
              <svg width="300" height="48" viewBox="0 0 300 48">
                <text font-family="'Helvetica Neue','PingFang SC','microsoft yahei'" fill="#737470" font-size="15"
                      x="0"
                      y="1em">
                  {{rollBackDetailInfo[0].name}}
                </text>
              </svg>
            </el-row>
          </el-row>

          <el-row id="formContent41">
            <svg width="200" height="40" viewBox="0 0 200 40">
              <text font-family="'Helvetica Neue','PingFang SC','microsoft yahei'" fill="#000000" font-size="15"
                    x="0"
                    y="1em">
                {{rollBackDetailInfo[0].value}}
              </text>
            </svg>
          </el-row>

          <el-row id="formContentLabel42">
            <el-row>
              <svg width="300" height="48" viewBox="0 0 300 48">
                <text font-family="'Helvetica Neue','PingFang SC','microsoft yahei'" fill="#737470" font-size="15"
                      x="0"
                      y="1em">
                  {{rollBackDetailInfo[1].name}}
                </text>
              </svg>
            </el-row>
          </el-row>

          <el-row id="formContent42">
            <el-select v-model="rollBackDetailInfo[1].value" :placeholder="$t('ExtraWorkApply.pleaseSelect')" class="dialogBut">
              <el-option
                v-for="item in applyOptions"
                :key="item.key"
                :label="item.name"
                :value="item.value"
                disabled>
              </el-option>
            </el-select>
          </el-row>

          <el-row id="formContentLabel43">
            <el-row>
              <svg width="300" height="48" viewBox="0 0 300 48">
                <text font-family="'Helvetica Neue','PingFang SC','microsoft yahei'" fill="#737470" font-size="15"
                      x="0"
                      y="1em">
                  {{rollBackDetailInfo[2].name}}
                </text>
              </svg>
            </el-row>
          </el-row>

          <el-row id="formContent43">
            <el-row style="height: 52px">
              <el-input v-model="rollBackDetailInfo[2].value" :disabled="editDisabled" maxlength="120"
                        :placeholder="$t('header.pleaseEnter')"
                        class="dialogBut"></el-input>
            </el-row>
          </el-row>

          <el-row id="processLine4">
            <el-steps :active="currentActive" finish-status="success">
              <div style="width: 80px" v-for="item in reviewProcess">
                <el-step title="" :description="item.name">{{item.status}}</el-step>
              </div>
            </el-steps>
          </el-row>

          <div class="dialogBut" id="dialogButtons4">
            <el-button style="width: 50px" @click="editDisabled = false">{{this.$t('header.change')}}</el-button>
            <el-button style="width: 50px" @click="applyRollBack">{{this.$t('myApply.rollBack')}} </el-button>
          </div>

          <div id="subInfoBut4" class="but2">
            <el-button style="width: 150px" :disabled="editDisabled" @click="confirmEdition">{{this.$t('myApply.confirmChange')}}</el-button>
          </div>

          <canvas id="backGroundLayer4" width="1920" height="1080" style="width: 100%;height: 50%">
            {{this.$t('header.doNotSupportCanvas')}}
          </canvas>
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
    name: "MyApply",

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
        applyTypes: [
          {name: this.$t('apply.changeDayOffApply'), type: "DayOff"},
          {name: this.$t('apply.ExtraWorkApply'), type: "ExtraWork"},
          {name: this.$t('apply.makeUpApply'), type: "MakeUp"},
          {name: this.$t('apply.rollBackApply'), type: "RollBack"},
          {name: this.$t('myApply.All'), type: "All"}],
        selectType: "All",
        applyRecord: [],
        selectStatus: "All",
        detailInfo: [],
        makeUpDialogFormVisible: false,
        dayOffDialogFormVisible: false,
        extraWorkDialogFormVisible: false,
        rollBackDialogFormVisible: false,
        currentFormApplicationId: "",
        currentStatus: "",
        currentType: "",
        reviewProcess: [],
        currentActive: 0,
        rollBackReason: "",
        editDisabled: true,
        originalInfo: [],
        makeUpDetailInfo: [
          {name: this.$t('makeUpApply.makeUpDate'), value: "", key: "date"},
          {name: this.$t('makeUpApply.makeUpType'), value: "", key: "type"},
          {name: this.$t('makeUpApply.makeUpReason'), value: "", key: "reason"},],
        dayOffDetailInfo: [
          {name: this.$t('myApply.offStart'), value: "", key: "start"},
          {name: this.$t('myApply.offEnd'), value: "", key: "end"},
          {name: this.$t('myApply.offType'), value: "", key: "type"},
          {name: this.$t('changeDayOffApply.offReason'), value: "", key: "reason"},],
        extraWorkDetailInfo: [
          {name: this.$t('ExtraWorkApply.extraWorkDate'), value: "", key: "date"},
          {name: this.$t('myApply.extraWorkStart'), value: "", key: "start"},
          {name: this.$t('myApply.extraWorkEnd'), value: "", key: "end"},
          {name: this.$t('ExtraWorkApply.rewardType'), value: "", key: "type"},
          {name: this.$t('ExtraWorkApply.workReason'), value: "", key: "reason"},],
        rollBackDetailInfo: [
          {name: this.$t('myApply.rollBackApplyNumber'), value: "", key: "oldId"},
          {name: this.$t('myApply.rollBackApplyType'), value: "", key: "oldType"},
          {name: this.$t('myApply.rollBackReason'), value: "", key: "reason"},
        ],
        makeUpOptions: [
          {name: this.$t('HomePage.clockIn'), value: "IN", key: "IN"},
          {name: this.$t('HomePage.clockOut'), value: "OUT", key: "OUT"},],
        dayOffOptions: [
          {name: this.$t('changeDayOffApply.changeDayOff'), value: "ChangeDayOff", key: "ChangeDayOff"},
          {name: this.$t('changeDayOffApply.annualDayOff'), value: "AnnualDayOff", key: "AnnualDayOff"},
          {name: this.$t('changeDayOffApply.dayOff'), value: "DayOff", key: "DayOff"},],
        extraWorkRewardOptions: [
          {name: this.$t('ExtraWorkApply.holidayMoney'), value: "HolidayMoney", key: "HolidayMoney"},
          {name: this.$t('ExtraWorkApply.money'), value: "Money", key: "Money"},
          {name: this.$t('changeDayOffApply.changeDayOff'), value: "ChangeDayOff", key: "ChangeDayOff"},
        ],
        applyOptions: [
          {name: this.$t('apply.ExtraWorkApply'), value: "ExtraWork", key: "ExtraWork"},
          {name: this.$t('apply.changeDayOffApply'), value: "DayOff", key: "DayOff"},
          {name: this.$t('apply.makeUpApply'), value: "MakeUp", key: "MakeUp"},
        ],
        changeDayOffRemain: "",
        annualDayOffRemain: "",
        offTimeLength: "",
        remainHour: "",
        workTimeCount: "",
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
          .get('/api/shiroVerify')
          .then(response => {
            if (response.data.status === 200) {
              // 登录过了，返回值为当前用户uid
              this.uid = response.data.data;
              // 开始加载用户界面信息
              this.getLoginInUserInfo();
              this.getApplicationRecord();
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
              this.changeDayOffRemain = response.data.data[0].change_day_off;
              this.annualDayOffRemain = response.data.data[0].annual_day_off;
            } else {
              // 获取失败
              alert(this.$t('header.getLoginInfoFail'));
            }

          })
      },
      changeClass: function (val) {
        document.getElementById("button1").className = "but";
        document.getElementById("button2").className = "but";
        document.getElementById("button3").className = "but";
        document.getElementById("button4").className = "but";
        document.getElementById("button5").className = "but";
        document.getElementById("button6").className = "but";
        if (val === "1") {
          document.getElementById("button1").className = "but2";
          this.selectStatus = "All";
          this.getApplicationRecord();
        } else if (val === "2") {
          document.getElementById("button2").className = "but2";
          this.selectStatus = "UnRead";
          this.getApplicationRecord();
        } else if (val === "3") {
          document.getElementById("button3").className = "but2";
          this.selectStatus = "Pending";
          this.getApplicationRecord();
        } else if (val === "4") {
          document.getElementById("button4").className = "but2";
          this.selectStatus = "Success";
          this.getApplicationRecord();
        } else if (val === "5") {
          document.getElementById("button5").className = "but2";
          this.selectStatus = "Fail";
          this.getApplicationRecord();
        } else if (val === "6") {
          document.getElementById("button6").className = "but2";
          this.selectStatus = "RollBacked";
          this.getApplicationRecord();
        }
      },
      handleEdit: function (index, rowData) {
        // console.log(index, rowData)
      },
      handleDelete: function (index, rowData) {

      },
      getApplicationRecord: function () {
        this.applyRecord.length = 0;
        this.originalInfo = [];
        let status = "-999";
        if (this.selectStatus === "All") {
          status = -1;
        } else if (this.selectStatus === "UnRead") {
          status = 0;
        } else if (this.selectStatus === "Success") {
          status = 1;
        } else if (this.selectStatus === "Fail") {
          status = 2;
        } else if (this.selectStatus === "RollBacked") {
          status = 3;
        } else if (this.selectStatus === "Pending") {
          status = 4;
        }

        // 获取总页码
        let pageInfo = new URLSearchParams;
        pageInfo.append("uid", String(this.uid));
        pageInfo.append("status", String(status));
        pageInfo.append("type", String(this.selectType));
        axios
          .post('/api/apply/countMyApplication', pageInfo)
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
        info.append("uid", String(this.uid));
        info.append("status", String(status));
        info.append("type", String(this.selectType));
        info.append("pageNum", String(this.currentPageNum));
        info.append("pageMax", String("14"));

        axios
          .post('/api/apply/userGetApplication', info)
          .then(response => {
            if (response.data.status === 200) {
              // 获取成功
              let records = response.data.data;
              let recordsLength = records.length;
              for (let i = 0; i < recordsLength; i++) {
                records[i].index = i;
                this.originalInfo.push(records[i]);
                // 全装进去
                let tempRecord = {};
                // 根据不同的申请拆分细节
                let detail = records[i].application_detail.split(",");
                tempRecord.index = i;
                tempRecord.applicationId = records[i].application_id;
                tempRecord.description = records[i].application_description;
                if (records[i].application_type === "MakeUp") {
                  tempRecord.type = this.$t('apply.makeUpApply');
                  tempRecord.makeUpTime = this.$t('makeUpApply.makeUpTime')+" : " + detail[0];
                  if (detail[1] === "IN") {
                    tempRecord.makeUpTime = tempRecord.makeUpTime + this.$t('HomePage.clockIn');
                  } else {
                    tempRecord.makeUpTime = tempRecord.makeUpTime + this.$t('HomePage.clockOut');
                  }
                } else if (records[i].application_type === "RollBack") {
                  tempRecord.type = this.$t('apply.rollBackApply');;
                  tempRecord.rollBackId = this.$t('myApply.rollBacksApplyNumber')+" : " + detail[0];
                  if (detail[1] === "MakeUp") {
                    tempRecord.rollBackType = this.$t('myApply.rollBacksApplyType')+ " : " + this.$t('apply.makeUpApply');
                  } else if (detail[1] === "DayOff") {
                    tempRecord.rollBackType = this.$t('myApply.rollBacksApplyType')+ " : " + this.$t('apply.changeDayOffApply');
                  } else if (detail[1] === "ExtraWork") {
                    tempRecord.rollBackType = this.$t('myApply.rollBacksApplyType')+ " : " + this.$t('apply.ExtraWorkApply');
                  }
                } else if (records[i].application_type === "DayOff") {
                  tempRecord.type = this.$t('apply.changeDayOffApply');
                  tempRecord.dayOffStart = this.$t('myApply.offStart') + " : " + detail[0] + "   " + detail[2];
                  tempRecord.dayOffEnd = this.$t('myApply.offEnd') + " : " + detail[1] + "   " + detail[3];
                  if (detail[5] === "ChangeDayOff") {
                    tempRecord.dayOffType = this.$t('myApply.offType') + " : " + this.$t('changeDayOffApply.changeDayOff');
                  } else if (detail[5] === "AnnualDayOff") {
                    tempRecord.dayOffType = this.$t('myApply.offType') + " : " + this.$t('changeDayOffApply.annualDayOff');
                  } else if (detail[5] === "DayOff") {
                    tempRecord.dayOffType = this.$t('myApply.offType') + " : " + this.$t('changeDayOffApply.dayOff');
                  }
                } else if (records[i].application_type === "ExtraWork") {
                  tempRecord.type = this.$t('apply.ExtraWorkApply');
                  tempRecord.extraWorkDate = this.$t('ExtraWorkApply.extraWorkDate') + " : " + detail[0];
                  tempRecord.extraWorkStart = this.$t('myApply.extraWorkStart') + " : " + detail[1];
                  tempRecord.extraWorkEnd = this.$t('myApply.extraWorkEnd') + " : " + detail[2];
                  tempRecord.extraWorkRewardType = this.$t('ExtraWorkApply.rewardType') + " : ";
                  if (detail[3] === "ChangeDayOff") {
                    tempRecord.extraWorkRewardType = tempRecord.extraWorkRewardType + this.$t('changeDayOffApply.changeDayOff');
                  } else if (detail[3] === "Money") {
                    tempRecord.extraWorkRewardType = tempRecord.extraWorkRewardType + this.$t('ExtraWorkApply.money');
                  } else if (detail[3] === "HolidayMoney") {
                    tempRecord.extraWorkRewardType = tempRecord.extraWorkRewardType + this.$t('ExtraWorkApply.holidayMoney');
                  }
                }


                tempRecord.created = records[i].created;
                tempRecord.updated = records[i].updated;

                let status = records[i].status;
                if (status === "0") {
                  status = 0;
                  tempRecord.status = this.$t('myApply.unRead')
                } else if (status === "1") {
                  tempRecord.status = this.$t('myApply.approved')
                } else if (status === "2") {
                  tempRecord.status = this.$t('myApply.denied')
                } else if (status === "3") {
                  tempRecord.status = this.$t('myApply.rollBacked')
                } else if (status === "4") {
                  tempRecord.status = this.$t('myApply.pending')
                }
                this.applyRecord.push(tempRecord);
              }
              if (this.applyRecord.length === 0) {
                this.applyRecord = [];
              }
            } else {
              // 获取失败
              alert(this.$t('myApply.getRecordFail'));
            }

          })
      },
      showDialog: function (index) {
        // 获取记录
        let tempRecord = this.applyRecord[index];
        // 清除原记录
        this.detailInfo.length = 0;
        this.reviewProcess.length = 0;
        this.detailInfo = [];
        this.currentActive = 0;
        let num = 0;

        this.currentStatus = tempRecord.status;
        this.currentFormApplicationId = tempRecord.applicationId;
        this.currentType = tempRecord.type;
        // 添加新纪录
        if (tempRecord.type === this.$t('apply.changeDayOffApply')) {
          this.dayOffDialogFormVisible = true;
          let detail = this.originalInfo[index].application_detail.split(",");
          this.dayOffDetailInfo[0].value = new Date(detail[0].split("-")[0], detail[0].split("-")[1] - 1, detail[0].split("-")[2], detail[2].split(":")[0], detail[2].split(":")[1]);
          this.dayOffDetailInfo[1].value = new Date(detail[1].split("-")[0], detail[1].split("-")[1] - 1, detail[1].split("-")[2], detail[3].split(":")[0], detail[3].split(":")[1]);
          this.dayOffDetailInfo[2].value = detail[5];
          this.dayOffDetailInfo[3].value = this.originalInfo[index].application_description;
          this.countOffTime();
          this.checkRemainTime();
          num = 2;
        } else if (tempRecord.type === this.$t('apply.ExtraWorkApply')) {
          let detail = this.originalInfo[index].application_detail.split(",");
          this.extraWorkDetailInfo[0].value = new Date(detail[0].replace(/-/g, '/'));
          this.extraWorkDetailInfo[1].value = new Date(detail[0].split("-")[0], detail[0].split("-")[1] - 1, detail[0].split("-")[2], detail[1].split(":")[0], detail[1].split(":")[1]);
          this.extraWorkDetailInfo[2].value = new Date(detail[0].split("-")[0], detail[0].split("-")[1] - 1, detail[0].split("-")[2], detail[2].split(":")[0], detail[2].split(":")[1]);
          this.extraWorkDetailInfo[3].value = detail[3];
          this.extraWorkDetailInfo[4].value = this.originalInfo[index].application_description;
          this.countWorkTime();
          num = 3;
          this.extraWorkDialogFormVisible = true;
        } else if (tempRecord.type === this.$t('apply.makeUpApply')) {
          this.makeUpDetailInfo[0].value = new Date(this.originalInfo[index].application_detail.split(",")[0].replace(/-/g, '/'));
          this.makeUpDetailInfo[1].value = this.originalInfo[index].application_detail.split(",")[1];
          this.makeUpDetailInfo[2].value = this.originalInfo[index].application_description;
          num = 1;
          this.makeUpDialogFormVisible = true;
        } else if (tempRecord.type === this.$t('apply.rollBackApply')) {
          let detail = this.originalInfo[index].application_detail.split(",");
          this.rollBackDetailInfo[0].value = detail[0];
          this.rollBackDetailInfo[1].value = detail[1];
          this.rollBackDetailInfo[2].value = this.originalInfo[index].application_description;
          num = 4;
          this.rollBackDialogFormVisible = true;
        }
        this.getReviewList(num);
      },
      getReviewList: function (num) {
        this.reviewProcess = [];
        let info = new URLSearchParams;
        info.append("applicationId", String(this.currentFormApplicationId));
        axios
          .post('/api/apply/getReviewProcess', info)
          .then(response => {
            if (response.data.status === 200) {
              // 获取成功
              let tempProcess = response.data.data;
              let nameNum = tempProcess.length;
              for (let i = 0; i < nameNum; i++) {
                let tempPoint = {};
                tempPoint.status = tempProcess[i].status;
                tempPoint.name = tempProcess[i].name;
                this.reviewProcess.push(tempPoint);
                if (tempPoint.status === "已同意") {
                  this.currentActive++;
                }
              }
              this.drawDialogLine("backGroundLayer" + num);
            } else {
              // 获取失败
              alert(this.$t('myApply.getReviewProcessFail'));
            }

          })
      },
      drawDialogLine: function (name) {
        let back = document.getElementById(name);
        let backC = back.getContext("2d");

        let num = this.reviewProcess.length;
        backC.clearRect(0, 0, 1920, 1080);
        backC.beginPath();
        backC.strokeStyle = '#090909';
        backC.lineWidth = 2;
        backC.moveTo(360, 840);
        if (num === 2) {
          backC.lineTo(630, 840);
        } else if (num === 3) {
          backC.lineTo(860, 840);
        } else if (num === 4) {
          backC.lineTo(1130, 840);
        } else if (num === 5) {
          backC.lineTo(1400, 840);
        }
        backC.stroke();
        backC.closePath();
      },
      applyRollBack: function () {
        if (this.currentStatus === this.$t('myApply.rollBacked')) {
          alert(this.$t('myApply.youCanNotRollBackAnApplyThatAlreadyRollBacked'));
          return;
        }
        if (this.currentType === this.$t('apply.rollBackApply')) {
          alert(this.$t('myApply.rollBackApplyCanNotBeRollBacked'));
          return;
        }
        this.$confirm(this.$t('myApply.thisOperationWouldRollBackThisApply'), this.$t('statistic.notice'), {
          confirmButtonText: this.$t('login.confirm'),
          cancelButtonText: this.$t('header.cancel'),
          type: 'warning'
        }).then(() => {
          // 输入原因
          this.$prompt(this.$t('myApply.pleaseEnterYourRollBackReason'), this.$t('statistic.notice'), {
            confirmButtonText: this.$t('login.confirm'),
            cancelButtonText: this.$t('header.cancel'),
          }).then(({value}) => {
            // 判断是否为待审批状态
            this.rollBackReason = value;
            if (this.currentStatus === this.$t('myApply.unRead')) {
              // 直接执行删除
              this.rollBack();
            } else {
              // 最后确认是否执行删除
              this.$confirm(this.$t('myApply.applicationHasBeenReviewedYouCanNotRollBackDirectly'), this.$t('statistic.notice'), {
                confirmButtonText: this.$t('myApply.continue'),
                cancelButtonText: this.$t('header.cancel'),
                type: 'warning'
              }).then(() => {
                this.rollBack();
              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: this.$t('myApply.rollBackCanceled')
                });
              });
            }
          }).catch(() => {
            this.$message({
              type: 'info',
              message: this.$t('myApply.cancelInput')
            });
          });

        }).catch(() => {
          this.$message({
            type: 'info',
            message: this.$t('myApply.canceledRollBackOperation')
          });
        });
      },
      rollBack: function () {
        let info = new URLSearchParams;
        info.append("applicationId", String(this.currentFormApplicationId));
        info.append("uid", String(this.uid));
        info.append("applicationDescription", String(this.rollBackReason));
        axios
          .post('/api/apply/deleteApplication', info)
          .then(response => {
            if (response.data.status === 200) {
              alert(this.$t('myApply.rollBackSuccess'));
            } else {
              // 获取失败
              alert(this.$t('myApply.rollBackFail'));
            }

          })
      },
      confirmEdition: function () {
        if (this.currentStatus !== this.$t('myApply.unRead')) {
          alert(this.$t('myApply.canNotChangeApplyOtherThanUnread'));
          return;
        }

        let applicationDetail = "";
        let applicationDescription = "";

        if (this.currentType === this.$t('apply.changeDayOffApply')) {
          if (this.dayOffDetailInfo[2].value === "") {
            alert(this.$t('changeDayOffApply.needToChooseDayOffType'));
            return;
          }
          if (this.offTimeLength === "") {
            alert(this.$t('changeDayOffApply.needToChooseDayOffTime'));
            return;
          }
          if (this.remainHour !== "" && this.remainHour < this.offTimeLength) {
            alert(this.$t('changeDayOffApply.youDoNotHaveEnoughTime'));
            return;
          }
          let startTime = this.dayOffDetailInfo[0].value;
          let endTime = this.dayOffDetailInfo[1].value;
          if (startTime !== "" && endTime !== "" && startTime !== null && endTime !== null) {
            let startYear = startTime.getFullYear();
            let startMonth = startTime.getMonth() + 1;
            let startDay = startTime.getDate();
            let startHour = startTime.getHours();
            let startMinute = startTime.getMinutes();
            //console.log(startYear,startMonth,startDay,startHour,startMinute);
            let endYear = endTime.getFullYear();
            let endMonth = endTime.getMonth() + 1;
            let endDay = endTime.getDate();
            let endHour = endTime.getHours();
            let endMinute = endTime.getMinutes();

            applicationDetail = startYear + "-" + startMonth + "-" + startDay + "," + endYear + "-" + endMonth + "-" + endDay + "," + startHour + ":" + startMinute + "," +
              endHour + ":" + endMinute + "," + this.name + "," + this.dayOffDetailInfo[2].value;
            applicationDescription = this.dayOffDetailInfo[3].value;
          } else {
            alert(this.$t('changeDayOffApply.needToChooseDayOffTime'));
            return;
          }

        } else if (this.currentType === this.$t('apply.ExtraWorkApply')) {
          if (this.extraWorkDetailInfo[0].value === "" || this.extraWorkDetailInfo[0].value == null) {
            alert(this.$t('ExtraWorkApply.needToChooseExtraWorkDate'));
            return;
          }
          if (this.workTimeCount === "") {
            alert(this.$t('ExtraWorkApply.invalidExtraWorkTime'));
            return;
          }
          if (this.extraWorkDetailInfo[3].value === "") {
            alert(this.$t('ExtraWorkApply.pleaseSelectRewardType'));
            return;
          }
          let startTime = this.extraWorkDetailInfo[1].value;
          let endTime = this.extraWorkDetailInfo[2].value;
          if (startTime !== "" && endTime !== "" && startTime !== null && endTime !== null) {
            let date = this.extraWorkDetailInfo[0].value;
            let startYear = date.getFullYear();
            let startMonth = date.getMonth() + 1;
            let startDay = date.getDate();

            let startHour = startTime.getHours();
            let startMinute = startTime.getMinutes();
            //console.log(startYear,startMonth,startDay,startHour,startMinute);

            let endHour = endTime.getHours();
            let endMinute = endTime.getMinutes();

            applicationDetail = startYear + "-" + startMonth + "-" + startDay + "," + startHour + ":" + startMinute + "," +
              endHour + ":" + endMinute + "," + this.extraWorkDetailInfo[3].value;
            applicationDescription = this.extraWorkDetailInfo[4].value;
          } else {
            alert(this.$t('ExtraWorkApply.pleaseChooseExtraWorkTime'));
            return;
          }

        } else if (this.currentType === this.$t('apply.makeUpApply')) {
          if (this.makeUpDetailInfo[0].value === "" || this.makeUpDetailInfo[0].value == null) {
            alert(this.$t('makeUpApply.needToChooseMakeUpDate'));
            return;
          }
          let date = this.makeUpDetailInfo[0].value;
          let startYear = date.getFullYear();
          let startMonth = date.getMonth() + 1;
          let startDay = date.getDate();

          applicationDetail = startYear + "-" + startMonth + "-" + startDay + "," + this.makeUpDetailInfo[1].value;
          applicationDescription = this.makeUpDetailInfo[2].value;

        } else if (this.currentType === this.$t('apply.rollBackApply')) {
          applicationDetail = this.rollBackDetailInfo[0].value + "," + this.rollBackDetailInfo[1].value;
          applicationDescription = this.rollBackDetailInfo[2].value;
        }

        let info = new URLSearchParams;
        info.append("applicationId", String(this.currentFormApplicationId));
        info.append("applicationDetail", String(applicationDetail));
        info.append("applicationDescription", String(applicationDescription));
        axios
          .post('/api/apply/changeApplication', info)
          .then(response => {
            if (response.data.status === 200) {
              alert(this.$t('myApply.changeApplySuccess'));
            } else {
              // 获取失败
              alert(this.$t('myApply.changeApplyFail'));
            }
          })
      },
      countOffTime: function () {
        let startTime = this.dayOffDetailInfo[0].value;
        let endTime = this.dayOffDetailInfo[1].value;
        if (startTime !== "" && endTime !== "" && startTime !== null && endTime !== null) {
          let startYear = startTime.getFullYear();
          let startMonth = startTime.getMonth() + 1;
          let startDay = startTime.getDate();
          let startHour = startTime.getHours();
          let startMinute = startTime.getMinutes();
          //console.log(startYear,startMonth,startDay,startHour,startMinute);
          let endYear = endTime.getFullYear();
          let endMonth = endTime.getMonth() + 1;
          let endDay = endTime.getDate();
          let endHour = endTime.getHours();
          let endMinute = endTime.getMinutes();

          let info = new URLSearchParams;
          info.append("uid", String(this.uid));
          info.append("startDate", String(startYear + "-" + startMonth + "-" + startDay));
          info.append("startTime", String(startHour + ":" + startMinute));
          info.append("endDate", String(endYear + "-" + endMonth + "-" + endDay));
          info.append("endTime", String(endHour + ":" + endMinute));
          info.append("offType",String(this.dayOffDetailInfo[2].value));

          axios
            .post('/api/apply/calculateOffTime', info)
            .then(response => {
              if (response.data.status === 200) {
                // 获取成功
                this.offTimeLength = response.data.data;
              } else {
                // 获取失败
                alert(this.$t('changeDayOffApply.calculateOffTimeFail'));
              }

            })
        } else {
          this.offTimeLength = "";
        }
        // console.log(this.offTimeLength)
      },
      checkRemainTime: function () {
        if (this.dayOffDetailInfo[2].value === "ChangeDayOff") {
          this.remainHour = this.changeDayOffRemain;
        } else if (this.dayOffDetailInfo[2].value === "AnnualDayOff") {
          this.remainHour = this.annualDayOffRemain;
        } else {
          this.remainHour = 1000;
        }
      },
      countWorkTime: function () {
        let startTime = this.extraWorkDetailInfo[1].value;
        let endTime = this.extraWorkDetailInfo[2].value;
        if (startTime !== "" && endTime !== "" && startTime !== null && endTime !== null) {
          let startHour = startTime.getHours();
          let startMinute = startTime.getMinutes();
          //console.log(startYear,startMonth,startDay,startHour,startMinute);
          let endHour = endTime.getHours();
          let endMinute = endTime.getMinutes();

          let extraWorkHour = endHour - startHour + endMinute / 60 - startMinute / 60;
          if (extraWorkHour < 0) {
            alert(this.$t('ExtraWorkApply.invalidExtraWorkTime'));
            this.extraWorkDetailInfo[2].value = "";
            this.workTimeCount = "";
          } else {
            this.workTimeCount = this.$t('ExtraWorkApply.extraWorkHourIs') + extraWorkHour.toString().substring(0, 4) + this.$t('changeDayOffApply.hour');
          }
        } else {
          this.workTimeCount = "";
        }
        // console.log(this.workTimeCount)
      },
      handlePageChange: function () {
        this.getApplicationRecord();
      }
    }
  }

</script>

<style scoped>
  #total {
    height: 1000px;
  }

  #titleLabel {
    position: absolute;
    top: 30px;
    left: 80px;
  }

  #applySearchSelector {
    position: absolute;
    top: 20px;
    left: 180px;
    width: 200px;
  }

  #button1 {
    position: absolute;
    top: 20px;
    left: 500px;
  }

  #button2 {
    position: absolute;
    top: 20px;
    left: 605px;
  }

  #button3 {
    position: absolute;
    top: 20px;
    left: 710px;
  }

  #button4 {
    position: absolute;
    top: 20px;
    left: 815px;
  }

  #button5 {
    position: absolute;
    top: 20px;
    left: 920px;
  }

  #button6 {
    position: absolute;
    top: 20px;
    left: 1025px;
  }

  #table {
    position: absolute;
    top: 110px;
    left: 0;
    width: 100%;
    height: 1000px;
  }

  #formNameLabel1 {
    position: absolute;
    left: 170px;
    top: 90px;
  }

  #userIcon1 {
    position: absolute;
    left: 110px;
    top: 80px;
  }


  #formNameLabel2 {
    position: absolute;
    left: 170px;
    top: 90px;
  }

  #userIcon2 {
    position: absolute;
    left: 110px;
    top: 80px;
  }

  #formNameLabel3 {
    position: absolute;
    left: 170px;
    top: 90px;
  }

  #userIcon3 {
    position: absolute;
    left: 110px;
    top: 80px;
  }

  #formNameLabel4 {
    position: absolute;
    left: 170px;
    top: 90px;
  }

  #userIcon4 {
    position: absolute;
    left: 110px;
    top: 80px;
  }

  #applicationIdLabel1 {
    position: absolute;
    left: 110px;
    top: 140px;
  }

  #applicationIdLabel2 {
    position: absolute;
    left: 110px;
    top: 140px;
  }

  #applicationIdLabel3 {
    position: absolute;
    left: 110px;
    top: 140px;
  }

  #applicationIdLabel4 {
    position: absolute;
    left: 110px;
    top: 140px;
  }

  #backGroundLayer1 {
    position: absolute;
    left: 0;
    top: 250px;
    z-index: 0;
  }

  #processLabel1 {
    position: absolute;
    left: 110px;
    top: 450px;
  }

  #processLine1 {
    position: absolute;
    left: 80px;
    top: 490px;
    width: 380px;
  }

  #backGroundLayer2 {
    position: absolute;
    left: 0;
    top: 250px;
    z-index: 0;
  }

  #processLabel2 {
    position: absolute;
    left: 110px;
    top: 450px;
  }

  #processLine2 {
    position: absolute;
    left: 80px;
    top: 490px;
    width: 380px;
  }

  #backGroundLayer3 {
    position: absolute;
    left: 0;
    top: 250px;
    z-index: 0;
  }

  #processLabel3 {
    position: absolute;
    left: 110px;
    top: 450px;
  }

  #processLine3 {
    position: absolute;
    left: 80px;
    top: 490px;
    width: 380px;
  }

  #backGroundLayer4 {
    position: absolute;
    left: 0;
    top: 250px;
    z-index: 0;
  }

  #processLabel4 {
    position: absolute;
    left: 110px;
    top: 450px;
  }

  #processLine4 {
    position: absolute;
    left: 80px;
    top: 490px;
    width: 380px;
  }

  #dialogButtons1 {
    position: absolute;
    left: 450px;
    top: 90px;
  }

  #subInfoBut1 {
    position: absolute;
    left: 230px;
    top: 570px;
  }

  #dialogButtons2 {
    position: absolute;
    left: 450px;
    top: 90px;
  }

  #subInfoBut2 {
    position: absolute;
    left: 230px;
    top: 570px;
  }

  #dialogButtons3 {
    position: absolute;
    left: 450px;
    top: 90px;
  }

  #subInfoBut3 {
    position: absolute;
    left: 230px;
    top: 570px;
  }

  #dialogButtons4 {
    position: absolute;
    left: 450px;
    top: 90px;
  }

  #subInfoBut4 {
    position: absolute;
    left: 230px;
    top: 570px;
  }


  #formContentLabel11 {
    position: absolute;
    left: 110px;
    top: 187px;
  }

  #formContent11 {
    position: absolute;
    left: 183px;
    top: 177px;
  }

  #formContentLabel12 {
    position: absolute;
    left: 110px;
    top: 237px;
  }

  #formContent12 {
    position: absolute;
    left: 183px;
    top: 227px;
  }

  #formContentLabel13 {
    position: absolute;
    left: 110px;
    top: 287px;
  }

  #formContent13 {
    position: absolute;
    left: 183px;
    top: 277px;
  }


  #formContentLabel21 {
    position: absolute;
    left: 110px;
    top: 187px;
  }

  #formContent21 {
    position: absolute;
    left: 183px;
    top: 177px;
  }

  #formContentLabel22 {
    position: absolute;
    left: 110px;
    top: 237px;
  }

  #formContent22 {
    position: absolute;
    left: 183px;
    top: 227px;
  }

  #formContentLabel23 {
    position: absolute;
    left: 110px;
    top: 287px;
  }

  #formContent23 {
    position: absolute;
    left: 183px;
    top: 277px;
  }

  #formContentLabel24 {
    position: absolute;
    left: 110px;
    top: 337px;
  }

  #formContent24 {
    position: absolute;
    left: 183px;
    top: 327px;
  }


  #formContentLabel31 {
    position: absolute;
    left: 110px;
    top: 187px;
  }

  #formContent31 {
    position: absolute;
    left: 183px;
    top: 177px;
  }

  #formContentLabel32 {
    position: absolute;
    left: 110px;
    top: 237px;
  }

  #formContent32 {
    position: absolute;
    left: 183px;
    top: 227px;
  }

  #formContentLabel33 {
    position: absolute;
    left: 110px;
    top: 287px;
  }

  #formContent33 {
    position: absolute;
    left: 183px;
    top: 277px;
  }

  #formContentLabel34 {
    position: absolute;
    left: 110px;
    top: 337px;
  }

  #formContent34 {
    position: absolute;
    left: 183px;
    top: 327px;
  }

  #formContentLabel35 {
    position: absolute;
    left: 110px;
    top: 387px;
  }

  #formContent35 {
    position: absolute;
    left: 183px;
    top: 377px;
  }


  #formContentLabel41 {
    position: absolute;
    left: 110px;
    top: 187px;
  }

  #formContent41 {
    position: absolute;
    left: 213px;
    top: 187px;
  }

  #formContentLabel42 {
    position: absolute;
    left: 110px;
    top: 237px;
  }

  #formContent42 {
    position: absolute;
    left: 210px;
    top: 227px;
  }

  #formContentLabel43 {
    position: absolute;
    left: 110px;
    top: 287px;
  }

  #formContent43 {
    position: absolute;
    left: 210px;
    top: 277px;
  }

  .dialogBut {
    z-index: 2;
  }

  #choosePage {
    z-index: 5;
    position: absolute;
    left: 470px;
    top: 837px;
  }
</style>

<style>
  .but .el-button {
    background-color: #dadad5 !important;
  }

  .but .el-button:hover {
    background-color: #b2da1d !important;
  }

  .but2 .el-button {
    background-color: #a7da38 !important;
  }

  .tab .el-table th {
    background-color: #dadad5 !important;
  }

  .showDialogFather .el-button {
    border: none !important;
    margin: 0 !important;
    padding: 0 !important;
  }

  .myApply .el-dialog {
    height: 650px !important;
    width: 600px !important;
  }

  .dialogBut .el-button {
    border: none !important;
    margin: 0 !important;
    padding: 0 !important;
  }

  .el-select-dropdown .el-scrollbar .el-scrollbar__wrap{
    overflow: scroll;
  }

</style>
