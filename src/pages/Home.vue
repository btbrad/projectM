<template>
    <el-container class="border">
        <el-header height="auto">
            <div>
                <h3 class="title">欢迎来到《M》后台管理系统</h3>
                <span class="login-name">已登录为：<i class="blue">{{username}}</i></span>
            </div>
            <div  class="top-buttons border">
                    <div class="tap-buttons">
                        <el-button type="info" @click="switchSidebar (playInfoQueryList)">玩家查询</el-button>
                        <el-button type="info" @click="switchSidebar (modifyList)">修改</el-button>
                        <el-button type="info" @click="switchSidebar (announcementList)">公告</el-button>
                        <el-button type="info" @click="switchSidebar(eventSettingList)">活动设置</el-button>
                        <el-button type="info" @click="switchSidebar(batchQueryList)">批量查询</el-button>
                        <el-button type="info" @click="switchSidebar(operationLogList)">操作日志</el-button>
                    </div>
                    <div class="quit-button">
                        <el-button type="danger" @click="onLogOut">退出系统</el-button>
                    </div>
            </div>
        </el-header>
        <el-container>
            <el-aside class="aside">
                <div class="border default-height">
                    <my-side-bar :List="listModel"></my-side-bar>
                </div>
            </el-aside>
            <el-main class="main">
                <div class="border default-height">
                    <router-view></router-view>
                </div>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    import ElButton from "../../node_modules/element-ui/packages/button/src/button.vue";
    import Sidebar from "../components/Sidebar.vue";

    export default {
        created(){
          this.listModel=[
              {
                  name:'角色查询',
                  url:'/PlayerInfoQuery'
              },
          ]
        },
        data(){
            return{
                listModel:[],
                username:'',
                playInfoQueryList:[
                    {
                        name:'角色查询',
                        url:'/PlayerInfoQuery'
                    },
                 ],
                modifyList:[
                    {
                        name:'角色查询'
                    }
                ],
                announcementList:[
                    {
                        name:'公告首页'
                    },
                    {
                        name:'系统公告'
                    }
                ],
                eventSettingList:[
                    {
                        name:'合战设定'
                    },
                    {
                        name:'道场设定'
                    },
                    {
                        name:'活动设定'
                    },
                    {
                        name:'序列号管理'
                    }
                ],
                batchQueryList:[
                    {
                        name:'批量查询'
                    },
                    {
                        name:'任务查询'
                    },
                    {
                        name:'卡片查询'
                    },
                    {
                        name:'道具查询'
                    },
                    {
                        name:'销售查询'
                    },
                ],
                operationLogList:[
                    {
                        name:'操作查询'
                    }
                ]
            }
        },
        components: {
            ElButton,
            mySideBar:Sidebar,
        },
        mounted:function(){
            //sessionStorage中获取用户名
                let user =sessionStorage.getItem('access-user');
                if(user){
                    user = JSON.parse(user);
                console.log(sessionStorage);
                console.log(user);
                this.username=user.username;
            }
        },
        methods:{
            switchSidebar(param){
                this.listModel = param;
            },
            onLogOut(){
                window.sessionStorage.removeItem('access-user');
                console.log('清除session成功')
                window.location.reload()
            }
        }
    }
</script>

<style scoped>
    .border{
        border: #000 2px solid;
    }
    .default-height{
     min-height: 700px;
    }
    .title{
        text-align: center;
        padding: 0 auto;
    }
    .top-buttons{
        width: 100%;
        height: 50px;
    }
    .tap-buttons{
        float: left;
        margin-left: 20px;
        line-height: 50px;
    }
    .quit-button{
        float: right;
        margin-right: 20px;
        line-height: 50px;
    }
    .main{
        padding: 1px 16px 10px 0;
    }
    .aside{
        width: 200px;
        padding: 1px 2px 10px 20px;
    }
    .login-name{
        position: absolute;
        right: 20px;
        top: 25px;
    }
    .blue{
        color: #0000ff;
    }
    .el-row {
        margin-bottom: 20px;
    &:last-child {
         margin-bottom: 0;
     }
    }
    .el-col {
        border-radius: 4px;
    }
    .bg-purple-dark {
        background: #99a9bf;
    }
    .bg-purple {
        background: #d3dce6;
    }
    .bg-purple-light {
        background: #e5e9f2;
    }
    .grid-content {
        border-radius: 4px;
        min-height: 36px;
    }
    .row-bg {
        padding: 10px 0;
        background-color: #f9fafc;
    }
</style>
