<template>
  <div class="wrapper">
    <el-row>
      <el-card>
        <!-- search -->
        <el-form label-width="120px" :inline="true">
          <el-form-item label="用户号:">
            <el-input v-model="searchFilter.userNo" style="width:200px" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item label="订单号:">
            <el-input v-model="searchFilter.orderNo" placeholder="请输入订单号"></el-input>
          </el-form-item>
          <el-form-item label="交易流水号:">
            <el-input v-model="searchFilter.tranNo" placeholder="请输入交易流水号"></el-input>
          </el-form-item>
          <el-form-item label="活体类型:">
            <el-select v-model="searchFilter.orderFaceType" value="借款类型">
              <el-option key="申请类型" label="申请类型" :value="1"></el-option>
              <el-option key="借款类型" label="借款类型" :value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="searchByFilter()">查询</el-button>
            <el-button type="warning" @click="clearFilter()">重置</el-button>
          </el-form-item>
        </el-form>

        <!-- table -->
        <el-table v-loading="tableLoading" :data="tableData" border class="table">
          <el-table-column prop="userNo" label="用户号" align="center" width="120"></el-table-column>
          <el-table-column prop="orderNo" align="center" label="订单号"></el-table-column>
          <el-table-column align="center" width="100" label="交易流水号">
             <template slot-scope="scope">{{scope.row.tranNo || '暂无'}}</template>
          </el-table-column>
          <el-table-column prop="orderFaceType" align="center" width="78" label="活体类型"></el-table-column>
          <el-table-column prop="facePhotoAssayList[0]" align="center" width="180" label="图片地址">
            <template slot-scope="scope"><a :href="scope.row.facePhotoAssayList[0]" target="_blank">{{scope.row.facePhotoAssayList[0] | formatSrc}}</a></template>
          </el-table-column>
          <el-table-column prop="facePhotoAssayMongoIdList[0]" align="center" label="图片MongodbID"></el-table-column>
          <el-table-column prop="orderNo" align="center" label="活体合作方"></el-table-column>
          <el-table-column prop="faceDownFlagDesc" align="center" width="78" label="上送状态"></el-table-column>
          <el-table-column prop="faceDownCount" align="center" width="110" label="上送失败次数"></el-table-column>
          <el-table-column prop="faceCreateDate" align="center" label="创建时间">
            <template slot-scope="scope">{{scope.row.faceCreateDate | formatTime}}</template>
          </el-table-column>
          <el-table-column align="left" label="操作" width="100">
            <template slot-scope="scope">
              <el-button size="mini" type="danger" @click="handleRetry(scope.$index, scope.row)">重试</el-button>
            </template>
          </el-table-column>
        </el-table>

        <!-- pagination -->
        <el-pagination class="pagination" background layout="prev, pager, next" :current-page.sync="page" @current-change="getList" :total="total" :page-size="searchFilter.pageSize"></el-pagination>
      </el-card>
    </el-row>
  </div>
</template>

<script>
import { parseTime } from 'common/tools/index'

export default {
  data () {
    return {
      searchFilter: {
        orderNo: '', // 订单号
        userNo: '', // 用户号
        tranNo: '', // 交易号
        orderFaceType: 1, // 活体类型， 1-申请， 2-借款
        pageIndex: 1, // 第几页
        pageSize: 20 // 分页大小
      },
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
        .post('/aps/face/queryOrderFaceDownFailList', this.searchFilter)
        .then(this.handleListData)
    },
    handleRetry (index, { orderFaceType, orderNo }) {
      this.$http
        .post('/aps/face/resetOrderFaceDownCount', { orderFaceType, orderNo })
        .then(
          result => {
            if (result.flag === 'S') {
              this.getList()
              this.$message({
                message: '重试成功！',
                type: 'success'
              })
            }
          },
          error => {
            this.$message({
              message: error.message,
              type: 'warning'
            })
          })
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
