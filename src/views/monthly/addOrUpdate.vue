<template>
  <el-dialog v-el-drag-dialog title="监察计划" :visible.sync="addOrderVisible" width="700px" center class="new-order-dlg" @close="closesomedialogs()">
    <el-form ref="form" :model="form" label-width="120px">
      <el-row :gutter="10" style="flex-wrap:wrap">
        <el-col :sm="24" :md="12">
          <el-form-item label="*零件名称">
            <v-selectpage
              v-model="form.name"
              :data="CodeOptions"
              key-field="id"
              show-field="name"
              placeholder="请选择物料"
              title="请选择物料"
            />
          </el-form-item>
        </el-col>
        <el-col :sm="24" :md="12">
          <el-form-item label="*零件件号">
            <el-input v-model="form.name" />
          </el-form-item>
        </el-col>
        <el-col :sm="24" :md="12">
          <el-form-item label="*供应商">
            <el-input v-model="form.name" />
          </el-form-item>
        </el-col>
        <el-col :sm="24" :md="12">
          <el-form-item label="*检测班组">
            <el-input v-model="form.name" />
          </el-form-item>
        </el-col>
        <el-col :sm="24" :md="12">
          <el-form-item label="*数量">
            <el-input v-model="form.name" />
          </el-form-item>
        </el-col>
        <el-col :sm="24" :md="12">
          <el-form-item label="库存">
            <el-input v-model="form.name" />
          </el-form-item>
        </el-col>
        <el-col :sm="24" :md="12">
          <el-form-item label="任务来源">
            <el-input v-model="form.name" />
          </el-form-item>
        </el-col>
        <el-col :sm="24" :md="12">
          <el-form-item label="平台">
            <el-input v-model="form.name" />
          </el-form-item>
        </el-col>
        <el-col :sm="24" :md="12">
          <el-form-item label="监抽项目">
            <el-input v-model="form.name" />
          </el-form-item>
        </el-col>
        <el-col :sm="24" :md="12">
          <el-form-item label="备注">
            <el-input v-model="form.name" type="textarea" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="closesomedialogs()">取 消</el-button>
      <el-button type="primary" @click="closesomedialogs()">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      addOrderVisible: false,
      form: {
        lable: '0',
        name: '' // 产品
      }
    }
  },
  computed: {
    ...mapGetters([
      'CodeOptions'
    ])
  },
  methods: {
    init() {
      this.addOrderVisible = true
    },
    // 关闭dialogs
    closesomedialogs() {
      this.addOrderVisible = false
      this.$emit('closedialogs')
    }
  }
}
</script>
