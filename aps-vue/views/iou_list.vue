<template>
  <div class="wrapper">
    <el-row>
      <el-card>
        <!-- search -->
        <el-form label-width="120px" :inline="true">
          <el-form-item label="用户号:">
            <el-input v-model="searchFilter.userNo" style="width:200px" placeholder="请输入用户名" />
          </el-form-item>
          <el-form-item label="合作方用户标识:">
            <el-input v-model="searchFilter.orderNo" placeholder="请输入合作方用户标识" />
          </el-form-item>
          <el-form-item label="交易流水号:">
            <el-input v-model="searchFilter.tranNo" placeholder="请输入交易流水号" />
          </el-form-item>
          <el-form-item label="合作方渠道:">
            <el-select v-model="searchFilter.channelId" value="全部">
              <el-option v-for="(item, key) of partnerChannelIdList" :key="key" :label="item.desc" :value="item.code" />
            </el-select>
          </el-form-item>
          <!-- 待确认 -->
           <el-form-item label="申请状态:">
            <el-select v-model="searchFilter.iouState" value="全部">
              <el-option v-for="(item, key) of iouStateList" :key="key" :label="item.desc" :value="item.code" />
            </el-select>
          </el-form-item>
          <el-form-item label="借条动支申请号:">
            <el-input v-model="searchFilter.loanReqNo" placeholder="请输入借条动支申请号" />
          </el-form-item>
          <el-form-item label="开始时间">
            <el-date-picker v-model="searchFilter.orderStartDate" type="date" placeholder="选择日期" />
          </el-form-item>
          <el-form-item label="结束时间">
            <el-date-picker v-model="searchFilter.orderEndDate" type="date" placeholder="选择日期" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="searchByFilter()">查询</el-button>
            <el-button type="warning" @click="clearFilter()">重置</el-button>
          </el-form-item>
        </el-form>

        <!-- table -->
        <el-table v-loading="tableLoading" :data="tableData" border class="table">
          <el-table-column prop="userNo" label="用户号" align="center" />
          <el-table-column prop="orderNo" label="合作方用户标识" align="center" width="120" />
          <el-table-column prop="tranNo" label="交易流水号" align="center" width="120" />
          <el-table-column prop="loanReqNo" label="借条动支申请号" align="center" />
          <el-table-column prop="partnerCode" label="合作方代码" align="center" width="120" />
          <el-table-column prop="channelLoanNo" label="渠道订单号" align="center" width="120" />
          <el-table-column prop="applicationAmount" label="申请金额" align="center" width="120" />
          <el-table-column prop="applicationTerm" label="申请期限" align="center" width="120" />
          <el-table-column prop="iouStatusDesc" label="申请状态" align="center" width="120" />
          <el-table-column prop="purpose" label="申请用途" align="center" width="120" />
          <el-table-column prop="iouCreateDate" align="center" label="创建时间">
            <template slot-scope="scope">{{scope.row.iouCreateDate | formatTime}}</template>
          </el-table-column>
        </el-table>

        <!-- pagination -->
        <el-pagination class="pagination" background layout="prev, pager, next" :current-page.sync="page" @current-change="getList" :total="total" :page-size="searchFilter.pageSize" />
      </el-card>
    </el-row>
  </div>
</template>

<script>
import { parseTime } from 'common/tools/index'
import { IOU_LIST, IOU_OPTION_INFO } from '../helps/request_urls'

export default {
  data () {
    return {
      searchFilter: {
        channelId: 'all',
        iouState: '',
        loanReqNo: '',
        orderEndDate: '',
        orderNo: '',
        orderStartDate: '',
        userNo: '',
        tranNo: '',
        pageIndex: 1,
        pageSize: 20
      },
      iouStateList: [],
      partnerChannelIdList: [],
      tableLoading: true,
      tableData: [],
      page: 1,
      total: 0
    }
  },
  methods: {
    searchByFilter () {
      this.page = 1
      this.getList()
    },
    clearFilter () {
      this.searchFilter.orderNo = ''
      this.searchFilter.userNo = ''
      this.searchFilter.tranNo = ''
    },
    getList () {
      this.tableLoading = true
      this.searchFilter.pageIndex = this.page
      this.$http
        .post(IOU_LIST, this.searchFilter)
        .then(this.handleListData)
    },
    getOptionInfo () {
      this.$http
        .post(IOU_OPTION_INFO)
        .then(this.handleOptionInfo)
    },
    handleOptionInfo ({ flag, data }) {
      if (flag === 'S' && data) {
        this.iouStateList = data.iouStateList
        this.partnerChannelIdList = data.partnerChannelIdList
      }
    },
    handleListData ({ flag, data }) {
      if (flag === 'S' && data) {
        this.tableData = data.rows
        this.total = data.total
        this.tableLoading = false
      }
    }
  },
  mounted () {
    this.getOptionInfo()
    this.getList()
  },
  filters: {
    formatSrc: (str) => (str || '').slice(0, 20) + '...',
    formatTime: (stamp) => parseTime(stamp)
  }
}
</script>

<style lang="scss" scoped>
.table{
  width: 100%;
  margin-top: 10px;
}
.pagination{
  margin-top: 10px;
  margin-left: -10px;
}
</style>
