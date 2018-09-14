 let rules = {
   userName:[
     { required: true, message: '请输入用户名', trigger: 'blur' },
     { min: 1, max: 30, message: '请输入1-30位用户名', trigger: 'blur' }
   ],
   passWord: [
     { required: true, message: '请输入密码', trigger: 'blur' },
   ],
   vldcode: [
     { required: true, message: '请输入验证码', trigger: 'blur' },
   ],
   email:[
     { required: true, message: '邮箱不能为空', trigger: 'blur' },
     { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
   ]
}
export default rules
