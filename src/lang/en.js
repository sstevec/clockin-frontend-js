import enLocale from 'element-ui/lib/locale/lang/en'
const en={
  header: {
    'lang': 'English',
    'title': 'Attendance',
    'home': 'Home',
    'apply': 'Apply',
    'statistic': 'Statistic',
    'advance': 'Advance',
    'personInfo': 'Personal Info',
    'changePass': 'Change Password',
    'help': 'Help',
    'aboutUs': 'About Us',
    'signOut': 'Sign Out',
    'change': 'Edit',
    'saveChange': 'Save',
    'cancel': 'Cancel',
    'pleaseEnter': 'Please Enter',
    'pleaseCareUpperCase': 'Pay Attention To Case',
    'strength': 'Strength',
    'pleaseKeepThePassSame': 'Keep Your Input',
    'oldPass': 'Old Password',
    'newPass': 'New Password',
    'newPassAgain': 'Enter New Password Again',
    'uid': 'UID',
    'account': 'Account',
    'workID': 'Work ID',
    'position': 'Position',
    'tel': 'Phone',
    'email': 'Email',
    'pleaseEnterCorrectEmail': 'Please Enter Correct Email Address',
    'pleaseEnterCorrectPhoneNumber': 'Please Enter Correct Phone Number',
    'changeSuccess': 'Edit Success',
    'pleaseEnterAllInformation': 'Please Fill All Info',
    'twoPasswordAreNotTheSame': 'Please Keep Your Password Identical',
    'containIllegalChar': 'Contain Illegal Character',
    'passLengthError': 'Password Need At Least 6 Digits And At Most 16 Digits',
    'doNotSupportCanvas': 'Does Not Support Canvas',
    'getLoginInfoFail': 'Fail To Get User Info',
    'getPageNumberFail': 'Fail To Get Page Number',
  },
  HomePage: {
    'clockInRecord': '打卡记录',
    'attendanceRule': '考勤规则',
    'clockInTime': 'Time Info',
    'personalizeRule': 'Personalize',
    'pleaseChooseDate': 'Please Select Date',
    'loading': 'Loading',
    'today': 'Today',
    'yesterday': 'Yesterday',
    'aWeekAgo': 'Week Ago',
    'noRecord': 'Miss',
    'clockIn': 'Clock In',
    'clockOut': 'Clock Out',
    'noInfo': 'Loading',
  },
  login: {
    'pleaseEnterAccount': 'Please Enter Account',
    'pleaseEnterPassword': 'Please Enter Password',
    'signIn': 'Login',
    'title': 'Welcome',
    'forgetPassword': 'Help',
    'pleaseEnterVerifyCode': 'Please Enter Verify Code',
    'findPassword': 'Find Password',
    'getVerifyCode': 'Get Code',
    'confirm': 'Confirm',
    'loginInFail': 'Error, Please Enter Correct Account And Password',
    'verifyCodeIsWrongPleaseReTakeOne': 'Wrong Verify Code, Please Take A New Code And Try Again',
    'rememberAccount': 'Remember'
  },
  statistic: {
    'chooseTimePeriod': 'Pick Time',
    'to': 'To',
    'startDate': 'Start Date',
    'endDate': 'End Date',
    'fileOut': 'Export',
    'missCardPercent': 'Miss Percent',
    'earlyOrLate': 'Late Or Leave Early',
    'workHourPercent': 'Work Percent',
    'dayOffPercent': 'Off Percent',
    'missHourPercent': 'Miss Percent',
    'rewardMoneyPercent': 'Overtime Pay',
    'rewardHolidayMoneyPercent': 'Overtime Pay(Holiday)',
    'rewardDayOffHourPercent': 'Reward Off Hour',
    'workHour': 'Work Hour',
    'date': 'Date',
    'workStart': 'Work Start',
    'workEnd': 'Work End',
    'extraWorkHour': 'Extra Work Hour',
    'missHour': 'Miss Hours',
    'isEarly': 'Leave Early',
    'isLate': 'Late',
    'changeDayOffHour': 'Break Off Hours',
    'annualDayOffHour': 'Annual Off Hours',
    'isMissClockIn': 'Miss Clock In',
    'isMissClockOut': 'Miss Clock Out',
    'workDate': 'Work Date',
    'totalMiss': 'Miss Clock',
    'totalEarly': 'Leave Early Times',
    'totalLate': 'Late Times',
    'supposeWorkHour': 'Work Hours(Suppose)',
    'actualWorkHour': 'Work Hours(Actual)',
    'totalExtraWorkHourNotRewarded': 'Extra Work Hours',
    'totalChangeDayOffHour': 'Total Break Off',
    'totalAnnualDayOffHour': 'Total Annual Off',
    'totalMissHour': 'Total Miss Hours',
    'totalExtraWorkHour': 'Total Rewarded Extra Work Hours',
    'totalRewardMoneyHour': 'Overtime Pay Hours',
    'totalRewardHolidayMoneyHour': 'Overtime Pay Hours(Holiday)',
    'totalRewardChangeDayOffHour': 'Reward Off Hours',
    'getStatisticFail': 'Get Statistic Fail',
    'doYouWantToOutCurrentRecord': 'Do you want to export the selected records',
    'notice': 'Notify',
    'pleaseChooseTimePeriod': 'Please Select Time Period',
    'outFail': 'Export Fail',
    'pleaseChooseAtLeastOneCategoryBeforeDownload': 'Pick One Category Before Export',
    'haveCanceled': 'Export Canceled',
    'startDownload':'Start Download File',
  },
  apply: {
    'myApply': 'My Apply',
    'makeUpApply': 'Make Up Apply',
    'changeDayOffApply': 'Day Off Apply',
    'ExtraWorkApply': 'Extra Work Apply',
    'reviewApply': 'Review Application',
    'rollBackApply': 'Revoke Apply',
  },
  changeDayOffApply: {
    'name': 'name',
    'department': 'department',
    'position': 'position',
    'dayOffType': 'Break Type',
    'offStart': 'Break Start',
    'offEnd': 'Break End',
    'offReason': 'Reason',
    'pickDateAndTime': 'Select Time',
    'pickOffType': 'Please Choose Break Type',
    'reviewProcess': 'Process',
    'submitApply': 'Submit',
    'changeDayOff': 'Break Off',
    'annualDayOff': 'Annual Off',
    'dayOff': 'Business Leave',
    'needToChooseDayOffType': 'You Need To Choose Break Type',
    'needToChooseDayOffTime': 'You Need To Choose Break Time',
    'youDoNotHaveEnoughTime': 'You Do Not Have Enough Credit',
    'addApplicationFail': 'Submit Application Fail',
    'changeDayOffRemain': 'Break Off Hours Remain: ',
    'annualDayOffRemain': 'Annual Off Hours Remain : ',
    'hour': 'Hour(s)',
    'calculateOffTimeFail': 'Calculate Break Time Fail',
    'totalOffHour': 'Total Break Hours are: ',
    'reviewer': 'Reviewer',
    'getReviewerNameFail': 'Get Reviewer Info Fail',
    'addApplicationSuccess': 'Add Application Success',
    'invalidDayOffTime':'Invalid Break Period',
  },
  ExtraWorkApply: {
    'extraWorkDate': 'Date',
    'startTime': 'Start Time',
    'endTime': 'End Time',
    'rewardType': 'Reward',
    'workReason': 'Reason',
    'selectTime': 'Select Time',
    'pleaseSelect': 'Please Select',
    'money': 'Overtime Pay',
    'holidayMoney': 'Overtime Pay(Holiday)',
    'needToChooseExtraWorkDate': 'You Need To Pick Work Date',
    'invalidExtraWorkTime': 'Illegal Work Time',
    'pleaseSelectRewardType': 'You Need To Select Reward Type',
    'atLeastWorkForOneHour': 'You Need To Work At Least 1 Hour',
    'extraWorkHourIs': 'Total Work Hours are: ',
    'pleaseChooseExtraWorkTime': 'Please Choose Extra Work Time',
  },
  makeUpApply: {
    'makeUpTime': 'Date',
    'makeUpReason': 'Reason',
    'getMakeUpInfoFail': 'Get Make Up Info Fail',
    'needToChooseMakeUpDate': 'You Need To Choose Make Up Date',
    'unKnownMakeUpType': 'Unknown Make Up Type',
    'makeUpDate': 'Date',
    'makeUpType': 'Type',
  },
  myApply: {
    'applyType': 'Apply Type',
    'All': 'All',
    'unRead': 'Unread',
    'pending': 'Pending',
    'approved': 'Approved',
    'denied': 'Refused',
    'rollBacked': 'Revoked',
    'applyOverview': 'Quick View',
    'judgeOverview': 'Application Overview',
    'applyTime': 'Apply Time',
    'lastUpdate': 'Last Update',
    'applyStatus': 'Status',
    'detailInfo': 'Detail',
    'applyNumber': 'ApplicationID',
    'pleaseSelectDate': 'Please Choose Date',
    'rollBack': 'Revoke',
    'confirmChange': 'Confirm',
    'offStart': 'Start',
    'offEnd': 'End',
    'offType': 'Type',
    'extraWorkStart': 'Start',
    'extraWorkEnd': 'End',
    'rollBackApplyNumber': 'Revoke Num',
    'rollBackApplyType': 'Revoke Type',
    'rollBackReason': 'Reason',
    'rollBacksApplyNumber': 'Revoked Number',
    'rollBacksApplyType': 'Revoked Type',
    'youCanNotRollBackAnApplyThatAlreadyRollBacked': 'Application Has Already Been Revoked',
    'thisOperationWouldRollBackThisApply': 'Do you want to revoke this application?',
    'pleaseEnterYourRollBackReason': 'Please Enter Revoke Reason',
    'applicationHasBeenReviewedYouCanNotRollBackDirectly': 'Review Process Has Started, Revoke This Application Would Submit A New Revoke Request',
    'continue': 'Continue',
    'rollBackCanceled': 'Revoke Canceled',
    'cancelInput': 'Input Canceled',
    'canceledRollBackOperation': 'Revoke Operation Canceled',
    'rollBackSuccess': 'Revoke Success',
    'rollBackFail': 'Revoke Fail',
    'canNotChangeApplyOtherThanUnread': 'Review Process Has Started, You Can Not Edit This Application',
    'changeApplySuccess': 'Edit Success',
    'changeApplyFail': 'Edit Fail',
    'getRecordFail': 'Get Application Record Fail',
    'getReviewProcessFail': 'Get Review Process Fail',
    'rollBackApplyCanNotBeRollBacked':'You Can Not Revoke A Revoke Apply',
  },
  reviewApply: {
    'agree': 'Agree',
    'refuse': 'Refuse',
    'reviewSuccess': 'Decision Is Saved',
    'reviewFail': 'Decision Save Fail',
  },
  advanceManagement: {
    'userManagement': 'User Management',
    'departmentManagement': 'Department Management',
    'clockInManagement': 'Attendance Management',
    'holidayManagement': 'Holiday Management',
    'accountManagement': 'Account Management',
    'HomePageManagement':'Homepage Management',
    'DepartmentManager':'Department Manager',
  },
  clockInManagement: {
    'chooseDepartment': 'Dept',
    'staffName': 'name',
    'manager': 'manager',
    'departmentId': 'DepartmentID',
    'position': 'position',
    'uid': 'UID',
    'totalWorkDate': 'Work Date',
    'totalMissClock': 'Miss Clock',
    'totalLate': 'Late',
    'totalEarly': 'Early Leave',
    'totalSupposeWorkHour': 'Work Hour(Suppose)',
    'totalWorkHours': 'Work Hours',
    'totalExtraWorkHour': 'Extra Work Hours',
    'totalChangeDayOff': 'Break Off Hours',
    'totalAnnualDayOff': 'Annual Off Hours',
    'totalMissHour': 'Miss Hours',
    'totalCountedExtraWork': 'Rewarded Extra Work',
    'totalExchangeMoneyHour': 'Overtime Pay',
    'totalExchangeChangeDayOffHour': 'Overtime Pay(Holiday)',
    'totalExchangeHolidayMoneyHour': 'Reward Break Hours',
    'missInTotal': 'Miss Percent',
    'lateInTotal': 'Late And Early Leave',
    'totalWorkInSuppose': 'Work Percent',
    'changeInSuppose': 'Break Percent',
    'missInSuppose': 'Miss Percent',
    'moneyInExtra': 'Overtime Pay Percent',
    'holidayMoneyInExtra': 'Overtime Pay(Holiday) Percent',
    'changeInExtra': 'Reward Break Hour Percent',
    'getManagerStatisticFail': 'Get Statistic Info Fail',
    'getDepartmentOptionsFail': 'Get Department Info Fail',
  },
  departmentManagement: {
    'advanceSearch': 'Search',
    'operation': 'Operation',
    'addDepartment': 'Add New',
    'manageClockInRule': 'Clock In Rule',
    'manageExtraWorkRule': 'Extra Work Rule',
    'chooseWorkRule': 'Clock In Rule',
    'chooseExtraWorkRule': 'Extra Work Rule',
    'changeDepartmentInfo': 'Edit Department',
    'addClockInRule': 'Add New',
    'clockInRuleNumber': 'Rule Num',
    'workStart': 'Start',
    'workEnd': 'End',
    'editClockInRule': 'Edit Rule',
    'addExtraWorkRule': 'Add New',
    'extraWorkRuleNumber': 'Rule Num',
    'extraWorkStart': 'Start',
    'extraWorkEnd': 'End',
    'minWorkTime': 'Min Work Hour',
    'editExtraWorkRule': 'Edit Rule',
    'createdTime': 'Created',
    'department_id': 'DepartmentID',
    'tel': 'Tel',
    'charger_name': 'Charger',
    'staffing': 'Staffing',
    'departmentName':'Name',
    'workPlace':'Work Place',
    'charger':'Charger',
    'lastUpdate':'Last Update',
    'scheduleId':'Rule Num',
    'illegalChar':'Input Contain Illegal Character',
    'getDepartmentInfoFail':'Get Department Info Fail',
    'renewStaffFail':'Update Department Staffing Fail',
    'changeDepartmentSuccess':'Edit Department Info Success',
    'changeDepartmentFail':'Edit Department Info Fail',
    'addDepartmentSuccess':'Add Department Success',
    'addDepartmentFail':'Add Department Fail',
    'deleteCanceled':'Delete Canceled',
    'thisOperationWouldDeleteThisDepartment':'Do you want to delete this department?',
    'deleteDepartmentSuccess':'Delete Department Success',
    'deleteDepartmentFail':'Delete Department Fail',
    'geClockInRuleFail':'Get Clock In Rule Fail',
    'pleaseEnterClockInRuleName':'Please Enter Clock In Rule Name',
    'illegalTimePeriod':'Illegal Time Period',
    'addClockInRuleSuccess':'Add Clock In Rule Success',
    'addClockInRuleFail':'Add Clock In Rule Fail',
    'pleaseChooseClockInTime':'Please Choose Work Time',
    'pleaseEnterExtraWorkRuleName':'Please Enter Extra Work Rule Name',
    'thisOperationWouldDeleteThisRule':'Do you want to delete the rule？',
    'deleteClockInRuleSuccess':'Delete Clock In Rule Success',
    'deleteClockInRuleFail':'Delete Clock In Rule Fail',
    'getExtraWorkRuleFail':'Get Extra Work Rule Fail',
    'pleaseEnterMinWorkTime':'Please Enter Min Work Hours',
    'pleaseEnterNumber':'Please Enter Number As Min Work Hours',
    'addExtraWorkRuleSuccess':'Add Extra Work Rule Success',
    'addExtraWorkRuleFail':'Add Extra Work Rule Fail',
    'pleaseChooseExtraWorkTime':'Please Choose Extra Work Time Period',
    'changeExtraWorkRuleSuccess':'Edit Extra Work Rule Success',
    'changeExtraWorkRuleFail':'Edit Extra Work Rule Fail',
    'deleteExtraWorkRuleSuccess':'Delete Extra Work Rule Success',
    'deleteExtraWorkRuleFail':'Delete Extra Work Rule Fail',
    'editClockInRuleSuccess':'Edit Clock In Rule Success',
    'editClockInRuleFail':'Edit Clock In Rule Fail',
  },
  holidayManagement:{
    'timePeriod':'Period',
    'addHoliday':'Add New',
    'chooseTime':'Time',
    'changeHoliday':'Edit Holiday',
    'updatedTime':'Updated',
    'holidayName':'Name',
    'dayOffTargets':'Off Class',
    'worker':'worker',
    'manager':'manager',
    'searchInfoContainIllegalChar':'Search Key Contain Illegal Character',
    'getHolidayFail':'Get Holiday Info Fail',
    'changeHolidaySuccess':'Edit Holiday Success',
    'changeHolidayFail':'Edit Holiday Fail',
    'needHolidayTime':'You Need To Select Holiday Time',
    'needHolidayName':'You Need To Name The Holiday',
    'needHolidayTarget':'You Need To Pick Off Classes',
    'addHolidaySuccess':'Add Holiday Success',
    'addHolidayFail':'Add Holiday Fail',
    'thisOperationWouldDeleteHoliday':'Do you want to delete this holiday',
    'deleteHolidaySuccess':'Delete Holiday Success',
    'deleteHolidayFail':'Delete Holiday Fail',
    'deleteCanceled':'Delete Canceled',
    'pleaseSelectDate':'Pick Date',
    'to':'-',
  },
  staffManagement:{
    'addStaff':'Add New',
    'upload':'Import',
    'uploadPicture':'Upload Image',
    'addReviewer':'Add Reviewer',
    'editStaffInfo':'Edit Staff Info',
    'advanceSetting':'Advance Setting',
    'chooseReviewer':'Choose Reviewer',
    'chooseOutNumber':'Select Out Number',
    'startPoint':'Start Point',
    'outNumber':'Row Number',
    'password':'password',
    'manager':'manager',
    'changeDayOffTime':'Break Hours',
    'annualDayOffTime':'Annual Off Hours',
    'holidayType':'Break Class',
    'department':'Department',
    'unknown':'unknown',
    'image':'Image',
    'defaultForm':'Default Form',
    'uploadPath':'Upload Path',
    'successSign':'Success Notify',
    'uploadMethod':'Drag File To Here Or Click',
    'getStaffInfoFail':'Get Staff Info Fail',
    'getAllOptions':'Get Options Fail',
    'inputNumberAtChange':'Please Input Number As Break Hours',
    'inputNumberAtAnnual':'Please Input Number As Annal Off Hours',
    'reviewerCanNotBeEmpty':'You need at least one reviewer',
    'addStaffSuccess':'Add Staff Success',
    'addStaffFail':'Add Staff Fail',
    'uploadImageCanOnlyBeJPG':'Upload Image Can Only In JPG Format',
    'uploadSizeCanNotExceed10':'File Size Can Not Exceed 10 MB',
    'uploadFileSuccess':'Upload Success',
    'uploadFileFail':'Upload Fail',
    'pleaseSetReviewerInAdvanceSetting':'Please Edit Reviewers In Advance Setting',
    'pleaseSetDayOffTypeInAdvanceSetting':'Please Edit Break Class In Advance Setting',
    'canNotChangeExpired':'You Can Not Change Expired Time',
    'thisOperationWouldDeleteTheStaff':'Do you want to fire this staff?',
    'contentCanNotBeEmpty':'Edit Content Can Not Be Empty',
    'editStaffSuccess':'Edit Staff Success',
    'editStaffFail':'Edit Staff Fail',
    'getNodeFail':'Get Reviewer Fail',
    'getDefaultFormFail':'Load Form File',
    'uploadFileCanOnlyBeXLS':'You Can Only Import xls Format File',
    'uploadFileCanNotExceed5':'Import File Size Can Not Exceed 5 MB',
    'inFileSuccess':'Import Success',
    'inFileFail':'Import Fail',
    'outFileSuccess':'Export Success',
    'outFileFail':'Export Fail',
    'selectOneBeforeDownload':'Please Choose At Least One Category Before Download',
    'getDepartmentListFail':'Get Department Info Fail',
    'deleteStaffSuccess':'Fire Staff Success',
    'deleteStaffFail':'Fire Staff Fail',
  },
  accountManagement:{
    'editUserInfo':'Edit User Info',
    'chooseRole':'Select Role',
    'enterNew':'Enter New',
    'nullMeanNoChange':'Default No Change',
    'role':'Role',
    'expiredTime':'Expired',
    'getSysUserFail':'Get User Info Fail',
    'passwordContainIllegalChar':'Password Contain Illegal Character',
    'editAccountSuccess':'Edit Account Success',
    'editAccountFail':'Edit Account Fail',

  },
  dayOffType:{
    'title':'Manage Break Group',
    'addBut':'Add New',
    'editDayOffType':'Edit',
    'dayOffTypeNumber':'Group Num',
    'dayOffTypeDescription':'Remark',
    'manageDayOffType':'Off Group',
    'addHoliday':'Add New',
    'getDayOffOptionsFail':'Get Break Group Fail',
    'thisOperationWouldDeleteDayOffType':'Do you want to delete this group?',
    'deleteDayOffTypeSuccess':'Delete Success',
    'deleteDayOffTypeFail':'Delete Fail',
    'containIllegalChar':'Group Num Can Not Contain Special Char',
    'pleaseEnterDayOffTypeName':'Please Enter Group Name',
    'addDayOffTypeSuccess':'Add Success',
    'addDayOffTypeFail':'Add Fail',
    'offName':'Group ID',
    'editDayOffTypeSuccess':'Edit Success',
    'editDayOffTypeFail':'Edit Fail',
  },
  HomePageManagement:{
    'firstImage':'First Image On Homepage Card',
    'secondImage':'Second Image On Homepage Card',
    'thirdImage':'Third Image On Homepage Card',
    'fourthImage':'Fourth Image On Homepage Card',
    'clockInRuleImage':'Background Of Rule',
    'personalizeImage':'BackGround Of Personalize',
    'getImageFail':'Get Image Fail',
  },
  noonBreak:{
    'manageNoonBreakRule':'Noon Break',
    'breakStart':'Break Start',
    'breakEnd':'Break End',
    'addNoonBreakRule':'Add New Rule',
    'noonBreakId':'Break Num',
    'editNoonBreakRule':'Edit Rule',
    'getNoonBreakRuleFail':'Get Noon Break Info Fail',
    'pleaseEnterNoonBreakRuleName':'Please Enter Break Rule Name',
    'addNoonBreakRuleSuccess':'Add Noon Break Rule Success',
    'addNoonBreakRuleFail':'Add Noon Break Rule Fail',
    'pleaseChooseNoonBreakTime':'Please Enter Break Period',
    'editNoonBreakRuleSuccess':'Edit Success',
    'editNoonBreakRuleFail':'Edit Fail',
    'deleteNoonBreakRuleSuccess':'Delete Success',
    'deleteNoonBreakRuleFail':'Delete Fail, Rule Is In Use Or System Error',
    'chooseNoonBreakRule':'Choose Break Standard',
  },
  ...enLocale
};
export default en
