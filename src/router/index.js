import Vue from 'vue'
import Router from 'vue-router'
import HomePage from "../components/HomePage";
import Login from "../components/Login";
import apply from "../components/Apply/Apply";
import statistic from "../components/Statistic";
import companyInfo from "../components/garbage/CompanyInfo";
import advanceManagement from "../components/AdvanceManagement/AdvanceManagement";
import myTemp from "../components/garbage/myTemp";
import aboutUs from "../components/aboutUs";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/apply',
      name: 'Apply',
      component: apply
    },
    {
      path: '/statistic',
      name: 'Statistic',
      component: statistic
    },
    {
      path: '/companyInfo',
      name: 'CompanyInfo',
      component: companyInfo
    },
    {
      path: '/advanceManagement',
      name: 'AdvanceManagement',
      component: advanceManagement
    },
    {
      path: '/aboutUs',
      name: 'aboutUs',
      component: aboutUs
    },
    {
      path: '/template',
      name: 'myTemp',
      component: myTemp
    },
  ]
})
