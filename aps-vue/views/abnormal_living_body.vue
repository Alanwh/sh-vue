<template>
  <div class="home">
    <el-row>
      <el-card>
        <!-- search -->
        <el-form label-width="120px" :inline="true">
          <el-form-item label="用户名">
            <el-input v-model="searchFilter.usrName" style="width:200px" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item label="订单号">
            <el-input v-model="searchFilter.orderId" placeholder="请输入订单号"></el-input>
          </el-form-item>
          <el-form-item label="交易流水号">
            <el-input v-model="searchFilter.serialNumber" placeholder="请输入交易流水号"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="searchByFilter()">查询</el-button>
            <el-button type="warning" @click="clearFilter()">重置</el-button>
          </el-form-item>
        </el-form>

        <!-- table -->
        <el-table v-loading="tableLoading" :data="tableData" border class="table">
          <el-table-column prop="activeNameOuter" label="用户号" align="center" width="120"></el-table-column>
          <el-table-column prop="effectStartTime" align="center" label="订单号"></el-table-column>
          <el-table-column prop="effectEndTime" align="center" label="交易流水号"></el-table-column>
          <el-table-column prop="goodsCount" align="center" label="活体类型"></el-table-column>
          <el-table-column prop="activeBannerLabel" align="center"   label="图片地址"></el-table-column>
          <el-table-column prop="activityStatus" align="center" label="图片MongodbID"></el-table-column>
          <el-table-column prop="activityStatus" align="center" label="活体合作方"></el-table-column>
          <el-table-column prop="activityStatus" align="center" label="上送状态"></el-table-column>
          <el-table-column prop="activityStatus" align="center" label="上送失败次数"></el-table-column>
          <el-table-column prop="activityStatus" align="center" label="创建时间"></el-table-column>
          <el-table-column align="left" width="300" label="操作">
            <template slot-scope="scope">
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>

        <!-- pagination -->
        <el-pagination class="pagination" background layout="prev, pager, next" :current-page.sync="page" @current-change="getList" :total="total" :page-size="searchFilter.length"></el-pagination>
      </el-card>
    </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      searchFilter: {
        usrName: '',
        orderId: '',
        serialNumber: ''
      },
      tableLoading: false,
      tableData: [],
      page: 1,
      total: 0
    }
  },
  methods: {
    searchByFilter () {
      console.log(this.searchFilter)
    },
    clearFilter () {
      for (let key in this.searchFilter) {
        this.searchFilter[key] = ''
      }
    },
    getList () {
      this.$http({
        url: '/aps',
        methods: 'GET'
      }).then(res => console.log(res))
    }
  },
  mounted () {
    this.getList()
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
