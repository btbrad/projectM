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
        <div v-if="querySuccess===true" class="result">
            <!--<p>{{this.tableData}}</p>-->
            <h3>基本信息</h3>
            <el-table
                    :data="tableData"
                    style="width: 100%" >
                <el-table-column
                        prop="UserName"
                        label="角色名"
                        width="180">
                    <template slot-scope="scope">
                        <p>{{ scope.row.username }}</p>
                    </template>
                </el-table-column>
                <el-table-column
                        label="角色ID"
                        width="180">
                    <template slot-scope="scope">
                            <p>{{ scope.row.userid }}</p>
                    </template>
                </el-table-column>
                <el-table-column
                        label="平台ID"
                        width="180">
                    <template slot-scope="scope">
                        <p>{{ scope.row.bluepandaid }}</p>
                    </template>
                </el-table-column>
                <el-table-column
                        label="所在服务器"
                        width="180">
                    <template slot-scope="scope">
                        <p>{{ scope.row.serverid }}</p>
                    </template>
                </el-table-column>
                <el-table-column
                        label="建角时间"
                        width="180">
                    <template slot-scope="scope">
                        <p>{{ scope.row.create_time }}</p>
                    </template>
                </el-table-column>
                <el-table-column
                        label="最后更新时间"
                        width="180">
                    <template slot-scope="scope">
                        <p>{{ scope.row.last_login_time }}</p>
                    </template>
                </el-table-column>
                <el-table-column
                        label="账号状态"
                        width="180">
                    <template slot-scope="scope">
                        <p>{{ scope.row.status }}</p>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button
                                size="mini"
                                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button
                                size="mini"
                                type="danger"
                                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <h3>道具列表</h3>
            <el-table
                    :data="tableData"
                    style="width: 100%" >
                <el-table-column
                        prop="UserName"
                        label="道具名称"
                        width="180">
                    <template slot-scope="scope">
                        <p>{{ scope.row.item[0].name }}</p>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="UserName"
                        label="道具类别"
                        width="180">
                    <template slot-scope="scope">
                        <p>{{ scope.row.item[0].type }}</p>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="UserName"
                        label="道具数量"
                        width="180">
                    <template slot-scope="scope">
                        <p>{{ scope.row.item[0].amount }}</p>
                    </template>
                </el-table-column>
            </el-table>
        </div>

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
            onQuery(BluePandaID,){
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
