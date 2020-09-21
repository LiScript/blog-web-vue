<template>
  <div class="table_container">
    <div class="header-container">
      <el-button type="primary" icon="el-icon-plus" @click="handleAdd">新增菜单</el-button>
    </div>
    <div class="table-container">
      <div class="table">
        <vxe-table
          border
          height="100%"
          show-overflow
          row-id="Id"
          :loading="treeLoading"
          :data="menuTreeList"
          :tree-config="{children: 'children', expandAll: true}"
        >
          <vxe-table-column field="name" title="名称" tree-node width="170" />
          <vxe-table-column field="title" title="标题" width="150" />
          <vxe-table-column field="component" title="组件" width="150" />
          <vxe-table-column field="icon" title="图标">
            <template v-slot="{row}">
              <svg-icon :icon-class="row.icon" style="width: 18px;height: 18px;" />
            </template>
          </vxe-table-column>
          <vxe-table-column field="redirect" title="重定向" />
          <vxe-table-column field="url" title="路由地址" />
          <!-- <vxe-table-column field="Sort" title="序号" /> -->
          <vxe-table-column field="description" title="描述" />
          <vxe-table-column title="操作" width="180">
            <template v-slot="{row}">
              <el-button type="primary" plain icon="el-icon-edit" size="mini" @click="handleUpdate(row)">编辑</el-button>
              <el-button icon="el-icon-delete" plain size="mini" type="danger" @click="handleDelete(row)">删除</el-button>
            </template>
          </vxe-table-column>
        </vxe-table>
      </div>
    </div>
    <menudialogs v-if="dialogFormVisible" ref="menudiallogs" @refreshDataList="getMenuTree()" @closeDialogs="dialogFormVisible = false" />
  </div>
</template>

<script>
import { getAllMenu, deleteMenu } from '@/api/menu'
import menudialogs from './menudialogs'
export default {
  name: 'Menu',
  components: {
    menudialogs
  },
  data() {
    return {
      menuTreeList: [],
      treeLoading: true,
      dialogFormVisible: false
    }
  },
  mounted() {
    this.getMenuTree()
  },
  methods: {
    /** 接口获取菜单列表*/
    getMenuTree: function() {
      this.treeLoading = true
      getAllMenu().then(res => {
        if (res.errno === 0) {
          this.menuTreeList = res.data
          this.treeLoading = false
        } else {
          this.$message.error(res.Message)
        }
      })
    },
    /** 新增菜单弹窗打开 */
    handleAdd() {
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs.menudiallogs.init('create')
      })
    },
    /** 编辑角色弹窗打开 */
    handleUpdate(row) {
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs.menudiallogs.init('update', row)
      })
    },
    /** 删除菜单 */
    handleDelete: function(row) {
      const _that = this
      this.$confirm('子菜单将一并删除，确定删除该菜单?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteMenu(row.id).then(function(res) {
          if (res.errno === 0) {
            _that.$message({
              message: '删除成功',
              type: 'success'
            })
          } else {
            _that.$message.error('删除失败')
          }
          _that.getMenuTree()
        })
      }).catch(() => { })
    }
  }
}
</script>
