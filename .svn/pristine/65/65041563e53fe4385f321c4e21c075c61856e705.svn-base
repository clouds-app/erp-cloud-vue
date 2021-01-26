<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
				<block slot="content">卡板指定库位扫描</block>
		</cu-custom>
		<form>
			<view class="cu-form-group border-top">
				<view class="title">卡板号:</view>
				<input v-model="inStorage.formItem.cardBoardNo" @blur="getCardBoardNoInfo" placeholder="请输入或扫描卡板号" name="input"></input>
				<button @click="turnOnScanCode('cardBoardNo')" class='cu-btn bg-green shadow'>扫描</button>
			</view>
			<view class="cu-form-group border-top">
				<view class="title">库位:</view>
				<input v-model="inStorage.formItem.workNo" @blur="getWorkNoInfo" placeholder="请输入或扫描库位" name="input"></input>
				<button @click="turnOnScanCode('workNo')" class='cu-btn bg-green shadow'>扫描</button>
			</view>
			<zTable :tableHeight="tableHeight"  :showLoading="false" :emptyText="errorContent" :tableData="paperOutTableDataItems" :columns="findGoodsColumns"></zTable>

		</form>

	</view>
</template>

<script>
import zTable from '@/components/z-table/z-table.vue'
import uniIcon from '@/components/uni-icon/uni-icon.vue'
import searchForm from '@/components/searchForm/searchDataList.vue.vue'
// 纸板入库卡板、工单扫描
import baseMixin from '@/mixins'
import { mapActions } from 'vuex'
import uniPopup from '@/components/uni-popup/uni-popup.vue'
export default {
  name: 'inStorage', // 纸板入库卡板、工单扫描
  mixins: [baseMixin],
  components: { zTable, searchForm, uniPopup, uniIcon },
  data () {
    return {
      currentSelect: 'line', // 当前选择线别/班别
      classBanList: [], // 当前班别数据列表,
      lineSeparationList: [], // 当前线别数据列表
      customerList: [], // 客户搜索列表
      TabCur: 0,
      scanType: '', // 当前扫描类型
      scrollLeft: 0,
      tableHeight: 400, // 表格高度
      errorContent: '暂无数据', // 数据加载中...
      paperOutTableDataItems: [],
      findGoodsColumns: [{
        key: 'OrderNo',
        title: '工单号',
        width: 200
      },
      {
        key: 'Station',
        title: '仓位',
        width: 200
      },
      {
        key: 'FNum',
        title: '板号',
        width: 200
      },
      {
        key: 'State',
        title: '状态',
        width: 145
      }],
      postData: {
					 ap_CardNo: '', // 卡板号
					 ap_OrderNo: '', // 工单号
					 ap_Qty: 1, //
					 ap_Line: '', // 线别
					 ap_ClassNo: '', // 班别
					 ap_CustID: ''// 用户编号
					 },
      inStorage: {
        formItem: {
          cardBoardNo: '11111111', // 卡板号
          workNo: '', // 工单号
          line: '', // 线ㅤ别
          class: '', // 班ㅤ别
          guest: '', // 客ㅤ户
          paperQuality: '', // 纸质
          leng: '', // 楞ㅤ别
          specs: '', // 规ㅤ格
          orderNum: '', // 订单数
          banNum: ''// 卡板数
        }
      }
    }
  },
  // #ifdef H5
  mounted () {
    this.messageRegister()
  },

  // #endif
  // #ifndef H5
  onReady () {
    this.messageRegister()
  },
  // #endif
  methods: {
    // 映射方法
    ...mapActions(['getClassBanListAction', 'getLineSeparationListAction', 'getQutationCustomerList_action', 'getMoveBoardNumbeAction']),
    // 页面通讯,事件注册
    messageRegister () {
      // console.log('======messageRegister========')
      // debugger
      // this.getClassBanList()
      // this.getLineSeparationList()
    },
    // 跳转到数据选择页面
			    turnToPageDataSelect (dataSouce, title) {
      // this.currentSelected =title
      // this.$store.commit('setDataSelectedPageTitle',title)
      // this.$store.commit('setDataSelectedList',dataSouce)
      // uni.navigateTo({
      // 	url:'/components/list-select/list-select'
      // })
    },
    // 选择  线别/班别/客户  数据回调事件
    getSelectDataInfo (item) {
      // debugger
      if (this.currentSelect === 'line') {
        this.inStorage.formItem.line = item.ct_Desc
        this.postData.ap_Line = item.type
      } else if (this.currentSelect === 'class') {
        this.inStorage.formItem.class = item.ct_Desc
        this.postData.ap_ClassNo = item.type
      } else if (this.currentSelect === 'guest') {
        this.inStorage.formItem.guest = item.ct_Desc
        this.postData.ap_CustID = item.type
      }
    },
    // 选择班别
    setSearchDataListSource (type) {
      // debugger
      this.currentSelect = type
      this.$refs['searchForm'].isShowSearchList = true
				   if (type === 'line') {
						 this.$refs['searchForm'].dataSourceList = this.lineSeparationList
				   } else if (type === 'class') {
					    this.$refs['searchForm'].dataSourceList = this.classBanList
				   } else if (type === 'guest') {
				   		 this.$refs['searchForm'].dataSourceList = this.customerList
				   }
    },
    loadCustomerList () {
      if (this.customerList.length > 0) {
        return
      }
      // 搜索条件：
      // ct_Type(客户类型)0:全部,1:纸箱,2:纸板,3:蜂窝 多个逗号分开
      let params = {
        ct_Type: 0// this.customerType
      }
      this.getQutationCustomerList_action(params).then(res => {
        this.customerList = res.records
      }).catch(err => {
        uni.showToast({
          title: '获取客户列表失败 err:' + err,
          icon: 'none',
          duration: 2000
        })
      })
    },
    // 获取班别数据
    getClassBanList () {
      let params = {}
				    let resData = this.getClassBanListAction(params).then(res => {
        if (res) {
          let resData = res.map(item => {
            let formatData = {
              type: item.tt_Code,
              ct_Desc: item.tt_Name
            }
            return formatData
          })
          this.classBanList = resData
					//	 console.log('===getClassBanListAction====:' + JSON.stringify((resData)))
        }
      }).catch(err => {
        this.classBanList = []
        uni.showToast({
          title: '获取线别失败:' + err,
          icon: 'none',
          duration: 2000
        })
      })
    },
    // 获取线别数据
    getLineSeparationList () {
      let params = {}
				    let resData = this.getLineSeparationListAction(params).then(res => {
        if (res) {
          let resData = res.map(item => {
            let formatData = {
              type: item.pl_Code,
              ct_Desc: item.pl_Name
            }
            return formatData
          })
          this.lineSeparationList = resData
						// console.log('===getClassBanListAction====:' + JSON.stringify((resData)))
        }
      }).catch(err => {
        this.lineSeparationList = []
        uni.showToast({
          title: '获取班别失败:' + err,
          icon: 'none',
          duration: 2000
        })
      })
    },
			   // 卡板号 查询信息
    getCardBoardNoInfo () {
      // if (this.inStorage.formItem.cardBoardNo == '') {
      // 	uni.showToast({
      // 		title:'请输入或扫描卡板号',
      // 		icon:'none',
      // 		duration:2000
      // 	})
      // 	return;
      // }
      let data = {
        id: this.inStorage.formItem.cardBoardNo
      }
      this.dataIsLoadding = false
      this.getMoveBoardNumbeAction(data).then(res => {
        if (res.list && res.list.length > 0) {
          // Object.assign(this.boxIn.formItem, res.list[0]);
          this.dataIsLoadding = true
        } else {
          uni.showToast({
            title: '没有该卡板对应的数据',
            icon: 'none',
            duration: 2000
          })
        }
      }).catch(err => {
        uni.showToast({
          title: '获取数据失败:' + err,
          icon: 'none',
          duration: 2000
        })
      })
    },
    // 工单号查询信息
    getWorkNoInfo () {
      if (this.inStorage.formItem.workNo == '') {
        uni.showToast({
          title: '请输入或扫描工单号',
          icon: 'none',
          duration: 2000
        })
        return
      }
      let data = {
        bi_WorkNo: this.inStorage.formItem.workNo,
        Flag: 0
      }
      this.dataIsLoadding = false
      this.boxScanOrderAction(data).then(res => {
        if (res.list && res.list.length > 0) {
          Object.assign(this.boxIn.formItem, res.list[0])
          this.dataIsLoadding = true
        } else {
          uni.showToast({
            title: '没有该工单对应的数据',
            icon: 'none',
            duration: 2000
          })
        }
      }).catch(err => {
        uni.showToast({
          title: '获取数据失败:' + err,
          icon: 'none',
          duration: 2000
        })
      })
    },
    // 本板清单详细
    showDetail (_id) {
      uni.navigateTo(
        {
          url: './inStorageDetail?id=' + _id
        }
      )
    },
			   //= ==打开扫描===
    turnOnScanCode (type) {
      this.scanType = type
      let _self = this
      // 调起条码扫描
      uni.scanCode({
					    scanType: 'barCode', // 固定条形码
					    success: function (res) {
					        console.log('条码内容：' + res.result)
          switch (type) {
            case 'cardBoardNo':
								    // 卡板号
								    this.inStorage.formItem.cardBoardNo = res.result
              _self.getCardBoardNoInfo() // 工单号验证查询
              break
            case 'workNo':
									    // 工单号
									    this.inStorage.formItem.workNo = res.result
              _self.getWorkNoInfo() // 工单号验证查询
              break
            default:
              break
          }
					    }
      })
    }

  }
}
</script>

<style>
	.margin-text-center{
		text-align: center;
		margin: 20rpx;
	}
	.border-top{
		  border-top: 1px solid #eee;
	}
.cu-form-group .title {
		min-width: calc(4em + 15px);
	}
</style>
