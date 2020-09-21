<template>
  <div class="pwd_container">
    <div>
      <el-form ref="mdfForm" :rules="rules" :model="mdfModel" label-width="120px" size="small" :disabled="isWaitingJump">
        <el-form-item label="原始密码" prop="OldPassword">
          <el-input v-model="mdfModel.OldPassword" :show-password="true" type="password" />
        </el-form-item>
        <el-form-item label="新密码" prop="NewPassword">
          <el-input v-model="mdfModel.NewPassword" :show-password="true" type="password" />
        </el-form-item>
        <el-form-item label="确认密码" prop="checkNew">
          <el-input v-model="mdfModel.checkNew" :show-password="true" type="password" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitNewPwd('mdfForm')">提 交</el-button>
          <el-button type="primary" @click="goHistory()">返 回</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import * as userApi from '@/api/user'
export default {
  components: {
  },
  data: function() {
    const that = this
    // 新密码重复是否正确
    const checkPwdAgain = function(rule, value, callback) {
      if (that.mdfModel.NewPassword !== value) {
        callback(new Error('新密码不一致，请重试'))
      }
      callback()
    }
    const checkNewPwd = function(rule, value, callback) {
      const reg = /^(?=.*[a-z])(?=.*\d)[\x20-\x7f]{6,20}$/ // 必须包含至少一个小写字母及数字
      if (!reg.test(value)) {
        callback(new Error('6-20位，必须包含小写字母及数字'))
      }
      callback()
    }
    return {
      isWaitingJump: false,
      dialogStatus: '',
      tempCopy: null,
      mdfModel: {
        Type: '1',
        UserId: '',
        OldPassword: '',
        NewPassword: '',
        checkNew: ''
      },
      resCheckCode: '', // 后台返回的验证码
      rules: {
        OldPassword: [{ required: true, message: '请输入原始密码', trigger: 'blur' }],
        NewPassword: [{ required: true, message: '请输入新密码', trigger: 'blur' },
          { required: true, validator: checkNewPwd, trigger: 'blur' }],
        checkNew: [{ required: true, message: '请再次确认新密码', trigger: 'blur' },
          { required: true, validator: checkPwdAgain, trigger: 'blur' }]
      }
    }
  },
  computed: {
    userId() {
      return this.$store.state.user.userId
    }
  },
  methods: {
    /** 提交新密码 到后台 Submit the new password to the background*/
    submitNewPwd(form) {
      const _this = this
      this.$refs[form].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.mdfModel)
          tempData.UserId = this.userId
          delete tempData.checkNew
          userApi.submitNewPwd(tempData).then((res) => {
            if (res.Succeeded) {
              this.$message({ message: '修改成功,3秒后跳转到登录页重新登录', type: 'success' })
              this.isWaitingJump = true
              setTimeout(function() {
                _this.$store.dispatch('user/logout')
                _this.$router.push('/login')
              }, 3000)
            } else {
              this.$message.error(res.Errors[0].Description)
            }
          })
        }
      })
    },
    goHistory() {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped lang="scss">
  .pwd_container{
    width:400px;
    margin:40px auto;
  }
</style>
