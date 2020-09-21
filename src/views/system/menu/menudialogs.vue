<template>
  <el-dialog v-el-drag-dialog v-loading="saveLoading" width="600px" :title="textMap[dialogStatus]" :close-on-click-modal="false" :visible.sync="dialogFormVisible" class="edit-dialog" @close="handleClosedialog()">
    <el-form ref="baseForm" :rules="rules" :model="baseForm" label-width="80px" label-position="right" size="small">
      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label="名称" prop="name">
            <el-input v-model="baseForm.name" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="标题" prop="title">
            <el-input v-model="baseForm.title" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="组件" prop="component">
            <el-input v-model="baseForm.component" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="路由地址" prop="url">
            <el-input v-model="baseForm.url" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="图标" prop="icon">
            <el-input v-model="baseForm.icon" v-popover:iconListPopover :readonly="true" placeholder="菜单图标名称" class="icon-list__input" />
            <el-popover
              ref="iconListPopover"
              placement="bottom-start"
              trigger="click"
              popper-class="mod-menu__icon-popover"
            >
              <div class="mod-menu__icon-inner">
                <div class="mod-menu__icon-list">
                  <el-button
                    v-for="(item, index) in iconList"
                    :key="index"
                    :class="{ 'is-active': item === baseForm.icon }"
                    @click="iconActiveHandle(item)"
                  >
                    <svg-icon :icon-class="item" />
                  </el-button>
                </div>
              </div>
            </el-popover>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="重定向" prop="redirect">
            <el-input v-model="baseForm.redirect" />
          </el-form-item>
        </el-col>
        <el-col :span="12" />
        <el-col :span="12">
          <el-form-item label="描述" prop="description">
            <el-input v-model="baseForm.description" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="父菜单" prop="parentID">
            <treeSelect v-model="baseForm.parentID" class="treeSelect" :normalizer="normalizer" :multiple="false" :options="menuTreeList" :default-expand-level="Infinity" placeholder="根菜单" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClosedialog()">取 消</el-button>
      <el-button type="primary" :loading="saveLoading" @click="submitForm()">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import XEUtils from 'xe-utils'
import { updateMenu, addMenu, getAllMenu } from '@/api/menu'
import treeSelect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import Icon from '@/icons'
export default {
  name: 'Menudialogs',
  components: {
    treeSelect
  },
  data() {
    return {
      menuTreeList: [],
      saveLoading: false,
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '添加'
      },
      iconList: [],
      rules: {
        name: [{ required: true, message: '请输入菜单标题', trigger: 'blur' }],
        Code: [{ required: true, message: '请输入菜单编码', trigger: 'blur' }],
        icon: [{ required: true, message: '请输入图标类名', trigger: 'blur' }]
      },
      tempCopy: null,
      baseForm: {
        name: '',
        component: '',
        url: '',
        icon: '',
        redirect: '',
        parentID: null,
        description: '',
        title: ''
      },
      updateId: ''
    }
  },
  created() {
    this.iconList = Icon.getNameList()
  },
  mounted() {
    this.tempCopy = this.baseForm
    this.getMenuTree()
  },
  methods: {
    // 图标选中
    iconActiveHandle(iconName) {
      this.baseForm.icon = iconName
    },
    init(value1, value2) {
      if (value1 === 'create') {
        this.resetForm('baseForm')
        this.dialogStatus = 'create'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['baseForm'].clearValidate()
        })
      } else if (value1 === 'update') {
        this.dialogStatus = 'update'
        this.dialogFormVisible = true
        this.updateId = value2.id
        // console.log(value2)
        this.baseForm = XEUtils.pick(value2, 'name', 'component', 'url', 'icon', 'redirect', 'parentID', 'description', 'title')
        // this.baseForm = Object.assign({}, value2)
      }
    },
    // 新增/更新菜单 到后台
    submitForm() {
      if (this.dialogStatus === 'update') {
        this.$refs['baseForm'].validate((valid) => {
          if (valid) {
            this.saveLoading = true
            updateMenu(this.updateId, this.baseForm).then((res) => {
              if (res.errno === 0) {
                this.$message({ message: '更新成功', type: 'success' })
                // 刷新列表
                this.$emit('refreshDataList')
              }
              this.dialogFormVisible = false
              this.saveLoading = false
            })
          }
        })
      } else {
        this.$refs['baseForm'].validate((valid) => {
          if (valid) {
            this.saveLoading = true
            // console.log(this.baseForm)
            addMenu(this.baseForm).then((res) => {
              if (res.errno === 0) {
                this.$message({ message: '新增成功', type: 'success' })
                // 刷新列表
                this.$emit('refreshDataList')
              }
              this.dialogFormVisible = false
              this.saveLoading = false
            })
          }
        })
      }
    },
    /** 重置form*/
    resetForm(formName) {
      if (this.$refs[formName] === undefined) {
        return false
      }
      this.$refs[formName].resetFields()
      this.baseForm = Object.assign({}, this.tempCopy)
    },
    /** 接口获取菜单列表*/
    getMenuTree() {
      this.treeLoading = true
      this.treeLoading = false
      getAllMenu().then(res => {
        if (res.errno === 0) {
          this.menuTreeList = res.data
          this.treeLoading = false
        } else {
          this.$message.error(res.Message)
        }
      })
    },
    // 后台返回的数据如果和VueTreeselect要求的数据结构不同，需要进行转换
    normalizer(node) {
      if (node.children && !node.children.length) {
        delete node.children
      }
      return {
        id: node.id,
        label: node.name,
        children: node.children
      }
    },
    handleClosedialog() {
      // this.$emit('refreshDataList')
      this.$emit('closeDialogs')
      this.dialogFormVisible = false
    }
  }
}
</script>
<style lang="scss">
  .mod-menu {
    .menu-list__input,
    .icon-list__input {
       > .el-input__inner {
        cursor: pointer;
      }
    }
    &__icon-popover {
      width: 458px;
      overflow: hidden;
    }
    &__icon-inner {
      width: 478px;
      max-height: 258px;
      overflow-x: hidden;
      overflow-y: auto;
    }
    &__icon-list {
      width: 458px;
      padding: 0;
      margin: -8px 0 0 -8px;
      > .el-button {
        padding: 8px;
        margin: 8px 0 0 8px;
        > span {
          display: inline-block;
          vertical-align: middle;
          width: 18px;
          height: 18px;
          font-size: 18px;
        }
      }
    }
    .icon-list__tips {
      font-size: 18px;
      text-align: center;
      color: #e6a23c;
      cursor: pointer;
    }
  }
</style>
