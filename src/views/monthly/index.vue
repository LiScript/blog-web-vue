<template>
  <div class="table_container">
    <div class="header-container">
      <el-form
        :inline="true"
        class="search-panel"
      >
        <el-form-item label="零件名称">
          <el-input v-model="pageObject.filter.name" style="width: 200px;" clearable placeholder="零件名称" />
        </el-form-item>
        <el-button type="primary" circle icon="el-icon-search" title="查询" />
        <el-button type="primary" circle icon="el-icon-refresh-left" title="重置查询条件" />
        <el-button type="primary" circle icon="el-icon-plus" title="新增被委托区域" @click="addDemo()" />
      </el-form>
    </div>
    <div class="table-container">
      <div class="table">
        <vxe-table
          border
          resizable
          highlight-hover-row
          highlight-current-row
          height="auto"
          :data="tableData"
        >
          <vxe-table-column type="checkbox" width="60" />
          <vxe-table-column field="name" title="零件名称" />
          <vxe-table-column field="suppliername" title="供应商" />
          <vxe-table-column field="partcode" title="零件件号" />
          <vxe-table-column field="kucun" title="库存" />
          <vxe-table-column field="laiyuan" title="任务来源" />
          <vxe-table-column field="plat" title="平台" />
          <vxe-table-column field="project" title="监抽项目" />
          <vxe-table-column field="group" title="检测班组" />
          <vxe-table-column field="quality" title="数量" />
          <vxe-table-column field="remark" title="备注" />
          <vxe-table-column title="操作" width="100" show-overflow>
            <template v-slot="{ row }">
              <vxe-button type="text" icon="fa fa-edit" @click="editEvent(row)" />
              <vxe-button type="text" icon="fa fa-trash-o" />
            </template>
          </vxe-table-column>
        </vxe-table>
        <vxe-pager
          :current-page.sync="pageObject.pageIndex"
          :page-size.sync="pageObject.pageSize"
          :total="pageTotal"
          :layouts="['PrevJump','PrevPage','Number','NextPage','NextJump','Sizes','FullJump','Total']"
          @page-change="pageChange()"
        />
      </div>
    </div>
    <addOrUpdate v-if="addOrderVisible" ref="addOrUpdate" @closedialogs="addOrderVisible = false" />
  </div>
</template>
<script>
import addOrUpdate from './addOrUpdate'
export default {
  components: { addOrUpdate },
  data() {
    return {
      addOrderVisible: false,
      pageObject: {
        pageIndex: 1,
        pageSize: 20,
        filter: {
          name: '',
          remark: ''
        }
      },
      pageTotal: 0,
      tableData: []
    }
  },
  created() {
    this.tableData = [
      { name: '气缸套（重保件）', suppliername: '中原内配', partcode: '1002016A36DZ', kucun: '中间库', laiyuan: '安保件', plat: 'L', project: '尺寸', group: '零部件监督组', quality: 0, remark: '备注' },
      { name: '进气门', suppliername: '重庆三爱', partcode: '1007011-96EC', kucun: '中间库', laiyuan: '安保件', plat: 'L', project: '尺寸', group: '零部件监督组', quality: 0, remark: '备注' }
    ]
  },
  methods: {
    editEvent(row) {
      console.log(row)
    },
    pageChange() {
      console.log('123')
    },
    addDemo() {
      this.addOrderVisible = true
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init()
      })
    }
  }
}
</script>
