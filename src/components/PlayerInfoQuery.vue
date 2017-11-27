<template>
    <div  class="myform">
        <el-form v-if="querySuccess===false" label-width="100px" size="mini">
            <el-form-item label="平台ID" prop="BluePandaID">
                <el-input v-model="BluePandaID"></el-input>
            </el-form-item>
            <el-form-item label="角色ID" prop="UserID">
                <el-input v-model="UserID"></el-input>
            </el-form-item>
            <el-form-item label="游戏角色名" prop="UserName">
                <el-input v-model="UserName"></el-input>
            </el-form-item>
            <el-form-item label="选择服务器" prop="ServerID">
                <el-select v-model="ServerID">
                    <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item size="large">
                <el-button type="primary" @click="onQuery">查询</el-button>
            </el-form-item>
        </el-form>
        <span class="error">{{ IdError.errorText }}</span>
        <!--<h1>{{this.player}}</h1>-->
    </div>
</template>

<script>
    import ElForm from "../../node_modules/element-ui/packages/form/src/form.vue";
    import {reqPlayers} from "../api/api";

    export default {
        components: {ElForm},
        data(){
            return{
                BluePandaID:'',
                UserID:'',
                UserName:'',
                ServerID:'S1',
                value:'S1',
                errorText:'',
                player: [
                ],
                options:[
                    {
                        value: 'S1',
                        label: '电信一服'
                    },
                    {
                        value: 'S2',
                        label: '电信二服'
                    },
                ],
                querySuccess:false,
                tableData:[],
            }
        },
        computed:{
            IdError(){
                let errorText,status;
                if(this.BluePandaID==='' && this.UserID==='' && this.UserName===''){
                    errorText = '平台ID、角色ID、角色名至少有一项不得为空';
                    status = false;
                }else {
                    status = true;
                    errorText ='';
                }
                return{
                    errorText,
                    status
                }
            }
        },
        methods:{
            onQuery(){
                if(this.IdError.status){
                    let para = {
                        name:this.UserName,
                        bluepandaid:this.BluePandaID,
                        userid:this.UserID,
                        serverid:this.ServerID
                    };
                    console.log(para);
                    reqPlayers(para).then((res)=>{
                        console.log(res.players);
                        this.player = res.players;
//                        this.$router.push('/PlayerInfo');
                        this.tableData=this.player;
                        sessionStorage.setItem('result',JSON.stringify(this.player));
                        this.$router.push('/PlayerInfo');
                        console.log(this.tableData);
                        this.querySuccess=true;
                    })
                }
            }
        }
    }
</script>

<style scoped>
   .myform{
       margin: 50px auto;
   }
   .error{
       color: #ff0000;
   }
   .el-form{
       height: auto;
       width: 500px;
   }
</style>
