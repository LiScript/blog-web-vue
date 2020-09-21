<template>
  <div class="pwd_container">
    <div v-show="phoneStep===1" class="form_container">
      <div class="form-title">找回密码</div>
      <el-form ref="phoneForm" :rules="phoneRules" :model="phoneModel" size="medium">
        <el-form-item prop="phoneNumber">
          <el-input v-model="phoneModel.phoneNumber" placeholder="请输入手机号码" :disabled="isSendingCode" />
        </el-form-item>
      </el-form>
      <el-form ref="checkForm" :rules="codeRules" :model="phoneModel" size="medium">
        <el-form-item prop="checkCode">
          <el-col :span="15">
            <el-input v-model="phoneModel.checkCode" placeholder="请输入验证码" />
          </el-col>
          <el-col :span="9" style="text-align:right">
            <el-button style="margin-left:10px" type="primary" :disabled="isSendingCode" @click="sendCheckCode('phoneForm')" v-text="checkCodeBtnText" />
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width:100%;margin-top: 20px;" @click="submitCheckCode()">下一步</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div v-show="phoneStep===2" class="form_container">
      <div class="form-title">重置密码</div>
      <el-form ref="newForm" :rules="rules" :model="mdfModel" :disabled="isWaitingJump" size="medium">
        <el-form-item prop="NewPassword" :show-password="true" type="password">
          <el-input v-model="mdfModel.NewPassword" placeholder="请输入新密码" />
        </el-form-item>
        <el-form-item prop="checkNew" :show-password="true" type="password">
          <el-input v-model="mdfModel.checkNew" placeholder="再次确认密码" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width:100%;margin-top: 20px;" @click="submitNewPwd('newForm')">重置密码</el-button>
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
    // 新密码重复是否正确 Is the new password repeated correctly
    const checkPwdAgain = function(rule, value, callback) {
      if (that.mdfModel.NewPassword !== value) {
        callback(new Error('新密码不一致，请重试'))
      }
      callback()
    }
    const checkNewPwd = function(rule, value, callback) {
      // 必须包含至少一个小写字母及数字
      // Must contain at least one lowercase letter and number
      const reg = /^(?=.*[a-z])(?=.*\d)[\x20-\x7f]{6,20}$/
      if (!reg.test(value)) {
        callback(new Error('6-20位，必须包含小写字母及数字'))
      }
      callback()
    }
    const validatePhoneNum = (rule, value, callback) => {
      const reg = /^1[3|4|5|6|7|8][0-9]\d{8}$/
      const bChk = reg.test(value)
      if (!bChk) {
        callback(new Error('手机号格式错误'))
      } else {
        callback()
      }
    }
    const CheckCode = function(rule, value, callback) {
      if (value !== that.resCheckCode) {
        callback(new Error('验证码错误'))
      }
      callback()
    }
    return {
      isWaitingJump: false,
      dialogStatus: '',
      tempCopy: null,
      phoneStep: 1, // 1-发送验证码 send checkcode；2-修改密码 set password
      mdfModel: {
        Type: '1',
        UserId: '',
        NewPassword: '',
        checkNew: ''
      },
      resCheckCode: '', // 后台返回的验证码 Verification code returned in the background
      rules: {
        NewPassword: [{ required: true, message: '请输入新密码', trigger: 'blur' },
          { required: true, validator: checkNewPwd, trigger: 'blur' }],
        checkNew: [{ required: true, message: '请再次确认新密码', trigger: 'blur' },
          { required: true, validator: checkPwdAgain, trigger: 'blur' }]
      },
      phoneRules: {
        phoneNumber: [{ required: true, trigger: 'blur', message: '请输入手机号码' },
          { trigger: 'blur', validator: validatePhoneNum }]
      },
      codeRules: {
        checkCode: [{ required: true, message: '请输入验证码', trigger: 'blur' },
          { validator: CheckCode, trigger: 'blur' }]

      },
      checkCodeBtnText: '发送验证码',
      isSendingCode: false,
      countDown: 60,
      phoneModel: {
        phoneNumber: '',
        checkCode: ''
      }
    }
  },
  mounted: function() {
    this.tempCopy = Object.assign({}, this.mdfModel)
  },
  methods: {
    // jump to the second step ,set new password
    submitCheckCode() {
      this.phoneStep = 2
    },
    /** 发送验证码  send checkcode*/
    sendCheckCode(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          const para = {
            strUserPhoneNo: this.phoneModel.phoneNumber,
            strSMSTemplateCode: 'SMSCodePwdModify'
          }
          userApi.getSMSCodeNoToken(para).then(res => {
            if (res.Success) {
              this.mdfModel.UserId = res.ExtraData
              this.checkCodeBtnText = this.countDown + '秒'
              this.timeCounting()
              this.resCheckCode = res.Data
            } else {
              this.$message({ message: res.Message, type: 'error' })
            }
          })
        }
      })
    },
    // 验证码倒计时 counting down 60 seconds
    timeCounting() {
      const _this = this
      this.isSendingCode = true
      const interval = setInterval(function() {
        _this.countDown--
        _this.checkCodeBtnText = _this.countDown + '秒'
        if (_this.countDown === 0) {
          clearInterval(interval)
          _this.isSendingCode = false
          _this.countDown = 60
          _this.checkCodeBtnText = '重新发送'
        }
      }, 1000)
    },
    /** 提交新密码 到后台 Submit the new password to the background*/
    submitNewPwd(form) {
      const _this = this
      this.$refs[form].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.mdfModel)
          delete tempData.checkNew
          console.log(tempData)
          userApi.resetPassword(tempData).then((res) => {
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
    }
  }
}
</script>

<style scoped lang="scss">
  .pwd_container{
    min-height: 100%;
    width: 100%;
    background-image: url('../../assets/images/login/bg2.png');
    background-size: cover;
    overflow: hidden;
  }
  .form_container{
    position: relative;
    background:#fff;
    width: 500px;
    max-width: 100%;
    padding: 30px 80px 50px 80px;
    margin: 0 auto;
    overflow: hidden;
    margin-top: 13%;
    box-shadow: 0 0 10px 2px rgba(7,17,27,.2);
    border-radius: 10px;
  }

  .form-title {
    font-size: 20px;
    text-align: center;
    margin-bottom:30px;
    font-weight: 600;
  }
</style>
