import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  //mode: 'history',
  routes: [
    {
      meta: {
        requireAuth: true
      },
      path: '/',
      name: 'index',
      component: resolve => require(['@/components/index.vue'],resolve),
      children: [
        {
          meta: {
            requireAuth: true
          },
          path: '/cityList',//城市管理
          component: resolve => require(['@/components/xls/product/city/cityList.vue'],resolve),
          props:true,
          hidden:true,
        },
        {
          meta: {
            requireAuth: true
          },
          path: '/brandList',//品牌管理
          component: resolve => require(['@/components/xls/brandManage/brandList.vue'],resolve),
          props:true,
          hidden:true,
        },
        {
          meta: {
            requireAuth: true
          },
          path: '/categoryList',//品类管理
          component: resolve => require(['@/components/xls/category/categoryList.vue'],resolve),
          props:true
        },
        {
          meta: {
            requireAuth: true
          },
          path: '/dicList',//字典表管理
          component: resolve => require(['@/components/xls/dictionary/dicList.vue'],resolve),
          props:true
        },
        {
          meta: {
            requireAuth: true
          },
          path: '/permission',//资源管理
          component: resolve => require(['@/components/system/sys_permission/permission.vue'],resolve),
          props:true
        },
        {
          meta: {
            requireAuth: true
          },
          path: '/permission2',//资源管理
          component: resolve => require(['@/components/system/sys_permission/permission2.vue'],resolve),
          props:true
        },
        {
          meta: {
            requireAuth: true
          },
          path: '/role',//角色管理
          component: resolve => require(['@/components/system/sys_role/role.vue'],resolve),
          props:true
        },
        {
          meta: {
            requireAuth: true
          },
          path: '/user',//用户管理
          component: resolve => require(['@/components/system/sys_user/user.vue'],resolve),
          props:true
        },
        {
          meta: {
            requireAuth: true
          },
          path: '/shopList',//商户管理
          component: resolve => require(['@/components/xls/shop/shopList.vue'],resolve),
          props:true
        },
        {
          meta: {
            requireAuth: true
          },
          path: '/sellerCateBrandRel',//商户经营品类
          component: resolve => require(['@/components/xls/shop/sellerCateBrandRel.vue'],resolve),
          props:true
        },
        {
          meta: {
            requireAuth: true
          },
          path: '/reviewList',//审核列表
          component: resolve => require(['@/components/xls/shop/reviewList.vue'],resolve),
          props:true
        },
        {
          meta: {
            requireAuth: true
          },
          path: '/stagesList',//分期信息列表
          component: resolve => require(['@/components/xls/shop/stagesList.vue'],resolve),
          props:true
        },
        {
          meta: {
            requireAuth: true
          },
          path: '/gpsCheckRuleList',//GPS校验规则列表
          component: resolve => require(['@/components/xls/shop/gpsCheckRuleList.vue'],resolve),
          props:true
        },
        {
          meta: {
            requireAuth: true
          },
          path: '/tradeList',//交易管理
          component: resolve => require(['@/components/xls/trade/tradeList.vue'],resolve),
          props:true
        },
        {
          meta: {
            requireAuth: true
          },
          path: '/addProduct/:type/:id',//新增商品
          component: resolve => require(['@/components/xls/product/addProduct.vue'],resolve),
          props:true
        },
        {
          meta: {
            requireAuth: true
          },
          path: '/allProduct',//商品列表
          component: resolve => require(['@/components/xls/product/allProduct.vue'],resolve),
          props:true
        },
        {
          meta: {
            requireAuth: true
          },
          path: '/giveList',//商户授信
          component: resolve => require(['@/components/xls/givingCredit/giveList.vue'],resolve),
          props:true
        },
        {
          meta: {
            requireAuth: true
          },
          path: '/priceList',//最低起订价
          component: resolve => require(['@/components/xls/price/priceList.vue'],resolve),
          props:true
        },
        {
          meta: {
            requireAuth: true
          },
          path: '/balanceList',//结算列表
          component: resolve => require(['@/components/xls/balance/balanceList.vue'],resolve),
          props:true
        },
        {
          meta: {
            requireAuth: true
          },
          path: '/spikeRatio',//扣点比例
          component: resolve => require(['@/components/xls/balance/spikeRatio.vue'],resolve),
          props:true
        },
        {
          meta: {
            requireAuth: true
          },
          path: '/accountList',//账户列表
          component: resolve => require(['@/components/xls/balance/accountList.vue'],resolve),
          props:true
        },
        {
          meta: {
            requireAuth: true
          },
          path: '/accountStatement',//账户流水
          component: resolve => require(['@/components/xls/balance/accountStatement.vue'],resolve),
          props:true
        },
        {
          meta: {
            requireAuth: true
          },
          path: '/checkAccountList',//对账
          component: resolve => require(['@/components/xls/balance/checkAccountList.vue'],resolve),
          props:true
        },
        {
          meta: {
            requireAuth: true
          },
          path: '/waitPayList',//待放款
          component: resolve => require(['@/components/xls/balance/waitPayList.vue'],resolve),
          props:true
        },
        {
          meta: {
            requireAuth: true
          },
          path: '/ruleList',//对账
          component: resolve => require(['@/components/xls/rule/ruleList.vue'],resolve),
          props:true
        },
        {
          meta: {
            requireAuth: true
          },
          path: '/orderLogList',//订单操作日志
          component: resolve => require(['@/components/xls/logManage/orderLogList.vue'],resolve),
          props:true
        },
        {
          meta: {
            requireAuth: true
          },
          path: '/callAccountOperationLogList',//账务系统操作日志
          component: resolve => require(['@/components/xls/logManage/callAccountOperationLogList.vue'],resolve),
          props:true
        },
        {
          meta: {
            requireAuth: true
          },
          path: '/callAccountsOperationList',//商户开户日志
          component: resolve => require(['@/components/xls/logManage/callAccountOperationList.vue'],resolve),
          props:true
        },
        {
          meta: {
            requireAuth: true
          },
          path: '/callAssetsOperationLogList',//资匹系统操作日志
          component: resolve => require(['@/components/xls/logManage/callAssetsOperationLogList.vue'],resolve),
          props:true
        },
        {
          meta: {
            requireAuth: true
          },
          path: '/callRiskOperationLogList',//风控系统操作日志
          component: resolve => require(['@/components/xls/logManage/callRiskOperationLogList.vue'],resolve),
          props:true
        },
        {
          meta: {
            requireAuth: true
          },
          path: '/sellerDetailInfo/:sellerId',//对账
          component: resolve => require(['@/components/xls/shop/sellerDetailInfo.vue'],resolve),
          props:true
        },
      ]
    },
    {
      path:"/login",
      name:"login",
      component: resolve => require(['@/components/login.vue'],resolve),
    },
    {
      path:"/index",
      name:"index",
      component: resolve => require(['@/components/index.vue'],resolve),
    },
  ]
})
