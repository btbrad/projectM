<template>
    <el-form class="login-container">
        <h1>欢迎来到《M》管理后台</h1>
        <el-form-item label="账号">
            <el-input type="text" v-model="username"></el-input>
            <span v-if="username!=''" class="error">{{ userError.errorText }}</span>
        </el-form-item>
        <el-form-item label="密码">
            <el-input type="password" v-model="password"></el-input>
            <span v-if="password!=''" class="error">{{ passError.errorText }}</span>
        </el-form-item>
        <el-form-item label="验证码">
            <el-input></el-input>
        </el-form-item>
        <el-form-item>
            <span class="error">{{errorText}}</span>
            <el-button round style="margin-left: 130px;" @click="onLogin">登录</el-button>
        </el-form-item>
    </el-form>
</template>

<script>

    import {reqLogin} from '../api/api';

    export default {
        name:'Login',
        data(){
            return{
                username:'',
                password:'',
                errorText:'',
            }
        },
        computed:{
            userError(){
                let errorText,status;
                if(!/^GM[123][0-9]{3}$/g.test(this.username)){
                    status = false;
                    errorText = '账号格式不正确！'
                }else{
                    status = true;
                    errorText = '';
                }
                return {
                    status,
                    errorText
                }
            },
            passError(){
                let errorText,status;
                if(!/^\w{6,}$/g.test(this.password)){
                    status = false;
                    errorText = '密码不能低于6位！'
                }else{
                    status = true;
                    errorText = '';
                }
                return {
                    status,
                    errorText
                }
            },
        },
        methods:{
            onLogin(){
                if(!this.userError.status && !this.passError){
                    this.errorText='账号或密码错误';
                }else {
                    var loginParams = {username:this.username,password:this.password};
                    reqLogin(loginParams).then(data => {
                        let { msg,code,user } = data;
                        if (code !== 200){
                            this.$message({
                                message: msg,
                                type: 'error'
                            })
                        }else{
                            sessionStorage.setItem('access-user',JSON.stringify(user));
                            console.log('login success');
                            this.$router.push({ path:'/' });
                        }
                    })

                }
            }
        }
    }
</script>

<style scoped>
    .login-container {
        /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
        -webkit-border-radius: 5px;
        border-radius: 5px;
        -moz-border-radius: 5px;
        background-clip: padding-box;
        margin: 160px auto;
        width: 350px;
        padding: 35px 35px 15px 35px;
        background: #fff;
    }

    .title {
        margin: 0px auto 40px auto;
        text-align: center;
        color: #505458;
    }
    .remember {
        margin: 0px 0px 35px 0px;
    }
    el-input{
        width: 200px;
        display: inline-block;
    }
    .error{
        color: #ff0000;
    }
</style>
